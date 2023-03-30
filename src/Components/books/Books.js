import React, { useEffect } from "react";
import styles from "./Books.module.scss";
import BookFilter from "./bookFilter/BookFilter";
import BookList from "./bookList/BookList";
import useFetchCollection from "./../../CustomHooks/useFetchCollection";
import { useDispatch, useSelector } from "react-redux";
import { selectBooks, store_Book } from "../../Redux/features/booksSlice";
import spinner from "../../Assets/spinner.jpg";

const Books = () => {
  const { data, isLoading } = useFetchCollection("books");
  const books = useSelector(selectBooks);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      store_Book({
        books: data,
      })
    );
  }, [dispatch, data]);
  return (
    <section>
      <div className={`container ${styles.book}`}>
        <aside className={styles.filter}>
        {isLoading ? null : <BookFilter />}
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
        </div>
      </div>
    </section>
  );
};

export default Books;
