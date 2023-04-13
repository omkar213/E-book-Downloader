import styles from "./Booklist.module.scss";
import { useEffect, useState } from "react";
import { BsFillGridFill } from "react-icons/bs";
import { FaList } from "react-icons/fa";
import Search from "../../search/Search";
import { useDispatch, useSelector } from "react-redux";
import BookItem from "../bookItem/BookItem";
import {
  FILTER_BY_SEARCH,
  selectFilteredBooks,
  SORT_BOOKS,
} from "../../../Redux/features/filterSlice";
import Pagination from "../../Pagination/Pagination";
import EmailNewsletter from "../../EmailNewsletter/EmailNewsletter";

const BookList = ({ books }) => {
  const [grid, setGrid] = useState(true);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("latest");
  const [showNewsletter, setShowNewsletter] = useState(false);

  const filteredBooks = useSelector(selectFilteredBooks);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage] = useState(9);
  // Get Current Products
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      FILTER_BY_SEARCH({
        books,
        search,
      })
    );
  }, [dispatch, books, search]);

  useEffect(() => {
    if (filteredBooks.length === 0 && search !== "") {
      setShowNewsletter(true);
    } else {
      setShowNewsletter(false);
    }
  }, [filteredBooks, search]);

  useEffect(() => {
    dispatch(
      SORT_BOOKS({
        books,
        sort,
      })
    );
  }, [dispatch, books, sort]);

  return (
    <div className={styles["book-list"]} id="book">
      <div className={styles.top}>
        {/* <div className={styles.icons}>
          <BsFillGridFill
            size={22}
            color="orangered"
            onClick={() => setGrid(true)}
          />
          <FaList size={24} color="#0066d4" onClick={() => setGrid(false)} />

        </div> */}
        <p>
          <b>{filteredBooks.length}</b> Books Available
        </p>

        <div>
          <Search value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>

        <div className={styles.sort}>
          <label>Sort by:</label>
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="latest">Latest</option>
            <option value="a-z">A - Z</option>
            <option value="z-a">Z - A</option>
          </select>
        </div>
      </div>

      <div className={`${styles.grid}`}>
      {filteredBooks.lenght === 0  || showNewsletter ?(
          <EmailNewsletter/>
        ) : (
          <>
            {currentBooks.map((book) => {
              return (
                <div key={book.id}>
                  <BookItem {...book} grid={grid} book={book} />
                </div>
              );
            })}
          </>
        )}
      </div>
      <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          booksPerPage={booksPerPage}
          totalBooks={filteredBooks.length}
        />
    </div>
  );
};

export default BookList;
