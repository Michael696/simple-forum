import React, {useEffect, useState} from "react";
import './CurrentTime.sass';


export default function CurrentTime() {
    const getTimeString = () => {
        const now = new Date();
        return now.toLocaleTimeString();
    };
    const [time, setTime] = useState(getTimeString());
    let interval: number;
    useEffect(() => {
        interval = window.setInterval(() => {
            setTime(getTimeString());
        }, 10 * 1000);
        return () => {
            clearInterval(interval);
        }
    }, []);
    return (
        <div className='current-time margin1-right'>
            Current time is:<span className='bold margin1-left'>{time}</span>
        </div>);
}