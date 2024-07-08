import { Link, useLoaderData } from "react-router-dom";
import { differenceInSeconds } from 'date-fns';
import { useEffect, useState } from 'react';
import useAxiosPublic from "../hukse/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const ContestDetais = () => {
  const [winner, setWinner] = useState(false);
  // console.log(participet);
  const axiosPublic = useAxiosPublic();
  const items = useLoaderData();
  const { _id, name, image, contestType, price, priceMoney, description, date, taskInstruction } = items;

  // contest participet data get
  // useEffect(() => {
  //   axiosPublic.get(`/payments/${_id}`)
  //   .then(res => {
  //     setParticipet(res.data)
  //   })
  // },[axiosPublic])


  //  date count start----------------------------------
  const targetDate = new Date('2025-06-20T00:00:00');
  const [endDate, setEndDate] = useState(targetDate);
  const [remainingTime, setRemainingTime] = useState({});
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const updateRemainingTime = () => {
      const now = new Date();
      const totalSecondsLeft = differenceInSeconds(endDate, now);
      setEndDate(date)
      if (totalSecondsLeft <= 0) {
        setRemainingTime({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        });
        setIsFinished(true);
        clearInterval(interval);
      } else {
        const days = Math.floor(totalSecondsLeft / (24 * 60 * 60));
        const hours = Math.floor((totalSecondsLeft % (24 * 60 * 60)) / (60 * 60));
        const minutes = Math.floor((totalSecondsLeft % (60 * 60)) / 60);
        const seconds = totalSecondsLeft % 60;
        setRemainingTime({ days, hours, minutes, seconds });
      }
    };

    const interval = setInterval(updateRemainingTime, 1000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, [endDate]);
  //  date count end----------------------------------


  const { data: paymentUser = [] } = useQuery({
    queryKey: ['payments'],
    queryFn: async () => {
      const res = await axiosPublic.get(`/payments/${_id}`);
      return res.data;
    }
  })
  console.log(paymentUser);
  const winnerman = paymentUser.filter(item => item.status === 'winner');
  console.log('winner name', winnerman);

  return (
    <div>
      <div className="hero min-h-screen bg-base-200 rounded-xl my-4">
        <div className="hero-content flex-col lg:flex-row">
          <img src={image} className="max-w-sm rounded-lg shadow-2xl" />
          <div>
            <h1 className="text-5xl font-bold">{name}</h1>
            <h3 className="text-4xl font-semibold">participation: {paymentUser?.length}</h3>
            <p className="py-2 text-xl text-black">{description}</p>
            <p className="py-2 text-xl text-black">{contestType}</p>
            {/* date count start  */}
            <header className="App-header">
              <h1 className="text-black text-2xl font-semibold">Time Left:{date}</h1>
              {!isFinished ? (
                <p>
                  {remainingTime.days} days {remainingTime.hours} hours {remainingTime.minutes} minutes {remainingTime.seconds} seconds
                </p>
              ) : (
                <p className="text-xl text-red-600 font-bold">Time is up!</p>
              )}
            </header>
            {/* date count end */}

          
             
              
              {
                winnerman?.map(item =>
                  <>
                    <div key={item._id} className="flex flex-col justify-center items-center">
                      <h3 className="text-3xl font-semibold">{item.status}</h3>
                      <div className="w-32 rounded-full">
                        <img src={item?.image} className='rounded-full' />
                      </div>
                      <p className="text-xl font-bold">{item.name}</p>
                    </div>
                  </>
                )
              }
        

           <div>
            <h1 className="text-xl text-black">If winner selected this contest. Not Request You</h1>
           <Link to={`/payment/${_id}`} className="btn btn-primary">Requist</Link>
           </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ContestDetais;