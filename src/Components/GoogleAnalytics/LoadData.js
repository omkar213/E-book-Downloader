// const CLIENT_ID = "1012831200678-ppbsennoa69oi09kttelmfduvavie1kb.apps.googleusercontent.com";

// function loadData() {
//   // Your GA property ID
//   const propertyId = "";

//   const startDate = "7daysAgo";
//   const endDate = "today";
//   const metrics = [
//     { name: "activeUsers" },
//     { name: "screenPageViews" },
//     { name: "sessions" },
//   ];

//   const query = {
//     dateRanges: [{ startDate, endDate }],
//     metrics: metrics,
//   };

//   runReport(propertyId, query, displayResult);
// }

// function displayResult(response) {
//   document.getElementById("displayUsers").innerHTML =
//     response.result.rows[0].metricValues[0].value;
//   document.getElementById("displayPageViews").innerHTML =
//     response.result.rows[0].metricValues[1].value;
//   document.getElementById("displaySessions").innerHTML =
//     response.result.rows[0].metricValues[2].value;
// }

// // Login buttons
// document.addEventListener("gapi-loaded", (e) => {
//   if (isSignedIn()) {
//     document.getElementById("sign-out-btn").style.display = "block";
//     document.getElementById("sign-in-btn").style.display = "none";
//     loadData();
//   } else {
//     document.getElementById("sign-in-btn").style.display = "block";
//     document.getElementById("sign-out-btn").style.display = "none";
//   }
// });