import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import useCreator from "../hukse/useCreator";

const CreatorRoute = ({children}) => {
    const {user, loading} = useContext(AuthContext);
    const [isCreator, isisCreatorLoadin] = useCreator();
    const location = useLocation();
    if(loading || isisCreatorLoadin){
        return <progress className="progress w-56"></progress>
    }
    if(user && isCreator){
        return children
    }
    return <Navigate to='/' state={{from: location}} replace></Navigate>
};

export default CreatorRoute;