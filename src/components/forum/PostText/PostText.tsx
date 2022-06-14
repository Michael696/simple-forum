import React, {useState} from 'react';
import '../../../features/post/Post.sass';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/cjs/Button";
import Textarea from '../Textarea/Textarea';
import {MAX_POST_LENGTH} from "../../../app/settings";

const PostText = function ({text, editable, onSave, onCancel}:
                               { text: string, editable: boolean, onSave: (text: string) => void, onCancel: () => void }) {
    const textReplaced = text;//.replaceAll('\n','<br/>'); // TODO save line breaks
    const [postText, setPostText] = useState(textReplaced);

    const handleSave = () => {
        onSave(postText);
    };

    const handleCancel = () => {
        onCancel();
        setPostText(textReplaced);
    };

    const handleChange = (newText: string) => {
        setPostText(newText);
    };

    return (
        <div className='post__text pad05'>
            {!editable ? textReplaced :
                (<div className='width-100'>
                    <Form.Group controlId="formPostName">
                        <Textarea text={postText} onChange={handleChange} maxLength={MAX_POST_LENGTH}/>
                    </Form.Group>
                    <div>
                        <Button onClick={handleSave}>save</Button>
                        <Button onClick={handleCancel}>cancel</Button>
                    </div>
                </div>)
            }
        </div>
    );
};

const PostTextWithMemo = React.memo(PostText);
export default PostTextWithMemo;