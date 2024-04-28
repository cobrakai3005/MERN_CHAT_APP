import React, { useState } from "react";

import { IoSend } from "react-icons/io5";
import useSendMessage from "../hooks/useSendMessage";
import toast from "react-hot-toast";
import useGetRealtimeMessage from "../hooks/useGetRealtimeMessage";

export default function MessageInput() {
  const [message, setMessage] = useState("");
  const { loading, sendMessage } = useSendMessage();
  useGetRealtimeMessage();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!message) {
        toast.error("Please enter message to  send!!");
        return;
      }
      const res = await sendMessage(message);
      setMessage("");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form className="px-4  my-3 " onSubmit={handleSubmit}>
      <div className="w-full relative">
        <input
          type="text"
          className="border text-sm rounded-lg block w-full p-2.5 bg-gray-500 text-white "
          placeholder="Send a Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          type="submit "
          className="absolute inset-y-0 end-0 flex items-center pe-3"
        >
          {loading ? (
            <span className="loading loading-spinner"></span>
          ) : (
            <IoSend />
          )}
        </button>
      </div>
    </form>
  );
}

// export default function MessageInput() {
//   return (

//     <form className='px-4  my-3 '>
//         <div className="w-full">
//             <input type="text" className='border text-sm rounded-lg block w-full p-2.5 bg-gray-500 text-white ' placeholder='Send a Message' />
//             <button type='submit ' className='absolute inset-y-0 end-0 flex items-center pe-3'>
//                 <IoSend />
//             </button>
//         </div>

//     </form>

//   )
// }
