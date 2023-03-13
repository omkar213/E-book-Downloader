import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { selectUserName } from "../../../Redux/features/authSlice";
import styles from "./Navbar.module.scss";
import { FaUserCircle } from "react-icons/fa";

const activeLink = ({ isActive }) => (isActive ? `${styles.active}` : "");

const Navbar = () => {
  const userName = useSelector(selectUserName);

  return (
    <div className={styles.navbar}>
      <div className={styles.user}>
        <FaUserCircle size={40} color="#fff" />
        <h4>{userName}</h4>
      </div>
      <nav>
        <ul>
          <li>
            <NavLink to="/admin/home" className={activeLink}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/all-book" className={activeLink}>
              All Books
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/add-book/ADD" className={activeLink}>
              Add Books
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/downloads" className={activeLink}>
              Downloads
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
