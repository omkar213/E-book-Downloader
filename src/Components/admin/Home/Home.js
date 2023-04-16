import React, { useEffect, useState } from "react";
import styles from "./Home.module.scss";
import InfoBox from "../../InfoBox/InfoBox";
import { useDispatch, useSelector } from "react-redux";
import {
  STORE_DOWNLOADS,
  selectDownloadHistory,
} from "../../../Redux/features/downlodsSlice";
import { FaDownload } from "react-icons/fa";
import { ImBooks } from "react-icons/im";
import { FiUsers } from "react-icons/fi";
import { MdUnsubscribe } from "react-icons/md";
import useFetchCollection from "../../../customhooks/useFetchCollection";
import { selectBooks, store_Book } from "../../../Redux/features/booksSlice";
import {
  fetchSubscribers,
  selectSubscribers,
} from "../../../Redux/features/fetchSubscribersSlice";
import { fetchusers, selectUsers } from "../../../Redux/features/usersSlice";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const Home = () => {
  //getting subscribers
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchSubscribers());
  }, [dispatch]);
  const subscribers = useSelector(selectSubscribers);
  const subscriberCount = subscribers.length;

  //getting downloads
  const { data, isLoading } = useFetchCollection("downloads");
  const downloadCount = data.length;
  console.log(downloadCount);

  //getting books
  const allBooks = useSelector(selectBooks);
  console.log(allBooks);
  const bookCount = allBooks.length;

  const dispatch1 = useDispatch();
  useEffect(() => {
    dispatch1(fetchusers());
  }, [dispatch1]);
  const totalusers = useSelector(selectUsers);
  const totalusersCount = totalusers.length;

  //icons
  const downloadIcon = <FaDownload size={30} color="#b624ff" />;
  const bookIcon = <ImBooks size={30} color="#1f93ff" />;
  const newletterIcon = <MdUnsubscribe size={30} color="#ff4500" />;
  const userIcon = <FiUsers size={30} color="rgb(111, 0, 255)" />;

  const [data1, setData] = useState([
    { name: "Books", count: 0 },
    { name: "Newsletter Subscribers", count: 0 },
    { name: "Downloads", count: 0 },
    { name: "Total Users", count: 0 },
  ]);

  useEffect(() => {
    setData([
      { name: "Books", count: bookCount },
      { name: "Newsletter Subscribers", count: subscriberCount },
      { name: "Downloads", count: downloadCount },
      { name: "Total Users", count: totalusersCount },
    ]);
  }, [bookCount, subscriberCount, downloadCount, totalusersCount]);

  return (
    <div className={styles.home}>
      <h2>Admin Home</h2>
      <div className={styles["info-box"]}>
        <InfoBox
          cardClass={`${styles.card} ${styles.card1}`}
          title={"Downlaods"}
          count={downloadCount}
          icon={downloadIcon}
        />
        <InfoBox
          cardClass={`${styles.card} ${styles.card2}`}
          title={"Books"}
          count={bookCount}
          icon={bookIcon}
        />
        <InfoBox
          cardClass={`${styles.card} ${styles.card3}`}
          title={"NewsletterSubcriber"}
          count={subscriberCount}
          icon={newletterIcon}
        />
        <InfoBox
          cardClass={`${styles.card} ${styles.card4}`}
          title={"Total Users Registered"}
          count={totalusersCount}
          icon={userIcon}
        />
      </div>
      <div>
        <BarChart width={500} height={300} data={data1} style={{ border: "1px solid #ccc" }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#8884d8" />
        </BarChart>
      </div>
    </div>
  );
};

export default Home;
