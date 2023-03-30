import React from 'react';
import Swiperslider from '../../Components/Slider/Swiperslider';
import Books from '../../Components/books/Books';
import { useEffect } from 'react';

const Home = () => {
  const url = window.location.href;
  const scrollToBooks = () => {
    if(url.includes('#books')){
      window.scrollTo({
        top: 700,
        behavior: "smooth"
      })
      return
    }
  }

  useEffect(() => {
    scrollToBooks()
  }, [])
  return (
    <>
    <Swiperslider/>
    <Books/>
    </>
  )
}

export default Home