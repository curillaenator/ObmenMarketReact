import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";
import "firebase/auth";
import "firebase/database";
// import "firebase/functions";
import "firebase/performance";
import "firebase/analytics";

const config = {
  apiKey: "AIzaSyBmYNXLxCwaIR_U2RYWUAzCeRIQjixMVv4",
  authDomain: "obmen.market",
  databaseURL: "https://obmenmarket.europe-west1.firebasedatabase.app/",
  projectId: "obmen-market-666",
  storageBucket: "obmen-market-666.appspot.com",
  messagingSenderId: "755387476175",
  appId: "1:755387476175:web:5b498b1b1c23fe5268afba",
  measurementId: "G-QBMC7DMV5G",
};

const app = firebase.initializeApp(config);

// POSTS

export const db = app.database();

/// OFFERS

export const db_offer = app.database(
  "https://obmenmarket-offers.europe-west1.firebasedatabase.app/"
);

/// CHAT

export const db_chat = app.database("https://obmenmarket-chat.firebaseio.com/");

// COMMON

export const fb = firebase;
export const fa = firebase.auth();
export const fsdb = firebase.firestore();
// export const fn = firebase.functions();
export const fst = firebase.storage();
export const an = firebase.analytics();
export const perf = firebase.performance();

// using SendGrid's Node.js Library - https://github.com/sendgrid/sendgrid-nodejs
// export const sg = require("@sendgrid/mail");
// sg.setApiKey(process.env.SENDGRID_API_KEY);
