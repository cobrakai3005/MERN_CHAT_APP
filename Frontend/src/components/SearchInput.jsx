import React from 'react'
import {IoSearchSharp} from "react-icons/io5";

export default function SearchInput() {
  return (
    <form className='flex items-center gap-2'>
        <input type="text" placeholder='Search ..' className='input input-bordered rounded-full'/>
        <button className='btn btn-circle bg-sky-500 text-white' type='submit'>
            <IoSearchSharp size={17}/>
        </button>
    </form>
  )
}


// export default function SearchInput() {
//   return (
//     <form className='flex items-center gap-2'>
//         <input type="text" placeholder='Search ..' className='input input-bordered rounded-full'/>
//         <button className='btn btn-circle bg-sky-500 text-white' type='submit'>
//             <IoSearchSharp size={17}/>
//         </button>
//     </form>
//   )
// }

