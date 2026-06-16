import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyA3pD7HXPOOCAA1fmUpbCmeOCz9S1u0sDY",
    authDomain: "movie-web-c12a9.firebaseapp.com",
    projectId: "movie-web-c12a9",
    storageBucket: "movie-web-c12a9.firebasestorage.app",
    messagingSenderId: "750777027966",
    appId: "1:750777027966:web:1f1edcb80bcfc3f584b72f",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);