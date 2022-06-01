import React from "react";
import {Button, Modal} from "react-bootstrap/cjs";
import './Confirmation.sass';

export default function Confirmation({title, message, show, onAccept, onReject}
                                         : { title: string, message: string, show: boolean, onAccept: () => void, onReject: () => void }) {
    return (
        <Modal show={show} onHide={onReject}>
            <Modal.Header closeButton className='modal__header pad025'>
                <Modal.Title className='modal__title pad025'>
                    {title}
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                {message}
            </Modal.Body>

            <Modal.Footer>
                <Button onClick={onAccept}>OK</Button>
                <Button onClick={onReject}>Cancel</Button>
            </Modal.Footer>
        </Modal>
    )
}
