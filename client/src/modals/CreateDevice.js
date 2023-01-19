import { observer } from 'mobx-react-lite';
import React, { useContext, useState, useEffect } from 'react';
import { Modal, Button, Form, Dropdown, Row, Col } from 'react-bootstrap';
import { Context } from '..';
import { createDevice, fetchBrands, fetchTypes } from '../http/deviceAPI';

const CreateDevice = observer (({ show, onHide }) => {
    const { device } = useContext(Context);
    const [info, setInfo] = useState([]);
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [file, setFile] = useState(null);

    useEffect(() => {
        fetchTypes().then(data => device.setTypes(data));
        fetchBrands().then(data => device.setBrands(data));
    }, []);

    const addInfo = () => {
        setInfo([...info, {title: '', description: '', number: Date.now()}])
    }

    const deleteInfo = (number) => {
        setInfo(info.filter(i => i.number !== number))
    }

    const changeInfo = (key, value, number) => {
        setInfo(info.map(i => i.number === number ? {...i, [key]: value} : i));
    }

    const selectFile = e => {
        setFile(e.target.files[0])
    }

    const addDevice = () => {
        const formData = new FormData()
        formData.append('name', name)
        formData.append('price', `${price}`)
        formData.append('img', file)
        formData.append('brandId', device.selectedBrand.id)
        formData.append('typeId', device.selectedType.id)
        formData.append('info', JSON.stringify(info))
        createDevice(formData).then(data => onHide())
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
                    Add new Device
                </Modal.Title>
            </Modal.Header>
            
            <Modal.Body>
                <Dropdown className='mt-2 mb-2'>
                    <Dropdown.Toggle>
                        {device.selectedType.name || "Choose type"}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        {device.types.map((type) => 
                            <Dropdown.Item
                                key={type.id}
                                onClick={() => device.setSelectedType(type)}
                            >
                                {type.name}
                            </Dropdown.Item>
                        )}
                    </Dropdown.Menu>                    
                </Dropdown>

                <Dropdown className='mt-2 mb-2'>
                    <Dropdown.Toggle>
                        {device.selectedBrand.name || "Choose brand"}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        {device.brands.map((brand) => 
                            <Dropdown.Item
                                key={brand.id}
                                onClick={() => device.setSelectedBrand(brand)}
                            >
                                {brand.name}
                            </Dropdown.Item>
                        )}
                    </Dropdown.Menu>                    
                </Dropdown>

                <Form>
                    <Form.Control
                        className='mt-3'
                        placeholder='Enter device name'
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                </Form>

                <Form>
                    <Form.Control
                        className='mt-3'
                        placeholder='Enter device price'
                        type='number'
                        value={price}
                        onChange={e => setPrice(Number(e.target.value))}
                    />
                </Form>

                <Form>
                    <Form.Control
                        className='mt-3'
                        placeholder='Add device image'
                        type='file'
                        onChange={selectFile}
                    />
                </Form>
                <hr />
                
                <Button
                    variant='outline-dark'
                    onClick={addInfo}
                >
                    Add new characteristic
                </Button>

                {info.map(item =>
                    <Row key={item.number} className='mt-4'>
                        <Col md={4}>
                            <Form.Control
                                value={item.title}
                                onChange={e => changeInfo('title', e.target.value, item.number)}
                                placeholder='Enter characteristic title'
                            />
                        </Col>
                        <Col md={4}>
                            <Form.Control
                                value={item.description}
                                onChange={e => changeInfo('description', e.target.value, item.number)}
                                placeholder='Enter characteristic description'
                            />
                        </Col>
                        <Col md={4}>
                            <Button
                                variant='outline-danger'
                                onClick={() => deleteInfo(item.number)}
                            >Delete
                            </Button>
                        </Col>
                    </Row>
                )}

            </Modal.Body>
            
            <Modal.Footer>
                <Button variant='outline-danger' onClick={onHide}>Close</Button>
                <Button variant='outline-success' onClick={addDevice}>Add device</Button>
            </Modal.Footer>
            
        </Modal>
    );
    
})

export default CreateDevice;