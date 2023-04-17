import styles from "./ViewBooks.module.scss";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Notiflix from "notiflix";
import {
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db, storage } from "../../../Firebase/config";
import { Link } from "react-router-dom";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { deleteObject, ref } from "firebase/storage";
import Loader from "./../../loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { selectBooks, store_Book } from "../../../Redux/features/booksSlice";
import useFetchCollection from "../../../hooks/useFetchCollection";
import { FILTER_BY_SEARCH, selectFilteredBooks } from "../../../Redux/features/filterSlice";
import Search from "../../search/Search";
import Pagination from "../../Pagination/Pagination";



const ViewBooks = () => {
  const { data, isLoading } = useFetchCollection("books");
  const filteredBooks = useSelector(selectFilteredBooks);

  const books = useSelector(selectBooks)
  const dispatch = useDispatch();

  const [search, setSearch] = useState("");
 // Pagination states
 const [currentPage, setCurrentPage] = useState(1);
 const [booksPerPage] = useState(9);
 // Get Current Products
 const indexOfLastBook = currentPage * booksPerPage;
 const indexOfFirstBook = indexOfLastBook - booksPerPage;
 const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);

  useEffect(() => {
    dispatch(
      FILTER_BY_SEARCH({
        books,
        search,
      })
    );
  }, [dispatch, books, search]);

  useEffect(() => {
    dispatch(
      store_Book({
        books: data,
      })
    );
  },[dispatch, data]);

  const confirmDelete = (id, imageUrl, file) => {
    Notiflix.Confirm.show(
      "Delete Book",
      "Do you really want to delete the book?",
      "Delete",
      "Cancel",
      function okCb() {
        deleteBook(id, imageUrl, file);
      },
      function cancelCb() {
        console.log("delete cancel");
      },
      {
        width: "320px",
        borderRadius: "3px",
        titleColor: "orangered",
        okButtonBackground: "orangered",
        cssAnimationStyle: "zoom",
        // etc...
      }
    );
  };

  const deleteBook = async (id, imageUrl, file) => {
    try {
      await deleteDoc(doc(db, "books", id));

      const imageRef = ref(storage, imageUrl);
      const pdfRef = ref(storage, file);

      await Promise.all([deleteObject(imageRef), deleteObject(pdfRef)]);
      toast.success("Book Deleted Succefully");
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <>
      {isLoading && <Loader />}
      <div className={styles.table}>
        <h2>All Books</h2>
        <div className={styles.search}>
          <p>
            <b>{filteredBooks.length}</b> Books Found.
          </p>
          <Search value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        {filteredBooks.length === 0 ? (
          <p>No Books Found</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>S/N</th>
                <th>Image</th>
                <th>Name</th>
                <th>Language</th>
                <th>Author</th>
                <th>Category</th>
                <th>Publisher</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentBooks.map((book, index) => {
                const {
                  author,
                  id,
                  category,
                  imageUrl,
                  name,
                  publisher,
                  language,
                  file,
                } = book;
                return (
                  <tr key={id}>
                    <td>{index + 1}</td>
                    <td>
                      <img
                        src={imageUrl}
                        alt={name}
                        style={{ width: "100px" }}
                      />
                    </td>
                    <td>{name}</td>
                    <td>{language}</td>
                    <td>{author}</td>
                    <td>{category}</td>
                    <td>{publisher}</td>
                    <td className={styles.icons}>
                      <Link to={`/admin/add-book/${id}`}>
                        <FaEdit size={20} color="green" />
                      </Link>
                      &nbsp;
                      <FaTrashAlt
                        className=""
                        size={18}
                        color="red"
                        onClick={() => confirmDelete(id, imageUrl, file)}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          booksPerPage={booksPerPage}
          totalBooks={filteredBooks.length}
        />
      </div>
    </>
  );
};

export default ViewBooks;
