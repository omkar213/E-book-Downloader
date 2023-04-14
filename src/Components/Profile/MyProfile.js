import React from "react";
import { useSelector } from "react-redux";
import userImg from "../../Assets/user.png";
import {
  selectEmail,
  selectUserID,
  selectUserName,
} from "../../Redux/features/authSlice";
import './MyProfile.css'



const MyProfile = () => {
  // const [userData, setUserData] = useState(null);
  const uid = useSelector(selectUserID);
  const email = useSelector(selectEmail);
  const userName = useSelector(selectUserName);

  return (
    <div className="container">
      <div className="profile-wrapper">
        <img className="profile" src={userImg} alt="" style={{ width: "200px", height: "200px" }} />
        <h2 className="profile-name">Username: {userName}</h2>
        <h2 className="profile-email">Email: {email}</h2>
      </div>
      <div className="sidebar">

      </div>
    </div>
  );
};

export default MyProfile;

// const userRef = collection(db, "users");
// const query = query(userRef, where("uid", "==", uid));
// const querySnapshot = await getDocs(query);
// if (!querySnapshot.empty) {   const userData = querySnapshot.docs[0].data();   setUserData(userData); } else {   toast.error("User NOT FOUND 😖"); }
