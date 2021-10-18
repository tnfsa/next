const initialState = {
    from: 'cart', // ['cart','instant']
    selected: {
        /*
        storeId:{
            productId:{
                qty: 1
            },
            productId:{
                qty: 1
            }
        }
        */
    },
    instant: {
        store_id: null,
        product_id: null,
        qty: null,
        order_time: null,
        options: null,
        comment: null,
        store_name: null,
    },
}

export const cart = (state = initialState, action) => {
    let configState = state;
    switch (action.type) {
        case "CART_ADDITEM":
            configState["selected"][action.payload.store][action.payload.product] = {
                qty: action.payload.qty
            }
            return configState;
        case "CART_CONFIGITEM":
            configState["selected"][action.payload.store][action.payload.product] = {
                qty: action.payload.qty
            }
            return configState;
        case "CART_SETFROM":
            return {
                ...state,
                from: action.payload.from
            }
        case "CART_SETINSTANT":
            return {
                ...state,
                instant: action.payload
            }
        case "CART_INSTANT_CLEAR":
            return {
                ...state,
                instant: {
                    store_id: null,
                    product_id: null,
                    qty: null,
                    order_time: null,
                    options: null,
                    comment: null,
                    store_name: null,
                },
                from: "cart"
            }
            case "CART_CART_CLEAR":
                return{
                    ...state,
                    selected: {}
                }
        default:
            return state
    }
}