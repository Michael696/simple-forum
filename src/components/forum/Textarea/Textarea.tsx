import React, {ChangeEvent, MutableRefObject, useEffect, useRef} from "react";
import Form from "react-bootstrap/Form";

const Textarea = function ({text, onChange, maxLength, focus = true}: { text: string, maxLength: number, onChange: (text: string) => void, focus?: boolean }) {
    const textRef = useRef<HTMLTextAreaElement>() as MutableRefObject<HTMLTextAreaElement>;

    useEffect(() => {
        if (focus) {
            textRef.current.focus();
        }
    }, [text, focus]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (value.length <= maxLength) {
            onChange(value);
        } else {
            onChange(value.slice(0, maxLength));
        }
    };

    return (
        <>
            <Form.Control
                as="textarea"
                placeholder=""
                value={text}
                ref={textRef}
                onChange={handleChange}
            />
            <div>characters {text.length} (max is {maxLength})</div>
        </>
    )
};

const TextareaWithMemo = React.memo(Textarea);
export default TextareaWithMemo;