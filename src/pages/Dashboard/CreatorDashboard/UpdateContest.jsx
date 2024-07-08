import { useLoaderData } from "react-router-dom";
import DatePicker from "react-datepicker";
const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
import useAxiosPublic from "../../../hukse/useAxiosPublic";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { useState } from "react";


const UpdateContest = () => {
    const {name,contestType, price, priceMoney, description, date, taskInstruction, _id  } = useLoaderData();
    const [selectedDate, setselectedDate] = useState(date);
    const { register, handleSubmit, reset } = useForm();
    const axiosPublic = useAxiosPublic();
  

    const onSubmit = async(data) => {
        console.log(data);
        
        const imageFile = {image: data.image[0]}
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });
        if(res.data.success){
            // now send the menu item data on the server with image
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

               
                
            }
            console.log('menu item added data',contestItem);
            const menuRes = await axiosPublic.patch(`/creatorup/${_id}`, contestItem);
            console.log(menuRes.data);
            if(menuRes.data.modifiedCount > 0){
                // show seccess popup
                // reset();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${data.name} is updated to the contest`,
                    showConfirmButton: false,
                    timer: 1500
                  });
            }
        }
        console.log('with image url',res.data);
        // data post
        // image upload to imgbb and then get an url


    }




    return (
        <div>
            <h1>this is update part {name} </h1>
            <div>
            <form onSubmit={handleSubmit(onSubmit)}>


                
                
                <div className="flex gap-6">
                    {/* Name */}
                   
                    <label className="form-control w-full my-6">
                        <div className="label">
                            <span className="label-text">Contest Name</span>

                        </div>
                    <input defaultValue={name} {...register("name", { required: true })} type="text" placeholder="Contest Name" className="input input-bordered w-full" />
                       

                    </label>
                    
                    {/* contest type */}
                    <div className="form-control w-full my-6">
                        <label className="">
                            <div className="label">
                                <span className="label-text">Contest Type</span>

                            </div>
                            <select defaultValue={contestType} {...register("contestType", { required: true })} className="select select-bordered w-full">
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
                <div className="flex gap-6">
                     {/* price */}
                     <label className="form-control w-full my-6">
                        <div className="label">
                            <span className="label-text">Price*</span>

                        </div>
                        <input defaultValue={price} {...register("price", { required: true })} type="number" placeholder="contest price" className="input input-bordered w-full" />

                    </label>
                    {/* price money */}
                    <label className="form-control w-full my-6">
                        <div className="label">
                            <span className="label-text">Prize money*</span>

                        </div>
                        <input defaultValue={priceMoney} {...register("pricemoney", { required: true })} type="number" placeholder="Contest Winner  Prize money" className="input input-bordered w-full" />

                    </label>
                </div>
                <div className="flex gap-6">
                    {/* description */}
                   
                    <label className="form-control w-full my-6">
                        <div className="label">
                            <span className="label-text">Contest Description*</span>

                        </div>
                        <input defaultValue={description} {...register("description", { required: true })} type="text" placeholder="Contest Some Description" className="input input-bordered w-full" />

                    </label>
                    {/* Contest Date */}
                    <label className="form-control w-full my-6">
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
                    <textarea defaultValue={taskInstruction} {...register("instruction")} className="textarea textarea-bordered h-24" placeholder="Bio"></textarea>

                </label>


                {/* submit file */}
                <div className="form-control w-full my-6">
                    <input {...register("image", { required: true })} type="file" className="file-input w-full max-w-xs" />
                </div>













                {/* <input type="submit" /> */}
                <button className="btn">
                Updated contest
                </button>
            </form>
        </div>
        </div>
    );
};

export default UpdateContest;