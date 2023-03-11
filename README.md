Admin .js 

# prev
<Routes>
          <Route path="home" element={<Home />} />
          <Route path="all-products" element={<ViewProducts />} />
          <Route path="add-product/:id" element={<AddProduct />} />
          <Route path="orders" element={<Orders />} />
          <Route path="order-details/:id" element={<OrderDetails />} />
</Routes>

# my change
<Routes>
          <Route path="home" element={""} />
          <Route path="all-pdfs" element={""} />
          <Route path="add-pdf/:id" element={""} />
          <Route path="downloads" element={""} />
          <Route path="download-details/:id" element={""} />
</Routes>


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBn-dArDZCXl0NXjFuK6hQ-aoLcebQMv1M",
  authDomain: "e-book-61cef.firebaseapp.com",
  projectId: "e-book-61cef",
  storageBucket: "e-book-61cef.appspot.com",
  messagingSenderId: "1012831200678",
  appId: "1:1012831200678:web:d650d9203b1aa779571b67",
  measurementId: "G-V4LXD2RC3Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);