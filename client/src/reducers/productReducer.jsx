import {
    ALL_PRODUCT_REQUEST,
    ALL_PRODUCT_SUCCESS,
    ALL_PRODUCT_FAIL,
    CLEAR_ERRORS
} from '../constants/productConstants'

export const productReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case ALL_PRODUCT_REQUEST: //product requested
            return {
                loadingL: true,
                products: []
            }

        case ALL_PRODUCT_SUCCESS: //product found and returned 
            return {
                loading: false,
                products: action.payload.products,
                productsCount: action.payload.productCount
            }

        case ALL_PRODUCT_FAIL: //failed to fetch the product
            return {
                loading: false,
                error: action.payload
            }

        case CLEAR_ERRORS: //clear the errors
            return {
                ...state,
                error: null
            }

        default:
            return state;
    }
}