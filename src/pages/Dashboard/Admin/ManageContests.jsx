import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hukse/useAxiosPublic";
import {  FaCommentDots, FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import { GiConfirmed } from "react-icons/gi";

const ManageContests = () => {
    const axiosPublic = useAxiosPublic();

    const {data: creator = [], isPending: loading, refetch} = useQuery({
        queryKey: ['creator'],
        queryFn: async () => {
            const res =  await axiosPublic.get('/creator');
            return res.data
        }
    })
    console.log(creator);
    const handleDelete =  (item) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then( async (result) => {
            if (result.isConfirmed) {
                const res = await axiosPublic.delete(`/creator/${item._id}`);
                console.log(res.data);
                if(res.data.deletedCount > 0){
                    // refetch to update the ui
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${item.name} has been deleted`,
                        showConfirmButton: false,
                        timer: 1500
                      });
                }
            

            }
          });
     }


    const handleConfirm =  (item) => {
        axiosPublic.patch(`/creator/${item._id}`)
        .then(async (res) => {
            console.log(res.data);
            if(res.data.modifiedCount > 0){
                refetch()
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${item.name} is an admin Now`,
                    showConfirmButton: false,
                    timer: 1500
                  });
            
            }
        })
    }
    
    return (
        <div>
           <h1>this is manga contest</h1>
           <div>
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>
                                   #
                                </th>
                                <th>Image</th>
                                <th>Item Name</th>
                                <th>Comment</th>
                                <th>Confirm</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                creator.map((item,idx) => 
                                    <tr key={item._id}>
                                    <td>
                                     {idx + 1}
                                    </td>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src={item.image} alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>
                                         
                                        </div>
                                    </td>
                                    <td>
                                     {item.name}
                                    </td>
                                    <td>
                                        {/* modal */}
                          <div className="card-actions  justify-center">
                        {/* You can open the modal using document.getElementById('ID').showModal() method */}
                        <button className="btn bg-orange-500 btn-sm" onClick={() => document.getElementById('my_modal_3').showModal()}> <FaCommentDots className="text-white text-2xl"></FaCommentDots></button>
                        <dialog id="my_modal_3" className="modal ">
                            <div className="modal-box w-xl">
                                <form  method="dialog">
                                    <div className="md:flex gap-3 my-6">
                                        <div className="form-control w-full">
                                            <label className="label">
                                                <span className="text-black text-2xl"> Write Your Comments</span>
                                            </label>
                                            <label className="input-gruop">
                                                <input type="text" name="commetns"  placeholder="Your Coments" className="input input-bordered w-full" />
                                            </label>
                                        </div>
                                   
                                    </div>
                                 
                                  
                                    <button  className="btn btn-accent">Sebmit</button>
                                    <button type="button" onClick={ () => document.getElementById('my_modal_3').close()}  className="btn btn-accent ml-6">Close</button>
                                   
                                </form>

                            </div>
                        </dialog>
                          </div>
                                    </td>
                                    <td>
                                       
                                        {/* <button className="btn bg-orange-500 btn-sm"><FaEdit className="text-white text-2xl"></FaEdit></button> */}
                                       
                                        { item.status === 'confirm' ? "confirm" : <button onClick={() => handleConfirm(item)} className="btn bg-orange-500 btn-lg"><GiConfirmed className="text-white text-2xl"></GiConfirmed></button>}

                                    </td>
                                    <td>
                                    <button onClick={() => handleDelete(item)} className="btn btn-ghost btn-lg"><FaTrashAlt className="text-red-600"></FaTrashAlt></button>
                                    </td>
                                </tr>
                                )
                            }
                          
                        
                        </tbody>
                      

                    </table>


                     


                </div>
            </div>
        </div>
    );
};

export default ManageContests;