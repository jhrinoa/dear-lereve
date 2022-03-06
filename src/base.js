import { initializeApp } from "firebase/app";
import "firebase/storage";

export const app = initializeApp({
  // projectId: process.env.REACT_APP_PROJECT_ID,
  // appId: process.env.REACT_APP_APP_ID,
  // storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  // locationId: process.env.REACT_APP_LOCATION_ID,
  // apiKey: process.env.REACT_APP_API_KEY,
  // authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  // messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  // measurementId: process.env.REACT_APP_MEASUREMENT_ID,

  apiKey: "AIzaSyCj0pbIQgk8FtqIrsU6knTn5pWrjravrcY",
  authDomain: "dear-lereve-539de.firebaseapp.com",
  projectId: "dear-lereve-539de",
  storageBucket: "dear-lereve-539de.appspot.com",
  messagingSenderId: "914938884518",
  appId: "1:914938884518:web:0a0b2bca5b226ebb539f67",
  measurementId: "G-YDKJ8N48E6",
});

export default app;
