import ContestSingle from "../components/HomeComponets/ContestSingle";
import useContest from "../hukse/useContest";


const AllContest = () => {
    const [contest, loading, refetch] = useContest();
    return (
        <div>
            <h1 className="text-5xl text-center font-semibold my-6">ALL Contest here</h1>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {
                    contest?.map(item => <ContestSingle key={item._id} item={item}></ContestSingle>)
                }
            </div>
        </div>
    );
};

export default AllContest;