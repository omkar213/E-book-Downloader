import React from "react";
import { FaTwitter } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { MdContactSupport, MdEmail } from "react-icons/md";
import "./About.css";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="about-container">
      <h1>About eBoOk</h1>
      <div className="social-media-container">
        <button className="social-media-icons">
          <FaTwitter size={20} />
        </button>
        <button className="social-media-icons">
          <FaFacebookF size={20} />
        </button>
        <button className="social-media-icons">
          <MdEmail size={20} />
        </button>
        <button className="social-media-icons">
          <Link to="/contact">
            <MdContactSupport size={20} />
          </Link>
        </button>
      </div>
      <div className="main-details">
        <h3>
          If You want to use our database as a service , you can contact our
          admin with contact us and get the API key for our database.
        </h3>
      </div>
      <div className="about-us-para">
        <p className="details">
          eBoOk was established in 2023 with the vision to provide an extensive
          library of books in digital format for free on the Internet., we are
          still going strong in our mission to provide a valuable service to our
          readers. eBoOk was established in 2023 with the vision to provide an
          extensive library of books in digital format for free on the
          Internet., we are still going strong in our mission to provide a
          valuable service to our readers. eBoOk was established in 2023 with
          the vision to provide an extensive library of books in digital format
          for free on the Internet., we are still going strong in our mission to
          provide a valuable service to our readers. don't hesitate to contact
          our editor Support@ebook.com.
        </p>
      </div>
    </div>
  );
};

export default About;
