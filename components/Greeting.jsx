import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useSelector,useDispatch } from 'react-redux';
import SkeletonLoader from './Utils/Skeleton';
import {fetchGreetingData } from "../redux/slices/dashboardSlice";

const Greeting = () => {
  const dispatch = useDispatch();
  const [greetingMessage, setGreetingMessage] = useState('');
  const userData = useSelector((state)=>state.userData.data);

  const greetData = useSelector((state) => state.dashboardSlice.greeting);
  useEffect(() => {
    if(!greetData.data){
      dispatch(fetchGreetingData());
    }
    checkTimeForGreeting();
    setInterval(() => {
        checkTimeForGreeting();
      }, 10000); 
  }, [greetData]);

  const checkTimeForGreeting = () => {
    const today = new Date();
    const hours = today.getHours();
    if (hours >= 12 && hours < 16) {
      setGreetingMessage('Good Afternoon');
    } 
    else if(hours >= 6 && hours < 12){
        setGreetingMessage('Good Morning');
    } else {
        setGreetingMessage('Good Evening');
    }
  };

  if (greetData.isLoading) {
    return (
      <div className='mod-shadow-card'>
         <SkeletonLoader type="card" />
      </div>
     
    );
  }
  return (
    <>
      <div className='mod-shadow-card'>
      <h2 className="title capitalize">Hello {greetData.data && `${userData?.fullname &&userData?.fullname}`}!! {greetingMessage}</h2>
        <div className='content-box'>
          <span className='quote'>
            {greetData.data?.author && `${greetData.data?.quote} - ${greetData.data?.author}`}
          </span>
          <span className='quote'>
            {greetData.error && "Life is 10% what happens to us and 90% how we react to it. - Charles R. Swindoll"}
          </span>
          <div className='img-box'>
            <Image src={'/rocket.svg'} width={150} height={150} alt='' />
          </div>
        </div>
      </div>
    </>
  );
};

export default Greeting;
