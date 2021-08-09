import { useState, useEffect } from "react";
import { interval, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import useDoubleClick from "./click";

import "./index.css";

function App () {
  const [time, setTime] = useState(0);
  const [timerOn, setTimerOn] = useState(false);

  useEffect(() => {
    const action = new Subject();
    interval(10)
    .pipe(takeUntil(action))
    .subscribe(()=>{
      if(timerOn){
        setTime((val)=>val+1);
      }
    });
    return () => {
      action.next();
      action.complete();
    };
  },[timerOn]);

  const handleStart = () => {
    setTimerOn((prevState) => !prevState);
  };

  const handleWait = useDoubleClick(()=> setTimerOn(false));

  const handleStop = () =>{
    setTime(0);
    setTimerOn(true);
  };

  const handleReset = () => {
    if (time === 0) {
      return;
    }
    setTime(0);
    setTimerOn(true);
  };

  return (
    <>
    <h2>React stopwatch</h2>
    <div className = "display">
      <span>
        {("0" + Math.floor((time / (1000 * 60 *60)) % 24)).slice(-2)}:
      </span>
      <span>{("0" + Math.floor(time / 6000)).slice(-2)}:</span>
        <span>{("0" + Math.floor((time / 100) % 60)).slice(-2)}</span>
      </div>

      {!timerOn && (
        <button className="start" onClick={handleStart}>
          Start
        </button>
      )}

      {timerOn && (
        <button className="stop" onClick={handleStop}>
          Stop
        </button>
      )}

      <button className="wait" onClick={handleWait}>
        Wait
      </button>

      <button className="reset" onClick={handleReset}>
        Reset
      </button>
    </>
  );
}

export default App;