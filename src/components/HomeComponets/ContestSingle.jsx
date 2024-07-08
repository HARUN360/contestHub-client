import { Link } from "react-router-dom";
import useAxiosPublic from "../../hukse/useAxiosPublic";
import { useEffect, useState } from "react";

const ContestSingle = ({ item }) => {
    const [participet, setParticipet] = useState([]);
    const {_id,name,image,contestType,price, priceMoney,description,date,taskInstruction } = item;
    const axiosPublic = useAxiosPublic();
 
    // contest participet data get
  useEffect(() => {
    axiosPublic.get(`/payments/${_id}`)
    .then(res => {
      setParticipet(res.data)
    })
  },[axiosPublic])

 
    return (
        <div>
            <div className="card  bg-base-100 shadow-xl lg:h-[500px]">
                <figure><img src={image} className="w-[300px]" alt="Contest" /></figure>
                <div className="card-body">
                    <h2 className="card-title text-4xl font-bold">{name}</h2>
                    <p className="text-2xl font-semibold"> participationCount : {participet.length}

                        
                    </p>
                    <p>{description.slice(0, 80)}......</p>
                  
                    <div className="card-actions justify-center">
                        <Link to={`/details/${_id}`} className="btn btn-primary">Details</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContestSingle;