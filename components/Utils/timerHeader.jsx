import { useState, useEffect } from 'react';

const TimerHeader = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(intervalId);
  }, []);

  const formattedTime = currentTime.toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });

  const day = currentTime.getDate();
  const monthAbbreviation = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(currentTime);
  const year = currentTime.getFullYear();
  const formattedDate = `${day}-${monthAbbreviation}-${year}`;

  return (
    <div>
      <span className="mod-txt-date min-w-[160px] !text-[#51556b]">{formattedTime} {formattedDate}</span>
    </div>
  );
};

export default TimerHeader;
