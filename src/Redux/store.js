import { configureStore, combineReducers, getDefaultMiddleware } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import bookReducer from "./features/booksSlice";
import fliterReducer from "./features/filterSlice";
import downloadReducer from "./features/downlodsSlice";
import subscribeReudcer from './features/fetchSubscribersSlice'
import usersReducers from './features/usersSlice'

const rootReducer = combineReducers({
    auth: authReducer,
    book: bookReducer,
    filter: fliterReducer,
    downloads: downloadReducer,
    subscribers: subscribeReudcer,
    users: usersReducers
})

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
})

export default store;

