import React from "react";
import styles from "./Footer.module.scss";
import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter } from "react-icons/fa";
import {BsInstagram} from 'react-icons/bs'
import './footer.css'

const date = new Date();
const year = date.getFullYear();

const logo = (
  <div className="logo">
    <Link to="/">
      <h2>
        e<span className="half-log">BoOk</span>
      </h2>
    </Link>
  </div>
);

const twitter = "https://twitter.com/login?lang=en";
const facebook = "https://www.facebook.com/";
const instagram = "https://www.instagram.com/";

const Footer = () => {
  
  return (
    <div className="footer">
      <div className="footer-section">{logo}</div>
      <div className="footer-section">
        <h3 className="footer-title">Company</h3>
        <br />
        <Link to="/about" className="footer-links">
          About Us
        </Link>
        <br />
        <Link to="/contact" className="footer-links">
          Contact Us
        </Link>
      </div>
      <div className="footer-section">
        <h3 className="footer-title">Social</h3>
        <br />
        <Link to={twitter} className="footer-links">
        <FaTwitter/> Twitter
        </Link>
        <br />
        <Link to={facebook} className="footer-links">
          <FaFacebookF/> FaceBook
        </Link>
      </div>
      <div className="footer-section">
        <h3 className="footer-title">Help</h3>
        <br />
        <Link to="/contact" className="footer-links">
          Contact Us
        </Link>
        <br />
        <Link to="/about" className="footer-links">
          About Us
        </Link>
      </div>
    </div>
  );
};

export default Footer;
