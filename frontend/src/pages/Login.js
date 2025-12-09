import React, { useEffect, useState, useRef } from 'react'
import { axiosClient } from '../utils/axiosClient';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import LoadingBar from 'react-top-loading-bar';
import { ToastContainer } from 'react-toastify';

document.title = 'Login'

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const ref = useRef(null);

  useEffect(() => {
    if (localStorage.getItem("User")) {
      navigate("/");
    }
  }, [navigate]);

  const submitForm = async (e) => {
    e.preventDefault();

    ref.current.staticStart();

    axiosClient.post('/auth/login', { email, password })
      .then((resApi) => resApi.data)
      .then((resFinal) => {

        if (resFinal.status === 1) {
          localStorage.setItem("User", JSON.stringify(resFinal.user));
          toast.success(resFinal.msg);
          navigate('/');
        }
        else {
          toast.error(resFinal.msg);
        }

        ref.current.complete();
      })
      .catch(() => {
        toast.error("Something went wrong!");
        ref.current.complete();
      });
  };

  return (
    <div className='bg-orange-800 w-screen h-screen flex flex-row '>
      <ToastContainer />
      <LoadingBar color='orange' ref={ref} />

      <div className='max-w-[1170px] mx-auto my-[100px]'>
        <div className='  bg-white rounded-[10px] border border-gray-200 p-[50px]'>


            <div className=' '>
              <h1 className='lg:text-[35px] text-blue-400 sm:text-[30px] text-[25px] font-serif my-[20px]'>Login Page TechBridge</h1>

               
              <h3 className='font-serif'>Email</h3>  
              <input
                placeholder='Email'
                onChange={(e) => setEmail(e.target.value)}
                className='w-full border border-gray-300 p-[10px] rounded-[5px] outline-none focus:outline-white focus:outline-offset-4 '
              />
               <h3 className='mt-[20px] font-serif'>Password</h3>
              <input
                placeholder='Password'
                type='password'
                onChange={(e) => setPassword(e.target.value)}
                className=' w-full border border-gray-300 p-[10px] rounded-[5px] outline-none focus:outline-white focus:outline-offset-4'
              />

              <button
                onClick={submitForm}
                className='mt-[20px] cursor-pointer w-full bg-blue-400 text-white p-[12px_24px] rounded-[10px] '
              >
                Submit
              </button>

              <p className='text-center  font-serif mt-[20px] flex gap-[10px] items-center justify-center'>
                New User ? Go To  
                <Link to='/signup' className='text-blue-600'>SignUp</Link>
                
              </p>
            </div>
         
        </div>
      </div>


    </div>
  );
}

export default Login;
