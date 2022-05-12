import React, {useState} from "react";
import Button from "react-bootstrap/cjs/Button";
import Form from "react-bootstrap/Form";

export default function NewThreadForm() {
    const [threadName, setThreadName] = useState('');
    const handleCreate = e => {
        console.log('create thread', threadName);
    };

    return (
        <>
            <Form.Group className="mb-3" controlId="formThreadName">
                <Form.Label>thread name</Form.Label>
                <Form.Control
                    type="text"
                    placeholder=""
                    value={threadName}
                    onChange={(e) => {
                        setThreadName(e.target.value);
                    }}
                />
            </Form.Group>
            <Button variant='primary' onClick={handleCreate}>Create</Button>
        </>
    )
}