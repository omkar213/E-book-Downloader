import React, { useEffect } from "react";
import useFetchCollection from "../../customHooks/useFetchCollection";
import { useDispatch, useSelector } from "react-redux";
import { selectUserID } from "../../Redux/features/authSlice";
import { STORE_DOWNLOADS, selectDownloadHistory } from "../../Redux/features/downlodsSlice";
import styles from './Downloadhistory.module.scss';
import Loader from './../../Components/loader/Loader';


const DownloadHistory = () => {
  const { data, isLoading } = useFetchCollection("downloads");
  const downloads = useSelector(selectDownloadHistory);
  const userId = useSelector(selectUserID);
  const dispatch = useDispatch();
  console.log(downloads);
  console.log(data);

  useEffect(() => {
    dispatch(STORE_DOWNLOADS(data));
  }, [dispatch, data]);

  const filteredBooks = downloads.filter((download) => download.userId === userId);
  console.log(filteredBooks);

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
                    const {
                      id,
                      downloadDate,
                      name
                    } = order;
                    return (
                      <tr key={id}>
                        <td>{index + 1}</td>
                        <td>{downloadDate}</td>
                        <td>{name}</td>
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
