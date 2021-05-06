import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { fst } from "../../../Utils/firebase";
import { Field } from "react-final-form";

import { FormDropzone } from "../FormDropzone/FormDropzone";
import { Button } from "../Button/Button";
import { ButtonOutline } from "../Button/ButtonOutline";

import { setProgress } from "../../../Redux/Reducers/home";

import {
  required,
  fileRequired,
  minLength,
  combinedValidators,
  TextInput,
  TextArea,
  UploadCheck,
} from "../Inputs/Inputs";

import cloudtailpic from "../../../Assets/Icons/cloudtail.svg";

import styles from "./formfull.module.scss";

// Components

const Buttons = ({
  icons,
  notation,
  isUploading,
  loaderBtn,
  update,
  formSubmit,
  formSubmitDraft,
  formSubmitUpdate,
  formSubmitCancel,
}) => {
  const commonProps = {
    width: 220,
    height: 56,
    disabled: isUploading,
  };

  const getTitle = (btn, title) =>
    isUploading && loaderBtn === btn ? "Загрузка..." : title;

  return (
    <div className={styles.buttons}>
      {!update && (
        <>
          <Button
            {...commonProps}
            title={getTitle("publish", "Опубликовать")}
            icon={icons.lotpublish}
            loader={loaderBtn === "publish" && isUploading}
            handler={formSubmit}
          />

          <ButtonOutline
            {...commonProps}
            title={getTitle("draft", "Сохранить черновик")}
            icon={icons.lotdraft}
            loader={loaderBtn === "draft" && isUploading}
            handler={formSubmitDraft}
          />
        </>
      )}

      {update && (
        <>
          <Button
            {...commonProps}
            title={getTitle("update", "Сохранить")}
            icon={icons.lotpublish}
            loader={loaderBtn === "update" && isUploading}
            handler={formSubmitUpdate}
          />

          <ButtonOutline
            width={220}
            height={56}
            title="Отмена"
            // icon={icons.drafts}
            handler={formSubmitCancel}
          />
        </>
      )}

      {!update && <p>{notation}</p>}
    </div>
  );
};

// Main form
export const FormFullFields = ({
  icons,
  cloudtail,
  lotID,
  ownerID,
  lotPhotos, // for update
  update,
  setFormMode,
  handleSubmit,
  form,
  formUI,
  values,
}) => {
  const dispatch = useDispatch();

  const [uploads, setUploads] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [loaderBtn, setLoaderBtn] = useState(null);

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
        .child(`posts/${ownerID}/${lotID}/photo${num}`)
        .put(file, metadata);

      uploadTask.on(
        "state_changed",
        (snap) => {}, // progress
        (error) => console.log(error), // error
        () => resolve(true) // complete
      );
    });
  };

  const submitBase = () => {
    form.submit();
    setUploads([]);
    setIsUploading(false);
    setLoaderBtn(null);
    form.reset();
  };

  const formSubmitPublish = () => {
    form.change("draft", false);
    submitBase();
  };

  const formSubmitDraft = () => {
    form.change("draft", true);
    submitBase();
  };

  const formSubmitUpdate = () => submitBase();

  const formSubmitCancel = () => setFormMode(false);

  const onSubmitClick = (e, submitFunc, submitBtn) => {
    e.preventDefault();
    dispatch(setProgress(1));

    const uploadHandler = () => {
      setIsUploading(true);
      setLoaderBtn(submitBtn);

      Promise.all(uploads.map((blob, num) => uploadImg(blob, num)))
        .then(() => {
          submitFunc();
          dispatch(setProgress(100));
        })
        .catch((err) => console.log(err));
    };

    form.getState().valid ? uploadHandler() : form.submit();
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formfull}>
      {cloudtail && (
        <img className={styles.cloudtail} src={cloudtailpic} alt="tail" />
      )}
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
              <FormDropzone uploads={uploads} setUploads={setUploads} />

              <Field
                name="uploaded"
                component={UploadCheck}
                type="number"
                validate={fileRequired}
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

            <div className={styles.hidenfields}>
              <Field name="draft" component="input" type="checkbox" />

              {/* <Field name="published" component="input" type="checkbox" /> */}
            </div>
          </div>
        </div>
      </div>

      <Buttons
        icons={icons}
        notation={formUI.notation}
        loaderBtn={loaderBtn}
        isUploading={isUploading}
        formSubmit={(e) => onSubmitClick(e, formSubmitPublish, "publish")}
        formSubmitDraft={(e) => onSubmitClick(e, formSubmitDraft, "draft")}
        formSubmitUpdate={(e) => onSubmitClick(e, formSubmitUpdate, "update")}
        formSubmitCancel={formSubmitCancel}
        update={update}
      />
    </form>
  );
};
