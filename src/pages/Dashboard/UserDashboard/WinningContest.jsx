import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hukse/useAxiosPublic";
import useAuth from './../../../hukse/useAuth';
import Particepet from "./Particepet";

const WinningContest = () => {
    const {user} = useAuth();
    const axiosPublic = useAxiosPublic();
    const { data: paymentUser = [] } = useQuery({
        queryKey: ['pay'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/pay/${user.email}`);
            return res.data;
        }
    })
    // console.log(paymentUser);
    const winnerpage = paymentUser.filter(item => item.status === 'winner');
    return (
        <div>
        <h1 className="text-4xl text-center mb-6 font-semibold"> My Winnign Contest</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
             {   
                 
                 winnerpage?.map(item => <Particepet key={item._id} item={item}></Particepet>)
             }
         </div>
     </div>
    );
};

export default WinningContest;