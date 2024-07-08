import logo from '../../src/assets/contesNav.jpg'
import { useContext, useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import { CiLogout } from "react-icons/ci";



const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    // console.log(user);
    const navigate = useNavigate();
    const handleSignOut = () => {
        logOut()
            .then(
                navigate(location?.state ? location.state : '/')
            )
            .catch()
    }


     // themecontroler start
  const [theme, setTheme] = useState(
    localStorage.getItem('theme') ? localStorage.getItem('theme') : 'light'
)

// update state on toggle
const handleToggle = e => {
    if (e.target.checked) {
        setTheme('synthwave')
    } else {
        setTheme('light')
    }
}

// set theme state in localStorage on mount & also update localStorage on state change
useEffect(() => {
    localStorage.setItem('theme', theme)
    const localTheme = localStorage.getItem('theme')

    document.querySelector('html').setAttribute('data-theme', localTheme)
}, [theme])
  // themecontroler end

    const navlinks = <>
        <li><NavLink to='/'>Home</NavLink></li>
        <li><NavLink to='/allcontest'>All Contest</NavLink></li>
        <li><NavLink to='/blog'>Blog</NavLink></li>
        <li><NavLink to='/about'>About Us</NavLink></li>
        
    </>
    return (
        <div>
            {/* extra navbar */}
            <div className="navbar bg-base-100">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            {navlinks}
                        </ul>
                    </div>
                    <a className="btn btn-ghost text-xl md:text-4xl flex justify-center items-center gap-2"> <img src={logo} className='w-[50px] rounded-lg' alt="logo" /> <span>WinWave</span></a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {navlinks}
                    </ul>
                </div>
                <div className="navbar-end">
                    <div className="flex items-center">

                        <div>
                            {
                                user ?
                                    <div className="dropdown dropdown-end mr-2">

                                        <div className="w-10">
                                            <div className="dropdown">
                                                <div tabIndex={0} role="button" className=" m-1"><img src={user?.photoURL || "https://i.ibb.co/fd53zKP/pofile.jpg"} className="rounded-full" /></div>
                                                <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 bg-primary text-white rounded-box w-52 text-[17px]">
                                                    <li><a>{user?.displayName}</a></li>
                                                    <Link to='/dashboard' className=" text-start ml-4"><a>Dashboard</a></Link>
                                                    <li><button className="text-red-600  font-bold" onClick={handleSignOut}>  Sign Out <CiLogout /> </button></li>
                                                </ul>
                                            </div>

                                        </div>
                                    </div>
                                    : " "
                            }
                        </div>
                        <div>
                            {
                                !user  && <button><NavLink to='/login' className="btn">Login</NavLink></button>
                            }
                        </div>
                    </div>
                     {/* light */}
          <div className=" ml-4">
            <label className="swap swap-rotate">

              {/* this hidden checkbox controls the state */}
              <input type="checkbox"  onChange={handleToggle}
                            checked={theme === 'light' ? false : true} className="theme-controller" value="synthwave" />

              {/* sun icon */}
              <svg className="swap-off fill-current w-10 h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" /></svg>

              {/* moon icon */}
              <svg className="swap-on fill-current w-10 h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" /></svg>

            </label>
          </div>

                </div>

            </div>
        </div>
    );
};

export default Navbar;