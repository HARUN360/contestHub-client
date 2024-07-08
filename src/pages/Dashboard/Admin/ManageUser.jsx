
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './../../../hukse/useAxiosSecure';
import { FaTrashAlt } from 'react-icons/fa';
import { TbLockBolt } from 'react-icons/tb';
import Swal from 'sweetalert2';
import { TiTick } from 'react-icons/ti';
const ManageUser = () => {
    const axiosSecure = useAxiosSecure();
    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data
        }
    })


    const handleDeleteUSer = (user) => {

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                axiosSecure.delete(`/users/${user._id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch()
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                        }
                    })
            }
        });

    }
  
    const handleMakeAdmin = (user) => {
        axiosSecure.patch(`/users/admin/${user._id}`)
        .then(res => {
            console.log(res.data);
            if(res.data.modifiedCount > 0){
                refetch()
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${user.name} is an admin Now`,
                    showConfirmButton: false,
                    timer: 1500
                  });
            }
        })
    }
    const handleMakeCreator = (user) => {
        axiosSecure.patch(`/users/creator/${user._id}`)
        .then(res => {
            console.log(res.data);
            if(res.data.modifiedCount > 0){
                refetch()
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${user.name} is an Creator Now`,
                    showConfirmButton: false,
                    timer: 1500
                  });
            }
        })
    }
    const handleBlock = (user) => {
        axiosSecure.patch(`/users/block/${user._id}`)
        .then(res => {
            console.log(res.data);
            if(res.data.modifiedCount > 0){
                refetch()
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${user.name} is an Block Now`,
                    showConfirmButton: false,
                    timer: 1500
                  });
            }
        })
    }

    return (
        <div>
        <div className="flex justify-evenly my-4">
            <h2 className="text-3xl">All Users</h2>
            <h2 className="text-3xl">Total Users {users.length} </h2>
        </div>
        <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
                {/* head */}
                <thead>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Action</th>
                        <th>Block</th>
                    </tr>
                </thead>
                <tbody>
                    {/* row 1 */}
                    {
                        users.map((user, index) => 
                            <tr key={user._id}>
                            <th>{index + 1}</th>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            
                            <td>
                            { user.role === 'admin' ? <h5 className='text-green-600 font-bold flex items-center'> <TiTick /> <p>Admin</p></h5> : <button onClick={() => handleMakeAdmin(user)} className="btn bg-orange-100 btn-sm">Admin</button>}
                            { user.role === 'creator' ? <h5 className='text-green-600 font-bold flex items-center'> <TiTick /> <p>Creator</p></h5> : <button onClick={() => handleMakeCreator(user)} className="btn bg-orange-100 btn-sm">Creator</button>}
                            </td>
                            <td>
                            <button onClick={() => handleDeleteUSer(user)} className="btn btn-ghost btn-lg"><FaTrashAlt className="text-red-600"></FaTrashAlt></button>
                            </td>
                            <td>
                            { user.role === 'block' ? <h5 className='text-red-600 font-bold flex items-center'> <TiTick /> <p>Block</p></h5> : <button onClick={() => handleBlock(user)} className="btn bg-orange-100 btn-sm"><TbLockBolt className="text-red-600"></TbLockBolt></button>}
                               
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

export default ManageUser;