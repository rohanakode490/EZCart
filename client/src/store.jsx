import { legacy_createStore as createStore, combineReducers, applyMiddleware } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import { productDetailsReducer, productReducer } from './reducers/productReducer';
import { forgotPasswordReducer, profileReducer, userReducer } from './reducers/userReducer';
// import thunk from "redux-thunk"
// import { composeWithDevTools } from 'redux-devtools-extension'

// const middleware = [thunk];

// const store = createStore(reduAcer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

const reducer = combineReducers({
    products: productReducer,
    productDetails: productDetailsReducer,
    user: userReducer,
    profile: profileReducer,
    forgotPassword: forgotPasswordReducer
});

let initialState = {};
const store = configureStore({
    reducer,
    initialState
})


export default store;