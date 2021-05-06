import { Form, Field } from "react-final-form";
import { Button } from "../Components/Button/Button";
import { ButtonOutline } from "../Components/Button/ButtonOutline";

import {
  required,
  minLength,
  combinedValidators,
  TextInput,
  // TextArea,
  // PhotoFiles,
} from "../Components/Inputs/Inputs";

import styles from "./profileedit.module.scss";

export const ProfileEdit = ({
  // icons,
  user,
  formProfile,
  handleEdit,
  updateUserProfile,
}) => {
  const onSubmit = (formData) => {
    updateUserProfile({ ...user, ...formData });
    handleEdit();
  };

  return (
    <Form
      onSubmit={onSubmit}
      initialValues={user}
      render={({ handleSubmit, form }) => {
        const onSave = (e) => {
          e.preventDefault();
          form.submit();
        };

        const onCancel = (e) => {
          e.preventDefault();
          handleEdit();
        };

        const uploadPhoto = (e) => {
          e.preventDefault();
        };

        return (
          <form onSubmit={handleSubmit} className={styles.edit}>
            <div className={styles.container}>
              <div className={styles.edittitle}>Редактирование профиля</div>

              <div className={styles.editable}>
                <div className={styles.photo}>
                  <img className={styles.avatar} src={user.avatar} alt="" />

                  <div className={styles.username}>{user.username}</div>

                  <div className={styles.upload}>
                    <ButtonOutline
                      width={145}
                      height={40}
                      title="Обновить фото"
                      handler={uploadPhoto}
                    />
                  </div>
                </div>

                <div className={styles.fields}>
                  <div className={styles.field}>
                    <Field
                      name="username"
                      component={TextInput}
                      sup={formProfile.fullname.sup}
                      supicon={formProfile.fullname.icon}
                      validate={combinedValidators(required, minLength(5))}
                      placeholder={formProfile.fullname.placeholder}
                    />
                  </div>

                  <div className={styles.field}>
                    <Field
                      name="tel"
                      component={TextInput}
                      sup={formProfile.tel.sup}
                      supicon={formProfile.tel.icon}
                      placeholder={formProfile.tel.placeholder}
                    />
                  </div>

                  <div className={styles.field}>
                    <Field
                      name="email"
                      component={TextInput}
                      sup={formProfile.email.sup}
                      supicon={formProfile.email.icon}
                      placeholder={formProfile.email.placeholder}
                    />
                  </div>

                  <div className={styles.field}>
                    <Field
                      name="country"
                      component={TextInput}
                      sup={formProfile.country.sup}
                      supicon={formProfile.country.icon}
                      placeholder={formProfile.country.placeholder}
                    />
                  </div>

                  <div className={styles.field}>
                    <Field
                      name="city"
                      component={TextInput}
                      sup={formProfile.city.sup}
                      supicon={formProfile.city.icon}
                      placeholder={formProfile.city.placeholder}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.buttons}>
              <div className={styles.save}>
                <Button
                  width={220}
                  height={56}
                  title="Сохранить"
                  // icon={icons.success}
                  handler={onSave}
                />
              </div>

              <div className={styles.cancel}>
                <ButtonOutline
                  width={220}
                  height={56}
                  title="Отмена"
                  // icon={icons.success}
                  handler={onCancel}
                />
              </div>
            </div>
          </form>
        );
      }}
    />
  );
};
