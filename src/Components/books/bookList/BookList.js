import styles from "./Booklist.module.scss";
import { useState } from "react";
import { BsFillGridFill } from "react-icons/bs";
import { FaList } from "react-icons/fa";
import Search from "../../search/Search";
import { useSelector } from "react-redux";
import BookItem from "../bookItem/BookItem";

const BookList = ({ books }) => {
  const [grid, setGrid] = useState(true);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("latest");


  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(9);


  return (
    <div className={styles["book-list"]} id="book">
      <div className={styles.top}>
        <div className={styles.icons}>
          <BsFillGridFill size={22} color="orangered" onClick={() => setGrid(true)}/>
          <FaList size={24} color="#0066d4" onClick={() => setGrid(false)}/>

          <p>
            <b>10</b> Books Available
          </p>
        </div>

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

      <div className={grid ? `${styles.grid}` : `${styles.list}`}>
        {books.length === 0 ? (
          <p>No Books Available.</p>
        ): (
          <>
          {
            books.map((book) => {
              return(
                <div key={book.id}>
                  <BookItem {...book} grid={grid} book={book}/>
                </div>
              )
            })
          }
          </>
        )}
      </div>
    </div>
  );
};

export default BookList;
