import React from 'react';
import Button from "react-bootstrap/cjs/Button";

export default function ReplyButton({onClick}: { onClick: () => void }) {
    return (
        <Button variant='primary' onClick={onClick}>Reply</Button>
    )
}