import { createStore, applyMiddleware } from "redux";
import { reducer } from "./reducer";
import { createWrapper,HYDRATE } from "next-redux-wrapper";
import thunkMiddleware from "redux-thunk"
import { persistStore, persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage";


const makeStore = ({isServer})=>{
    if(isServer){
        return createStore(reducer,bindMiddleware([thunkMiddleware]))
    }else{
        const persistConfig = {
            key: "nextjs",
            storage
        }
        const PReducer = persistReducer(persistConfig,reducer)
        const store = createStore(
            PReducer,
            bindMiddleware([thunkMiddleware])
        )
        store.__persistor = persistStore(store)
        return store
    }
}

export const wrapper = createWrapper(makeStore)