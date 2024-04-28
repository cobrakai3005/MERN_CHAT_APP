import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { io, getRecieverSocketId } from "../socket/socket.js";
import { wrapAsync } from "../utils/wrapAsync.js";

const sendMessage = wrapAsync(async (req, res) => {
  const { message } = req.body;
  const { id: recieverId } = req.params;
  const senderId = req.user._id;

  let conversation = await Conversation.findOne({
    participants: { $all: [senderId, recieverId] },
  });
  if (!conversation) {
    conversation = await Conversation.create({
      participants: [senderId, recieverId],
    });
  }

  const newMessage = await Message.create({
    senderId,
    recieverId,
    message,
  });
  if (newMessage) {
    conversation.messages.push(newMessage._id);
    await conversation.save();
  }

  //   Socket io  functionality for real time
  const recieverSocketId = getRecieverSocketId(recieverId);
  if (recieverSocketId) {
    io.to(recieverSocketId).emit("newMessage", newMessage);
  }

  return res.status(200).json({
    newMessage,
  });
});

const getMessages = wrapAsync(async (req, res) => {
  const { id: recieverId } = req.params;
  const senderId = req.user._id;

  const conversation = await Conversation.findOne({
    participants: { $all: [senderId, recieverId] },
  }).populate("messages");

  if (!conversation) return res.status(200).json([]);

  const messages = conversation?.messages;

  return res.status(200).json(messages);
});

export { sendMessage, getMessages };
