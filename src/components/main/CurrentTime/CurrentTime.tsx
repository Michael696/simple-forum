import React, {useEffect, useState} from "react";
import './CurrentTime.sass';

export default function CurrentTime() {
    const getTimeString = () => new Date().toLocaleTimeString();
    const [time, setTime] = useState(getTimeString());

    useEffect(() => {
        setTimeout(() => {
            setTime(getTimeString());
        }, 10 * 1000);
    }, [time]);

    return (
        <div className='current-time margin1-right'>
            Current time is:<span className='bold margin1-left'>{time}</span>
        </div>);
}