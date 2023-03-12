import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//components imports
import {Header, Footer} from './Components/ImportIndex'
//pages imports
import {Home, Contact, About, Blogs, Login, Register, Reset} from "./Pages/ImportIndex";


function App() {
  return (
    <>
      <BrowserRouter>
      <ToastContainer/>
        <Header />
        <Routes>
          <Route path="/" element={<Home/>}/>  
          <Route path="/contact" element={<Contact/>}/>  
          <Route path="/about" element={<About/>}/>  
          <Route path="/blog" element={<Blogs/>}/>  
          <Route path="/login" element={<Login/>}/>  
          <Route path="/register" element={<Register/>}/>  
          <Route path="/reset" element={<Reset/>}/>  
         
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
