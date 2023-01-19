import React, { useEffect, useState } from 'react';
import { Container, Col, Image, Row, Form, Card, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import bigstar from '../assets/bigstar.png';
import { fetchOneDevice } from '../http/deviceAPI';

function DevicePage() {
  const [device, setDevice] = useState({ info: [] });
  const {id} = useParams();

  useEffect(() => {
    fetchOneDevice(id).then(data => setDevice(data))
  }, []);

  return (
    <Container className='mt-3'>

      <Row>
        <Col md={4}>
          <Image width={300} height={300} src={process.env.REACT_APP_API_URL + device.img} />

        </Col>

        <Col md={4}>
          <Form className='d-flex flex-column justify-content-center align-items-center'>
            <h2>{device.name}</h2>
            <div
              className='d-flex justify-content-center align-items-center'
              style={{background: `url(${bigstar}) no-repeat center center`, width: 240, height: 240, backgroundSize: 'cover', fontSize: 56 }}
            >
              {device.rating}
            </div>
          </Form>
        </Col>

        <Col md={4}>
          <Card
            className='d-flex flex-column justify-content-around align-items-center'
            style={{width: 300, height: 300, fontSize: 32, border: '5px solid lightgray' }}
          >
            <h3>from {device.price} $</h3>
            <Button variant='outline-dark' >Add to basket</Button>
          </Card>
        </Col>
      </Row>

      <Row className='mt-3 d-flex flex-column' >
        <h3>Details:</h3>
        {device.info.map(({id, title, description}, i) => 
          <Row
            key={id}
            style={{backgroundColor: i % 2 === 0 ? 'lightgray' : 'white', padding: 10}}
          >
            {title}: {description}
          </Row>
          )}
      </Row>

    </Container>
  );
    
}

export default DevicePage;