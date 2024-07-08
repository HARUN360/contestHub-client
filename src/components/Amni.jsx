// import { differenceInSeconds } from 'date-fns';


// import { useEffect, useState } from 'react';

// const Amni = () => {
//     const targetDate = new Date('2024/06/20T00:00:00'); // Set the end date to June 20, 2024
//     const [endDate, setEndDate] = useState(targetDate);
//     const [remainingTime, setRemainingTime] = useState({});
//     const [isFinished, setIsFinished] = useState(false);
    
//     useEffect(() => {
//       const updateRemainingTime = () => {
//         const now = new Date();
//         const totalSecondsLeft = differenceInSeconds(endDate, now);
//         setEndDate('2024/07/20')
//         if (totalSecondsLeft <= 0) {
//           setRemainingTime({
//             days: 0,
//             hours: 0,
//             minutes: 0,
//             seconds: 0,
//           });
//           setIsFinished(true);
//           clearInterval(interval);
//         } else {
//           const days = Math.floor(totalSecondsLeft / (24 * 60 * 60));
//           const hours = Math.floor((totalSecondsLeft % (24 * 60 * 60)) / (60 * 60));
//           const minutes = Math.floor((totalSecondsLeft % (60 * 60)) / 60);
//           const seconds = totalSecondsLeft % 60;
//           setRemainingTime({ days, hours, minutes, seconds });
//         }
//       };
  
//       const interval = setInterval(updateRemainingTime, 1000);
  
//       return () => clearInterval(interval); // Cleanup on unmount
//     }, [endDate]);
  
//     return (
//         <div>
//             this is amni
//             <header className="App-header">
//         <h1>Countdown Timer</h1>
//         {!isFinished ? (
//           <p>
//             {remainingTime.days} days {remainingTime.hours} hours {remainingTime.minutes} minutes {remainingTime.seconds} seconds
//           </p>
//         ) : (
//           <p>Time is up!</p>
//         )}
//       </header>
//         </div>
//     );
// };


// export default Amni;