import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    books: []
}

const booksSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    store_Book(state, action){
        state.books = action.payload.books
    }
  }
});

export const {store_Book} = booksSlice.actions

export const selectBooks = (state) => state.book.books

export default booksSlice.reducer