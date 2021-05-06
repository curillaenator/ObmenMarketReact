import { fb, fa, db } from "../../Utils/firebase";
import { batch } from "react-redux";

import { chatReset } from "./chat";
import { resetLotsState } from "./lots";

const SET_INITIALIZED = "auth/SET_INITIALIZED";
const SET_OWNER_ID = "auth/SET_OWNER_ID";
const SET_IS_AUTH = "auth/IS_AUTH";
const SET_USER = "auth/SET_USER";

const initialState = {
  isInitialized: false,
  ownerID: null,
  isAuth: false,
  user: null,
};

export const auth = (state = initialState, action) => {
  switch (action.type) {
    case SET_INITIALIZED:
      return { ...state, isInitialized: action.payload };

    case SET_OWNER_ID:
      return { ...state, ownerID: action.payload };

    case SET_IS_AUTH:
      return { ...state, isAuth: action.auth };

    case SET_USER:
      return { ...state, user: action.user };

    default:
      return state;
  }
};

// ACTIONs

const setInitialized = (payload) => ({ type: SET_INITIALIZED, payload });
export const setIsAuth = (auth) => ({ type: SET_IS_AUTH, auth });
const setOwnerID = (payload) => ({ type: SET_OWNER_ID, payload });
const setAuthedUser = (user) => ({ type: SET_USER, user });

// THUNKs

// authorization

export const googleSignIn = () => async (dispatch) => {
  // // SendGrid
  // const email = {
  // to: 'info@obmen.market',
  // from: 'noreply@obmen.market',
  // subject: 'Sending with SendGrid is Fun',
  // html: 'and easy to do anywhere, even with Node.js',
  // }
  // sg.send(email).then(() => {
  //   console.log('Email sent')
  // })
  // .catch((error) => {
  //   console.error(error)
  // });
  // // End of SendGrid

  const newUser = (user) => {
    const newUser = {
      username: user.displayName,
      email: user.email,
      avatar: user.photoURL,
    };

    db.ref("users/" + user.uid)
      .set(newUser)
      .then(() => {
        // user.sendEmailVerification().then(() => console.log("sent"));
        batch(() => {
          dispatch(setOwnerID(user.uid));
          dispatch(setAuthedUser(newUser));
          dispatch(setIsAuth(true));
          dispatch(setInitialized(true));
        });
      });
  };

  dispatch(resetLotsState());

  const provider = new fb.auth.GoogleAuthProvider();
  await fb.auth().signInWithPopup(provider);

  await fb.auth().onAuthStateChanged((user) => {
    if (!user) return;
    const ref = db.ref("users/" + user.uid);
    ref.once("value", (snapshot) => !snapshot.exists() && newUser(user));
  });
};

export const authCheck = (curUser) => (dispatch) => {
  if (curUser) {
    db.ref("users/" + curUser.uid).once("value", (snapshot) => {
      batch(() => {
        dispatch(setOwnerID(curUser.uid));
        dispatch(setAuthedUser(snapshot.val()));
        dispatch(setIsAuth(true));
        dispatch(setInitialized(true));
      });
    });
  }

  if (!curUser) {
    dispatch(setInitialized(true));
  }
};

// update profile from profile page

export const updateUserProfile = (userUpdData) => (dispatch) => {
  const userID = fa.currentUser.uid;

  const onUpdate = (error) => {
    if (error) return console.log("ошибка записи");

    db.ref("users/" + userID).once("value", (snapshot) => {
      dispatch(setAuthedUser(snapshot.val()));
    });
  };

  db.ref("users/" + userID).update(userUpdData, onUpdate);
};

// logout & set user lastLogout & isOnline on logout

export const logout = (ownerID) => async (dispatch) => {
  const lastLogout = {
    isOnline: false,
    lastLogout: fb.database.ServerValue.TIMESTAMP,
  };

  await db.ref(`users/${ownerID}`).update(lastLogout);

  await fa.signOut();

  batch(() => {
    dispatch(chatReset());
    dispatch(resetLotsState());
    dispatch(setOwnerID(null));
    dispatch(setIsAuth(false));
    dispatch(setAuthedUser(null));
  });
};

// set user lastLogout & isOnline onConnect/Disconnect

export const onConnectDisconnect = (ownerID) => (dispatch) => {
  const lastLogout = {
    isOnline: false,
    lastLogout: fb.database.ServerValue.TIMESTAMP,
  };

  const userRef = db.ref(`users/${ownerID}`);

  userRef.update({ isOnline: true });
  userRef.onDisconnect().update(lastLogout);
};
