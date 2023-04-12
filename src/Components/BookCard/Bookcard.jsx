import React from 'react'
import styles from './Bookcard.module.scss';

const Bookcard = ({ children, cardClass }) => {
    return (
      <div className={`${styles.bookcard} ${cardClass}`}>{children}</div>
    )
  }
  
  export default Bookcard