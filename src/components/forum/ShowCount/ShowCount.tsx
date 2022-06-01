import React, {ReactNode} from 'react';
import './ShowCount.sass';

export default function ShowCount({label, count, className, children}: { label: string, count: number, className?: string, children?: ReactNode }) {
    return (
        <div className={`counter ${className}`}>
            {`${label}:${count}`}
            {children}
        </div>
    )
}