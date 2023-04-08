import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filteredBooks: [],
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    FILTER_BY_SEARCH(state, action) {
      const { books, search } = action.payload;
      const tempBooks = books.filter(
        (book) =>
          book.name.toLowerCase().includes(search.toLowerCase()) ||
          book.category.toLowerCase().includes(search.toLowerCase()) ||
          book.author.toLowerCase().includes(search.toLowerCase()));
      state.filteredBooks = tempBooks;
    },
    SORT_BOOKS(state, action){
        const { books, sort } = action.payload
        let tempBooks = []
        if(sort === 'latest'){
            tempBooks = books
        }
        if(sort === 'a-z'){
            tempBooks = books.slice().sort((a,b) => {
                return a.name.localeCompare(b.name)
            })
        }
        if(sort === 'z-a'){
            tempBooks = books.slice().sort((a,b) => {
                return b.name.localeCompare(a.name)
            })
        }
        state.filteredBooks = tempBooks
    },
    FILTER_BY_CATEGORY(state, action){
      const { books , category} = action.payload;
      let tempBooks = []
      if(category === 'All'){
        tempBooks = books
      }else{
        tempBooks  = books.filter((book) => book.category === category)
      }
      state.filteredBooks = tempBooks;
    },
    FILTER_BY_AUTHOR(state, action){
      const { books , author} = action.payload;
      let tempBooks = []
      if(author === 'All'){
        tempBooks = books
      }else{
        tempBooks  = books.filter((book) => book.author === author)
      }
      state.filteredBooks = tempBooks;
    }
  },
});

export const selectFilteredBooks = (state) => state.filter.filteredBooks;

export const { FILTER_BY_SEARCH, SORT_BOOKS, FILTER_BY_CATEGORY, FILTER_BY_AUTHOR } = filterSlice.actions;

export default filterSlice.reducer;
