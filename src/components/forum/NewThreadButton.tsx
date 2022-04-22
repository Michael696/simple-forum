import React from 'react';
import Button from "react-bootstrap/cjs/Button";

export default function NewThreadButton({onClick}: { onClick: () => void }) {
    return (
        <Button variant='primary' onClick={onClick}>New thread</Button>
    )
}