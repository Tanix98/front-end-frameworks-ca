import './styles.css';
import { Link, NavLink } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { useSelector } from 'react-redux';

// Use the routers to navigate to different pages, cannot use anchor tags as React is a SPA
// Link to routers in the header, which will navigate the user to different pages when clicked on

function Header() {
    const shoppingCart = useSelector((state) => state.cart);
    const shoppingCartQuantity = shoppingCart.map((cartItem) => {
        return cartItem.quantity;
    });
    const shoppingCartSum = shoppingCartQuantity.reduce(
        (partialSum, a) => partialSum + a,
        0
    );

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
                                Store
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
                        </Nav>
                        <Nav className='ms-2 my-2'>
                            <NavLink
                                to='/checkout'
                                className={({ isActive }) =>
                                    isActive
                                        ? 'nav_link text-info text-decoration-none'
                                        : 'nav_link text-muted text-decoration-none'
                                }
                            >
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    width='16'
                                    height='16'
                                    fill='currentColor'
                                    className='bi bi-cart me-1'
                                    viewBox='0 0 16 16'
                                >
                                    <path d='M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z' />
                                </svg>
                                {shoppingCartSum}
                            </NavLink>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
}

export default Header;
