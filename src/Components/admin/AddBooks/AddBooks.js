import { useState } from "react";
import Card from "../../card/Card";
import styles from "./AddBooks.module.scss";

const categories = [
  { id: 1, name: "Adventure" },
  { id: 2, name: "Academic & Education" },
  { id: 3, name: "Art" },
  { id: 4, name: "Biography" },
  { id: 5, name: "Business" },
  { id: 6, name: "Classic" },
  { id: 7, name: "Children & Youth" },
  { id: 8, name: "Environment" },
  { id: 9, name: "Environment" },
  { id: 10, name: "Health & Fitness" },
  { id: 11, name: "Lifestyle" },
  { id: 12, name: "Personal Growth" },
  { id: 13, name: "Politics & Laws" },
  { id: 14, name: "Religion" },
  { id: 15, name: "Science & Research" },
  { id: 16, name: "Technology" },
];

const AddBooks = () => {
  const [book, setBook] = useState({
    name: "",
    imageUrl: "",
    category: "",
    author: "",
    desc: "",
    language: "",
    publisher: "",
    file: "",
  });

  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setBook({
      ...book, [name]: value
    })
  };
  const handleImageChange = (e) => {};

  const addBook = (e) => {
    e.preventDefault();
    console.log(book);
  };

  return (
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
            <div className={styles.progress}>
              <div className={styles["progress-bar"]} style={{ width: "50%" }}>
                Uploading 50%
              </div>
            </div>
            <input
              type="file"
              accept="image/*"
              placeholder="Cover Image"
              name="image"
              onChange={(e) => handleImageChange(e)}
            />
            <input
              type="text"
              // required
              name="imageUrl"
              value={book.imageUrl}
              disabled
            />
          </Card>

          <label>Book PDF File: </label>
          <Card cardClass={styles.group}>
            <div className={styles.progress}>
              <div className={styles["progress-bar"]} style={{ width: "50%" }}>
                Uploading 50%
              </div>
            </div>
            <input
              type="file"
              accept="pdf"
              placeholder="Cover Image"
              name="pdf"
              onChange={(e) => handleImageChange(e)}
            />
            <input
              type="text"
              // required
              name="file"
              value={book.file}
              disabled
            />
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
  );
};

export default AddBooks;
