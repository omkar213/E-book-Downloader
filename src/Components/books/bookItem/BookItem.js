import React from "react";
import styles from "./Bookitem.module.scss";
import { Link } from "react-router-dom";
import Bookcard from "./../../BookCard/Bookcard";

const BookItem = ({
  grid,
  book,
  author,
  id,
  category,
  imageUrl,
  name,
  file,
  desc,
}) => {
  const shortenText = (text, n) => {
    if (text.length > n) {
      const shortendText = text.substring(0, n).concat("...");
      return shortendText;
    }
    return text;
  };

  return (
    <Bookcard cardClass={`${styles.grid}`}>
      <Link to={`/book-details/${id}`}>
        <div className={styles.img}>
          <img src={imageUrl} alt={name} />
        </div>
      </Link>
      <div className={styles.content}>
        <Link to={`/book-details/${id}`}>
          <div className={styles.details}>
            <p>{author}</p>
            <h5>{category}</h5>
            <h4>{shortenText(name, 12)}</h4>
          </div>
        </Link>
        {!grid && <p className={styles.desc}>{shortenText(desc, 100)}</p>}
        {/* <button className="--btn --btn-danger">View</button> */}
        <Link to={`/book-details/${id}`}>
          <button className="viewBtn" style={{ verticalAlign: "middle" }}>
            <span>Download</span>
          </button>
        </Link>
      </div>
    </Bookcard>
  );
};

export default BookItem;
