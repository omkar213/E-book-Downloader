import React from "react";
import styles from "./Bookitem.module.scss";
import { Link, useNavigate } from "react-router-dom";
import Bookcard from "./../../BookCard/Bookcard";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../../Redux/features/authSlice";
import { toast } from "react-toastify";

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

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const navigate = useNavigate();

  const handleButtonClick = () => {
    if (isLoggedIn) {
      navigate(`/book-details/${id}`);
    } else {
      navigate("/register");
      toast.warn('Create An Account to Download the Free E-Book', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
    }
  };

  return (
    <Bookcard cardClass={`${styles.grid}`}>
      <div className={styles.img}>
        <img src={imageUrl} alt={name} />
      </div>

      <div className={styles.content}>
        <div className={styles.details}>
          <p>{author}</p>
          <h5>{category}</h5>
          <h4>{shortenText(name, 12)}</h4>
        </div>

        {!grid && <p className={styles.desc}>{shortenText(desc, 100)}</p>}
        {/* <button className="--btn --btn-danger">View</button> */}

        <button
          className="viewBtn"
          style={{ verticalAlign: "middle" }}
          onClick={handleButtonClick}
        >
          <span>Download</span>
        </button>
      </div>
    </Bookcard>
  );
};

export default BookItem;
