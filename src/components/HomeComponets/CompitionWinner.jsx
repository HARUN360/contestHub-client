import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hukse/useAxiosPublic";
import CompitionWinnerSingle from "./CompitionWinnerSingle";

const CompitionWinner = () => {
  const axiosPublic = useAxiosPublic();
     
    const { data: paymentUser = [] } = useQuery({
        queryKey: ['payments'],
        queryFn: async () => {
          const res = await axiosPublic.get(`/payments`);
          return res.data;
        }
      })
      console.log(paymentUser);
      const winnerman = paymentUser.filter(item => item.status === 'winner');
      console.log('winner name', winnerman);
    return (
        <div className="my-10">
           <h1 className="text-4xl font-semibold text-center my-4">Competition! Win big!</h1>
           <div className="min-h-screen bg-gray-400 py-10 rounded-lg">
             <div className="flex items-center justify-around flex-col lg:flex-row">
             {
                winnerman.slice(0,3).map(item => <CompitionWinnerSingle key={item._id} item={item}></CompitionWinnerSingle>)
             }
             </div>
             <p className="text-xl mx-6">Unleash your creativity and showcase your talents in our exciting contest! This is your chance to win amazing prizes, gain recognition, and connect with a community of passionate individuals. Don not miss out on this incredible opportunity to let your skills shine. Participate now and make your mark!</p>
             <div className="text-center mt-6"> <h3 className="text-xl font-bold">Showcase your skills and win fantastic prizes!</h3></div>
             <div className="flex items-center justify-center gap-10 mt-4">
                <div className="w-32 rounded-full">
                <img src="https://i.ibb.co/hHTW8GR/goldmaney.jpg" alt="" className="rounded-full" />
                </div>
                <div className="w-32 rounded-full">
                <img src="https://i.ibb.co/YhHc1MM/jularis.jpg" alt="" className="rounded-full" />
                </div>
                <div className="w-32 rounded-full">
                <img src="https://i.ibb.co/HrsPMr2/maney.jpg" alt="" className="rounded-full" />
                </div>
             </div>
           
           </div>
        </div>
    );
};

export default CompitionWinner;