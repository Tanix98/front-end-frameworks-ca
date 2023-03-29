import { useEffect, useReducer } from 'react';

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
                <div className=''>
                    <p>Total:</p>
                    <div>{state.total.toFixed(2)} kr</div>
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
                            className='btn btn-danger mb-1'
                            type='button'
                        >
                            &times;
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Checkout;
