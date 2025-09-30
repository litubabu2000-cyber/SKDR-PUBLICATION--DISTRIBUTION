
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  "projectId": "studio-9134469496-56bf5",
  "appId": "1:616809467925:web:79c66dbaee722a5fd33e1c",
  "apiKey": "AIzaSyDRVhCBj8zhF34_F_x5aaLnOYsBvryB4Ys",
  "authDomain": "studio-9134469496-56bf5.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "616809467925"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

export { app, auth };
