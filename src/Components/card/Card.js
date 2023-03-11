import React from 'react'
import styles from "./Card.module.scss";

//children = You can use props. children in React in order to access and 
//utilize what you put inside the open and 
//closing tags when you are creating an instance of a component.

const Card = ({ children, cardClass }) => {
  return (
    <div className={`${styles.card} ${cardClass}`}>{children}</div>
  )
}

export default Card