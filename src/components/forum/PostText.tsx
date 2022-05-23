import React, {useState} from 'react';
import '../../features/post/Post.sass';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/cjs/Button";

const PostText = function ({text, editable, onSave, onCancel}:
                               { text: string, editable: boolean, onSave: (text: string) => void, onCancel: () => void }) {
    const textReplaced = text;//.replaceAll('\n','<br/>'); // TODO save line breaks
    const [postText, setPostText] = useState(textReplaced);

    const handleSave = (e) => {
        onSave(postText);
    };

    const handleCancel = (e) => {
        onCancel();
        setPostText(textReplaced);
    };

    return (
        <div className='post__text pad05'>
            {!editable ? textReplaced :
                (<div>
                    <Form.Group className="mb-3" controlId="formPostName">
                        <Form.Control
                            as="textarea"
                            placeholder=""
                            value={postText}
                            onChange={(e) => {
                                setPostText(e.target.value);
                            }}
                        />
                    </Form.Group>
                    <div>
                        <Button variant='primary' onClick={handleSave}>save</Button>
                        <Button variant='primary' onClick={handleCancel}>cancel</Button>
                    </div>
                </div>)
            }
        </div>
    );
};

const PostTextWithMemo = React.memo(PostText);
export default PostTextWithMemo;