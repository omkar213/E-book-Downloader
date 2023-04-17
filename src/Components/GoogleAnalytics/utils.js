// const initAuth = () => {
//   return new Promise((resolve, reject) => {
//     google.accounts.id.initialize({
//       client_id: process.env.REACT_APP_ANALYTICS_CLIENT_ID, //paste your client ID here
//       callback: () => {
//         resolve(google.accounts.id.getAuthResponse());
//       },
//       auto_select: true,
//       cancel_on_tap_outside: false,
//       hosted_domain: '',
//       login_hint: '',
//       prompt_parent_id: '',
//       state_cookie_domain: '',
//       context: '',
//       ux_mode: 'redirect',
//     });
//   });
// };

// export const checkSignedIn = () => {
//   return new Promise((resolve, reject) => {
//     initAuth() //calls the previous function
//       .then((authResponse) => {
//         resolve(authResponse.status.signed_in); //returns whether the current user is currently signed in
//       })
//       .catch((error) => {
//         reject(error);
//       });
//   });
// };

// export const renderButton = () => {
//   google.accounts.id.prompt((notification) => {
//     if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
//       // Sign-in was not displayed or user skipped prompt.
//     } else {
//       // Sign-in was displayed.
//     }
//   });
// };

// const onSuccess = (response) => {
//   console.log("Logged in as: " + response.name);
// };

// const onFailure = (error) => {
//   console.error(error);
// };