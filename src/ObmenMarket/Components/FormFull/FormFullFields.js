import { useState } from "react";
import { fb, fa } from "../../../Utils/firebase";
import { Field } from "react-final-form";
import { Button } from "../Button/Button";
import { ButtonOutline } from "../Button/ButtonOutline";
import {
  required,
  minLength,
  combinedValidators,
  TextInput,
  TextArea,
  PhotoFiles,
} from "../Inputs/Inputs";

import cloudtail from "../../../Assets/Icons/cloudtail.svg";

import styles from "./formfull.module.scss";

// Components
const PhotosCont = (props) => {
  const deletePhoto = () => console.log("delete");
  return (
    <div className={styles.loaded}>
      {props.photos.map((p, i) => (
        <div className={styles.imgCont} onClick={deletePhoto} key={i}>
          <img src={p} alt="" draggable={false} />
          <div className={styles.delete}>{props.icons.delete}</div>
        </div>
      ))}
    </div>
  );
};

const Buttons = (props) => {
  return (
    <div className={styles.buttons}>
      <Button
        width={220}
        height={56}
        title="Опубликовать"
        icon={props.icons.success}
        handler={props.formSubmit}
      />
      <ButtonOutline
        width={220}
        height={56}
        title="Сохранить черновик"
        icon={props.icons.drafts}
      />
      <p>{props.notation}</p>
    </div>
  );
};

// Main form
export const FormFullFields = (props) => {
  const uid = fa.currentUser.uid;

  const [photos, setPhotos] = useState([]);
  const photosHandler = (add) => setPhotos([...photos, add]);

  const formSubmit = (e) => {
    e.preventDefault();
    props.form.change("photos", photos);
    props.form.submit();
  };

  const storage = fb.storage().ref();

  const uploadImg = (file) => {
    const uploadTask = storage
      .child("posts/" + uid + "/" + props.createLotId + "/" + photos.length)
      .put(file);

    uploadTask.on(
      "state_changed",
      (snap) => {},
      (error) => {},
      () =>
        uploadTask.snapshot.ref
          .getDownloadURL()
          .then((url) => photosHandler(url))
    );
  };

  const formUI = props.furmFullUi;
  const formDisplay = props.isFormModeOn ? {} : { display: "none" };

  return (
    <form
      onSubmit={props.handleSubmit}
      className={styles.formfull}
      style={formDisplay}
    >
      <img className={styles.cloudtail} src={cloudtail} alt="tail" />
      <div className={styles.shape}>
        <div className={styles.fields}>
          <div className={styles.pad}>
            <h2 className={styles.title}>{formUI.offer.title}</h2>

            <Field
              name="title"
              component={TextInput}
              validate={combinedValidators(required, minLength(5))}
              placeholder={formUI.offer.name}
              sub={formUI.offer.lotnameSub}
            />

            <Field
              name="categories"
              component={TextInput}
              validate={required}
              placeholder={formUI.offer.category}
              sub={formUI.offer.categorySub}
            />

            <Field
              name="price"
              component={TextInput}
              placeholder={formUI.offer.price}
              sub={formUI.offer.priceSub}
            />

            <div className={styles.photos}>
              <p className={styles.subtitle}>Фотографии:</p>

              {photos.length > 0 && (
                <PhotosCont photos={photos} icons={props.icons} />
              )}

              <Field
                name="photos"
                title="Добавить фото"
                uploadImg={uploadImg}
                component={PhotoFiles}
              />
            </div>
          </div>

          <div className={styles.pad}>
            <h2 className={styles.title}>{formUI.description.title}</h2>

            <Field
              name="description"
              component={TextArea}
              validate={combinedValidators(required, minLength(15))}
              maxRows={12}
              placeholder={formUI.description.description}
              sub={formUI.description.descriptionSub}
            />
          </div>

          <div className={styles.pad}>
            <h2 className={styles.title}>{formUI.wish.title}</h2>

            <Field
              name="wishes"
              component={TextInput}
              placeholder={formUI.wish.category}
              sub={formUI.wish.categorySub}
            />

            <Field
              name="overprice"
              component={TextInput}
              placeholder={formUI.wish.addPayment}
              sub={formUI.wish.addPaymentSub}
            />
          </div>
        </div>
      </div>

      <Buttons
        icons={props.icons}
        notation={formUI.notation}
        formSubmit={formSubmit}
      />
    </form>
  );
};
