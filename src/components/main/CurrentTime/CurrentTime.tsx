import React, {useEffect, useState} from "react";

export default function CurrentTime() {
    const getTimeString = () => {
        const now = new Date();
        return now.toLocaleTimeString();
    };
    const [time, setTime] = useState(getTimeString());
    let interval;
    useEffect(() => {
        interval = setInterval(() => {
            setTime(getTimeString());
        }, 10 * 1000);
        return () => {
            clearInterval(interval);
        }
    }, []);
    return (
        <div className=''>
            Current time is: {time}
        </div>);
}