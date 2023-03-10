import React from "react";
import styles from "./Admin.module.scss";
import { Route, Routes } from "react-router-dom";

const Admin = () => {
  return (
    <div className={styles.admin}>
      <div className={styles.navbar}>
        {/* <Navbar /> */}
      </div>
      <div className={styles.content}>
        <Routes>
          <Route path="home" element={""} />
          <Route path="all-pdfs" element={""} />
          <Route path="add-pdf/:id" element={""} />
          <Route path="downloads" element={""} />
          <Route path="download-details/:id" element={""} />
        </Routes>
      </div>
    </div>
  );
};

export default Admin;
