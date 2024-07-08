

import { useContext, useEffect, useState } from "react";
import { Link,   useLocation, useNavigate,   } from "react-router-dom";

import { AuthContext } from "../providers/AuthProvider";
import { loadCaptchaEnginge, LoadCanvasTemplate,  validateCaptcha } from 'react-simple-captcha';
import Swal from "sweetalert2";
import useAxiosPublic from "../hukse/useAxiosPublic";

const Login = () => {
    const {signIn, signInWithGoogle} = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();
    console.log('location login', location);




const [disabled, setDisabled] = useState(true)


const from = location.state?.from?.pathname || '/';
console.log('state in the location login page', location?.state);

 useEffect( () => {
     loadCaptchaEnginge(6); 
 },[])

 const handleLogin = e => {
     e.preventDefault();
     const form = e.target;
     const email = form.email.value;
     const password = form.password.value;
     console.log(email, password);
     signIn(email, password)
     .then(result => {
         const user = result.user;
         console.log(user);
        
         Swal.fire({
             title: "User login succesfully",
             showClass: {
               popup: `
                 animate__animated
                 animate__fadeInUp
                 animate__faster
               `
             },
             hideClass: {
               popup: `
                 animate__animated
                 animate__fadeOutDown
                 animate__faster
               `
             }
           });
           navigate(from, {replace: true})
     })
     .catch(error => {
        console.error(error)
        Swal.fire({
            position: "top-end",
            icon: "error",
            title: "Something is wrong",
            showConfirmButton: false,
            timer: 1500
          });
    })
 }
  const handleValidateCaptcha = (e) => {
      const user_captcha_value = e.target.value;
     if(validateCaptcha(user_captcha_value)){
         setDisabled(false)
     }
     else{
         setDisabled(true)
     }
  }










    // google login
    const handleGoogleSignIn = () => {

        signInWithGoogle()
        .then(result => {
            const userInfo = {
                email: result.user?.email,
                name: result.user?.displayName,
            }
            console.log(result.user);
            axiosPublic.post('/users', userInfo)
            .then(res => {
                console.log(res.data);
                navigate('/')
            })
        })

    }
  

    return (
      
        <>      
       <div className="hero min-h-screen bg-base-200">
           <div className="hero-content flex-col lg:flex-row-reverse">
               <div className="text-center md:w-1/2 lg:text-left">
                   <h1 className="text-5xl font-bold">Login now!</h1>
                   <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
               </div>
               <div className="card  md:w-1/2 max-w-sm shadow-2xl bg-base-100">
                   <form onSubmit={handleLogin} className="card-body">
                       <div className="form-control">
                           <label className="label">
                               <span className="label-text">Email</span>
                           </label>
                           <input type="email" name="email" placeholder="email" className="input input-bordered"  />
                       </div>
                       <div className="form-control">
                           <label className="label">
                               <span className="label-text">Password</span>
                           </label>
                           <input type="password" name="password" placeholder="password" className="input input-bordered"  />
                         
                       </div>
                       <div className="form-control">
                           <label className="label">
                           <LoadCanvasTemplate />
                           </label>
                           <input type="text" onBlur={handleValidateCaptcha}  name="capcha" placeholder="type the text capcha above" className="input input-bordered"  />
                         
                         
                       </div>
                       <div className="form-control mt-6">
                            {/* pore disable add koris: disabled = false */}
                           <input disabled={disabled} type="submit" value="Login" className="btn btn-primary" />
                       </div>
                   </form>
                   {/* <p className='px-6'><small>New Here? <Link to='/signup'>Create an account</Link></small></p> */}
                   <p className="text-center my-4"> Do not have an accout? please <Link className="text-blue-600 font-bold underline" to='/register'>Register</Link></p>
                   <div className="divider">OR</div>
                   <div className="flex gap-2 justify-center mb-6">
             <p><button onClick={handleGoogleSignIn} className="btn btn-active btn-ghost">Google</button></p>
             </div>
               </div>
           </div>
          
       </div>
       </>
    );
};

export default Login;