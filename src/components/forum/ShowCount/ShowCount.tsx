import React from 'react';
import './ShowCount.sass';

export default function ShowCount({label, count, className}: { label: string, count: number, className?: string }) {
    return (
        <div className={`counter ${className}`}>
            {`${label}:${count}`}
        </div>
    )
}