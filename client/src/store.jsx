import { legacy_createStore as createStore, combineReducers, applyMiddleware } from 'redux'
// import { configureStore } from '@reduxjs/toolkit'
import { productDetailsReducer, productReducer } from './reducers/productReducer';
import { forgotPasswordReducer, profileReducer, userReducer } from './reducers/userReducer';
import { cartReducer } from './reducers/cartReducer';
import thunk from "redux-thunk"
import { composeWithDevTools } from 'redux-devtools-extension'

const middleware = [thunk];


const reducer = combineReducers({
    products: productReducer,
    productDetails: productDetailsReducer,
    user: userReducer,
    profile: profileReducer,
    forgotPassword: forgotPasswordReducer,
    cart: cartReducer
});

let initialState = {
    cart: {
        cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [],
    }
};

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

// const store = configureStore({
    //     reducer,
    //     initialState,
// })


export default store;