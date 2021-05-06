import { fsdb, fst } from "./firebase";
import { newPostTpl } from "./mailTemplates";

// SENDMAIL UTILS

// const bucket = "obmen-market-666.appspot.com";

const onSendRemover = (id) => {
  console.log("start" + id);

  // const unsub = fsdb
  //   .collection("mail")
  //   .doc(id)
  //   .onSnapshot((doc) => {
  //     if (doc.data().delivery.state === "SUCCESS") {
  //       fsdb.collection("mail").doc(id).delete();
  //       unsub();
  //     }
  //   });
};

// FUNCTIONS

export const onLotCreateSendMail = async (lotData) => {
  const lotPhoto = await fst
    .ref()
    .child(`posts/${lotData.uid}/${lotData.postid}/photo0`)
    .getDownloadURL();

  const lotDescription =
    lotData.description.length > 50
      ? `${lotData.description.slice(0, 50)}...`
      : lotData.description;

  const lotMailBody = {
    delivery: { state: "CREATED" },
    toUids: [`${lotData.uid}`],
    message: {
      subject: "Вы добавили объявление на Obmen.market",
      html: newPostTpl(
        lotData.username,
        lotData.avatar,
        lotData.title,
        `https://obmen.market/posts/${lotData.postid}`,
        lotPhoto,
        lotDescription,
        `https://obmen.market/posts/${lotData.postid}?action=extend`
      ),
    },
  };

  fsdb
    .collection("mail")
    .add(lotMailBody)
    .then((doc) => onSendRemover(doc.id));
};

export const onOfferCreateSendMail = async (lotMeta, offerData) => {
  const offerMailBody = {
    delivery: { state: "CREATED" },
    toUids: [`${lotMeta.uid}`],
    message: {
      subject: "Вы добавили предложение к обмену на Obmen.market",
      html: newPostTpl(
        offerData.authorName,
        offerData.avatar,
        offerData.name,
        `https://obmen.market/posts/${lotMeta.postid}`,
        offerData.photoURLs[0],
        offerData.description
      ),
    },
  };

  fsdb
    .collection("mail")
    .add(offerMailBody)
    .then((doc) => onSendRemover(doc.id));
};

export const onApproveByLotAuthor = (lotMeta, offerMeta) => {
  console.log("approved");
  // const approveMailBody = {
  //   delivery: { state: "CREATED" },
  //   toUids: [`${offerMeta.authorID}`],
  //   template: {
  //     name: "your-offer-accepted",
  //     data: {
  //       lotTitle: lotMeta.title,
  //       lotPhotoLink: `https://firebasestorage.googleapis.com/v0/b/${bucket}/o/posts%2F${lotMeta.uid}%2F${lotMeta.postid}%2Fphoto0?alt=media`,
  //       offerTitle: offerMeta.name,
  //       offerDescription: offerMeta.description,
  //       offerOverprice: offerMeta.overprice,
  //       offerAuthorName: offerMeta.authorName,
  //       offerAuthorAvatar: offerMeta.avatar,
  //       offerPhotoLink: `https://firebasestorage.googleapis.com/v0/b/${bucket}/o/offers%2F${lotMeta.postid}%2F${offerMeta.offerID}%2Foffer0?alt=media`,
  //       offerLink: `https://obmen.market/posts/${lotMeta.postid}`,
  //       confirmOfferLink: `https://obmen.market/posts/${lotMeta.postid}`,
  //     },
  //   },
  // };

  // fsdb
  //   .collection("mail")
  //   .add(approveMailBody)
  //   .then((doc) => onSendRemover(doc.id));
};

export const onConfirmByOfferAuthor = (lotMeta, offerMeta) => {
  console.log("confirmed");
  // const approveMailBody = {
  //   delivery: { state: "CREATED" },
  //   toUids: [`${lotMeta.uid}`],
  //   template: {
  //     name: "start-chat",
  //     data: {
  //       lotTitle: lotMeta.title,
  //       lotPhotoLink: `https://firebasestorage.googleapis.com/v0/b/${bucket}/o/posts%2F${lotMeta.uid}%2F${lotMeta.postid}%2Fphoto0?alt=media`,
  //       offerTitle: offerMeta.name,
  //       offerDescription: offerMeta.description,
  //       offerOverprice: offerMeta.overprice,
  //       offerAuthorName: offerMeta.authorName,
  //       offerAuthorAvatar: offerMeta.avatar,
  //       offerPhotoLink: `https://firebasestorage.googleapis.com/v0/b/${bucket}/o/offers%2F${lotMeta.postid}%2F${offerMeta.offerID}%2Foffer0?alt=media`,
  //       offerLink: `https://obmen.market/posts/${lotMeta.postid}`,
  //       confirmOfferLink: `https://obmen.market/posts/${lotMeta.postid}`,
  //     },
  //   },
  // };
  // fsdb
  //   .collection("mail")
  //   .add(approveMailBody)
  //   .then((doc) => onSendRemover(doc.id));
};
