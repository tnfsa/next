import { createStore } from "redux";
import { reducer } from "./reducer";

let temp;
if(typeof window === "undefined" || !process.env.NEXT_PRODUCTION === "TRUE"){
    temp = createStore(reducer);
}else{
    temp = createStore(reducer,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
}

export const store = temp
