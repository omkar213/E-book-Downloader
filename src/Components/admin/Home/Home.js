import React from 'react'
import styles from './Home.module.scss'
import InfoBox from '../../InfoBox/InfoBox'
import { useSelector } from 'react-redux';
import { selectDownloadHistory } from '../../../Redux/features/downlodsSlice';
import {FaDownload } from 'react-icons/fa'
import {ImBooks } from 'react-icons/im'
import useFetchCollection from '../../../customHooks/useFetchCollection';

const Home = () => {
  const downloads = useSelector(selectDownloadHistory);
  console.log(downloads)
  const downloadCount = downloads.length;
  const { data, isLoading } = useFetchCollection("books");
  const bookCount = data.length

  //icons
  const downloadIcon = <FaDownload size={30} color="#b624ff"/>
  const bookIcon = <ImBooks size={30} color="#1f93ff"/>
  return (
    <div className={styles.home}>
      <h2>Admin Home</h2>
      <div className={styles["info-box"]}>
        <InfoBox cardClass={`${styles.card} ${styles.card1}`}
        title={"Downlaods"}
        count={downloadCount}
        icon={downloadIcon}
        />
        <InfoBox cardClass={`${styles.card} ${styles.card2}`}
        title={"Books"}
        count={bookCount}
        icon={bookIcon}
        />
      </div>
    </div>
  )
}

export default Home