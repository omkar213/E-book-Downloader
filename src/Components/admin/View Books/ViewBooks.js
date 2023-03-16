import styles from "./ViewBooks.module.scss";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { db, storage } from "../../../Firebase/config";
import { Link } from "react-router-dom";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { deleteObject, ref } from "firebase/storage";
import Loader from './../../loader/Loader';

const ViewBooks = () => {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getBooks = () => {
    setIsLoading(true);

    try {
      const booksRef = collection(db, "books");

      const q = query(booksRef, orderBy("createAt", "desc"));

      onSnapshot(q, (snapshot) => {
        console.log(snapshot.docs);
        const allBooks = snapshot.docs.map((doc, index) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setIsLoading(false);
        console.log(allBooks);
        setBooks(allBooks);
      });
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getBooks();
  }, []);

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
    {isLoading && <Loader/>}
      <div className={styles.table}>
        <h2>All Books</h2>
        {books.length === 0 ? (
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
              {books.map((book, index) => {
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
                      <Link to="/admin/add-book">
                        <FaEdit size={20} color="green" />
                      </Link>
                      &nbsp;
                      <FaTrashAlt
                        className=""
                        size={18}
                        color="red"
                        onClick={() => deleteBook(id, imageUrl, file)}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default ViewBooks;
