import { useContext,} from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from '../providers/AuthProvider';
import { Typewriter } from 'react-simple-typewriter';
import { useForm } from 'react-hook-form';
import useAxiosPublic from "../hukse/useAxiosPublic";
import Swal from "sweetalert2";

const Register = () => {

  const { creatUser,updateUserProfile } = useContext(AuthContext);
  
  console.log('start loging');
  const axiosPublic = useAxiosPublic();
  const { register, handleSubmit, reset, formState: { errors }, } = useForm();
  const navigate = useNavigate();
  const onSubmit = data => {
      console.log(data);
      creatUser(data.email, data.password)
          .then(reseult => {
              console.log(reseult.user);
              updateUserProfile(data.name, data.photourl)
                  .then(() => {

                    //   create user entry in the database
                      const userInfo = {
                          name: data.name,
                          email: data.email,

                      }
                      axiosPublic.post('/users', userInfo)
                          .then(res => {
                              if (res.data.insertedId) {
                                  console.log('user added to the database');
                                  reset();
                                  Swal.fire({
                                      position: "top-end",
                                      icon: "success",
                                      title: "User Create a succesfully",
                                      showConfirmButton: false,
                                      timer: 1500
                                  });
                                  navigate('/')
                              }
                          })
                      
                                  navigate('/')
                  })
                  
          })
          .catch(error => console.error(error))
  };



  return (

    <>
        <h1 className='text-2xl md:text-5xl text-center font-bold md:mb-4'>
                            {' '}
                            <span className=''>
                                {/* Style will be inherited from the parent element */}
                                <Typewriter
                                    words={['Plese SignUp!', 'Plese SignUp!', 'Plese SignUp!', 'Plese SignUp!']}
                                    loop={5}
                                    cursor
                                    cursorStyle='_'
                                    typeSpeed={70}
                                    deleteSpeed={50}
                                    delaySpeed={1000}

                                />
                            </span>
            </h1>
   
    <div className="hero min-h-screen bg-base-200" style={{backgroundImage: 'url(https://i.ibb.co/BwHrH6X/regiseter.jpg)'}}>
        <div className="hero-content flex-col lg:flex-row-reverse">
            <div className="text-center lg:text-left">
                <h1 className="text-5xl font-bold text-white">Sign Up now!</h1>
            </div>
            <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input type="text" {...register("name", { required: true })} name="name" placeholder="Enter Your Name" className="input input-bordered" />
                        {errors.name && <span className="text-red-700">This Name is required</span>}
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Photo URL</span>
                        </label>
                        <input type="text" {...register("photourl", { required: true })} placeholder="Photo URL" className="input input-bordered" />
                        {errors.photourl && <span className="text-red-700">Photo URl is required</span>}
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" {...register("email", { required: true })} name="email" placeholder="email" className="input input-bordered" />
                        {errors.email && <span className="text-red-700">This email is required</span>}
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input type="password" {...register("password", {
                            required: true,
                            minLength: 6,
                            maxLength: 20,
                            // pattern: /(?=.*[!@#$%^&*])(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])/

                        })} name="password" placeholder="password" className="input input-bordered" />
                        {/* {errors.password && <span>This field is required</span>} */}
                        {errors.password?.type === "required" && (
                            <p role="alert" className="text-red-600">Password  is required</p>
                        )}
                        {errors.password?.type === "minLength" && (
                            <p role="alert" className="text-red-600">Password  must be 6 character</p>
                        )}
                        {errors.password?.type === "maxLength" && (
                            <p role="alert" className="text-red-600">Password  must be less then 20 character</p>
                        )}
                        {/* {errors.password?.type === "pattern" && (
                            <p role="alert" className="text-red-600">Password must have one uppercase,onelowercase, one number and one specila character</p>
                        )} */}
                        <label className="label">
                            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                        </label>
                    </div>
                    <div className="form-control mt-6">
                        <input type="submit" value="SignUP" className="btn btn-primary" />
                        {/* <button className="btn btn-primary">Login</button> */}
                    </div>
                </form>
                <p className="text-center my-4"> Already have an account?please <Link className="text-blue-600 font-bold underline" to='/login'>Login</Link></p>
            </div>
        </div>
    </div>
</>
  );
};

export default Register;