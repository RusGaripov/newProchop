// import { createStore, combineReducers, applyMiddleware } from 'redux'
// import thunk from 'redux-thunk'
// import { composeWithDevTools } from 'redux-devtools-extension'

// const reducer = combineReducers({})

// const initialState = {}

// const middleware = [thunk]

// const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

// export default store 

import { configureStore } from '@reduxjs/toolkit';
import { productListReducer,productDetailsReducer} from './reducers/productsReducer';
// import { authReducer } from './slices/auth';

const store = configureStore({
    reducer: {
         productList: productListReducer,
         productDetails: productDetailsReducer,
    },
});

export default store;