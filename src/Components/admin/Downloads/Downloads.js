import React from 'react'
import useFetchCollection from '../../../hooks/useFetchCollection';
import { Link } from 'react-router-dom';
import Loader from '../../loader/Loader';
import styles from './Download.module.scss'

const Downloads = () => {
  const { data, isLoading } = useFetchCollection("downloads");
  console.log(data);
  return (
    <>
    {isLoading && <Loader />}
    <div className={styles.table}>
      <h2>All Books</h2>
      {data.length === 0 ? (
        <p>No Downloads Found</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>S/N</th>
              <th>Id</th>
              <th>Book Name</th>
              <th>userEmail</th>
              <th>userName</th>
              <th>downloadDate</th>
            </tr>
          </thead>
          <tbody>
            {data.map((book, index) => {
              const {
                downloadDate,
                id,
                userEmail,
                name,
                userName
              } = book;
              return (
                <tr key={id}>
                  <td>{index + 1}</td>
                  <td>{id}</td>
                  <td>{name}</td>
                  <td>{userEmail}</td>
                  <td>{userName}</td>
                  <td>{downloadDate}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  </>
  )
}

export default Downloads