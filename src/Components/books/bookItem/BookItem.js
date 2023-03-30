import React from "react";
import styles from "./Bookitem.module.scss";
import Card from "./../../card/Card";
import { Link } from "react-router-dom";

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
    <Card cardClass={grid ? `${styles.grid}` : `${styles.list}`}>
      <Link to={`/book-details/${id}`}>
        <div className={styles.img}>
          <img src={imageUrl} alt={name} />
        </div>
      </Link>
      <div className={styles.content}>
        <Link to={`/book-details/${id}`}>
          <div className={styles.details}>
            <p>{author}</p>
            <h4>{shortenText(name, 22)}</h4>
          </div>
        </Link>
        {!grid && <p className={styles.desc}>{shortenText(desc, 100)}</p>}
        <button className="--btn --btn-danger">Add to BookMark</button>
      </div>
    </Card>
  );
};

export default BookItem;
