import { configureStore, combineReducers, getDefaultMiddleware } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import bookReducer from "./features/booksSlice";
import fliterReducer from "./features/filterSlice";
import downloadReducer from "./features/downlodsSlice";

const rootReducer = combineReducers({
    auth: authReducer,
    book: bookReducer,
    filter: fliterReducer,
    downloads: downloadReducer
})

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
})

export default store;

