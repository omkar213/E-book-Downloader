import { useState } from "react";
import Card from "../../card/Card";
import styles from "./AddBooks.module.scss";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db, storage } from "../../../Firebase/config";
import { toast } from "react-toastify";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import Loader from "../../loader/Loader";

const categories = [
  { id: 1, name: "Editor's Picks" },
  { id: 2, name: "Most Popular" },
  { id: 3, name: "Adventure" },
  { id: 4, name: "Academic & Education" },
  { id: 5, name: "Art" },
  { id: 6, name: "Biography" },
  { id: 7, name: "Business" },
  { id: 8, name: "Classic" },
  { id: 9, name: "Children & Youth" },
  { id: 10, name: "Environment" },
  { id: 11, name: "Fiction & Literature" },
  { id: 12, name: "Health & Fitness" },
  { id: 13, name: "Lifestyle" },
  { id: 14, name: "Personal Growth" },
  { id: 15, name: "Politics & Laws" },
  { id: 16, name: "Religion" },
  { id: 17, name: "Science & Research" },
  { id: 18, name: "Technology" },
];

const initialState = {
  name: "",
  imageUrl: "",
  category: "",
  author: "",
  desc: "",
  language: "",
  publisher: "",
  file: "",
};

const AddBooks = () => {
  const [book, setBook] = useState({
    ...initialState
  });

  const [uploadProgress, setUploadProgress] = useState(0);
  const [fileuploadProgress, setFileUploadProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBook({
      ...book,
      [name]: value,
    });
  };
  //function for cover image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    // console.log(file);
    const storageRef = ref(storage, `e-Book/${Date.now()}${file.name}`);

    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (error) => {
        // Handle unsuccessful uploads
        toast.error(error.message);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setBook({ ...book, imageUrl: downloadURL });
          toast.success("Image Uploaded Successfully!!");
        });
      }
    );
  };
  //function for file upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    // console.log(file);
    const storageRef = ref(storage, `e-BookPdf/${Date.now()}${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFileUploadProgress(progress);
      },
      (error) => {
        // Handle unsuccessful uploads
        toast.error(error.message);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setBook({ ...book, file: downloadURL });
          toast.success("PDF Uploaded Successfully!!");
        });
      }
    );
  };

  const addBook = (e) => {
    e.preventDefault();
    // console.log(book);
    setIsLoading(true);
    try {
      const docRef = addDoc(collection(db, "books"), {
        name: book.name,
        imageUrl: book.imageUrl,
        category: book.category,
        author: book.author,
        desc: book.desc,
        language: book.language,
        publisher: book.publisher,
        file: book.file,
        createAt: Timestamp.now().toDate(),
      });
      setIsLoading(false);
      setBook({ ...initialState });
      setFileUploadProgress(0);
      setUploadProgress(0);
      toast.success("Book Uploaded Successfully 😊");
      navigate("/admin/all-book");
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  return (
    <>
    {isLoading && <Loader />}
      <div className={styles.product}>
        <h1>Add New Books</h1>
        <Card cardClass={styles.card}>
          <form onSubmit={addBook}>
            <label>Book Name / Title: </label>
            <input
              type="text"
              placeholder="Book Name"
              required
              name="name"
              value={book.name}
              onChange={(e) => handleInputChange(e)}
            />

            <label>Book Cover Image: </label>
            <Card cardClass={styles.group}>
              {uploadProgress === 0 ? null : (
                <div className={styles.progress}>
                  <div
                    className={styles["progress-bar"]}
                    style={{ width: `${uploadProgress}%` }}
                  >
                    {uploadProgress < 100
                      ? `Uploading ${uploadProgress}`
                      : `Upload Complete ${uploadProgress}%`}
                  </div>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                placeholder="Cover Image"
                name="image"
                onChange={(e) => handleImageChange(e)}
              />
              {book.imageUrl === "" ? null : (
                <input
                  type="text"
                  // required
                  name="imageUrl"
                  value={book.imageUrl}
                  disabled
                />
              )}
            </Card>

            <label>Book PDF File: </label>
            <Card cardClass={styles.group}>
              {fileuploadProgress === 0 ? null : (
                <div className={styles.progress}>
                  <div
                    className={styles["progress-bar"]}
                    style={{ width: `${fileuploadProgress}%` }}
                  >
                    {fileuploadProgress < 100
                      ? `Uploading ${fileuploadProgress}`
                      : `Upload Complete ${fileuploadProgress}%`}
                  </div>
                </div>
              )}
              <input
                type="file"
                accept="pdf"
                placeholder="Cover Image"
                name="pdf"
                onChange={(e) => handleFileChange(e)}
              />
              {book.file === "" ? null : (
                <input
                  type="text"
                  // required
                  name="file"
                  value={book.file}
                  disabled
                />
              )}
            </Card>

            <label>Name of Author: </label>
            <input
              type="text"
              placeholder="Name of author"
              required
              name="author"
              value={book.author}
              onChange={(e) => handleInputChange(e)}
            />

            <label>Language of the Book: </label>
            <input
              type="text"
              placeholder="Language"
              required
              name="language"
              value={book.language}
              onChange={(e) => handleInputChange(e)}
            />

            <label>Book Category:</label>
            <select
              required
              name="category"
              value={book.category}
              onChange={(e) => handleInputChange(e)}
            >
              <option value="" disabled>
                -- choose book category --
              </option>
              {categories.map((cat) => {
                return (
                  <option key={cat.id} value={cat.name}>
                    {cat.name}
                  </option>
                );
              })}
            </select>

            <label>Publisher: </label>
            <input
              type="text"
              placeholder="Publisher"
              required
              name="publisher"
              value={book.publisher}
              onChange={(e) => handleInputChange(e)}
            />

            <label>Book Description</label>
            <textarea
              name="desc"
              required
              value={book.desc}
              onChange={(e) => handleInputChange(e)}
              cols="30"
              rows="10"
            ></textarea>

            <button className="--btn --btn-primary">Save Book</button>
          </form>
        </Card>
      </div>
    </>
  );
};

export default AddBooks;
