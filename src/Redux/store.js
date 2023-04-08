import { configureStore, combineReducers, getDefaultMiddleware } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import bookReducer from "./features/booksSlice";
import fliterReducer from "./features/filterSlice";
import bookmarkReducer from "./features/bookmarkSlice";

const rootReducer = combineReducers({
    auth: authReducer,
    book: bookReducer,
    filter: fliterReducer,
})

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
})

export default store;

