// import React, { useEffect, useState } from "react";
// import { renderButton, checkSignedIn } from "./utils";

// const AnalyticsDashboard = () => {
//   const [isSignedIn, setIsSignedIn] = useState(false);

//   const updateSignin = (signedIn) => {
//     //(3)
//     setIsSignedIn(signedIn);
//     if (!signedIn) {
//       renderButton();
//     }
//   };

//   const init = () => {
//     checkSignedIn() //calls the previous function
//       .then((signedIn) => {
//         updateSignin(signedIn);
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   };

//   useEffect(() => {
//     window.gapi.load("auth2", init); //(1)
//   });

//   return (
//     <div>
//       {!isSignedIn ? <div id="signin-button"></div> : <div>Coming soon...</div>}
//     </div>
//   );
// };

// export default AnalyticsDashboard;
