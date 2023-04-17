import { useEffect, useState } from 'react'
import { selectUserID, selectUserName } from '../../Redux/features/authSlice'
import styles from './ReviewBooks.module.scss'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import UseFetchDoc from '../../reusableCode/UseFetchDoc'
import { Timestamp, addDoc, collection } from 'firebase/firestore'
import { toast } from 'react-toastify'
import { db } from '../../Firebase/config'
import Card from './../card/Card';
import spinnerImg from '../../Assets/spinner.jpg'
import StarsRating from 'react-star-rate'


const ReviewBooks = () => {
  const [rate, setRate] = useState(0);
  const [review, setReview] = useState("");
  const [book, setBook] = useState(null);
  const { id } = useParams();
  const { document } = UseFetchDoc("books", id);
  const userID = useSelector(selectUserID);
  const userName = useSelector(selectUserName);  

  useEffect(() => {
    setBook(document);
  }, [document]);

  const submitReview = (e) => {
    e.preventDefault();

    const today = new Date();
    const date = today.toDateString();
    const reviewConfig = {
      userID,
      userName,
      bookId: id,
      rate,
      review,
      reviewDate: date,
      createdAt: Timestamp.now().toDate(),
    };
    try {
      addDoc(collection(db, "reviews"), reviewConfig);
      toast.success("Review submitted successfully");
      setRate(0);
      setReview("");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <section>
      <div className={`container ${styles.review}`}>
        <h2>Review Products</h2>
        {book === null ? (
          <img src={spinnerImg} alt="Loading..." style={{ width: "50px" }} />
        ) : (
          <>
            <p>
              <b>book name:</b> {book.name}
            </p>
            <img
              src={book.imageUrl}
              alt={book.name}
              style={{ width: "100px" }}
            />
          </>
        )}

        <Card cardClass={styles.card}>
          <form onSubmit={(e) => submitReview(e)}>
            <label>Rating:</label>
            <StarsRating
              value={rate}
              onChange={(rate) => {
                setRate(rate);
              }}
            />
            <label>Review</label>
            <textarea
              value={review}
              required
              onChange={(e) => setReview(e.target.value)}
              cols="30"
              rows="10"
            ></textarea>
            <button type="submit" className="--btn --btn-primary">
              Submit Review
            </button>
          </form>
        </Card>
      </div>
    </section>
  )
}

export default ReviewBooks