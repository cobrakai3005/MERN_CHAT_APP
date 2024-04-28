import User from "../models/user.model.js";
import AppResponse from "../utils/apiResponse.js";
import { wrapAsync } from "../utils/wrapAsync.js";

const getUserForSideBar = wrapAsync(async (req, res) => {
  const loggedInUser = req.user._id;

  const allUser = await User.find({ _id: { $ne: loggedInUser } }).select(
    "-password"
  );

  return res
    .status(200)
    .json(new AppResponse(200, allUser, "Succesfully fetched User"));
});

const getCurrentUser = wrapAsync(async () => {
  const user = req.user;
  return res.status(200).json(new AppResponse(200, user, "Current user"));
});

export { getUserForSideBar, getCurrentUser };
