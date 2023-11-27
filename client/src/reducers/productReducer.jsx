import {
    ALL_PRODUCT_REQUEST,
    ALL_PRODUCT_SUCCESS,
    ALL_PRODUCT_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    CLEAR_ERRORS,
} from '../constants/productConstants'


// getting all the products 
export const productReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case ALL_PRODUCT_REQUEST: //product requested
            return {
                loading: true,
                products: []
            }

        case ALL_PRODUCT_SUCCESS: //product found and returned 
            return {
                loading: false,
                products: action.payload.products,
                productsCount: action.payload.productsCount,
                resultPerPage: action.payload.resultPerPage,
                filteredProductsCount: action.payload.filteredProductsCount
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

// getting Details of a particular products
export const productDetailsReducer = (state = { product: [] }, action) => {
    switch (action.type) {
        case PRODUCT_DETAILS_REQUEST: //product requested
            return {
                loading: true,
                ...state,
            }

        case PRODUCT_DETAILS_SUCCESS: //product found and returned 
            return {
                loading: false,
                product: action.payload,
            }

        case PRODUCT_DETAILS_FAIL: //failed to fetch the product details
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