import { Link, NavLink } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

// Use the routers to navigate to different pages, cannot use anchor tags as React is a SPA
// Link to routers in the header, which will navigate the user to different pages when clicked on

function Header() {
    return (
        <div>
            <Navbar
                id='header'
                bg='dark'
                variant='dark'
                fixed='top'
                expand='lg'
            >
                <Container>
                    <Navbar.Brand>
                        <Link
                            to='/'
                            className='text-decoration-none text-light'
                        >
                            <h3>TABERNIA</h3>
                        </Link>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls='basic-navbar-nav' />
                    <Navbar.Collapse id='basic-navbar-nav'>
                        <Nav className='me-auto ms-2 my-2 gap-3'>
                            <NavLink
                                to='/'
                                className={({ isActive }) =>
                                    isActive
                                        ? 'nav_link text-info text-decoration-none'
                                        : 'nav_link text-muted text-decoration-none'
                                }
                            >
                                Home
                            </NavLink>
                            <NavLink
                                to='/contact'
                                className={({ isActive }) =>
                                    isActive
                                        ? 'nav_link text-info text-decoration-none'
                                        : 'nav_link text-muted text-decoration-none'
                                }
                            >
                                Contact us
                            </NavLink>
                            <NavLink
                                to='/checkout'
                                className={({ isActive }) =>
                                    isActive
                                        ? 'nav_link text-info text-decoration-none'
                                        : 'nav_link text-muted text-decoration-none'
                                }
                            >
                                Shopping cart
                            </NavLink>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
}

export default Header;
