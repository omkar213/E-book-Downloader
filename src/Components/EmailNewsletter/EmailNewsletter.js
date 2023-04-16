import React, { useState } from "react";
import { db } from "../../Firebase/config";
import "./style.css";
import { toast } from "react-toastify";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { Link } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";

const EmailNewsletter = () => {
  const [userEmail, setUserEmail] = useState("");
  const [bookName, setBookName] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    try {
      const docRef = addDoc(collection(db, "newsletterSubcribers"), {
        email: userEmail,
        name: bookName,
        createAt: Timestamp.now().toDate()
      });
      console.log(docRef);
      toast.success("Than you for subscribing😊");
      setUserEmail("");
      setBookName("");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <div className="card-container">
        <h4>
          Book Not Found ! Subscribe to our newsletter for updates about it
        </h4>
        <div className="newslettercard">
          <span className="newslettercard__title">Subscribe</span>
          <p class="newslettercard__content">Our Newsletter</p>
          <form className="newslettercard__form" onSubmit={handleSubscribe}>
            <input
              type="email"
              placeholder="Enter your email"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
            />
            <input
              type="text"
              placeholder="Enter your Full Name of Book"
              value={bookName}
              onChange={(e) => setBookName(e.target.value)}
            />
            <button type="submit" className="sign-up">
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default EmailNewsletter;
