import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
//components imports
import {Header, Footer} from './Components/ImportIndex'
//pages imports
import {Home, Contact, About, Login, Register, Reset} from "./Pages/ImportIndex";


function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home/>}/>  
          <Route path="/contact" element={<Contact/>}/>  
          <Route path="/about" element={<About/>}/>  
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
