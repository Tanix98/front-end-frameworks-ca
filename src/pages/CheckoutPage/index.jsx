import './styles.css';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    increment,
    decrement,
    clearCart,
    deleteItem,
} from '../../slices/cartSlice';

function Checkout() {
    useEffect(() => {
        document.title = 'Shopping cart | Tabernia';
    }, []);

    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);

    if (cart.length === 0) {
        return (
            <div id='main'>
                <h2 className='mb-5 w-100'>Shopping cart</h2>
                <hr />
                <div className='d-flex flex-column flex-sm-row align-items-center align-items-sm-start gap-4 mt-4 mt-sm-5'>
                    <div>
                        <Button
                            variant='danger'
                            className='shadow'
                            onClick={() => dispatch(clearCart())}
                            type='button'
                        >
                            Clear cart
                        </Button>
                    </div>
                    <div className='ms-sm-auto'>
                        <div className='d-flex mb-2 mb-sm-4 me-2'>
                            <div className='d-flex flex-wrap gap-2 ms-sm-auto'>
                                <h5>Subtotal:</h5>
                                <h5>
                                    {Math.floor(
                                        cart
                                            .map(
                                                (product) =>
                                                    product.discountedPrice *
                                                    product.quantity
                                            )
                                            .reduceRight(
                                                (acc, cur) => acc + cur,
                                                0
                                            ) * 100
                                    ) / 100}{' '}
                                    kr
                                </h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div id='main'>
                <h2 className='mb-5'>Shopping cart</h2>
                <div className='d-none d-lg-flex justify-content-between px-4 mb-2'>
                    <h5>Product</h5>
                    <h5 className='position-absolute-center'>Quantity</h5>
                    <h5>Price</h5>
                </div>
                <hr className='d-none d-lg-flex' />
                <div className='d-flex flex-lg-column justify-content-center flex-wrap gap-4 text-break'>
                    {cart.map((product, key) => (
                        <div
                            className='product-card-checkout d-flex flex-column flex-lg-row align-items-center gap-3 gap-lg-0 py-3 px-4 bg-white'
                            key={key}
                        >
                            <div className='d-flex flex-column flex-lg-row align-items-center gap-3 me-lg-auto'>
                                <div className='product-img-container-checkout d-flex justify-content-center align-items-center'>
                                    <img
                                        className='product-img-checkout shadow'
                                        variant='top'
                                        src={product.imageUrl}
                                        alt={product.title}
                                    />
                                </div>
                                <div className='product-title-checkout text-center d-none d-lg-block'>
                                    <h5>{product.title}</h5>
                                </div>
                            </div>
                            <div className='product-quantity-checkout position-absolute-center d-none d-lg-flex justify-content-center'>
                                <div className='d-inline-flex align-items-center border'>
                                    <Button
                                        onClick={() =>
                                            dispatch(increment(product.id))
                                        }
                                        type='button'
                                    >
                                        +
                                    </Button>
                                    <p className='px-3'>{product.quantity}</p>
                                    <Button
                                        onClick={() =>
                                            dispatch(decrement(product.id))
                                        }
                                        type='button'
                                    >
                                        -
                                    </Button>
                                </div>
                            </div>
                            <div className='me-auto me-lg-0'>
                                <div className='product-title-checkout d-block d-lg-none'>
                                    <h4>{product.title}</h4>
                                </div>
                                <div className='product-price-checkout d-flex justify-content-center flex-wrap ms-lg-auto m-auto m-lg-0 text-start text-lg-auto text-lg-end'>
                                    {product.price >
                                        product.discountedPrice && (
                                        <div className='ms-lg-auto me-auto me-lg-0'>
                                            <div className='d-flex flex-wrap gap-1 mt-2 mt-lg-0'>
                                                <s className='text-muted'>
                                                    <p>
                                                        {((Math.floor(
                                                            product.price * 100
                                                        ) /
                                                            100) *
                                                            Math.floor(
                                                                product.quantity *
                                                                    100
                                                            )) /
                                                            100}{' '}
                                                        kr
                                                    </p>
                                                </s>
                                                <p>
                                                    {((Math.floor(
                                                        product.discountedPrice *
                                                            100
                                                    ) /
                                                        100) *
                                                        Math.floor(
                                                            product.quantity *
                                                                100
                                                        )) /
                                                        100}{' '}
                                                    kr
                                                </p>
                                            </div>
                                            <Button
                                                className='mt-2 p-0 link-danger ms-lg-auto d-none d-lg-block'
                                                variant='link'
                                                onClick={() =>
                                                    dispatch(
                                                        deleteItem(product.id)
                                                    )
                                                }
                                            >
                                                Remove item
                                            </Button>
                                        </div>
                                    )}
                                    {product.discountedPrice ===
                                        product.price && (
                                        <div className='me-auto me-lg-0 ms-lg-auto mt-2 mt-lg-0'>
                                            <p>
                                                {((Math.floor(
                                                    product.price * 100
                                                ) /
                                                    100) *
                                                    Math.floor(
                                                        product.quantity * 100
                                                    )) /
                                                    100}{' '}
                                                kr
                                            </p>
                                            <Button
                                                className='mt-2 p-0 link-danger ms-lg-auto d-none d-lg-block'
                                                variant='link'
                                                onClick={() =>
                                                    dispatch(
                                                        deleteItem(product.id)
                                                    )
                                                }
                                            >
                                                Remove item
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className='product-quantity-checkout d-flex d-lg-none justify-content-center'>
                                <div className='d-inline-flex align-items-center border'>
                                    <Button
                                        onClick={() =>
                                            dispatch(increment(product.id))
                                        }
                                        type='button'
                                    >
                                        +
                                    </Button>
                                    <p className='px-3'>{product.quantity}</p>
                                    <Button
                                        onClick={() =>
                                            dispatch(decrement(product.id))
                                        }
                                        type='button'
                                    >
                                        -
                                    </Button>
                                </div>
                            </div>
                            <Button
                                variant='danger'
                                className='mt-2 d-lg-none'
                                onClick={() => dispatch(deleteItem(product.id))}
                                type='button'
                            >
                                Remove item
                            </Button>
                        </div>
                    ))}
                </div>
                <hr className='d-sm-none' />
                <div className='d-flex flex-column flex-sm-row align-items-center align-items-sm-start gap-4 mt-sm-5'>
                    <div>
                        <Button
                            variant='danger'
                            className='shadow'
                            onClick={() => dispatch(clearCart())}
                            type='button'
                        >
                            Clear cart
                        </Button>
                    </div>
                    <div className='ms-sm-auto'>
                        <div className='d-flex mb-2 mb-sm-4 me-2'>
                            <div className='d-flex flex-wrap gap-2 ms-sm-auto'>
                                <h5>Subtotal:</h5>
                                <h5>
                                    {Math.floor(
                                        cart
                                            .map(
                                                (product) =>
                                                    product.discountedPrice *
                                                    product.quantity
                                            )
                                            .reduceRight(
                                                (acc, cur) => acc + cur,
                                                0
                                            ) * 100
                                    ) / 100}{' '}
                                    kr
                                </h5>
                            </div>
                        </div>
                        <Link
                            className='btn btn-success btn-lg shadow mt-2'
                            role='button'
                            to='/checkoutsuccess'
                        >
                            Continue to checkout
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default Checkout;
