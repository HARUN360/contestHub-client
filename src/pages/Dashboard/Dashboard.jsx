import { FaCommentAlt } from "react-icons/fa";
import { FaFileContract, FaManatSign, FaPhotoFilm, FaWind } from "react-icons/fa6";
import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../../hukse/useAdmin";
import useCreator from "../../hukse/useCreator";
import useBlock from "../../hukse/useBlock";




const Dashboard = () => {
    const [isAdmin] = useAdmin();
    const [isCreator] = useCreator();
    const [isBlock] = useBlock();
    return (
        <div className='flex'>
            <div className="w-36 lg:w-64 min-h-screen bg-green-300">
                <ul className='menu'>
                   {
                    isAdmin && 
                    <>
                     <li>
                        <NavLink to='/dashboard/manageuser'> <FaManatSign></FaManatSign> Manage User </NavLink>
                    </li>
                    <li>
                        <NavLink to='/dashboard/managcontest'> <FaCommentAlt></FaCommentAlt> Manage Contests </NavLink>
                    </li>
                 
                    
                    </> 
                    }{
                        isCreator &&
                    <>
                      <li>
                        <NavLink to='/dashboard/addcontest'> <FaManatSign></FaManatSign> Add Contest </NavLink>
                    </li>
                    <li>
                        <NavLink to='/dashboard/createcontest'> <FaCommentAlt></FaCommentAlt> My Create Contest </NavLink>
                    </li>
                    <li>
                        <NavLink to='/dashboard/submitepage'> <FaCommentAlt></FaCommentAlt> Submited Page </NavLink>
                    </li>
                    </>
                    }
                    {
                        isBlock &&
                    <>
                      <li className="text-red-600 font-bold">
                        Your are Block!
                      </li>
                   
                    </>
                    }
                     
                    { !isAdmin && !isCreator && !isBlock && <> <li>
                        <NavLink to='/dashboard/participated'> <FaFileContract></FaFileContract> My Participated Contest </NavLink>
                    </li>
                    <li>
                        <NavLink to='/dashboard/winning'> <FaWind></FaWind> My Winning ContestPage </NavLink>
                    </li>
                 
                    <li>
                        <NavLink to='/dashboard/profile'> <FaPhotoFilm></FaPhotoFilm>  My Profile </NavLink>
                    </li> </>
                    }
    
                    
                   
                   
              
                </ul>
            </div>
            <div className='flex-1 p-8'>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;