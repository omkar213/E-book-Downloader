import React from "react";
import { useSelector } from "react-redux";
import userImg from "../../Assets/user.png";
import {
  selectEmail,
  selectUserID,
  selectUserName,
} from "../../Redux/features/authSlice";



const MyProfile = () => {
  // const [userData, setUserData] = useState(null);
  const uid = useSelector(selectUserID);
  const email = useSelector(selectEmail);
  const userName = useSelector(selectUserName);

  return (
    <>
      <div>
        <h1>{uid}</h1>
        <img src={userImg} alt="" style={{ width: "200px", height: "200px" }} />
        <h2>{userName}</h2>
        <h2>{email}</h2>
      </div>
    </>
  );
};

export default MyProfile;

// const userRef = collection(db, "users");
// const query = query(userRef, where("uid", "==", uid));
// const querySnapshot = await getDocs(query);
// if (!querySnapshot.empty) {   const userData = querySnapshot.docs[0].data();   setUserData(userData); } else {   toast.error("User NOT FOUND 😖"); }
