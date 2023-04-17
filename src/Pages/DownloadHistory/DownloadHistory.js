import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUserID } from "../../Redux/features/authSlice";
import {
  STORE_DOWNLOADS,
  selectDownloadHistory,
} from "../../Redux/features/downlodsSlice";
import styles from "./Downloadhistory.module.scss";
import Loader from "./../../Components/loader/Loader";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../../Firebase/config";
import { toast } from "react-toastify";
import { Link, useParams } from "react-router-dom";
import UseFetchDoc from "../../reusableCode/UseFetchDoc";


const DownloadHistory = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const downloads = useSelector(selectDownloadHistory);
  const userId = useSelector(selectUserID);
  const dispatch = useDispatch();

  console.log(downloads);

  const getCollection = () => {
    setIsLoading(true);

    try {
      const docRef = collection(db, "downloads");

      const q = query(docRef, orderBy("createAt", "desc"));

      onSnapshot(q, (snapshot) => {
        // console.log(snapshot.docs);
        const allData = snapshot.docs.map((doc, index) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setIsLoading(false);
        // console.log(allData);
        setData(allData);
      });
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getCollection();
  }, []);

  useEffect(() => {
    dispatch(STORE_DOWNLOADS(data));
  }, [dispatch, data]);

  const filteredBooks = downloads.filter(
    (download) => download.userId === userId
  );
  console.log(data);

  return (
    <section>
      <div className={`container ${styles.order}`}>
        <h2>Your Downloads</h2>
        <br />
        <>
          {isLoading && <Loader />}
          <div className={styles.table}>
            {filteredBooks.length === 0 ? (
              <p>No Downlaods</p>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>s/n</th>
                    <th>Date</th>
                    <th>Name of Book</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBooks.map((order, index) => {
                    const { id, downloadDate, name } = order;
                    return (
                      <tr key={id}>
                        <td>{index + 1}</td>
                        <td>{downloadDate}</td>
                        <td>{name}</td>
                        <td className={styles.icons}>
                        <Link to={`/review-book/${id}`}>
                          <button className="--btn --btn-primary">
                            Review Product
                          </button>
                        </Link>
                      </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </>
      </div>
    </section>
  );
};

export default DownloadHistory;
