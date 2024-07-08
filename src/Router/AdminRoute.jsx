import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import useAdmin from "../hukse/useAdmin";
import { Navigate, useLocation } from "react-router-dom";



const AdminRoute = ({children}) => {
    const {user, loading} = useContext(AuthContext);
    const [isAdmin, isAdminLoadin] = useAdmin();
    const location = useLocation();
    if(loading || isAdminLoadin){
        return <progress className="progress w-56"></progress>
    }
    if(user && isAdmin){
        return children
    }
    return <Navigate to='/' state={{from: location}} replace></Navigate>
};

export default AdminRoute;