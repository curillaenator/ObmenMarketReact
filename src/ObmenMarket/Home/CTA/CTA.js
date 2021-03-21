import { Button } from "../../Components/Button/Button";
import { Search } from "../../Components/Search/Search";

import styles from "./cta.module.scss";

export const Cta = ({
  isFormModeOn,
  setFormMode,
  icons,
  createLotId,
  onLotCreateFromForm,
  onLotCreateFormCancel,
}) => {
  const formModeHandler = () => {
    !isFormModeOn ? onLotCreateFromForm() : onLotCreateFormCancel(createLotId);
    setFormMode(!isFormModeOn);
  };

  const ctaTitle = isFormModeOn ? "Передумал" : "Есть что обменять";
  const ctaMarginBottom = isFormModeOn ? { marginBottom: "13px" } : {};
  return (
    <div className={styles.cta} style={ctaMarginBottom}>
      <Button
        width={217}
        height={56}
        title={ctaTitle}
        icon={icons.add}
        active={isFormModeOn}
        handler={formModeHandler}
      />
      <Search icon={icons.search} />
    </div>
  );
};
