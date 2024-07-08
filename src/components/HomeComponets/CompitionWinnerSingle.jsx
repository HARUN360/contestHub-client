
const CompitionWinnerSingle = ({ item }) => {
    return (
        <div className="py-6">
            <div className="flex flex-col justify-center items-center">
            <h3 className="text-3xl font-semibold">{item.status}</h3>
            <div className="w-32 rounded-full">
                <img src={item?.image} className='rounded-full' />
            </div>
            <p className="text-xl font-bold">{item.name}</p>
            <p className="flex gap-2 items-center text-xl font-bold"><small>Price:{item.price}$ </small><small>PriceMoney:{item?.priceMoney}$</small></p>
            </div>
        </div>
    );
};

export default CompitionWinnerSingle;