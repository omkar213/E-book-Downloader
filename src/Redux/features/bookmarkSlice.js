import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  bookItems: localStorage.getItem("bookItems")
    ? JSON.parse(localStorage.getItem("bookItems"))
    : [],
  bookTotalQuantity: 0,
  previousURL: "",
};

const bookmarkSlice = createSlice({
  name: "bookmark",
  initialState,
  reducers: {
    ADD_TO_BOOKMARK(state, action) {
      console.log(action.payload)
      const bookIndex = state.bookItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (bookIndex >= 0) {
        // Item already exists in the my bookmark section
        toast.warning(`${action.payload.name} is already bookmarked`, {
            position: "top-left",
          });
      } else {
        // Item doesn't exists in the my bookmark section
        // Add item to the cart
        const tempBook = { ...action.payload, bookMarkQuantity: 1 };
        state.bookItems.push(tempBook);
        toast.success(`${action.payload.name} added to bookmark`, {
          position: "top-left",
        });
      }
      localStorage.setItem("bookItems", JSON.stringify(state.bookItems));
    },

    REMOVE_BOOKMARK(state,action){
      const newBookMark = state.bookItems.filter(
        (item) => item.id !== action.payload.id
      );

      state.bookItems = newBookMark;
      toast.success(`${action.payload.name} removed from Bookmarks`, {
        position: "top-left",
      });

      localStorage.removeItem("bookItems", JSON.stringify(state.bookItems));
    },
    CLEAR_BOOKMARKS(state, action) {
      state.bookItems = [];
      toast.info(`Bookmarks cleared`, {
        position: "top-left",
      });

      localStorage.setItem("bookItems", JSON.stringify(state.bookItems));
    },
    CALCULATE_TOTAL_BOOKMARKS(state, action) {
      const array = [];
      state.bookItems.map((item) => {
        const { totalBookmarks } = item;
        const quantity = totalBookmarks;
        return array.push(quantity);
      });
      const totalQuantity = array.reduce((a, b) => {
        return a + b;
      }, 0);
      state.bookTotalQuantity = totalQuantity;
    },
    SAVE_URL(state, action) {
      console.log(action.payload);
      state.previousURL = action.payload;
    },
  },
});

export const { ADD_TO_BOOKMARK, REMOVE_BOOKMARK, CALCULATE_TOTAL_BOOKMARKS, SAVE_URL, CLEAR_BOOKMARKS } = bookmarkSlice.actions;

export const selectBookItems = (state) => state.bookmark.bookItems;
export const selectBookTotalQuantity = (state) =>
  state.bookmark.bookTotalQuantity;
export const selectPreviousURL = (state) => state.bookmark.previousURL;

export default bookmarkSlice.reducer;
