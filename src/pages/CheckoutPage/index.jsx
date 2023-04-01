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
                <div className='d-flex flex-column align-items-center'>
                    <div className='d-flex justify-content-between mt-5 w-100'>
                        <div>
                            <Button
                                variant='danger'
                                className='mt-2 shadow'
                                onClick={() => dispatch(clearCart())}
                                type='button'
                            >
                                Clear cart
                            </Button>
                        </div>
                        <div>
                            <div className='d-flex justify-content-end gap-2 mb-4 me-2'>
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
                            <Link
                                className='btn btn-success btn-lg shadow'
                                role='button'
                                to='/checkoutsuccess'
                            >
                                Continue to checkout
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div id='main'>
                <h2 className='mb-5'>Shopping cart</h2>
                <div className='d-flex justify-content-between px-4'>
                    <h5>Product</h5>
                    <h5 className='position-absolute-center'>Quantity</h5>
                    <h5>Price</h5>
                </div>
                <hr />
                <div className='d-flex flex-column gap-4 text-break'>
                    {cart.map((product, key) => (
                        <div
                            className='product-card-checkout d-block d-lg-flex align-items-center flex-wrap py-3 px-4 bg-white'
                            key={key}
                        >
                            <div className='d-block d-lg-flex align-items-center gap-3 me-auto'>
                                <div className='products-img-container-checkout m-auto d-flex justify-content-center align-items-center'>
                                    <img
                                        className='products-img-checkout shadow hover-overlay'
                                        variant='top'
                                        src={product.imageUrl}
                                        alt={product.title}
                                    />
                                </div>
                                <div className='product-title-checkout text-center'>
                                    <h5>{product.title}</h5>
                                </div>
                            </div>
                            <div className='product-quantity-checkout position-absolute-center d-flex justify-content-center'>
                                <div className='d-inline-flex align-items-center border'>
                                    <Button
                                        onClick={() =>
                                            dispatch(increment(product.id))
                                        }
                                        type='button'
                                    >
                                        +
                                    </Button>
                                    <p className='px-3'>
                                        {product.quantity > 1
                                            ? product.quantity
                                            : 1}
                                    </p>
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
                            <div className='product-price-checkout d-flex flex-wrap ms-lg-auto text-center text-lg-auto text-lg-end m-auto m-sm-0'>
                                {product.price > product.discountedPrice && (
                                    <div className='ms-0 ms-lg-auto'>
                                        <div className='d-flex gap-2'>
                                            <s className='text-muted ms-auto'>
                                                <p>
                                                    {((Math.floor(
                                                        product.price * 100
                                                    ) /
                                                        100) *
                                                        Math.floor(
                                                            product.quantity *
                                                                100
                                                        )) /
                                                        100}
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
                                                        product.quantity * 100
                                                    )) /
                                                    100}
                                                kr
                                            </p>
                                        </div>
                                        <Button
                                            className='mt-2 p-0 link-danger'
                                            variant='link'
                                            onClick={() =>
                                                dispatch(deleteItem(product.id))
                                            }
                                        >
                                            Remove item
                                        </Button>
                                    </div>
                                )}
                                {product.discountedPrice === product.price && (
                                    <div className='ms-auto'>
                                        <p>
                                            {((Math.floor(product.price * 100) /
                                                100) *
                                                Math.floor(
                                                    product.quantity * 100
                                                )) /
                                                100}
                                            kr
                                        </p>
                                        <Button
                                            className='mt-2 p-0 link-danger'
                                            variant='link'
                                            onClick={() =>
                                                dispatch(deleteItem(product.id))
                                            }
                                        >
                                            Remove item
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
                <div className='d-flex justify-content-between mt-5'>
                    <div>
                        <Button
                            variant='danger'
                            className='mt-2 shadow'
                            onClick={() => dispatch(clearCart())}
                            type='button'
                        >
                            Clear cart
                        </Button>
                    </div>
                    <div>
                        <div className='d-flex justify-content-end gap-2 mb-4 me-2'>
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
                        <Link
                            className='btn btn-success btn-lg shadow'
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

/*import { useEffect, useReducer, useState } from 'react';

const products = [
    {
        id: 0,
        title: 'Tine Lettmelk',
        price: 21.99,
        discountedPrice: 19.99,
    },
    {
        id: 1,
        title: 'Superbrød',
        price: 25.99,
        discountedPrice: 25.99,
    },
    {
        id: 2,
        title: 'Norvegia Ost',
        price: 84.99,
        discountedPrice: 84.99,
    },
    {
        id: 3,
        title: 'Grevens E&B',
        price: 33.99,
        discountedPrice: 33.99,
    },
];

export const initialState = { cart: [], total: 0 };

export function reducer(state, action) {
    let productIndex;
    let newTotal;
    let cart;

    switch (action.type) {
        // adding a product
        case 'addProduct':
            // create new cart, to avoid mutating the state
            cart = [...state.cart];
            // get the product index
            productIndex = cart.findIndex(
                (product) => product.id === action.payload.id
            );
            if (productIndex === -1) {
                // if productIndex is -1, it doesn't exist already so it's added to the cart
                cart.push({ ...action.payload, quantity: 1 });
            } else {
                // the product does exist so the the quantity gets increased
                // a new array will get created with quantity incremented to avoid mutating quantity
                cart = [
                    ...cart.slice(0, productIndex),
                    {
                        ...cart[productIndex],
                        quantity: cart[productIndex].quantity + 1,
                    },
                    ...cart.slice(productIndex + 1),
                ];
            }
            // set the new total to avoid having to keep calculating it
            newTotal = cart.reduce((currentTotal, product) => {
                currentTotal += product.discountedPrice * product.quantity;
                return currentTotal;
            }, 0);
            return { ...state, cart: cart, total: newTotal };

        // removing a product
        case 'removeProduct':
            cart = [...state.cart];
            // get the product index
            productIndex = cart.findIndex(
                (product) => product.id === action.payload.id
            );
            // if the product index is not -1 then it exists
            if (productIndex !== -1) {
                if (cart[productIndex].quantity > 1) {
                    // remove 1 from quantity if quantity is higher than 1
                    // recreate cart to avoid mutation
                    cart = [
                        ...cart.slice(0, productIndex),
                        {
                            ...cart[productIndex],
                            quantity: cart[productIndex].quantity - 1,
                        },
                        ...cart.slice(productIndex + 1),
                    ];
                } else {
                    // remove the item entirely if quantity is 0
                    cart = [
                        ...cart.slice(0, productIndex),
                        ...cart.slice(productIndex + 1),
                    ];
                }
            }
            // set the new total to avoid having to keep calculating it
            newTotal = cart.reduce((currentTotal, product) => {
                currentTotal += product.discountedPrice * product.quantity;
                return currentTotal;
            }, 0);
            return { ...state, cart: cart, total: newTotal };

        // clearing a cart
        case 'clearCart':
            return { cart: [], total: 0 };

        default:
            return state;
    }
}

function Checkout() {
    const [cart, setFilteredData] = useState([]);

    useEffect(() => {
        document.title = 'Shopping cart | Tabernia';
    }, []);

    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <div id='main'>
            <h3 className='text-center mb-4'>Product cart</h3>
            <div className='d-flex flex-column justify-content-center gap-1'>
                {products.map((product) => (
                    <div
                        key={product.id}
                        className='d-flex justify-content-center gap-2'
                    >
                        <button
                            onClick={() =>
                                dispatch({
                                    type: 'addProduct',
                                    payload: product,
                                })
                            }
                            className='buyBtn btn btn-primary col-5 col-sm-4 col-md-3 col-lg-2'
                            type='button'
                        >
                            Kjøp {product.title}
                        </button>
                    </div>
                ))}
            </div>
            <hr />
            <div className='d-flex justify-content-center gap-4'>
                <div className=''>
                    <p className='ms-1'>Product:</p>
                    {state.cart.map((product) => (
                        <div key={product.id} className='ms-1'>
                            {product.title}
                        </div>
                    ))}
                </div>
                <div className=''>
                    <p>Quantity:</p>
                    {state.cart.map((product) => (
                        <div key={product.id}>{product.quantity}</div>
                    ))}
                </div>
                <div className=''>
                    <p>Price:</p>
                    {state.cart.map((product) => (
                        <div key={product.id}>{product.discountedPrice}</div>
                    ))}
                </div>

                <div className='d-flex flex-column'>
                    {state.cart.map((product) => (
                        <button
                            onClick={() =>
                                dispatch({
                                    type: 'removeProduct',
                                    payload: product,
                                })
                            }
                            className='btn mb-1'
                            type='button'
                        >
                            &times;
                        </button>
                    ))}
                </div>
            </div>
            <div className='d-flex justify-content-center gap-1'>
                <p>Total:</p>
                <div>{state.total.toFixed(2)} kr</div>
            </div>
        </div>
    );
}

export default Checkout;*/
