import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useBlock = () => {
    const {user, loading} = useAuth();
    const axiosSecure = useAxiosSecure();
 const {data: isBlock, isPending: isBlockLoadin} = useQuery({
    queryKey: [user?.email, 'isBlock'],
    enabled: !loading,
    queryFn: async() => {
         //  console.log('askign or cheking is block', user);
          const res = await axiosSecure.get(`/users/block/${user.email}`);
          console.log(res.data);
          return res.data?.block;
    }
 })
 return [isBlock, isBlockLoadin]
};

export default useBlock;