import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hukse/useAuth";
import useAxiosPublic from "../../../hukse/useAxiosPublic";
import { Link } from "react-router-dom";

const ContestSubmittedPage = () => {
    const axiosPublic = useAxiosPublic();
    const { user } = useAuth();
    const { refetch, data: creatorone = [] } = useQuery({
        queryKey: ['creatorone',],
        queryFn: async () => {
            const res = await axiosPublic.get(`/creatorone/${user.email}`);
            return res.data;
        }
    })
    console.log(creatorone);
    return (
        <div>
            <h2 className="text-4xl text-center font-semibold">Submites Page</h2>
            <div className="overflow-x-auto">
                    <table className="table w-full">
                        {/* head */}
                        <thead className="text-xl text-black font-semibold">
                            <tr>
                                <th>
                                    #
                                </th>
                             
                                <th>Prize</th>
                                <th>Contents Title</th>
                              
                            </tr>
                        </thead>
                        <tbody>
                            {
                                creatorone?.map((item, idx) =>
                                    <tr key={item._id}>
                                        <td>
                                            {idx + 1}
                                        </td>
                                      
                                        <td>{item.price} $</td>
                                        <td>
                                           <Link to={`/dashboard/winnerSeleced/${item._id}`}>  {item.contestType} </Link>
                                        </td>
                                    </tr>
                                )
                            }


                        </tbody>


                    </table>
                </div>
        </div>
    );
};

export default ContestSubmittedPage;