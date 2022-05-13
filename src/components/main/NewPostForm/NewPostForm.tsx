import React, {useState} from "react";
import Button from "react-bootstrap/cjs/Button";
import Form from "react-bootstrap/Form";

export default function NewPostForm() {
    const [postText, setPostText] = useState('');
    const handleCreate = e => {
        console.log('create post', postText);
    };

    return (
        <>
            <Form.Group className="mb-3" controlId="formThreadName">
                <Form.Label>thread name</Form.Label>
                <Form.Control
                    type="text"
                    placeholder=""
                    value={postText}
                    onChange={(e) => {
                        setPostText(e.target.value);
                    }}
                />
            </Form.Group>
            <Button variant='primary' onClick={handleCreate}>Create</Button>
        </>
    )
}