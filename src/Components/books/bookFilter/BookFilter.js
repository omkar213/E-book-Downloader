import React, { useEffect } from "react";
import styles from "./Bookfilter.module.scss";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { selectBooks } from "../../../Redux/features/booksSlice";
import { useState } from "react";
import { FILTER_BY_AUTHOR, FILTER_BY_CATEGORY } from "../../../Redux/features/filterSlice";

const BookFilter = () => {
  const [category, setCategory] = useState("All");
  const [author, setAuthor] = useState("A");
  const books = useSelector(selectBooks);
  const dispatch = useDispatch();

  const allCategories = ["All", ...new Set(books.map((book) => book.category))];

  const allAuthors = ["All", ...new Set(books.map((book) => book.author))];
  // console.log(allAuthors);

  useEffect(() => {
    dispatch(FILTER_BY_AUTHOR({ books, author}))
  }, [dispatch,books,author])

  const filterBooks = (cat) => {
    setCategory(cat);
    dispatch(FILTER_BY_CATEGORY({ books, category: cat }));
  };

  const clearFilters = () => {
    setAuthor('All');
    setCategory('All')
  }
  return (
    <div className={styles.filter}>
      <h4>Categories</h4>
      <div className={styles.category}>
        {allCategories.map((cat, index) => {
          return (
            <button
              key={index}
              type="button"
              className={`${category}` === cat ? `${styles.active}` : null}
              onClick={() => filterBooks(cat)}
            >
              &#8250; {cat}
            </button>
          );
        })}
      </div>
      <h4>Authors</h4>
      <div className={styles.author}>
        <select value={author} onChange={(e) => setAuthor(e.target.value)}>
          {allAuthors.map((auth,index) => {
            return <option key={index} value={auth}>{auth}</option>;
          })}
        </select>
      </div>
      <br />
      <button className="--btn --btn-danger" onClick={clearFilters}>Clear Filters</button>
    </div>
  );
};

export default BookFilter;
