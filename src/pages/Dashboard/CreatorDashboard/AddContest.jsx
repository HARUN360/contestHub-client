import { useForm } from "react-hook-form";
import useAxiosPublic from './../../../hukse/useAxiosPublic';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
import { MdAddTask } from "react-icons/md";
import useAuth from './../../../hukse/useAuth';
import { useState } from "react";

const AddContest = () => {
    const {user} = useAuth();
    const [selectedDate, setselectedDate] = useState(null);
    const { register, handleSubmit, reset } = useForm();
    const axiosPublic = useAxiosPublic();
    
    

    const onSubmit = async (data) => {
        // console.log(data);

        const imageFile = { image: data.image[0] }
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });
        if (res.data.success) {
            // now send the contest item data on the server with image
            const date = selectedDate.toLocaleDateString('en-GB');
            const contestItem = {
                name: data.name,
                contestType: data.contestType,
                price: parseFloat(data.price),
                priceMoney: parseFloat(data.pricemoney),
                description: data.description,
                date: date,
                taskInstruction: data.instruction,
                image: res.data.data.display_url,
                email: user.email,
               
            }
            console.log('contest item added data', contestItem);
            const menuRes = await axiosPublic.post('/creator', contestItem);
            // console.log(menuRes.data);
            if (menuRes.data.insertedId) {
                // show seccess popup
                reset();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${data.name} is added to the contest`,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }
        console.log('with image url', res.data);
       


    }


   



    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>


                
                
                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Name */}
                   
                    <label className="form-control lg:w-full my-6">
                        <div className="label">
                            <span className="label-text">Contest Name</span>

                        </div>
                    <input {...register("name", { required: true })} type="text" placeholder="Contest Name" className="input input-bordered w-full" />
                       

                    </label>
                    
                    {/* contest type */}
                    <div className="form-control lg:w-full my-6">
                        <label className="">
                            <div className="label">
                                <span className="label-text">Contest Type</span>

                            </div>
                            <select defaultValue="default" {...register("contestType", { required: true })} className="select select-bordered w-full">
                                <option disabled value='default'>Selected a Contest?</option>
                                <option value="Image Design">Image Design</option>
                                <option value="Article Writing">Article Writing</option>
                                <option value="Marketing Strategy">Marketing Strategy</option>
                                <option value="Digital advertisement">Digital advertisement</option>
                                <option value="Gaming Review">Gaming Review</option>
                                <option value="Book Review">Book Review</option>
                                <option value="Business Idea">Business Idea</option>
                                <option value="Movie Review">Movie Review</option>

                            </select>

                        </label>
                    </div>
                </div>
                <div className="flex flex-col lg:flex-row gap-6">
                     {/* price */}
                     <label className="form-control lg:w-full my-6">
                        <div className="label">
                            <span className="label-text">Price*</span>

                        </div>
                        <input {...register("price", { required: true })} type="number" placeholder="contest price" className="input input-bordered w-full" />

                    </label>
                    {/* price money */}
                    <label className="form-control lg:w-full my-6">
                        <div className="label">
                            <span className="label-text">Prize money*</span>

                        </div>
                        <input {...register("pricemoney", { required: true })} type="number" placeholder="Contest Winner  Prize money" className="input input-bordered w-full" />

                    </label>
                </div>
                <div className="flex flex-col lg:flex-row gap-6">
                    {/* description */}
                   
                    <label className="form-control lg:w-full my-6">
                        <div className="label">
                            <span className="label-text">Contest Description*</span>

                        </div>
                        <input {...register("description", { required: true })} type="text" placeholder="Contest Some Description" className="input input-bordered w-full" />

                    </label>
                    {/* Contest Date */}
                    <label className="form-control lg:w-full my-6">
                        <div className="label">
                            <span className="label-text">Contest Date*</span>

                        </div>
                        <DatePicker  className="border-2"  selected={selectedDate} onChange={(date) => setselectedDate(date)} 
                        dateFormat="yyyy-MM-dd"  required  
                        />
                    </label>
                </div>

            
                {/* recipe details */}
                <label className="form-control">
                    <div className="label">
                        <span className="label-text">User Task Submission instruction</span>

                    </div>
                    <textarea {...register("instruction", { required: true })} className="textarea textarea-bordered h-24" placeholder="Bio"></textarea>

                </label>


                {/* submit file */}
                <div className="form-control w-full my-6">
                    <input {...register("image", { required: true })} type="file" className="file-input w-full max-w-xs" />
                </div>













                {/* <input type="submit" /> */}
                <button className="btn">
                <MdAddTask />  Add Contest 
                </button>
            </form>
        </div>
    );
};

export default AddContest;