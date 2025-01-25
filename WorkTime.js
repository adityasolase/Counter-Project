import React, { useState, useEffect, useRef } from 'react';

function WorkTime() {
  const [workTime, setWorkTime] = useState(25);
  const [breakTime, setBreakTime] = useState(5);
  const [timerState, setTimerState] = useState('stopped'); 
  const [currentTime, setCurrentTime] = useState(workTime * 60);
  const timerRef = useRef(null);

  useEffect(() => {
    if (timerState === 'working' || timerState === 'breaking') {
      timerRef.current = setInterval(() => {
        setCurrentTime((prevTime) => prevTime - 1);
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }

    
    return () => clearInterval(timerRef.current);
  }, [timerState, currentTime]);

  useEffect(() => {
    if (currentTime === 0) {
      if (timerState === 'working') {
        setTimerState('breaking');
        setCurrentTime(breakTime * 60);
        alert('Work Time is Over! Take a Break!'); 
      } else if (timerState === 'breaking') {
        setTimerState('stopped');
        setCurrentTime(workTime * 60);
        alert('Break Time is Over! Get Back to Work!'); 
      }
    }
  }, [currentTime, timerState, workTime, breakTime]);

  const handleStart = () => {
    setTimerState('working');
  };

  const handleStop = () => {
    setTimerState('stopped');
  };

  const handleReset = () => {
    setTimerState('stopped');
    setCurrentTime(workTime * 60);
  };

  const handleWorkTimeChange = (event) => {
    const value = parseFloat(event.target.value);
    if (!isNaN(value) && value >= 0) {
      setWorkTime(value);
      if (timerState === 'stopped') {
        setCurrentTime(value * 60);
      }
    } else {
      
      setWorkTime("Enter Work Duration"); 
    }
  };

  const handleBreakTimeChange = (event) => {
    const value = parseFloat(event.target.value);
    if (!isNaN(value) && value >= 0) {
      setBreakTime(value);
    } else {
      
      setBreakTime("Enter Break Duration" ); 
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secondsLeft = seconds % 60;
    const secondsStr = secondsLeft.toString().padStart(2, '0');
    return `${minutes}:${secondsStr}`;
  };

  return (
    <div>
      <h1>{formatTime(currentTime)}</h1>
      <h2>{timerState === 'working' ? 'Work Time' : 'Break Time'}</h2>
      <div>
        <button onClick={handleStart}>Start</button>
        <button onClick={handleStop} disabled={timerState === 'stopped'}>
          Stop
        </button>
        <button onClick={handleReset} disabled={timerState === 'stopped'}>
          Reset
        </button>
      </div>
      <div>
        <input
          type="number"
          step="0.01"
          value={workTime}
          onChange={handleWorkTimeChange}
          placeholder="Enter Work Duration" 
        />
        <input
          type="number"
          step="0.01"
          value={breakTime}
          onChange={handleBreakTimeChange}
          placeholder="Enter Break Duration" 
        />
        <button>Set</button> 
      </div>
    </div>
  );
}

export default WorkTime;