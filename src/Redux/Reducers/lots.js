import { batch } from "react-redux";

import { fst, db, fa, db_offer, db_chat } from "../../Utils/firebase";

import {
  onLotCreateSendMail,
  onOfferCreateSendMail,
  onApproveByLotAuthor,
  onConfirmByOfferAuthor,
} from "../../Utils/SendMails";

import { setFormMode, setProgress } from "./home";

const SET_LOTLIST = "lots/SET_LOTLIST";
const SET_ENDBEFORE_ID = "lots/SET_ENDBEFORE_ID";
const SET_LOTS_PENDING = "lots/SET_LOTS_PENDING";
const SET_ALLLOTS_LOADED = "lots/SET_ALLLOTS_LOADED";

const MY_LOTLIST = "lots/MY_LOTLIST";
const MY_LOTS_PENDING = "lots/MY_LOTS_PENDING";
const MY_LOTS_PAGE = "lots/MY_LOTS_PAGE";
const SET_LAST_PROFILE = "lots/SET_LAST_PROFILE";

const RESET_STATE = "lots/RESET_STATE";
const SET_NEWLOT_ID = "lots/SET_NEWLOT_ID";
const SET_NEWOFFER_ID = "lots/SET_NEWOFFER_ID";
const SET_CURRENT_LOTMETA = "lots/SET_CURRENT_LOT";
const SET_CURRENT_LOTOFFERS = "lots/SET_CURRENT_LOTOFFERS";

const initialState = {
  // main page params
  lotList: [],
  lotsPending: false,
  lotsPerPage: 20,
  endBeforeID: null,
  allLotsLoaded: false,
  // profile page params
  myLotList: [],
  myLotsPending: false,
  myLotsPage: 8,
  myLotsPerPage: 8,
  lastProfile: null,
  // rest params
  createLotId: null,
  createOfferId: null,
  currentLotMeta: null,
};

export const lots = (state = initialState, action) => {
  switch (action.type) {
    // main page state setters

    case SET_LOTLIST:
      return { ...state, lotList: [...state.lotList, ...action.lotList] };

    case SET_LOTS_PENDING:
      return { ...state, lotsPending: action.payload };

    case SET_ALLLOTS_LOADED:
      return { ...state, allLotsLoaded: action.payload };

    case SET_ENDBEFORE_ID:
      return { ...state, endBeforeID: action.id };

    // profile page state setters

    case MY_LOTLIST:
      return { ...state, myLotList: action.lotList };

    case MY_LOTS_PENDING:
      return { ...state, myLotsPending: action.payload };

    case MY_LOTS_PAGE:
      return { ...state, myLotsPage: action.payload };

    case SET_LAST_PROFILE:
      return { ...state, lastProfile: action.payload };

    // rest setters

    case RESET_STATE:
      return { ...initialState };

    case SET_NEWLOT_ID:
      return { ...state, createLotId: action.id };

    case SET_NEWOFFER_ID:
      return { ...state, createOfferId: action.id };

    case SET_CURRENT_LOTMETA:
      return { ...state, currentLotMeta: action.payload };

    case SET_CURRENT_LOTOFFERS:
      return {
        ...state,
        currentLotMeta: { ...state.currentLotMeta, offers: action.offers },
      };

    default:
      return state;
  }
};

// ACTIONS

const setLotList = (lotList) => ({ type: SET_LOTLIST, lotList });
const setEndBeforeID = (id) => ({ type: SET_ENDBEFORE_ID, id });
const setLotsPending = (payload) => ({ type: SET_LOTS_PENDING, payload });
const setAllLotsLoaded = (payload) => ({ type: SET_ALLLOTS_LOADED, payload });

const myLotList = (lotList) => ({ type: MY_LOTLIST, lotList });
const myLotsPending = (payload) => ({ type: MY_LOTS_PENDING, payload });
const setLastProfile = (payload) => ({ type: SET_LAST_PROFILE, payload });
export const setMyLotsPage = (payload) => ({ type: MY_LOTS_PAGE, payload });

export const setNewLotId = (id) => ({ type: SET_NEWLOT_ID, id });
const setNewOfferId = (id) => ({ type: SET_NEWOFFER_ID, id });
const setLotMeta = (payload) => ({ type: SET_CURRENT_LOTMETA, payload });
const setLotOffers = (offers) => ({ type: SET_CURRENT_LOTOFFERS, offers });

export const resetLotsState = () => ({ type: RESET_STATE });

// THUNKS

// Meta reset

export const resetMetaState = () => (dispatch) => {
  batch(() => {
    dispatch(setNewLotId(null));
    dispatch(setLotMeta(null));
    dispatch(setNewOfferId(null));
  });
};

// fullfill each lotMeta with photoURL and offerQty

const lotMetasPageLoader = (listArr) => {
  return listArr.map(async (lot) => {
    const photoURL = `https://firebasestorage.googleapis.com/v0/b/obmen-market-666.appspot.com/o/posts%2F${lot.uid}%2F${lot.postid}%2Fphoto0?alt=media`;

    const offersQtySnap = await db_offer.ref(lot.postid).once("value");
    const offersQty = offersQtySnap.exists()
      ? Object.keys(offersQtySnap.val()).length
      : 0;

    return { ...lot, photoURL, offersQty };
  });
};

// get authored lots first page for profile

export const setAuthoredLots = (ownerID, paramsID) => async (
  dispatch,
  getState
) => {
  await batch(() => {
    dispatch(myLotsPending(true));
    dispatch(setProgress(1));
    getState().lots.lastProfile !== (paramsID || ownerID) &&
      dispatch(setMyLotsPage(getState().lots.myLotsPerPage));
  });

  db.ref("posts")
    .orderByChild("uid")
    .equalTo(paramsID || ownerID)
    .limitToLast(getState().lots.myLotsPage)
    .once("value", (list) => {
      if (list.exists()) {
        const listArr = Object.keys(list.val()).map(
          (lotID) => list.val()[lotID]
        );

        Promise.all(lotMetasPageLoader(listArr)).then((lotsResolved) => {
          batch(() => {
            dispatch(myLotList([...lotsResolved].reverse()));
            dispatch(setLastProfile(paramsID ? paramsID : ownerID));
            dispatch(myLotsPending(false));
            dispatch(setProgress(100));
          });
        });
      }
    });
};

// get lots first page

export const getPaginationFirstPage = () => (dispatch, getState) => {
  batch(() => {
    dispatch(setProgress(1));
    dispatch(setLotsPending(true));
  });

  db.ref("posts")
    .limitToLast(getState().lots.lotsPerPage)
    .once("value", (list) => {
      if (list.exists()) {
        const listArr = Object.keys(list.val()).map(
          (lotID) => list.val()[lotID]
        );

        Promise.all(lotMetasPageLoader(listArr)).then((lotsResolved) => {
          batch(() => {
            dispatch(setEndBeforeID(lotsResolved[0].postid));
            dispatch(setLotList([...lotsResolved].reverse()));
            dispatch(setLotsPending(false));
            dispatch(setProgress(100));
          });
        });
      }

      if (!list.exists()) {
        batch(() => {
          dispatch(setAllLotsLoaded(true));
          dispatch(setProgress(100));
        });
      }
    });
};

// get get lots every next page

export const getPaginationNextPage = (endBeforeID) => (dispatch, getState) => {
  batch(() => {
    dispatch(setLotsPending(true));
    dispatch(setProgress(1));
  });

  db.ref("posts")
    .orderByKey()
    .endBefore(endBeforeID)
    .limitToLast(getState().lots.lotsPerPage)
    .once("value", (list) => {
      if (list.exists()) {
        const listArr = Object.keys(list.val()).map(
          (lotID) => list.val()[lotID]
        );

        Promise.all(lotMetasPageLoader(listArr)).then((lotsResolved) => {
          batch(() => {
            dispatch(setEndBeforeID(lotsResolved[0].postid));
            dispatch(setLotList([...lotsResolved].reverse()));
            dispatch(setLotsPending(false));
            dispatch(setProgress(100));
          });
        });
      }

      if (!list.exists()) {
        batch(() => {
          dispatch(setAllLotsLoaded(true));
          dispatch(setProgress(100));
        });
      }
    });
};

// lot create / cancel lot create

export const onLotCreateFromForm = () => (dispatch) => {
  const lotID = db.ref().child("posts").push().key;

  dispatch(setNewLotId(lotID));
};

export const onLotCreateFormCancel = (lotID) => async (dispatch) => {
  const author = await fa.currentUser;

  await db.ref(`posts/${lotID}`).remove();

  await fst
    .ref()
    .child(`posts/${author.uid}/${lotID}`)
    .listAll()
    .then((res) => res.items.forEach((item) => item.delete()));

  batch(() => {
    dispatch(setNewLotId(null));
    dispatch(setLotMeta(null));
  });
};

// lot publish / lot update / lot remove

export const publishNewLotFromForm = (updData, history) => (dispatch) => {
  const draftsPath = `drafts/${updData.postid}`;
  const publishPath = `posts/${updData.postid}`;

  const setMeta = (err, path) => {
    if (err) return console.log(err);

    history.push(path);
    dispatch(setFormMode(false));
    onLotCreateSendMail(updData);
  };

  if (updData.draft) {
    delete updData.draft;
    return db
      .ref(draftsPath)
      .update(updData, (err) => setMeta(err, draftsPath));
  }

  if (!updData.draft) {
    delete updData.draft;
    return db
      .ref(publishPath)
      .update(updData, (err) => setMeta(err, publishPath));
  }
};

export const updateLotFromEditForm = (updData) => (dispatch) => {
  const onUpdate = (error) => {
    error ? console.log(error) : console.log("success");

    db.ref(`posts/${updData.postid}`).once("value", (snap) => {
      batch = () => {
        dispatch(setLotMeta(snap.val()));
        dispatch(setFormMode(false));
      };
    });
  };

  db.ref(`posts/${updData.postid}`).update(updData, onUpdate);
};

export const removeLot = (lotID, history) => async (dispatch, getState) => {
  dispatch(setProgress(1));

  const ownerID = getState().auth.ownerID;

  await db.ref(`posts/${lotID}/chats`).once("value", (chats) => {
    console.log(chats.exists());

    if (chats.exists()) {
      Object.keys(chats.val()).forEach((roomID) => {
        const offerAuthor = chats.val()[roomID].offerAuthorID;
        const lotAuthor = chats.val()[roomID].lotAuthorID;

        console.log(roomID);

        db_chat.ref(`messages/${roomID}`).set(null);
        db_chat.ref(`chats/${roomID}`).set(null);
        db.ref(`users/${offerAuthor}/chats/${roomID}`).remove();
        db.ref(`users/${lotAuthor}/chats/${roomID}`).remove();
        dispatch(setProgress(20));
      });
    }
  });

  await db_offer
    .ref(lotID)
    .once("value", (offers) => {
      if (offers.exists()) {
        console.log("offers del");
        Object.keys(offers.val())
          .map((offerID) => offers.val()[offerID].photospath)
          .forEach((path) => {
            fst
              .ref()
              .child(path)
              .listAll()
              .then((res) => res.items.forEach((item) => item.delete()));
          });
      }
      if (!offers.exists()) {
        console.log("no offers");
      }
      dispatch(setProgress(40));
    })
    .then(() => db_offer.ref(lotID).remove());

  await fst
    .ref()
    .child(`posts/${ownerID}/${lotID}`)
    .listAll()
    .then((res) =>
      res.items.forEach((item) => {
        item.delete();
        dispatch(setProgress(60));
      })
    );

  await db.ref(`posts/${lotID}`).remove();

  await dispatch(setProgress(100));

  history.push("/");
};

// compile lotMeta (get lotMeta, getLotPhotos, get lotOffers, get lotOffersPhotos)

export const getLotMeta = (lotID, history) => (dispatch) => {
  dispatch(setProgress(1));

  const compileLotMeta = async (lotMeta) => {
    const photoItems = await fst
      .ref()
      .child(`posts/${lotMeta.uid}/${lotMeta.postid}`)
      .listAll()
      .then((res) => res.items.map((item) => item.getDownloadURL()));

    const pLinks = await Promise.all(photoItems);

    const offersSnap = await db_offer.ref(lotMeta.postid).once("value");

    if (offersSnap.exists()) {
      const offersSnapArr = Object.keys(offersSnap.val()).map(
        (id) => offersSnap.val()[id]
      );

      const offersPromises = offersSnapArr.map(async (offer) => {
        const offerPhotoItems = await fst
          .ref()
          .child(offer.photospath)
          .listAll()
          .then((res) => res.items.map((item) => item.getDownloadURL()));

        const offerPhotoLinks = await Promise.all(offerPhotoItems);

        return { ...offer, photoURLs: offerPhotoLinks };
      });

      Promise.all(offersPromises).then((offers) => {
        batch(() => {
          dispatch(setLotMeta({ ...lotMeta, photoLinks: pLinks, offers }));
          dispatch(setProgress(100));
        });
      });
    }

    if (!offersSnap.exists()) {
      batch(() => {
        dispatch(setLotMeta({ ...lotMeta, photoLinks: pLinks, offers: null }));
        dispatch(setProgress(100));
      });
    }
  };

  db.ref(`posts/${lotID}`).once("value", (lotSnap) => {
    if (lotSnap.exists()) {
      dispatch(setFormMode(false));
      compileLotMeta(lotSnap.val());
    }

    if (!lotSnap.exists()) {
      history.push("/");
    }
  });
};

// offer prolong

export const prolongLotExpiry = (daysToAdd) => (dispatch, getState) => {
  const lotMeta = getState().lots.currentLotMeta;
  dispatch(setProgress(1));

  const newExpiry = new Date(
    Date.parse(lotMeta.expireDate) + daysToAdd * 24 * 60 * 60 * 1000
  );

  // const curDate = new Date();
  // const newExpiry = new Date(curDate.setDate(curDate.getDate() + 7));

  const onUpdate = (err) => {
    err
      ? console.log(err)
      : batch(() => {
          dispatch(setLotMeta({ ...lotMeta, expireDate: newExpiry }));
          dispatch(setProgress(100));
        });
  };

  db.ref(`posts/${lotMeta.postid}`).update({ expireDate: newExpiry }, onUpdate);
};

// offer accept by lotAuthor & confirm by offerAuthor

export const acceptConfirmOffer = (lotMeta, offerMeta, payload) => (
  dispatch
) => {
  dispatch(setProgress(1));

  const onSuccess = () => {
    db.ref(`posts/${lotMeta.postid}`).once("value", (lot) => {
      if (lot.val().acceptedOffer && !lot.val().offerConfirmed) {
        batch(() => {
          dispatch(
            setLotMeta({ ...lotMeta, acceptedOffer: lot.val().acceptedOffer })
          );
          dispatch(setProgress(100));
        });

        return onApproveByLotAuthor(lotMeta, offerMeta);
      }

      if (lot.val().acceptedOffer && lot.val().offerConfirmed) {
        batch(() => {
          dispatch(
            setLotMeta({ ...lotMeta, offerConfirmed: lot.val().offerConfirmed })
          );
          dispatch(setProgress(100));
        });

        return onConfirmByOfferAuthor(lotMeta, offerMeta);
      }

      return batch(() => {
        dispatch(setLotMeta({ ...lotMeta, ...payload }));
        dispatch(setProgress(100));
      });
    });
  };

  db.ref(`posts/${lotMeta.postid}`).update(payload, (err) =>
    err ? console.log(err) : onSuccess()
  );
};

// offer create / remove / cancel create / publish

export const onOfferCreate = (lotMeta) => (dispatch) => {
  const offerID = db_offer.ref(lotMeta.postid).push().key;
  dispatch(setNewOfferId(offerID));
};

export const onOfferCancel = (offerID) => (dispatch, getState) => {
  const lotMeta = getState().lots.currentLotMeta;

  const Success = async () => {
    await fst
      .ref()
      .child(`/offers/${lotMeta.postid}/${offerID}`)
      .listAll()
      .then((res) => res.items.forEach((item) => item.delete()));

    const offers = lotMeta.offers
      ? lotMeta.offers.filter((offer) => offer.offerID !== offerID)
      : [];

    batch(() => {
      dispatch(setNewOfferId(null));
      dispatch(setLotOffers(offers));
    });
  };

  db_offer
    .ref(`${lotMeta.postid}/${offerID}`)
    .set(null, (err) => (err ? console.lor(err) : Success()));
};

export const removeOffer = (offerID) => (dispatch, getState) => {
  const lotMeta = getState().lots.currentLotMeta;

  batch(() => {
    dispatch(setProgress(1));
    dispatch(onOfferCancel(offerID));
  });

  const acceptConfirmReset = {
    acceptedOffer: null,
    offerConfirmed: null,
  };

  db.ref(`posts/${lotMeta.postid}`).update(acceptConfirmReset, () =>
    dispatch(setProgress(100))
  );
};

export const createOffer = (lotMeta, offerData) => (dispatch, getState) => {
  dispatch(setProgress(1));

  const Success = async () => {
    const lotOffers = getState().lots.currentLotMeta.offers || [];

    const newOffer = await db_offer
      .ref(`${lotMeta.postid}/${offerData.offerID}`)
      .once("value");

    const photoPromises = await fst
      .ref()
      .child(`/offers/${lotMeta.postid}/${newOffer.val().offerID}`)
      .listAll()
      .then((res) => res.items.map((item) => item.getDownloadURL()));

    const photoURLs = await Promise.all(photoPromises);

    onOfferCreateSendMail(lotMeta, { ...newOffer.val(), photoURLs });

    batch(() => {
      dispatch(setNewOfferId(null));
      dispatch(setLotOffers([...lotOffers, { ...newOffer.val(), photoURLs }]));
      dispatch(setProgress(100));
    });
  };

  db_offer
    .ref(`${lotMeta.postid}/${offerData.offerID}`)
    .update(offerData, (err) => (err ? console.log(err) : Success()));
};
