import React, { useEffect, useState } from "react";
import styles from "./Books.module.scss";
import BookFilter from "./bookFilter/BookFilter";
import BookList from "./bookList/BookList";
import { useDispatch, useSelector } from "react-redux";
import { selectBooks, store_Book } from "../../Redux/features/booksSlice";
import spinner from "../../Assets/spinner.jpg";
import { FaCogs } from "react-icons/fa";
import useFetchCollection from '../../customHooks/useFetchCollection';

const Books = () => {
  const {data, isLoading} = useFetchCollection("books");
  const [showFilter, setShowFilter] = useState(false);
  const books = useSelector(selectBooks);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      store_Book({
        books: data,
      })
    );
  }, [dispatch, data]);

  const toggleFilter = () => {
    setShowFilter(!showFilter);
  };
  return (
    <section>
      <div className={`container ${styles.book}`}>
        <aside
          className={
            showFilter ? `${styles.filter} ${styles.show}` : `${styles.filter}`
          }
        >
          {isLoading ? null : <BookFilter toggleFilter={toggleFilter} />}
        </aside>
        <div className={styles.content}>
          {isLoading ? (
            <img
              src={spinner}
              alt="Loading"
              style={{ width: "50px" }}
              className="--center-all"
            />
          ) : (
            <BookList books={books} />
          )}
          <div className={styles.icon} onClick={toggleFilter}>
            <FaCogs size={20} color="orangered" />
            <p>
              <b>{showFilter ? "Hide Filter" : "Show Filter"}</b>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Books;
