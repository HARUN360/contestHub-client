import { useEffect, useState } from "react";
import useAxiosPublic from "../../hukse/useAxiosPublic";
import SearchSignleContest from "./SearchSignleContest";


const SearchContest = ({search}) => {

    


    const [service, setService] = useState([]);
    const serviceConfirm = service.filter(item => item.status === 'confirm')
     console.log('all baner data', serviceConfirm);
    const axiosPublic = useAxiosPublic();
     useEffect( () => {
       axiosPublic(`/creatsearch?search=${search}`)
    //    axiosPublic(`/creatorpublished?status=confirm?search=${search}`)
          
        .then(res => setService(res.data))
    },[axiosPublic, search])

  

    return (
        <div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {
                    serviceConfirm?.map(item => <SearchSignleContest key={item._id} item={item}></SearchSignleContest>)
                }
            </div>
        </div>
    );
};

export default SearchContest;