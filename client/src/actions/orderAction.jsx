import {
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAIL,
    MY_ORDERS_REQUEST,
    MY_ORDERS_FAIL,
    MY_ORDERS_SUCCESS,
    CLEAR_ERRORS,
} from "../constants/orderConstants";
import axios from "axios";

// Create Order
export const createOrder = (order) => async (dispatch) => {
    try {
        dispatch({ type: CREATE_ORDER_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        
        // send the order details to the backend
        const { data } = await axios.post("/api/v1/order/new", order, config);

        dispatch({ type: CREATE_ORDER_SUCCESS, payload: data });
    } catch (error) {
        console.log("error", error)
        dispatch({
            type: CREATE_ORDER_FAIL,
            payload: error.response.data.message,
        });
    }
};


// Fetch a particular user Orders
export const myOrders = () => async (dispatch) => {
    try {
        dispatch({ type: MY_ORDERS_REQUEST });

        const { data } = await axios.get("/api/v1/orders/me");

        dispatch({ type: MY_ORDERS_SUCCESS, payload: data.orders });
    } catch (error) {
        dispatch({
            type: MY_ORDERS_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};