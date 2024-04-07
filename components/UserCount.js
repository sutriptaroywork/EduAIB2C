import React, { useState, useEffect } from "react";
// coded by yaseen 
const UserCount = () => {


  //content array
  const counterData = [
    { title: "Students", targetValue: 12000 },
    { title: "Schools", targetValue: 33 },
    { title: "Teachers", targetValue: 240 }
  ];

  const Counter = ({ title, targetValue }) => {
    const [counterValue, setCounterValue] = useState(0);

    useEffect(() => {
      let interval;

      if (counterValue < targetValue) {
        interval = setInterval(() => {
          setCounterValue(prevValue => {
            const newValue = prevValue + Math.ceil(targetValue / 200); // Adjust for smoother increment
            return newValue <= targetValue ? newValue : targetValue;
          });
        }, 10); // Adjust the interval to control the speed of increment
      }

      return () => clearInterval(interval); // Clean up on component unmount
    }, [counterValue, targetValue]);

    return (
      <div className="col-lg-4 col-md-4 col-4">
        <h2 className="counter-num">{counterValue.toLocaleString() +"+"}</h2>
        <p className="title">{title}</p>
      </div>
    );
  };

  return (
    <section className="lyt-section typ-counter">
      <div className="container">
        <div className="row">
          {counterData.map(({ title, targetValue }, index) => (
            <Counter key={index} title={title} targetValue={targetValue} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default UserCount;
