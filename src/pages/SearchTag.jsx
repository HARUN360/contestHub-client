
const SearchTag = ({item}) => {
  const {contestName,image,participationCount,contestShortDescription, tags } = item;

  return (
    <div>
    <div className="card  bg-base-100 shadow-xl lg:h-[500px]">
        <figure><img src={image} className="w-[300px]" alt="Contest" /></figure>
        <div className="card-body">
            <h2 className="card-title text-4xl font-bold">{contestName}</h2>
            <p className="text-2xl font-semibold"> participationCount :{participationCount}</p>
            <p>{contestShortDescription}</p>
          
            <div className="card-actions justify-center">
                <button className="btn btn-primary">Details</button>
            </div>
        </div>
    </div>
</div>
  );
};

export default SearchTag;