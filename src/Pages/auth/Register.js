import React, { useState } from "react";
import styles from "./auth.module.scss";
import registerImg from "../../Assets/register.png";
import Card from "../../Components/card/Card";
import { Link, useNavigate } from "react-router-dom";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithPopup,
} from "firebase/auth";
import Loader from "../../Components/loader/Loader";
import { toast } from "react-toastify";
import { auth } from "../../Firebase/config";
import { db } from "../../Firebase/config";
import { addDoc, collection } from "firebase/firestore";
import { FaGoogle } from "react-icons/fa";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const validatePassword = () => {
    return password.length >= 6;
  };

  const validateCPassword = () => {
    return cPassword === password && validatePassword();
  };

  const inputClass = (isValid, value) => {
    if (value === "") {
      return "";
    }
    return isValid ? styles.valid : styles.invalid;
  };

  const inputCPassword = (isValid, value, isMatching) => {
    if (value === "") {
      return "";
    }
    return isValid && isMatching ? styles.valid : styles.invalid;
  };

  const navigate = useNavigate();

  const registerUser = (e) => {
    e.preventDefault();
    if (password !== cPassword) {
      toast.error("Passwords Do Not Match 😔");
    } else {
      setIsLoading(true);

      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user);
          setIsLoading(false);
          toast.success(
            "Registration successfully! Pls go to your email and click on the link to verify your email!!"
          );
          sendEmailVerification(user)
            .then(() => {
              // Email verification sent
              console.log("Email verification sent");
            })
            .catch((error) => {
              // Error sending email verification
              console.log(error.message);
            });
          const userDocRef = addDoc(collection(db, "users"), {
            email: user.email,
            uid: user.uid,
          });
          // console.log("New user added with ID: ", userDocRef.id);
          navigate("/login");
        })
        .catch((error) => {
          toast.error(error.message);
          setIsLoading(false);
        });
    }
  };

  const provider = new GoogleAuthProvider();
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        const userDocRef = addDoc(collection(db, "users"), {
          email: user.email,
          uid: user.uid,
        });
        console.log("New user added with ID: ", userDocRef.id);
        setIsLoading(false);
        toast.success("Login Successfully");
        navigate("/");
      })
      .catch((error) => {
        toast.error(error.message);
        setIsLoading(false);
      });
  };

  return (
    <>
      {isLoading && <Loader />}
      <section className={`container ${styles.auth}`}>
        <Card>
          <div className={styles.form}>
            <h2>Register</h2>

            <form onSubmit={registerUser}>
              <input
                type="text"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputClass(validateEmail(), email)}
              />
              <input
                type="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={inputClass(validatePassword(), password)}
              />
              <input
                type="password"
                placeholder="Confirm Password"
                required
                value={cPassword}
                onChange={(e) => setCPassword(e.target.value)}
                className={inputCPassword(
                  validateCPassword(),
                  cPassword,
                  cPassword === password
                )}
              />
              <button type="submit" className="--btn --btn-primary --btn-block">
                Register
              </button>
            </form>
            <br />
            <button
              className="--btn --btn-danger --btn-block"
              onClick={signInWithGoogle}
            >
              <FaGoogle color="#fff" /> Login With Google
            </button>
            <span className={styles.register}>
              <p>Already an account?</p>
              <Link to="/login">Login</Link>
            </span>
          </div>
        </Card>
        <div className={styles.img}>
          <img src={registerImg} alt="Register" width="400" />
        </div>
      </section>
    </>
  );
};

export default Register;
