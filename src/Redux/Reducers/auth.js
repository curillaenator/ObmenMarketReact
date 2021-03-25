import { fb, fa, db } from "../../Utils/firebase";

const SET_IS_AUTH = "auth/IS_AUTH";
const SET_USER = "auth/SET_USER";

const initialState = {
  isAuth: false,
  user: null,
};

export const auth = (state = initialState, action) => {
  switch (action.type) {
    case SET_IS_AUTH:
      return { ...state, isAuth: action.auth };
    case SET_USER:
      return { ...state, user: action.user };
    default:
      return state;
  }
};

// ACTIONs

export const setIsAuth = (auth) => ({ type: SET_IS_AUTH, auth });
const setCurrentUser = (user) => ({ type: SET_USER, user });

// THUNKs

export const googleSignIn = (curUser) => (dispatch) => {
  const newUser = (u) => {
    db.ref("users/" + u.uid).set({
      username: u.displayName,
      email: u.email,
      avatar: u.photoURL,
    });
  };

  const toLogin = async () => {
    const provider = new fb.auth.GoogleAuthProvider();
    await fb.auth().signInWithPopup(provider);

    await fb.auth().onAuthStateChanged((u) => {
      const ref = db.ref("users/" + u.uid);
      ref.once("value", (snapshot) => {
        console.log(snapshot);
        !snapshot.exists() && newUser(u);
        dispatch(setCurrentUser(snapshot.val()));
        dispatch(setIsAuth(true));
      });
    });
  };

  const toAuthCheck = async (u) => {
    await db.ref("users/" + u.uid).once("value", (snapshot) => {
      // console.log(u, snapshot.val());
      // console.log(snapshot.exists());
      // !snapshot.exists() && newUser(u);
      dispatch(setCurrentUser(snapshot.val()));
      dispatch(setIsAuth(true));
    });
  };
  // console.log(curUser);
  curUser !== null ? toAuthCheck(curUser) : toLogin();
};

export const logout = () => async (dispatch) => {
  await fa.signOut();
  dispatch(setIsAuth(false));
  dispatch(setCurrentUser(null));
};
