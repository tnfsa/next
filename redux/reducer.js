
export const initialState = {

    profile: {
        session: null,
        username: "incognito",
        avatar: null, // link of avatar
        account_type: null, // [ admin | store_manager | student ]
        store_id: null, // exist only when account_type is store_manager
    },
    /*stores: [
        {
            storename: "test",
            uuid: null,
            info: null,
            products: [
                {
                    name: "elephant fried rice",
                    uuid: "12345-12345-12345-12345",
                    description: "good to eat",
                }
            ]
        }
    ]*/
}

export const reducer = (state = initialState, action) => {
    switch(action.type){
        case "RESETPROFILE":
            return {
                ...state,
                profile:{
                    session: null,
                    username: "incognito",
                    avatar: null,
                    account_type: null,
                    store_id: null,
                }
            }
        case "SETPROFILE":
            console.log(action.payload)
            return{
                ...state,
                profile:{
                    session: action.payload.session,
                    username: action.payload.username,
                    avatar: action.payload.avatar,
                    account_type: action.payload.account_type,
                    store_id: action.payload.store_id,
                }
            }
        default:
            return state;
    }
}