import { useState } from "react";
import { useSelector } from "react-redux";
import { useDropzone } from "react-dropzone";
import Resizer from "react-image-file-resizer";

import styles from "./formdropzone.module.scss";

export const FormDropzone = ({ uploads, setUploads }) => {
  const icon = useSelector((state) => state.ui.icons.delete);

  const [countValid, setCountValid] = useState(true);

  const resizeFile = (file) => {
    return new Promise((resolve) =>
      Resizer.imageFileResizer(
        file,
        1440,
        1440,
        "JPEG",
        60,
        0,
        (resized) => resolve(resized),
        "file"
      )
    );
  };

  const onDrop = (files) => {
    const validate = () => {
      if (uploads.length + files.length > 5) {
        return false;
      }
      if (uploads.some((u) => files.map((f) => f.name).includes(u.name))) {
        return false;
      }
      return true;
    };

    const valid = () => {
      const resized = files.map((file) => resizeFile(file));

      Promise.all(resized).then((resizedFiles) => {
        setCountValid(true);
        setUploads([...uploads, ...resizedFiles]);
      });
    };

    const unvalid = () => setCountValid(false);

    validate() ? valid() : unvalid();
  };

  const onRemove = (file) => {
    setUploads(uploads.filter((blob) => blob.name !== file.name));
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/jpeg, image/png",
  });

  return (
    <div className={styles.photos}>
      <p className={styles.photos_title}>Фотографии:</p>

      {uploads.length > 0 && (
        <div
          className={styles.photos_previews}
          style={uploads.length < 5 ? { marginBottom: 16 } : {}}
        >
          {uploads.map((photo, i) => (
            <div
              className={styles.photoCont}
              key={i}
              onClick={() => onRemove(photo)}
            >
              <img
                className={styles.photo}
                src={URL.createObjectURL(photo)}
                alt={photo.name}
                draggable={false}
              />

              {icon}
            </div>
          ))}
        </div>
      )}

      {uploads.length < 5 && (
        <div {...getRootProps({ className: styles.photos_dropzone })}>
          <input {...getInputProps()} />

          {isDragActive && <p>Переместите фото сюда...</p>}

          {!isDragActive && countValid && (
            <p className={styles.dropok}>
              Кликните или переместите сюда Ваши фото <br /> ( до 5 фото )
            </p>
          )}

          {!isDragActive && !countValid && (
            <p className={styles.droperror}>
              Вы добавляете одинаковые файлы или более 5 фото, попробуйте еще
              раз
            </p>
          )}
        </div>
      )}
    </div>
  );
};
