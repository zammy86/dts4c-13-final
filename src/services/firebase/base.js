// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey : process.env.REACT_APP_APIKEY,
  authDomain : process.env.REACT_APP_AUTHDOMAIN,
  projectId : process.env.REACT_APP_PROJECTID,
  storageBucket : process.env.REACT_APP_STORAGEBUCKET,
  messagingSenderId:process.env.REACT_APP_MESSAGINGSENDERID,
  appId:process.env.REACT_APP_APPID,
  databaseURL: "https://reactjs-explore-default-rtdb.asia-southeast1.firebasedatabase.app/" //process.env.REACT_APP_DATABASEURL
};
  // databaseURL: process.env.REACT_APP_DATABASEURL
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const authFirebase = getAuth(app);
export const dbFirebase  = getDatabase(app);
