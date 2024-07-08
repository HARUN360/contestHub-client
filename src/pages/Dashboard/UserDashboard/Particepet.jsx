

const Particepet = ({item}) => {
    const {_id,name,image,price,contestimage,priceMoney,description,contestdate,contestName,contestType,transactionId,date,contestId,task,paymentstatus
     } = item;
    return (
        <div>
        <div className="card  bg-base-100 shadow-xl ">
            <figure><img src={contestimage} className="" alt="Contest" /></figure>
            <div className="p-4 mt-6">
                <h2 className="card-title text-2xl font-bold">{contestName}</h2>
                <p className="text-xl font-semibold flex items-center gap-4"> <span>price: {price}$</span> <span>priceMoney: {priceMoney}$</span> </p>
                <p className="text-xl font-semibold">Participate Last Date:{contestdate}</p>
                 <p>Payment Status:{paymentstatus}</p>                
            </div>
        </div>
    </div>
    );
};

export default Particepet;