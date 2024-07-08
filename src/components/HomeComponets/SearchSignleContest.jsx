
const SearchSignleContest = ({item}) => {
    // const {contestName,image,participationCount,contestShortDescription, tags } = item;
    const {_id,name,image,contestType,price, priceMoney,description,date,taskInstruction } = item;
 
    return (
        <div>
            <div className="card  bg-base-100 shadow-xl lg:h-[400px]">
                <figure><img src={image} className="w-[200px]" alt="Contest" /></figure>
                <div className="card-body">
                    <h2 className="card-title text-2xl font-bold">{name}</h2>
                     <h2>
                        <span className="text-xl font-bold text-black">contests tags:{contestType}</span>
                      
                     </h2>
                    <p className="text-xl font-semibold"> participationCount 1</p>
                    <p>{description}</p>
                  
                    <div className="card-actions justify-center">
                        <button className="btn btn-primary">Details</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchSignleContest;