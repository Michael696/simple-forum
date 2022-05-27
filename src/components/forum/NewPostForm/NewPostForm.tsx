import React, {MouseEventHandler, MutableRefObject, useEffect, useRef, useState} from "react";
import Button from "react-bootstrap/cjs/Button";
import Form from "react-bootstrap/Form";
import '../../../features/post/Post.sass';

const NewPostForm = function ({text, onCreate}: { text: string, onCreate: MouseEventHandler<HTMLElement> }) {
    const [postText, setPostText] = useState(text);
    const textRef = useRef<HTMLTextAreaElement>() as MutableRefObject<HTMLTextAreaElement>;

    useEffect(() => {
        setPostText(text);
        textRef.current.focus();
    }, [text]);

    // TODO limit post size
    return (
        <div className='new-post-form margin05 pad05'>
            <Form.Group className="mb-3" controlId="formPostName">
                <Form.Label className='bold'>New post text</Form.Label>
                <Form.Control
                    as="textarea"
                    placeholder=""
                    value={postText}
                    ref={textRef}
                    onChange={(e) => {
                        setPostText(e.target.value);
                    }}
                />
            </Form.Group>
            <Button onClick={onCreate} {...(postText.length === 0 ? {disabled: true} : {})}>create post</Button>
        </div>
    )
};

const NewPostFormWithMemo = React.memo(NewPostForm);
export default NewPostFormWithMemo;