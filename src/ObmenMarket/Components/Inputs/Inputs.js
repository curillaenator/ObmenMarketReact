import TextareaAutosize from "react-textarea-autosize";
import Resizer from "react-image-file-resizer";

import styles from "./inputs.module.scss";

// Validators
export const required = (value) => (value ? undefined : "*обязательное поле");

export const minLength = (min) => (value) =>
  value && value.length < min ? `*не меньше ${min} символов` : undefined;

export const combinedValidators = (...validators) => (value) =>
  validators.reduce((err, val) => err || val(value), undefined);

// Inputs
export const TextInput = ({ input, meta, ...props }) => {
  const error = meta.touched && meta.error;
  return (
    <div className={styles.input}>
      <input
        {...input}
        {...props}
        style={error ? { borderBottom: "1px solid #f2002c" } : {}}
      />
      {!error && <p>{props.sub}</p>}
      {error && <p className={styles.error}>{meta.error}</p>}
    </div>
  );
};

export const TextArea = ({ input, meta, ...props }) => {
  const error = meta.touched && meta.error;
  return (
    <div className={styles.input}>
      <TextareaAutosize
        {...input}
        {...props}
        onChange={input.onChange}
        style={error ? { borderBottom: "1px solid #f2002c" } : {}}
      />
      {!error && <p>{props.sub}</p>}
      {error && <p className={styles.error}>{meta.error}</p>}
    </div>
  );
};

export const PhotoFiles = ({
  input: { value, onChange, ...input },
  meta,
  ...props
}) => {
  const resizedFile = (file) =>
    new Promise((resolve) =>
      Resizer.imageFileResizer(
        file,
        1280,
        720,
        "JPEG",
        40,
        0,
        (uri) => {
          console.log(uri);
          props.uploadImg(uri);
        },
        "file"
      )
    );

  return (
    <div className={styles.input}>
      <input
        className={styles.photofiles}
        {...input}
        type="file"
        id="choosePhotos"
        onChange={({ target }) => {
          resizedFile(target.files[0]);
          // props.uploadImg(target.files[0]);
        }}
      />
      <label className={styles.photofilesLabel} htmlFor="choosePhotos">
        {props.title}
      </label>
    </div>
  );
};
