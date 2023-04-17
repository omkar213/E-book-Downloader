import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminOnlyRoute from "./Components/adminOnlyRoute/AdminOnlyRoute";
import BookDetails from "./Components/books/bookDetails/BookDetails";
//components imports
import { Header, Footer } from "./Components/ImportIndex";
//pages imports
import {
  Home,
  Contact,
  About,
  Blogs,
  Login,
  Register,
  Reset,
  Admin,
} from "./Pages/ImportIndex";
import MyProfile from "./Components/Profile/MyProfile";
import NotFound from "./Pages/NotFound/NotFound";
import ReviewBooks from "./Components/ReviewBooks/ReviewBooks";

function App() {
  return (
    <>
      <BrowserRouter>
        <ToastContainer />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset" element={<Reset />} />

          {/* book details */}
          <Route path="/book-details/:id" element={<BookDetails />} />
          <Route path="/review-book/:id" element={<ReviewBooks />} />
          <Route path="/profile" element={<MyProfile />} />

          {/* admin routes */}

          <Route
            path="/admin/*"
            element={
              <AdminOnlyRoute>
                <Admin />
              </AdminOnlyRoute>
            }
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
