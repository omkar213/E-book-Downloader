import React, { useEffect, useState } from "react";
import styles from "./Bookdetails.module.scss";
import { Link, useNavigate, useParams } from "react-router-dom";
import { db } from "./../../../Firebase/config";
import { Timestamp, addDoc, collection, doc } from "firebase/firestore";
import { getDoc } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import spinnerImg from "../../../Assets/spinner.jpg";
import { getMetadata, getStorage } from "firebase/storage";
import { FirebaseStorage, getDownloadURL, ref } from "firebase/storage";
import app from "./../../../Firebase/config";
import DownloadBtn from "../../DownloadBtn/DownloadBtn";
import { useDispatch, useSelector } from "react-redux";
import {
  selectEmail,
  selectIsLoggedIn,
  selectUserID,
  selectUserName,
} from "../../../Redux/features/authSlice";
import { STORE_DOWNLOADS } from "../../../Redux/features/downlodsSlice";

const BookDetails = () => {
  const { id } = useParams();

  const [book, setBook] = useState(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const userName = useSelector(selectUserName);
  const userEmail = useSelector(selectEmail);
  const userId = useSelector(selectUserID);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const FirebaseStorage = getStorage(app);

  const getBook = async () => {
    const docRef = doc(db, "books", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      // console.log("Document data:", docSnap.data());
      const obj = {
        id: id,
        ...docSnap.data(),
      };
      setBook(obj);
    } else {
      toast.error("BOOK NOT FOUND 😖");
    }
  };

  // const showLoadingToast = () => {
  //   toast.promise(
  //     new Promise((resolve, reject) => {
  //       setTimeout(() => {
  //         resolve();
  //       }, 2000);
  //     }),
  //     {
  //       pending: "Fetching File From Server..",
  //       success: "File Load Successfully!",
  //       error: "Error While downloading File",
  //     },
  //     {
  //       position: "top-center",
  //       autoClose: 2000,
  //       hideProgressBar: false,
  //       newestOnTop: false,
  //       closeOnClick: true,
  //     }
  //   );
  // };

  function showLoadingMessage() {
    toast.dark("Downloading file...", {
      position: "top-center",
      autoClose: false,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
    });
  }
  function hideLoadingToast() {
    toast.dark("File Download Succefully..", {
      position: "top-center",
      autoClose: false,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
    });
    toast.dismiss();
  }

  const saveDownloadDetails = async () => {
    const today = new Date();
    const date = today.toDateString();
    const time = today.toLocaleTimeString();
    const dataConfig = {
      userId,
      userEmail,
      userName,
      name: book.name,
      downloadDate: date,
      downloadTime: time,
      createAt: Timestamp.now().toDate(),
    };
    try {
      const docRef = await addDoc(collection(db, "downloads"), dataConfig);
      console.log("Document written with ID: ", docRef.id);
      console.log(docRef);
    } catch (error) {
      console.log(error.message);
    }
  };
  

  const downloadFileUrl = () => {
    const parts = `${book.file}.pdf`.split("/");
    const fileName = parts[parts.length - 1].split("?")[0];
    const cleanedFileName = decodeURIComponent(
      fileName
        .replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, "_")
        .replace(/^.*[\\/]/, "")
        .replace(/^.*?\d{13}/, "")
    );
    const MAX_SIZE = 30 * 1024 * 1024;
    const storageRef = ref(FirebaseStorage, `${book.file}.pdf`);
    setIsDownloading(true);
    showLoadingMessage();
    // showLoadingToast();

    getMetadata(storageRef)
      .then((metadata) => {
        if (metadata.size <= MAX_SIZE) {
          getDownloadURL(storageRef)
            .then((url) => {
              fetch(url)
                .then((response) => response.blob())
                .then((blob) => {
                  const link = document.createElement("a");
                  link.href = window.URL.createObjectURL(blob);
                  link.target = "_blank";
                  link.download = cleanedFileName;
                  link.click();
                  setIsDownloading(false);
                  hideLoadingToast();
                  saveDownloadDetails();
                })
                .catch((error) => console.error(error));
            })
            .catch((error) => console.error(error));
        } else {
          console.error(`File ${cleanedFileName} is too large to download`);
        }
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    getBook();
  }, []);

  return (
    <section>
      <div className={`container ${styles.book}`}>
        <h2>Book Details</h2>
        <div>
          <Link to="/#books">⬅ Back to Homepage</Link>
        </div>
        {book === null ? (
          <img src={spinnerImg} alt="Loading....." />
        ) : (
          <>
            <div className={styles.details}>
              <div className={styles.img}>
                <img src={book.imageUrl} alt={book.name} />
              </div>
              <div className={styles.content}>
                <h3>{book.name}</h3>
                <p className={styles.author}>
                  Author : <b>{book.author}</b>
                </p>
                <p>{book.desc}</p>
                <p>
                  Category : <b>{book.category}</b>
                </p>
                <p>
                  Language : <b>{book.language}</b>
                </p>
                <p>
                  Publisher : <b>{book.publisher}</b>
                </p>
                {book.file && (
                  <div onClick={downloadFileUrl}>
                    {" "}
                    {isDownloading ? (
                      <DownloadBtn text={"Downloading"} />
                    ) : (
                      <DownloadBtn text={"Download File"} />
                    )}
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
      <ToastContainer />
    </section>
  );
};

export default BookDetails;
