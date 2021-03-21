import TextareaAutosize from "react-textarea-autosize";
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
  return (
    <div className={styles.input}>
      <input
        className={styles.photofiles}
        {...input}
        type="file"
        id="choosePhotos"
        onChange={({ target }) => {
          props.uploadImg(target.files[0])
          // console.log(target.files[0]);
          // onChange(target.files);
        }}
      />
      <label className={styles.photofilesLabel} htmlFor="choosePhotos">
        {props.title}
      </label>
    </div>
  );
};
