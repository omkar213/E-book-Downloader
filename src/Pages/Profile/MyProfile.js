import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import userImg from '../../Assets/user.png'
import { selectUserID, selectUserName } from "../../Redux/features/authSlice";
import { firebase } from 'firebase/app';


const MyProfile = () => {
  const userID = useSelector(selectUserID);
  const userName = useSelector(selectUserName);
  const [profilePicture, setProfilePicture] = useState(null);

//   useEffect(() => {
//     if (userID) {
//       const storageRef = firebase.storage().ref();
//       const profilePictureRef = storageRef.child(
//         `users/${userID}/profilePicture.png`
//       );
//       profilePictureRef
//         .getDownloadURL()
//         .then((url) => {
//           setProfilePicture(url);
//         })
//         .catch((error) => {
//           console.log(error);
//         });
//     }
//   }, [userID]);

//   const user = firebase.auth().currentUser;
//   const isGoogleUser =
//     user &&
//     user.providerData &&
//     user.providerData.length > 0 &&
//     user.providerData[0].providerId === "google.com";

  return (
    <div>
      <h2>My Profile</h2>
      <p>Username: {userName}</p>
      {/* {isGoogleUser && <img src={user.photoURL} alt="Google Profile" />}
      {!isGoogleUser && profilePicture && (
        <img src={profilePicture} alt="Profile" />
      )}
      {!isGoogleUser && !profilePicture && (
        <img src={userImg} alt="Default Profile" />
      )} */}
    </div>
  );
};

export default MyProfile;
