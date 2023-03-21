import { configureStore, combineReducers, getDefaultMiddleware } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import bookReducer from "./features/booksSlice";

const rootReducer = combineReducers({
    auth: authReducer,
    book: bookReducer,
})

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
})

export default store;

