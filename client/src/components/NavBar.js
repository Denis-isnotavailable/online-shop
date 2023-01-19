import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import { Context } from '..';
import { ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from '../utils/consts';


const NavBar = observer (() => {
    const { user } = useContext(Context);
    const navigate = useNavigate();

    const logOut = () => {
        user.setUser({});
        user.setIsAuth(false);
    }

    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <NavLink style={{ color: '#ffffff', textDecoration: 'none' }} to={SHOP_ROUTE} >BUY_DEVICE</NavLink>
                {user.isAuth ?
                    <Nav className="ml-auto" style={{color: '#ffffff'}}>
                        <Button
                            variant='outline-light'
                            onClick={() => navigate(ADMIN_ROUTE)}
                        >
                            Admin Pannel
                        </Button>
                        <Button
                            variant='outline-light'
                            style={{ marginLeft: '16px' }}
                            onClick={() => logOut()}
                        >
                            LogOut
                        </Button>
                    </Nav>
                :
                    <Nav className="ml-auto" style={{color: '#ffffff'}}>                        
                        <Button
                            variant='outline-light'
                            onClick={() => navigate(LOGIN_ROUTE)}
                        >
                            Authorization
                        </Button>
                    </Nav>
                }
            </Container>
        </Navbar>
    );
    
})

export default NavBar;