
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from './../../../hukse/useAxiosPublic';
import useAuth from './../../../hukse/useAuth';
import { FaExpeditedssl, FaTrashAlt } from 'react-icons/fa';
import { CiEdit } from 'react-icons/ci';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import { MdHourglassDisabled } from 'react-icons/md';
const MyCreatedContest = () => {

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


    const handleDelete = (item) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosPublic.delete(`/creator/${item._id}`);
                console.log(res.data);
                if (res.data.deletedCount > 0) {
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




    return (
        <div>
            <h2 className='text-4xl text-center font-semibold my-3'>My Creat Contest Data: {creatorone?.length}</h2>
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
                                <th>Status</th>
                                <th>Edite</th>
                                <th>Delete</th>
                                <th>submitPage</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                creatorone?.map((item, idx) =>
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
                                            {item.status === 'confirm' ? "accepted" : "pending"}
                                        </td>
                                        <td>


                                            {item.status === 'confirm' ? <FaExpeditedssl /> : <Link to={`/dashboard/update/${item._id}`}> <button className="btn bg-orange-500 btn-lg"><CiEdit className="text-white text-2xl"></CiEdit></button></Link>}

                                        </td>
                                        <td>
                                            {item.status === 'confirm' ? <MdHourglassDisabled ></MdHourglassDisabled> : <button onClick={() => handleDelete(item)} className="btn btn-ghost btn-lg"><FaTrashAlt className="text-red-600"></FaTrashAlt></button>}
                                        </td>
                                        <td>
                                            <Link to='/dashboard/submitepage'><button className='btn'>Page</button></Link>
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

export default MyCreatedContest;