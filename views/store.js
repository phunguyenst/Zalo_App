import {combineReducers, configureStore } from "@reduxjs/toolkit";
import conservationReducer from "../views/slide/ConsevationSlide";
import loginReducer from "../views/slide/LoginSlide";
import messageReducer from "../views/slide/MessageSlide";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist';
const rootReducer = combineReducers({
    // user: userReducer,
    conservation: conservationReducer,
    auth: loginReducer,
    message: messageReducer,
    
})

const presistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['auth', 'conservation', 'message', 'isLogin'],
    blacklist: ['register'],
}
const persistedReducer = persistReducer(presistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
