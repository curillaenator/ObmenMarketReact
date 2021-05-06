import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Popup from "reactjs-popup";
import { Button } from "../../Components/Button/Button";
import { ButtonOutline } from "../../Components/Button/ButtonOutline";

import { prolongLotExpiry } from "../../../Redux/Reducers/lots";

import bankcard from "../../../Assets/Icons/bankcard.svg";
import googlepay from "../../../Assets/Icons/googlepay.svg";
import applepay from "../../../Assets/Icons/applepay.svg";

import styles from "./prolong.module.scss";
import "./prolong.scss";

const ModalInfo = ({ icon, title, text }) => {
  return (
    <div className={styles.info}>
      <img className={styles.info_img} src={icon} alt="" />

      <div className={styles.info_title}>{title}</div>

      <div className={styles.info_text}>{text}</div>
    </div>
  );
};

const Option = ({ title, icon, option, payment, setPayment }) => {
  const optionActive = option === payment ? { backgroundColor: "#ffffff" } : {};
  const imgStyle = title !== "" ? { marginRight: "12px" } : {};
  return (
    <div
      className={styles.option}
      onClick={() => setPayment(option)}
      style={optionActive}
    >
      <img style={imgStyle} src={icon} alt={title} />
      <div className={styles.option_title}>{title}</div>
    </div>
  );
};

const Modal = ({ close, addTimeModal }) => {
  const dispatch = useDispatch();
  const [payment, setPayment] = useState("bankcard");
  const [modalPage, setModalPage] = useState(0);

  const handleProlong = () => {
    dispatch(prolongLotExpiry(2));
    close();
  };

  const options = [
    { option: "bankcard", title: "Банковской картой", icon: bankcard },
    { option: "applepay", title: "", icon: applepay },
    { option: "googlepay", title: "", icon: googlepay },
  ];

  return (
    <div className={styles.modal}>
      {modalPage === 0 && (
        <div className={styles.modalpage}>
          <ModalInfo
            icon={addTimeModal.addTimeP1.icon}
            title={addTimeModal.addTimeP1.title}
            text={addTimeModal.addTimeP1.text}
          />

          <div className={styles.payment}>
            <div className={styles.payment_select}>
              {options.map((option) => (
                <Option
                  key={option.option}
                  title={option.title}
                  icon={option.icon}
                  option={option.option}
                  payment={payment}
                  setPayment={setPayment}
                />
              ))}
            </div>

            <div className={styles.paybutton}>
              <Button
                width={163}
                height={56}
                title="Оплатить 30₽"
                handler={() => setModalPage(modalPage + 1)}
              />
            </div>

            <div className={styles.paybutton}>
              <ButtonOutline
                width={163}
                height={56}
                title="Отмена"
                handler={() => close()}
              />
            </div>
          </div>
        </div>
      )}

      {modalPage === 1 && (
        <div className={styles.modalpage}>
          <ModalInfo
            icon={addTimeModal.addTimeP2.icon}
            title={addTimeModal.addTimeP2.title}
            text={addTimeModal.addTimeP2.text}
          />

          <div className={styles.paybutton}>
            <Button
              width={163}
              height={56}
              title="Cупер"
              handler={handleProlong}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export const Prolong = ({ butCont, setIsModalOn }) => {
  const { icons, addTimeModal } = useSelector((state) => state.ui);

  // const daysLeft =
  //   new Date(new Date(lotMeta.expireDate) - new Date()).getDate() - 1;

  const Trigger = (open) => (
    <div className={styles.prolongButton}>
      <Button
        width={butCont}
        height={56}
        // title={
        //   daysLeft >= 7
        //     ? "Вы достигли лимита продления срока"
        //     : "Продлить объявление  на 48 часов"
        // }
        title={"Продлить объявление на 48 часов"}
        // subtitle={daysLeft >= 7 ? null : "за 30 рублей"}
        subtitle="за 30 рублей"
        titlewidth="calc(100% - 64px)"
        icon={icons.lotextend}
        // disabled={daysLeft >= 7}
      />
    </div>
  );

  return (
    <Popup
      trigger={Trigger}
      modal
      position="center center"
      lockScroll={true}
      closeOnDocumentClick={false}
      onOpen={() => setIsModalOn(true)}
      onClose={() => setIsModalOn(false)}
      // disabled={daysLeft > 7}
    >
      {(close) => <Modal close={close} addTimeModal={addTimeModal} />}
    </Popup>
  );
};
