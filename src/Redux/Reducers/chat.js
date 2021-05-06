import { db, db_chat } from "../../Utils/firebase";
import { batch } from "react-redux";

import { setProgress } from "./home";

const IS_CHAT_ON = "chat/IS_CHAT_ON";
const IS_CHAT_TOUCHED = "chat/IS_CHAT_TOUCHED";
const IS_DIALOGS_ON = "chat/IS_DIALOGS_ON";
const SET_CUR_ROOM_ID = "chat/SET_CUR_ROOM_ID";
const SET_ROOMS = "chat/SET_ROOMS";
const UNSET_ROOM = "chat/UNSET_ROOM";
const RESET_ROOMS = "chat/RESET_ROOMS";
const SET_ROOMS_MSGS = "chat/SET_ROOMS_MSGS";
const RESET_ROOMS_MSGS = "chat/RESET_ROOMS_MSGS";
const SET_ROOMS_NEW_MSGS = "chat/SET_ROOMS_NEW_MSGS";
const SET_OPPONENT = "chat/SET_OPPONENT";

const initialState = {
  isChatOn: false,
  isChatTouched: false,
  isDialogsOn: false,
  rooms: null,
  curRoomID: null,
  roomsMsgs: {},
  roomsNewMsgs: {},
  opponent: null,
};

export const chat = (state = initialState, action) => {
  switch (action.type) {
    case IS_CHAT_ON:
      return { ...state, isChatOn: action.payload };

    case IS_CHAT_TOUCHED:
      return { ...state, isChatTouched: true };

    case IS_DIALOGS_ON:
      return { ...state, isDialogsOn: action.payload };

    case SET_CUR_ROOM_ID:
      return { ...state, curRoomID: action.roomID };

    case SET_ROOMS:
      return { ...state, rooms: [...(state.rooms || []), action.room] };

    case UNSET_ROOM:
      return { ...state, rooms: action.rooms };

    case RESET_ROOMS:
      return { ...state, rooms: null };

    case SET_ROOMS_MSGS:
      return {
        ...state,
        roomsMsgs: {
          ...state.roomsMsgs,
          [action.rID]: [...(state.roomsMsgs[action.rID] || []), action.mess],
        },
      };

    case RESET_ROOMS_MSGS:
      return { ...state, roomsMsgs: {} };

    case SET_ROOMS_NEW_MSGS:
      return {
        ...state,
        roomsNewMsgs: { ...state.roomsNewMsgs, ...action.newMsgs },
      };

    case SET_OPPONENT:
      return { ...state, opponent: action.opponent };

    default:
      return state;
  }
};

// ACTIONS

export const setIsChatOn = (payload) => ({ type: IS_CHAT_ON, payload });
export const setIsChatTouched = () => ({ type: IS_CHAT_TOUCHED });
export const setIsDialogsOn = (payload) => ({ type: IS_DIALOGS_ON, payload });
const setCurRoomID = (roomID) => ({ type: SET_CUR_ROOM_ID, roomID });
const setRooms = (room) => ({ type: SET_ROOMS, room });
const unsetRoom = (rooms) => ({ type: UNSET_ROOM, rooms });
const resetRooms = () => ({ type: RESET_ROOMS });
const setRoomsMsgs = (rID, mess) => ({ type: SET_ROOMS_MSGS, rID, mess });
const resetRoomsMsgs = () => ({ type: RESET_ROOMS_MSGS });
const setRoomsNewMsgs = (newMsgs) => ({ type: SET_ROOMS_NEW_MSGS, newMsgs });
const setOpponent = (opponent) => ({ type: SET_OPPONENT, opponent });

// THUNKS

export const setChatFromLotFull = () => async (dispatch) => {
  await dispatch(setIsChatTouched());
  await dispatch(setIsChatOn(true));
  // dispatch(setIsDialogsOn(true));
};

//  chat full reset

export const chatReset = () => (dispatch) => {
  batch(() => {
    dispatch(setCurRoomID(null));
    dispatch(resetRoomsMsgs());
    dispatch(resetRooms());
    dispatch(setIsDialogsOn(false));
    dispatch(setIsChatOn(false));
    dispatch(setOpponent(null));
  });
};

// create chatRoom & userChatData in DB (TODO: remove chatRoom)

export const chatRoom = (lotMeta, offerMeta) => async (dispatch) => {
  const onUpd = (error) =>
    error ? console.log(error) : console.log("success");

  const roomID = await db_chat.ref().push().key;

  const toPost = {
    lotAuthorID: lotMeta.uid,
    offerAuthorID: offerMeta.authorID,
  };

  const dbData = {};
  dbData[`users/${lotMeta.uid}/chats/${roomID}`] = { newMessages: 0 };
  dbData[`users/${offerMeta.authorID}/chats/${roomID}`] = { newMessages: 0 };
  dbData[`posts/${lotMeta.postid}/chats/${roomID}`] = toPost;

  const toRoom = {
    title: `${lotMeta.title} на ${offerMeta.name}`,
    lotAuthorID: lotMeta.uid,
    offerAuthorID: offerMeta.authorID,
    roomID: roomID,
    photoPath: `posts/${lotMeta.uid}/${lotMeta.postid}`,
  };

  const roomData = {};
  roomData[`chats/${roomID}`] = toRoom;

  await db_chat.ref().update(roomData, onUpd);
  db.ref().update(dbData, onUpd);
};

export const removeChatRoom = (roomID) => (dispatch, getState) => {
  batch(() => {
    dispatch(setProgress(1));
    dispatch(setIsDialogsOn(false));
    dispatch(setCurRoomID(null));
    dispatch(setOpponent(null));
  });

  const onDbClear = () => {
    batch(() => {
      dispatch(
        unsetRoom(
          getState().chat.rooms.filter((room) => room.roomID !== roomID)
        )
      );

      dispatch(setProgress(100));
    });
  };

  db_chat
    .ref(`chats/${roomID}`)
    .once("value", (room) => {
      if (room.exists()) {
        db.ref(`users/${room.val().lotAuthorID}/chats/${roomID}`).set(
          null,
          () => dispatch(setProgress(20))
        );

        db.ref(`users/${room.val().offerAuthorID}/chats/${roomID}`).set(
          null,
          () => dispatch(setProgress(40))
        );
      }
    })
    .then(() =>
      db_chat
        .ref(`messages/${roomID}`)
        .set(null, () => dispatch(setProgress(60)))
    )
    .then(() => db_chat.ref(`chats/${roomID}`).set(null, onDbClear))
    .catch((err) => console.log(err));
};

// room select/deselect & closeChat

export const selectRoom = (roomID) => (dispatch) => {
  batch(() => {
    dispatch(setCurRoomID(roomID));
    dispatch(setIsDialogsOn(true));
  });
};

export const deselectRoom = () => (dispatch) => {
  batch(() => {
    dispatch(setIsDialogsOn(false));
    dispatch(setCurRoomID(null));
    dispatch(setOpponent(null));
  });
};

export const closeChat = () => (dispatch) => {
  batch(() => {
    dispatch(deselectRoom());
    dispatch(setIsChatOn(false));
  });
};

// rooms & messages subscribtion

export const subscribeRoomsMsgs = (ownerID) => (dispatch) => {
  db.ref(`users/${ownerID}/chats`).on("child_added", async (roomID) => {
    //
    // set rooms' info for contact list
    await db_chat.ref(`chats/${roomID.key}`).once("value", (roomInfo) => {
      dispatch(setRooms(roomInfo.val()));
    });

    await dispatch(setRoomsNewMsgs({ [roomID.key]: roomID.val().newMessages }));

    // subscribe room last opened
    db.ref(`users/${ownerID}/chats/${roomID.key}`).on(
      "child_changed",
      (changed) => dispatch(setRoomsNewMsgs({ [roomID.key]: changed.val() }))
    );

    // subscribe all rooms to get messages
    db_chat
      .ref(`messages/${roomID.key}`)
      .limitToLast(10)
      .on("child_added", (msg) => {
        dispatch(setRoomsMsgs(roomID.key, { ...msg.val(), id: msg.key }));
      });
  });
};

// post message

export const postMessage = (roomID, message, opponentID) => async (
  dispatch
) => {
  const onSet = (error) =>
    error ? console.log(error) : console.log("success");

  const newMessID = await db_chat.ref(`messages/${roomID}`).push().key;

  if (message.message) {
    await db_chat.ref(`messages/${roomID}/${newMessID}`).set(message, onSet);

    const userRoomRef = await db.ref(`users/${opponentID}/chats/${roomID}`);
    userRoomRef
      .once("value", (snap) => snap)
      .then((snap) => {
        userRoomRef.update({ newMessages: snap.val().newMessages + 1 }, onSet);
      });
  }
};

export const getDialogOpponent = (opponentID) => (dispatch) => {
  opponentID &&
    db.ref(`users/${opponentID}`).once("value", (opponent) => {
      const opponentProps = {
        opponentID: opponent.key,
        avatar: opponent.val().avatar,
        opponentName: opponent.val().username,
      };

      dispatch(setOpponent(opponentProps));
    });
};
