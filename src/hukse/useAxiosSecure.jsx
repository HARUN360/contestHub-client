import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

const axiosSecure = axios.create({
    baseURL: 'https://assignment12-server-site-nu.vercel.app'
})

const useAxiosSecure = () => {

    const navigate = useNavigate();
    const { logOut } = useContext(AuthContext);
    // main function
    axiosSecure.interceptors.request.use(function(config){
        const token = localStorage.getItem('access-token')
        // console.log('request stop  by interceptors before adding token', token);
        config.headers.authorization = `Bearer ${token}`;
        return config;
    }, function(error) {
        return Promise.reject(error);
    });

    // intercepts 401 and 403 status
    axiosSecure.interceptors.response.use(function(response){
        return response;
    }, async (error) => {
        const status = error.response.status;
        console.log('status error in the interceptors', status);
        // for 401 or 403 logout the user and move the user to the login page
        if(status === 401 || status === 403){
            await logOut();
            navigate('/login')
        }
        return Promise.reject(error)
    })

    return axiosSecure;
};

export default useAxiosSecure;