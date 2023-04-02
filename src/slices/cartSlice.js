import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const cartSlice = createSlice({
    // The name of our reducer
    name: 'cart',
    // The initial state of our reducer
    initialState,
    // These are the actions that will be made available
    reducers: {
        addToCart: (state, { payload }) => {
            const { id } = payload;
            const itemExists = state.find((item) => item.id === id);
            if (itemExists) {
                return state.map((item) => {
                    if (item.id === id) {
                        return {
                            ...item,
                            quantity: item.quantity + 1,
                        };
                    }
                    return item;
                });
            } else {
                state.push({
                    ...payload,
                    quantity: 1,
                });
            }
        },
        increment: (state, { payload }) => {
            return state.map((item) => {
                if (item.id === payload) {
                    return {
                        ...item,
                        quantity: item.quantity + 1,
                    };
                }
                return item;
            });
        },
        decrement: (state, { payload }) => {
            return state.map((item) => {
                if (item.id === payload) {
                    if (item.quantity === 1) {
                        return item;
                    } else {
                        return {
                            ...item,
                            quantity: item.quantity - 1,
                        };
                    }
                }
                return item;
            });
        },
        deleteItem: (state, action) => {
            /* old code, did not work
            deleteItem: (state, { payload })  => {
            state = state.filter(({ item }) => item.id !== action.payload);
            },*/
            const index = state.findIndex((item) => item.id === action.payload);
            state.splice(index, 1);
        },
        clearCart: () => {
            return [];
        },
    },
});

export const { addToCart, increment, decrement, clearCart, deleteItem } =
    cartSlice.actions;

const cartReducer = cartSlice.reducer;
export default cartReducer;

/*

decrement: (state, { payload }) => {
            return state.map((item) => {
                if (item.id === payload) {
                    if (item.quantity < 1) {
                        return state.splice(item, 1);
                    } else {
                    return {
                        ...item,
                        quantity: item.quantity - 1,
                    };
                }
                
                }
                return state;
            });
        },

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    products: [],
    cartTotal: 0,
};

export const cartSlice = createSlice({
    // The name of our reducer
    name: 'cart',
    // The initial state of our reducer
    initialState,
    // These are the actions that will be made available
    reducers: {
        addProduct: (state) => {
            state.value += 1;
        },
        removeProduct: (state) => {
            state.value += 1;
        },
        deleteProduct: (state) => {
            state.value += 1;
        },
    },
});

export const { addProduct, removeProduct, deleteProduct } = cartSlice.actions;

export default cartSlice.reducer;


*/
