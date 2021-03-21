import { fb, db, fa } from "../../Utils/firebase";

import { setFormMode } from "./home";

const SET_NEWLOT_ID = "lots/SET_NEWLOT_ID";
const SET_CURRENT_LOT = "lots/SET_CURRENT_LOT";

const initialState = {
  createLotId: null,
  currentLot: null,
};

export const lots = (state = initialState, action) => {
  switch (action.type) {
    case SET_NEWLOT_ID:
      return { ...state, createLotId: action.id };
    case SET_CURRENT_LOT:
      return { ...state, currentLot: action.payload };
    default:
      return state;
  }
};

// ACTIONS

const setNewLotId = (id) => ({ type: SET_NEWLOT_ID, id });
const setCurrentLot = (payload) => ({ type: SET_CURRENT_LOT, payload });

export const onLotCreateFromForm = () => async (dispatch) => {
  const authedUser = await fa.currentUser;
  const newLotId = await db.ref().child("posts").push().key;

  const newLotData = {
    uid: authedUser.uid,
    postid: newLotId,
    username: authedUser.displayName,
    avatar: authedUser.photoURL,
  };

  dispatch(setNewLotId(newLotId));
  const updates = {};
  updates["/posts/" + newLotId] = newLotData;
  // console.log(updates);
  db.ref().update(updates);
};

export const onLotCreateFormCancel = (id) => async (dispatch) => {
  await db.ref("posts/" + id).remove();
  dispatch(setNewLotId(null));
  
  const storage = fb.storage().ref();
  storage
    .child("posts/" + fa.currentUser.uid + "/" + id)
    .listAll()
    .then((res) => res.items.forEach((item) => item.delete()));
};

export const publishNewLotFromForm = (id, updData) => async (dispatch) => {
  const onUpdate = (error) => {
    if (error) return console.log("ошибка записи");
    db.ref("posts/" + id).once("value", (snap) => {
      dispatch(setCurrentLot(snap.val()));
      dispatch(setFormMode(false));
    });
  };
  await db.ref("posts/" + id).update(updData, onUpdate);
};

export const setIsCurrentLotAfterRedirect = (boolean) => (dispatch) => {};
