import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { createType } from '../http/deviceAPI';

function CreateType({ show, onHide }) {
    const [value, setValue] = useState('');

    const addType = () => {
        createType({ name: value }).then(data => {
            setValue('');
            onHide();
        })
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Add new Type
                </Modal.Title>
            </Modal.Header>
            
            <Modal.Body>
                <Form>
                    <Form.Control
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        placeholder='Enter type name'
                    />
                </Form>
            </Modal.Body>
            
            <Modal.Footer>
                <Button variant='outline-danger' onClick={onHide}>Close</Button>
                <Button variant='outline-success' onClick={addType}>Add type</Button>
            </Modal.Footer>
            
        </Modal>
    );
    
}

export default CreateType;