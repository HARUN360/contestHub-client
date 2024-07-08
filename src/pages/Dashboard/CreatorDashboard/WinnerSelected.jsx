import {  useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import useAxiosPublic from "../../../hukse/useAxiosPublic";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";

const WinnerSelected = () => {
    
    const [disable, setDisable] = useState(false);
    const axiosPublic = useAxiosPublic();
    const {_id} = useLoaderData();

    

      const {data: contest = [], isPending: loading, refetch} = useQuery({
        queryKey: ['payments'],
        queryFn: async () => {
            const res =  await axiosPublic.get(`/payments/${_id}`);
            return res.data
        }
    })



      const handleWinner = (user) => {
        axiosPublic.patch(`/pay/winner/${user._id}`)
        .then(res => {
            console.log(res.data);
            if(res.data.modifiedCount > 0){
                refetch()
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${user.name} is an winner Now`,
                    showConfirmButton: false,
                    timer: 1500
                  });
            }
        })
    }

    useEffect(() => {
    
          if(disable){
              window.location.reload();
          }
        
      }, []);

    // window.location.reload()
    
    return (
        <div>
            <h1 className="text-4xl text-black font-semibold text-center">Plese Winner Selected</h1>
             <p className="text-2xl text-black font-semibold text-center">Particepert: {contest?.length}</p>
            <div className="overflow-x-auto">
                    <table className="table w-full">
                        {/* head */}
                        <thead className="text-xl text-black font-semibold">
                            <tr>
                                <th>
                                    #
                                </th>
                             
                                <th>participant name</th>
                                <th>Email</th>
                                <th>Task</th>
                                <th>Declare</th>
                              
                            </tr>
                            {/* (participant name, email, and submitted task( use drive or any link  */}
                        </thead>
                        <tbody>
                            {
                                contest?.map((item, idx) =>
                                    
                                    <tr key={item._id}>
                                        <td>
                                            {idx + 1}
                                        </td>
                                      
                                        <td>{item.name}</td>
                                        <td>
                                           {item.email}
                                        </td>
                                        <td><a href={`${item.task}`} >task link</a></td>
                                        {/* <td>Winner</td> */}
                                     {
                                        !disable ? <>    <td>
                                        { item.status === 'winner' ? setDisable(true) : <button onClick={() => handleWinner(item)} className="btn bg-orange-100 btn-sm">Winner</button>} 
                                      </td> </> : 
                                      <>
                                       {item.status === 'winner' ? 'winner' : 'unsuccess' }
                                      </>
                                     }
                                      
                                    </tr>
                                )
                            }


                        </tbody>


                    </table>
                </div>
        </div>
    );
};

export default WinnerSelected;