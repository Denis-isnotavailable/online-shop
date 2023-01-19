import { observer } from 'mobx-react-lite';
import React, { useContext, useState } from 'react';
import { Button, Card, Container, Form } from 'react-bootstrap';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Context } from '..';
import { login, registration } from '../http/userAPI';
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from '../utils/consts';

const Auth = observer(() => {
    const {user} = useContext(Context)
    const location = useLocation();
    const navigate = useNavigate();    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const isLogin = location.pathname === LOGIN_ROUTE;

    const signIn = async () => {
        
        try {
            let data;

            if (isLogin) {
                data = await login(email, password);               
            } else {
                data = await registration(email, password);                
            }
            
            user.setUser(data);
            user.setIsAuth(true);
            navigate(SHOP_ROUTE);

            } catch (e) {
                alert(e.response.data.message)
        }        
    }
    
    return (
        <Container
            className='d-flex justify-content-center align-items-center'
            style={{height: window.innerHeight - 54}}
        >
            <Card style={{width: 600}} className="p-5">
                <h2 className='m-auto' >{ isLogin? "AUTHORIZATION" : "REGISTRATION" }</h2>
                <Form>
                    <Form.Control
                        className='mt-5'
                        placeholder='Enter your Email'
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        
                    />
                    <Form.Control
                        className='mt-3'
                        placeholder='Enter your Password'
                        type='password'
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <div className='mt-3 d-flex justify-content-between' >
                        
                        {isLogin ?
                            <div> No account? <NavLink to={REGISTRATION_ROUTE}>Registration</NavLink> </div>
                            : 
                            <div> Already have an account? <NavLink to={LOGIN_ROUTE}>Authorization</NavLink> </div> 
                        }                    
                        
                        <Button
                            variant='outline-success'
                            onClick={signIn}
                        >
                            { isLogin? "Enter" : "Registration" }
                        </Button>                      
                    </div>
                    
                    
                </Form>
            </Card>
        </Container>
    );
        
    })

export default Auth;