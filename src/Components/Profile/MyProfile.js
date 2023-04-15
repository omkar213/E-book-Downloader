import React from "react";
import { useSelector } from "react-redux";
import userImg from "../../Assets/user.png";
import {
  selectEmail,
  selectUserID,
  selectUserName,
} from "../../Redux/features/authSlice";
import "./MyProfile.css";
import DownloadHistory from "../../Pages/DownloadHistory/DownloadHistory";



const MyProfile = () => {
  // const [userData, setUserData] = useState(null);
  const email = useSelector(selectEmail);
  const userName = useSelector(selectUserName);
  return (
    <div className="container">
      <div className="profile-wrapper">
        <img
          className="profile"
          src={userImg}
          alt=""
          style={{ width: "200px", height: "200px" }}
        />
        <h2 className="profile-name">Username: {userName}</h2>
        <h2 className="profile-email">Email: {email}</h2>
      </div>
      <DownloadHistory/>
    </div>
  );
};

export default MyProfile;
