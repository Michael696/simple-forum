import React, {useEffect, useState} from "react";

export default function CurrentTime() {
    const getTimeString = () => {
        const now = new Date();
        return now.toLocaleTimeString();
    };
    const [time, setTime] = useState(getTimeString());
    let interval;
    useEffect(() => {
        console.log('set interval');
        interval = setInterval(() => {
            setTime(getTimeString());
        }, 10 * 1000);
        return () => {
            console.log('cleared interval');
            clearInterval(interval);
        }
    }, []);
    return (
        <div className='float-right'>
            Current time is: {time}
        </div>);
}