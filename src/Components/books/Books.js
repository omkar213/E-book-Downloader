import React from 'react';
import styles from './Books.module.scss';
import BookFilter from './bookFilter/BookFilter';
import BookList from './bookList/BookList';

const Books = () => {
  return (
    <section>
      <div className={`container ${styles.book}`}>
        <aside className={styles.filter}>
          <BookFilter/>
        </aside>
        <div className={styles.content}>
          <BookList/>
        </div>
      </div>
    </section>
  )
}

export default Books