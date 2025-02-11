const URLS = {
  HOME: "/",

  SIGNUP: "/auth/signup",
  SIGNIN: "/auth/signin",

  API_SIGNIN: "/api/auth/signin",
  API_SIGNOUT: "/api/auth/signout",
  API_USER: "/api/user",

  // If not using firebase emulator
  BE_API: "http://localhost:5000/api",
  BE_FETCH_USER: "/fetch-user-data",
  BE_CREATE_USER: "/add-user-data",
  BE_UPDATE_USER: "/update-user-data",
  BE_DELETE_USER: "/delete-user-data",

  // If using firebase emulator
  // BE_API: "http://localhost:5001/ebuddy-71246/us-central1",
  // BE_FETCH_USER: "/fetchUserData",
  // BE_CREATE_USER: "/addUserData",
  // BE_UPDATE_USER: "/updateUserData",
  // BE_DELETE_USER: "/deleteUserData",
};

export default URLS;
