import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Card, Form } from 'react-bootstrap';
import { Context } from '..';

const BrandBar = observer(() => {
    const { device } = useContext(Context);

    return (
        <Form className='d-flex flex-wrap'>
            {device.brands.map(brand =>
                <Card
                    key={brand.id}
                    className='p-2'
                    style={{cursor: "pointer"}}
                    border={brand.id === device.selectedBrand.id ? 'danger' : 'light'}
                    onClick={() => device.setSelectedBrand(brand)}
                >
                    {brand.name}
                </Card>
            )}
        </Form>
    );
    
})

export default BrandBar;