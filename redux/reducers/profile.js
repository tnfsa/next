
const initialState = {
    session: null,
    username: "incognito",
    avatar: null, // link of avatar
    account_type: null, // [ admin | store_manager | student ]
    store_id: null, // exist only when account_type is store_manager
}

export const profile = (state = initialState, action) => {
    switch (action.type) {
        case "RESETPROFILE":
            return initialState
        case "SETPROFILE":
            return {
                ...state,
                session: action.payload.session,
                username: action.payload.username,
                avatar: action.payload.avatar,
                account_type: action.payload.account_type,
                store_id: action.payload.store_id,
            }
        default:
            return state;
    }
}