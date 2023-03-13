import React from "react";
import styles from "./Admin.module.scss";
import { Route, Routes } from "react-router-dom";
import Home from "../../Components/admin/Home/Home";
import Navbar from "../../Components/admin/Navbar/Navbar";
import ViewBooks from './../../Components/admin/View Books/ViewBooks';
import AddBooks from "../../Components/admin/AddBooks/AddBooks";
import Downloads from './../../Components/admin/Downloads/Downloads';

const Admin = () => {
  return (
    <div className={styles.admin}>
      <div className={styles.navbar}>
        <Navbar />
      </div>
      <div className={styles.content}>
        <Routes>
          <Route path="home" element={<Home/> } />
          <Route path="all-book" element={<ViewBooks/>} />
          <Route path="add-book/:id" element={<AddBooks/>} />
          <Route path="downloads" element={<Downloads/>} />
          <Route path="download-details/:id" element={""} />
        </Routes>
      </div>
    </div>
  );
};

export default Admin;
