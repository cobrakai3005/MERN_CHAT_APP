import React, { useState, useContext } from "react";
import GenderCheckbox from "./GenderCheckbox";
import { Link, Navigate, useNavigate } from "react-router-dom";
import useSignup from "../../hooks/useSignup";
import { DevTool } from "@hookform/devtools";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import UserConext from "../../context/UserContext";

export default function Signup() {
  const { control, register, handleSubmit, reset, formState, getValues } =
    useForm({
      defaultValues: {
        fullName: "",
        username: "",
        password: "",
        confirmPassword: "",
        gender: "",
      },
    });
  const { errors } = formState;
  const { user, setUser } = useContext(UserConext);
  // console.log(errors.fullName?.message);
  const { loading, signup } = useSignup();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const res = await signup(data);
    console.log(res);
    reset();
    if (res.success) {
      toast.success(res.message);
      setUser(res.data);
      navigate("/");
      localStorage.setItem("chat-user", JSON.stringify(res.data));
      return;
    } else {
      toast.error(res.message);
      return;
    }
  };

  if (user) {
    return <Navigate to="/" />;
  }

  if (user === null) {
    return (
      <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
        <div
          className="h-full w-full p-6 bg-blue-200 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20 border border-gray-100
  "
        >
          <h1 className="text-3xl font-semibold text-center text-gray-300">
            Sign Up <span className="text-blue-500">Chat App</span>
          </h1>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label className="label p-2">
                <span className="text-base label-text">Full Name</span>
              </label>
              <input
                type="text"
                placeholder="John Doe.."
                className="w-full input input-bordered h-10"
                {...register("fullName", {
                  required: {
                    value: true,
                    message: "Fullname is required .",
                  },
                })}
              />
              <p className="text-red-600">{errors.fullName?.message}</p>
            </div>
            <div>
              <label className="label p-2">
                <span className="text-base label-text">Username</span>
              </label>
              <input
                type="text"
                placeholder="Enter Username.."
                className="w-full input input-bordered h-10"
                {...register("username", {
                  required: {
                    value: true,
                    message: "Username is required .",
                  },
                })}
              />
              <p className="text-red-600">{errors.username?.message}</p>
            </div>
            <div>
              <label className="label p-2">
                <span className="text-base label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="Enter Password.."
                className="w-full input input-bordered h-10"
                {...register("password", {
                  required: {
                    value: true,
                    message: "Password is required .",
                  },
                  maxLength: {
                    value: 10,
                    message: "Password should not be more than 10 characters",
                  },
                })}
              />{" "}
              <p className="text-red-600">{errors.password?.message}</p>
            </div>
            <div>
              <label className="label p-2">
                <span className="text-base label-text">Confirm Password</span>
              </label>
              <input
                type="password"
                placeholder="Confirm Password.."
                className="w-full input input-bordered h-10"
                {...register("confirmPassword", {
                  required: {
                    value: true,
                    message: "Confirm Password is required .",
                  },
                  maxLength: {
                    value: 10,
                    message: "Password should not be more than 10 characters",
                  },
                  validate: (fieldValue) => {
                    return (
                      fieldValue === getValues("password") ||
                      "Passwords do not  match"
                    );
                  },
                })}
              />
              <p className="text-red-600">{errors.confirmPassword?.message}</p>
            </div>
            // Gender Checkbox
            <GenderCheckbox register={register} />
            <Link
              to="/login"
              className="text-sm hover:underline hover:text-blue-600 mt-4 inline-block"
            >
              Already have an account ?
            </Link>
            <div>
              <button disabled={loading} className="btn btn-block btn-sm mt-2">
                {loading ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  "Signup"
                )}
              </button>
            </div>
          </form>
        </div>
        <DevTool control={control} />
      </div>
    );
  }
}

// export default function Signup() {
//     return (
//       <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
//           <div className='h-full w-full p-6 bg-blue-200 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20 border border-gray-100
//   '>
//               <h1 className='text-3xl font-semibold text-center text-gray-300'>Sign Up <span className='text-blue-500'>Chat App</span></h1>

//               <form>
//                   <div>
//                   <label className='label p-2'>
//                           <span  className='text-base label-text'>Full Name</span>
//                       </label>
//                       <input type="text" placeholder='John Doe..' className='w-full input input-bordered h-10' />
//                   </div>
//                   <div>
//                   <label className='label p-2'>
//                           <span  className='text-base label-text'>Username</span>
//                       </label>
//                       <input type="text" placeholder='Enter Username..' className='w-full input input-bordered h-10' />
//                   </div>
//                   <div>
//                   <label className='label p-2'>
//                           <span  className='text-base label-text'>Password</span>
//                       </label>
//                       <input type="password" placeholder='Enter Password..' className='w-full input input-bordered h-10' />
//                   </div>
//                   <div>
//                   <label className='label p-2'>
//                           <span  className='text-base label-text'>Confirm Password</span>
//                       </label>
//                       <input type="password" placeholder='Confirm Password..' className='w-full input input-bordered h-10' />
//                   </div>

//                   {/* Gender Checkbox */}
//               <GenderCheckbox/>

//               <a href="#" className='text-sm hover:underline hover:text-blue-600 mt-4 inline-block'>Already have an account ?</a>

//               <div>
//                       <button className='btn btn-block btn-sm mt-2'>Login</button>
//                   </div>
//               </form>
//           </div>
//       </div>
//     )
//   }
