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
  const newUser = (us) => {
    db.ref("users/" + us.uid).set({
      username: us.displayName,
      email: us.email,
      avatar: us.photoURL,
    });
  };

  const toLogin = async () => {
    const provider = new fb.auth.GoogleAuthProvider();
    await fb.auth().signInWithPopup(provider);
    await fb.auth().onAuthStateChanged((u) => {
      const ref = db.ref("users/" + u.uid);
      ref.once("value", (snapshot) => {
        dispatch(setCurrentUser(snapshot.val()));
        !snapshot.exists && newUser(u);
        dispatch(setIsAuth(true));
      });
    });
  };

  const toAuthCheck = async (u) => {
    await db.ref("users/" + u.uid).once("value", (snapshot) => {
      dispatch(setCurrentUser(snapshot.val()));
      dispatch(setIsAuth(true));
    });
  };
  curUser !== null ? toAuthCheck(curUser) : toLogin();
};

export const logout = () => async (dispatch) => {
  fa.signOut().then(() => dispatch(setIsAuth(false)));
};
