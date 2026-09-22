import { getApp, getApps, initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBmaK4FEVHIpl6n5cGbPDhtOVf3zqOUZCk",
  authDomain: "fir-shakee.firebaseapp.com",
  projectId: "fir-shakee",
  storageBucket: "fir-shakee.firebasestorage.app",
  messagingSenderId: "80086733822",
  appId: "1:80086733822:web:24ef8e67dced306a93a6af",
};

export const firebaseApp = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);