import React, { useEffect, useState, useRef } from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { TimerWrapper, TimeWrapper } from './styled';

const INITIAL_TIME = 10;

const Counter = ({ remainingTime = INITIAL_TIME, onComplete }) => {

    const currentTime = useRef(remainingTime);
    const prevTime = useRef(null);
    const isNewTimeFirstTick = useRef(false);
    const [, setOneLastRerender] = useState(0);

    if (currentTime.current !== remainingTime) {
        isNewTimeFirstTick.current = true;
        prevTime.current = currentTime.current;
        currentTime.current = remainingTime;
    } else {
        isNewTimeFirstTick.current = false;
    }

    // force one last re-render when the time is over to tirgger the last animation
    if (remainingTime === 0) {
        setTimeout(() => {
            setOneLastRerender(val => val + 1);
            onComplete();
        }, 20);
    }

    const isTimeUp = isNewTimeFirstTick.current;

    return (
        <TimeWrapper>
        <div key={remainingTime} className={`time ${isTimeUp ? "up" : ""}`}>
            {remainingTime}
        </div>
        {prevTime.current !== null && (
            <div key={prevTime.current} className={`time ${!isTimeUp ? "down" : ""}`}>
                {prevTime.current}
            </div>
        )}
        </TimeWrapper>
    );
}

const Timer = ({ time, onComplete, color = "#EC0000" }) => {
    // const [counter, setCounter] = useState(INITIAL_TIME);

    // useEffect(() => {
    //     if(counter == 0) onComplete();
    //     const timer = counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    //     return () => clearInterval(timer);
    // }, [counter]);

    return (
        <TimerWrapper>
            <CountdownCircleTimer
            isPlaying
            duration={time}
            initialRemainingTime={time}
            colors={color}
            size={80}
            strokeWidth={3}>
                <Counter onComplete={onComplete} />
            </CountdownCircleTimer>
        </TimerWrapper>
    )
}

export default Timer
