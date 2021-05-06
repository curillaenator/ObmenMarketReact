import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Form, Field } from "react-final-form";
import { fst } from "../../../Utils/firebase";

import { Button } from "../../Components/Button/Button";
import { FormDropzone } from "../../Components/FormDropzone/FormDropzone";
import { setProgress } from "../../../Redux/Reducers/home";

import {
  required,
  fileRequired,
  minLength,
  combinedValidators,
  TextInput,
  Checkbox,
  TextArea,
  UploadCheck,
} from "../../Components/Inputs/Inputs";

import cloudtail from "../../../Assets/Icons/cloudtail.svg";

import styles from "./formoffer.module.scss";

const OfferFormFields = ({
  formOfferUI,
  createOfferId,
  lotID,
  handleSubmit,
  form,
}) => {
  const dispatch = useDispatch();

  const [uploads, setUploads] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    form.change("uploaded", uploads.length);
  }, [form, uploads]);

  const uploadImg = (file, num) => {
    return new Promise((resolve) => {
      const metadata = {
        cacheControl: "public,max-age=7200",
      };

      const uploadTask = fst
        .ref()
        .child(`offers/${lotID}/${createOfferId}/offer${num}`)
        .put(file, metadata);

      uploadTask.on(
        "state_changed",
        (snap) => {}, // progress
        (error) => console.log(error), // error
        () => resolve(true) // complete
      );
    });
  };

  const afterUploadSubmit = () => {
    form.submit();
    setUploads([]);
    form.reset();
  };

  const onSubmitClick = (e) => {
    e.preventDefault();
    dispatch(setProgress(1));

    const uploadHandler = () => {
      setIsUploading(true);

      const uplComlete = uploads.map((blob, num) => uploadImg(blob, num));

      Promise.all(uplComlete).then(() => {
        setIsUploading(false);
        afterUploadSubmit();
        dispatch(setProgress(100));
      });
    };

    form.getState().valid ? uploadHandler() : form.submit();
  };

  return (
    <form className={styles.offer} onSubmit={handleSubmit}>
      <img className={styles.cloudtail} src={cloudtail} alt="tail" />

      <div className={styles.shape}>
        <div className={styles.title}>{formOfferUI.title}</div>

        <Field
          name="name"
          component={TextInput}
          validate={combinedValidators(required, minLength(5))}
          placeholder={formOfferUI.name.placeholder}
        />

        <Field
          name="description"
          component={TextArea}
          validate={combinedValidators(required, minLength(12))}
          placeholder={formOfferUI.description.placeholder}
        />

        <div className={styles.overprice}>
          <Field
            name="overprice"
            component={Checkbox}
            type="checkbox"
            initialValue={false}
          />
        </div>

        <div className={styles.photos}>
          <FormDropzone uploads={uploads} setUploads={setUploads} />

          <Field
            name="uploaded"
            component={UploadCheck}
            type="number"
            validate={fileRequired}
          />
        </div>

        <div className={styles.buttons}>
          <Button
            width={217}
            height={56}
            disabled={isUploading}
            loader={isUploading}
            title={isUploading ? "Загружзка..." : "Предложить обмен"}
            handler={onSubmitClick}
          />
        </div>
      </div>
    </form>
  );
};

export const FormOffer = ({
  ownerID,
  user,
  formOfferUI,
  lotMeta,
  icons,
  createOffer,
  createOfferId,
  setIsOfferForm,
}) => {
  const onSubmit = (formData) => {
    const offerInitial = {
      avatar: user.avatar,
      authorName: user.username,
      offerID: createOfferId,
      authorID: ownerID,
      photospath: `/offers/${lotMeta.postid}/${createOfferId}`,
    };

    createOffer(lotMeta, { ...offerInitial, ...formData });
    setIsOfferForm(false);
  };

  return (
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit, form }) => (
        <OfferFormFields
          icons={icons}
          formOfferUI={formOfferUI}
          lotID={lotMeta.postid}
          createOfferId={createOfferId}
          handleSubmit={handleSubmit}
          form={form}
        />
      )}
    />
  );
};
