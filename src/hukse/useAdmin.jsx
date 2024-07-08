import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useAdmin = () => {
    const {user, loading} = useAuth();
    const axiosSecure = useAxiosSecure();
 const {data: isAdmin, isPending: isAdminLoadin} = useQuery({
    queryKey: [user?.email, 'isAdmin'],
    enabled: !loading,
    queryFn: async() => {
         //  console.log('askign or cheking is admin', user);
          const res = await axiosSecure.get(`/users/admin/${user.email}`);
          console.log(res.data);
          return res.data?.admin;
    }
 })
 return [isAdmin, isAdminLoadin]
};
   

export default useAdmin;