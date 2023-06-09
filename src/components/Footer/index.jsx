import './styles.css';
import { Link } from 'react-router-dom';
import CopyrightYear from '../CopyrightYear/index';

function Footer() {
    return (
        <div>
            <div className='mt-5'>
                <div
                    id='footer'
                    className='bg-secondary text-center text-lg-start text-white text-break'
                >
                    <div className='container p-4'>
                        <div className='row mt-4'>
                            <div className='col-lg-3 col-md-6 mb-4 mb-md-0'>
                                <h5 className='text-uppercase'>See more</h5>
                                <ul className='list-unstyled'>
                                    <li key='bestsellers'>
                                        <Link to='#' className='text-white'>
                                            <i className='fas fa-book fa-fw fa-sm me-2'></i>
                                            Bestsellers
                                        </Link>
                                    </li>
                                    <li key='all-books'>
                                        <Link to='#' className='text-white'>
                                            <i className='fas fa-book fa-fw fa-sm me-2'></i>
                                            All books
                                        </Link>
                                    </li>
                                    <li key='our-authors'>
                                        <Link to='#' className='text-white'>
                                            <i className='fas fa-user-edit fa-fw fa-sm me-2'></i>
                                            Our authors
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                            <div className='col-lg-3 col-md-6 mb-4 mb-md-0'>
                                <h5 className='text-uppercase'>Contract</h5>

                                <ul className='list-unstyled'>
                                    <li key='supply'>
                                        <Link to='#' className='text-white'>
                                            <i className='fas fa-shipping-fast fa-fw fa-sm me-2'></i>
                                            Supply
                                        </Link>
                                    </li>
                                    <li key='returns'>
                                        <Link to='#' className='text-white'>
                                            <i className='fas fa-backspace fa-fw fa-sm me-2'></i>
                                            Returns
                                        </Link>
                                    </li>
                                    <li key='regulations'>
                                        <Link to='#' className='text-white'>
                                            <i className='far fa-file-alt fa-fw fa-sm me-2'></i>
                                            Regulations
                                        </Link>
                                    </li>
                                    <li key='privacy-policy'>
                                        <Link to='#' className='text-white'>
                                            <i className='far fa-file-alt fa-fw fa-sm me-2'></i>
                                            Privacy policy
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                            <div className='col-lg-3 col-md-6 mb-4 mb-md-0'>
                                <h5 className='text-uppercase'>
                                    Publishing house
                                </h5>
                                <ul className='list-unstyled'>
                                    <li key='taberna'>
                                        <Link to='#' className='text-white'>
                                            <i className='fas fa-briefcase fa-fw fa-sm me-2'></i>
                                            Tabernia
                                        </Link>
                                    </li>
                                    <li key='karlsveien'>
                                        <Link to='#' className='text-white'>
                                            <i className='fas fa-briefcase fa-fw fa-sm me-2'></i>
                                            Karlsveien
                                        </Link>
                                    </li>
                                    <li key='5765-oslo'>
                                        <Link to='#' className='text-white'>
                                            <i className='fas fa-briefcase fa-fw fa-sm me-2'></i>
                                            5765 Oslo
                                        </Link>
                                    </li>
                                    <li key='send-us-a-book'>
                                        <Link to='#' className='text-white'>
                                            <i className='fas fa-briefcase fa-fw fa-sm me-2'></i>
                                            Send us a book
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                            <div className='col-lg-3 col-md-6 mb-4 mb-md-0'>
                                <h5 className='text-uppercase'>Write to us</h5>
                                <ul className='list-unstyled'>
                                    <li key='help-in-purchasing'>
                                        <Link to='#' className='text-white'>
                                            <i className='fas fa-at fa-fw fa-sm me-2'></i>
                                            Help in purchasing
                                        </Link>
                                    </li>
                                    <li key='check-the-order-status'>
                                        <Link to='#' className='text-white'>
                                            <i className='fas fa-shipping-fast fa-fw fa-sm me-2'></i>
                                            Check the order status
                                        </Link>
                                    </li>
                                    <li key='join-the-newsletter'>
                                        <Link to='#' className='text-white'>
                                            <i className='fas fa-envelope fa-fw fa-sm me-2'></i>
                                            Join the newsletter
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className='p-3 bg-secondary d-flex justify-content-center gap-1 flex-wrap'>
                        <CopyrightYear />
                        <div>Tabernia. All rights reserved.</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;
