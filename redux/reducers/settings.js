const initialState = {
    theme: "white",
    redirect: null,
}

export const settings = (state = initialState, action) =>{
    switch (action.type){
        case "SETREDIRECT":
            return {
                ...state,
                redirect: action.payload.redirect
            }
        case "SETTHEME":
            return {
                ...state,
                theme: action.payload.color
            }
        default:
            return state
    }
}
