import { ADD_TO_CART } from "../constants/cartConstants";

export const cartReducer = (state = { cartItems: [] }, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            const item = action.payload;
            
            const isItemExist = state.cartItems.find(
                (i) => i.product === item.product       // i.product = id of product
            );

            if (isItemExist) {
                return {
                    ...state,
                    cartItems: state.cartItems.map((i) =>
                        i.product === isItemExist.product ? item : i
                    ),
                };
            } else {
                // if it does not exists in cart
                return {
                    ...state,
                    cartItems: [...state.cartItems, item],
                };
            } 

        default:
            return state;
    }
};