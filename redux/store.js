import { combineReducers, createStore } from "redux";
import storage from "redux-persist/lib/storage";

import { profile } from './reducers/profile'
import { settings } from './reducers/settings'
import { cart } from './reducers/cart'

import {
    persistStore,
    persistReducer,
} from "redux-persist"

const persistConfig = {
    key: 'storage',
    storage
}

const reducers = combineReducers({
    profile,
    settings,
    cart,
})

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = createStore(persistedReducer)
export const persistor = persistStore(store)