import ContestSingle from "./ContestSingle";
import useContest from "../../hukse/useContest";


const PopularContest = () => {
    const [contest] = useContest();


  
    return (
        <div>
            <h3 className="text-6xl font-semibold text-black text-center my-6">Popular Contest </h3>
               
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {   
                    
                    contest?.slice(0, 6).map(item => <ContestSingle key={item._id} item={item}></ContestSingle>)
                }
            </div>
        </div>
    );
};

export default PopularContest;