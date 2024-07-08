import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useCreator = () => {
    const {user, loading} = useAuth();
    const axiosSecure = useAxiosSecure();
 const {data: isCreator, isPending: isisCreatorLoadin} = useQuery({
    queryKey: [user?.email, 'isCreator'],
    enabled: !loading,
    queryFn: async() => {
         //  console.log('askign or cheking is creator', user);
          const res = await axiosSecure.get(`/users/creator/${user.email}`);
          console.log(res.data);
          return res.data?.creator;
    }
 })
 return [isCreator, isisCreatorLoadin]
};

export default useCreator;