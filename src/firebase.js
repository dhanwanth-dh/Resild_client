// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//     apiKey: "AIzaSyAyg5OtjhqGNQC5-xsze9Qvh2CM1rY_HDI",
//     authDomain: "resild-db.firebaseapp.com",
//     projectId: "resild-db",
//     storageBucket: "resild-db.firebasestorage.app",
//     messagingSenderId: "227263482370",
//     appId: "1:227263482370:web:d4102ab18aab4b1ec8351b"
// };

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// import { getFirestore } from "firebase/firestore";
// export const db = getFirestore(app);

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAHyUsEdQLnmEXH1E2K0J7c3G3uhtQ1LUk",
    authDomain: "resild-resbuild.firebaseapp.com",
    projectId: "resild-resbuild",
    storageBucket: "resild-resbuild.firebasestorage.app",
    messagingSenderId: "1080039084734",
    appId: "1:1080039084734:web:1a290572b054e89dfcc4ef",
    measurementId: "G-K7W3BJJ0S1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);