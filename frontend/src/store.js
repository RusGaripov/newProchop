// import { createStore, combineReducers, applyMiddleware } from 'redux'
// import thunk from 'redux-thunk'
// import { composeWithDevTools } from 'redux-devtools-extension'

// const reducer = combineReducers({})

// const initialState = {}

// const middleware = [thunk]

// const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

// export default store 

import { configureStore } from '@reduxjs/toolkit';
import { productListReducer, productDetailsReducer } from './reducers/productsReducer';
import { cartReducer } from './reducers/cartReducer';
// import { authReducer } from './slices/auth';


const cartItemsFromStorage = localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems'))
    : []

const initialState = {
    cart: { cartItems: cartItemsFromStorage }
}

const store = configureStore({
    reducer: {
        productList: productListReducer,
        productDetails: productDetailsReducer,
        cart: cartReducer,
    },
    preloadedState: initialState,
})


export default store;