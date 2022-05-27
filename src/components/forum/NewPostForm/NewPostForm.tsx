import React, {useCallback, useEffect, useState} from "react";
import Button from "react-bootstrap/cjs/Button";
import Form from "react-bootstrap/Form";
import '../../../features/post/Post.sass';
import Textarea from "../Textarea/Textarea";
import {MAX_POST_LENGTH} from "../../../app/settings";

const NewPostForm = function ({text, onCreate}: { text: string, onCreate: (text: string) => void }) {
    const [postText, setPostText] = useState(text);

    useEffect(() => {
        setPostText(text);
    }, [text]);

    const handleCreate = useCallback(() => {
        onCreate(postText);
        setPostText('');
    }, [postText, onCreate]);

    const handleChange = useCallback((newText) => {
        setPostText(newText);
    }, []);

// TODO fix issue with clicking 'reply' two or more times
    return (
        <div className='new-post-form margin05 pad05'>
            <Form.Group className="mb-3" controlId="formPostName">
                <Form.Label className='bold'>New post text</Form.Label>
                <Textarea text={postText} onChange={handleChange} maxLength={MAX_POST_LENGTH}/>
            </Form.Group>
            <Button onClick={handleCreate} {...(postText.length === 0 ? {disabled: true} : {})}>create post</Button>
        </div>
    )
};

const NewPostFormWithMemo = React.memo(NewPostForm);
export default NewPostFormWithMemo;