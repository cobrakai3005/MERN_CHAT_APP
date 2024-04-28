import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { DevTool } from "@hookform/devtools";
import useLogin from "../../hooks/useLogin";
import toast from "react-hot-toast";
import { setUser, useUser } from "../../Redux/userSlice";
import { useDispatch } from "react-redux";
import loginImg from "../../../public/login.png";

export default function Login() {
  const {
    register,
    reset,
    getValues,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, login } = useLogin();
  const { user } = useUser();
  const onSubmit = async (data) => {
    try {
      const res = await login(data);
      if (!res.success) {
        toast.error(res.message);
        return;
      }
      dispatch(setUser(res.data));
      localStorage.setItem("chat-user", JSON.stringify(res.data));
      toast.success(res?.message);
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    } finally {
      reset();
    }
  };
  if (user) {
    return <Navigate to={"/"} />;
  }

  if (user === null) {
    return (
      <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
        <div
          className="h-full w-full p-6 bg-blue-200 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20 border border-gray-100
"
        >
          <div className="w-32 h-32 flex justify-center">
            <img src={loginImg} alt="" className="w-full h-full object-cover" />
          </div>
          <h1 className="text-3xl font-semibold text-center text-gray-300">
            Login <span className="text-blue-500">Chat App</span>
          </h1>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label className="label p-2">
                <span className="text-base label-text">Username</span>
              </label>
              <input
                type="text"
                placeholder="Enter username.."
                className="w-full input input-bordered"
                {...register("username", {
                  required: {
                    value: true,
                    message: "Username is reqired!",
                  },
                })}
              />
              <p className="">{errors.username?.message}</p>
            </div>
            <div>
              <label className="label p-2">
                <span className="text-base label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="Enter password.."
                className="w-full input input-bordered "
                {...register("password", {
                  required: {
                    value: true,
                    message: "Password is reqired!",
                  },
                  maxLength: {
                    value: 10,
                    message: "Password should not be more than 10 characters",
                  },
                })}
              />
              <p className="">{errors.password?.message}</p>
            </div>
            <Link
              to="/signup"
              className="text-sm hover:underline hover:text-blue-600 mt-4 inline-block"
            >
              {" "}
              Don't have an Account ?
            </Link>
            <div>
              <button disabled={loading} className="btn btn-block btn-sm mt-2">
                {loading ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  "Login"
                )}
              </button>
            </div>
          </form>
        </div>
        {/* <DevTool control={control} /> */}
      </div>
    );
  }
}

//Starting code for this file

// export default function Login() {
//     return (
//       <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
//           <div className='h-full w-full p-6 bg-blue-200 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20 border border-gray-100
//   '>
//               <h1 className='text-3xl font-semibold text-center text-gray-300'>Login <span  className='text-blue-500'>Chat App</span></h1>

//               <form>
//                   <div>
//                       <label className='label p-2'>
//                           <span  className='text-base label-text'>Username</span>
//                       </label>
//                       <input type="text" placeholder='Enter username..' className='w-full input input-bordered' />
//                   </div>
//                   <div>
//                       <label className='label p-2'>
//                           <span  className='text-base label-text'>Password</span>
//                       </label>
//                       <input type="password" placeholder='Enter password..' className='w-full input input-bordered ' />
//                   </div>
//                   <a href="#" className='text-sm hover:underline hover:text-blue-600 mt-4 inline-block'> Don't have an Account ?</a>
//                   <div>
//                       <button className='btn btn-block btn-sm mt-2'>Login</button>
//                   </div>
//               </form>
//           </div>
//       </div>
//     )
//   }
