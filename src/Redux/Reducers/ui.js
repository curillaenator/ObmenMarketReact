import cta_idle from "../../Assets/Icons/cta/cta_idle.svg";
import cta_hover from "../../Assets/Icons/cta/cta_hover.svg";
import cta_clicked from "../../Assets/Icons/cta/cta_clicked.svg";
import cta_active from "../../Assets/Icons/cta/cta_active.svg";
import cta_disabled from "../../Assets/Icons/cta/cta_disabled.svg";

import lotdraft_idle from "../../Assets/Icons/lotdraft/draft_idle.svg";
import lotdraft_hover from "../../Assets/Icons/lotdraft/draft_hover.svg";
import lotdraft_clicked from "../../Assets/Icons/lotdraft/draft_clicked.svg";
import lotdraft_active from "../../Assets/Icons/lotdraft/draft_active.svg";
import lotdraft_disabled from "../../Assets/Icons/lotdraft/draft_disabled.svg";

import lotextend_idle from "../../Assets/Icons/lotextend/extend_idle.svg";
import lotextend_hover from "../../Assets/Icons/lotextend/extend_hover.svg";
import lotextend_clicked from "../../Assets/Icons/lotextend/extend_clicked.svg";
import lotextend_active from "../../Assets/Icons/lotextend/extend_active.svg";
import lotextend_disabled from "../../Assets/Icons/lotextend/extend_disabled.svg";

import lotpublish_idle from "../../Assets/Icons/lotpublish/publish_idle.svg";
import lotpublish_hover from "../../Assets/Icons/lotpublish/publish_hover.svg";
import lotpublish_clicked from "../../Assets/Icons/lotpublish/publish_clicked.svg";
import lotpublish_active from "../../Assets/Icons/lotpublish/publish_active.svg";
import lotpublish_disabled from "../../Assets/Icons/lotpublish/publish_disabled.svg";

import usericon from "../../Assets/Icons/profile/user.svg";
import tel from "../../Assets/Icons/profile/tel.svg";
import email from "../../Assets/Icons/profile/mail.svg";
import country from "../../Assets/Icons/profile/country.svg";
import city from "../../Assets/Icons/profile/city.svg";

import time from "../../Assets/Icons/modal_time.svg";
import rock from "../../Assets/Icons/rock.svg";

const initialState = {
  icons: {
    cta: {
      idle: cta_idle,
      hover: cta_hover,
      clicked: cta_clicked,
      active: cta_active,
      disabled: cta_disabled,
    },
    lotdraft: {
      idle: lotdraft_idle,
      hover: lotdraft_hover,
      clicked: lotdraft_clicked,
      active: lotdraft_active,
      disabled: lotdraft_disabled,
    },
    lotextend: {
      idle: lotextend_idle,
      hover: lotextend_hover,
      clicked: lotextend_clicked,
      active: lotextend_active,
      disabled: lotextend_disabled,
    },
    lotpublish: {
      idle: lotpublish_idle,
      hover: lotpublish_hover,
      clicked: lotpublish_clicked,
      active: lotpublish_active,
      disabled: lotpublish_disabled,
    },
    add: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M12.0057 24C18.5861 24 24 18.5975 24 12.0057C24 5.41387 18.5861 0 11.9943 0C5.40255 0 0 5.41387 0 12.0057C0 18.5975 5.41387 24 12.0057 24ZM11.9943 17.6008C11.1902 17.6008 10.6465 17.0231 10.6465 16.2303V13.3648H7.61114C6.80698 13.3648 6.21803 12.8098 6.21803 12.017C6.21803 11.2128 6.79566 10.6692 7.61114 10.6692H10.6465V7.67909C10.6465 6.88627 11.1902 6.30864 11.9943 6.30864C12.7872 6.30864 13.3421 6.87494 13.3421 7.67909V10.6692H16.3889C17.2043 10.6692 17.7706 11.2128 17.7706 12.017C17.7706 12.8098 17.193 13.3648 16.3889 13.3648H13.3421V16.2303C13.3421 17.0345 12.7872 17.6008 11.9943 17.6008Z" />
      </svg>
    ),
    check: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" />
      </svg>
    ),
    google: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="24"
        height="24"
      >
        <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032 s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2 C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z" />
      </svg>
    ),
    search: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="black"
      >
        <path d="M10.4 18.6548C11.8974 18.6548 13.3026 18.2583 14.5333 17.5669L18.4 21.4103C18.8 21.8068 19.3538 22 19.9077 22C21.1077 22 22 21.0849 22 19.9156C22 19.3767 21.8154 18.848 21.4051 18.4413L17.5692 14.6385C18.3487 13.3777 18.8 11.9034 18.8 10.3274C18.8 5.76207 15.0154 2 10.4 2C5.78462 2 2 5.76207 2 10.3274C2 14.9029 5.78462 18.6548 10.4 18.6548ZM10.4 15.7265C7.39487 15.7265 4.95385 13.3066 4.95385 10.3274C4.95385 7.35841 7.39487 4.92832 10.4 4.92832C13.4051 4.92832 15.8462 7.35841 15.8462 10.3274C15.8462 13.3066 13.4051 15.7265 10.4 15.7265Z" />
      </svg>
    ),
    delete: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path fill="#FFA9AB" d="M19 8H5v11a3 3 0 003 3h8a3 3 0 003-3V8z" />
        <path
          fill="#FF2B2B"
          d="M10 12a1 1 0 00-1 1v4a1 1 0 102 0v-4a1 1 0 00-1-1zM14 12a1 1 0 00-1 1v4a1 1 0 102 0v-4a1 1 0 00-1-1z"
        />
        <path
          fill="#FF2B2B"
          fillRule="evenodd"
          d="M8 6V5a3 3 0 013-3h2a3 3 0 013 3v1h3a1 1 0 110 2H5a1 1 0 010-2h3zm2-1a1 1 0 011-1h2a1 1 0 011 1v1h-4V5z"
          clipRule="evenodd"
        />
      </svg>
    ),
    back: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          fill="#D5B5FF"
          d="M1 8.822c0-2.738 0-4.107.533-5.153a4.889 4.889 0 012.136-2.136C4.715 1 6.084 1 8.822 1h6.356c2.738 0 4.107 0 5.153.533a4.889 4.889 0 012.136 2.136C23 4.715 23 6.084 23 8.822v6.356c0 2.738 0 4.107-.533 5.153a4.889 4.889 0 01-2.136 2.136C19.285 23 17.916 23 15.178 23H8.822c-2.738 0-4.107 0-5.153-.533a4.889 4.889 0 01-2.136-2.136C1 19.285 1 17.916 1 15.178V8.822z"
        />
        <path
          fill="#7000FF"
          fillRule="evenodd"
          d="M14.59 7.366c.547.488.547 1.28 0 1.768L11.38 12l3.21 2.866c.547.488.547 1.28 0 1.768a1.521 1.521 0 01-1.98 0l-4.2-3.75a1.158 1.158 0 010-1.768l4.2-3.75a1.521 1.521 0 011.98 0z"
          clipRule="evenodd"
        />
      </svg>
    ),
    share: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          fill="#D5B5FF"
          d="M3 14.162v2.676c0 .528 0 .982.03 1.357.033.395.104.789.297 1.167a3 3 0 001.311 1.311c.378.193.772.264 1.167.296.375.031.83.031 1.356.031h9.678c.527 0 .982 0 1.356-.03.395-.033.789-.104 1.167-.297a3 3 0 001.311-1.311c.193-.378.264-.772.296-1.167.031-.375.031-.83.031-1.356V14.16c0-.527 0-.981-.03-1.356-.033-.395-.104-.789-.297-1.167a3 3 0 00-1.311-1.311c-.378-.193-.772-.264-1.167-.296C17.82 10 17.365 10 16.839 10H7.16c-.527 0-.981 0-1.356.03-.395.033-.789.104-1.167.297a3 3 0 00-1.311 1.311c-.193.378-.264.772-.296 1.167C3 13.18 3 13.635 3 14.162z"
        />
        <path
          fill="#7000FF"
          d="M9.707 7.707a1 1 0 01-1.414-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L13 6.414V16a1 1 0 11-2 0V6.414L9.707 7.707z"
        />
      </svg>
    ),
    edit: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          fill="#7000FF"
          d="M4.775 14.658l-1.716 5.016a1 1 0 001.268 1.27l5.022-1.71c.435-.147.83-.393 1.155-.718l.506-.506L6 13l-.508.508a3 3 0 00-.717 1.15z"
        />
        <path fill="#D5B5FF" d="M14 5l-8 8 5.01 5.01 8-8L14 5z" />
        <path
          fill="#7000FF"
          d="M15.119 3.881L14 5l5.01 5.01 1.119-1.119a3 3 0 000-4.242l-.768-.768a3 3 0 00-4.242 0z"
        />
      </svg>
    ),
    fold: (
      <svg
        width="26"
        height="26"
        viewBox="0 0 26 26"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          className="cta_path1"
          d="M0 13C0 5.8203 5.8203 0 13 0C20.1797 0 26 5.8203 26 13C26 20.1797 20.1797 26 13 26C5.8203 26 0 20.1797 0 13ZM12.6196 8.18081C12.1119 7.67313 11.2888 7.67313 10.7812 8.18081C10.2735 8.68849 10.2735 9.51161 10.7812 10.0193L13.7619 13L10.7812 15.9808C10.2735 16.4885 10.2735 17.3116 10.7812 17.8193C11.2888 18.327 12.1119 18.327 12.6196 17.8193L16.5196 13.9193C17.0273 13.4116 17.0273 12.5885 16.5196 12.0808L12.6196 8.18081Z"
        />
      </svg>
    ),
  },
  formFull: {
    offer: {
      title: "Что вы хотите предложить к обмену?",
      name: "Название",
      category: "Категория товара",
      categorySub:
        "Укажите через запятую категории, к которым относится ваше предложение",
      price: "Примерная ценовая категория",
      priceSub:
        "Так пользователям будет легче понимать во сколько вы оцениваете своё предложение, чтобы обмен был равноценным",
    },
    description: {
      // title: "Что вы хотите предложить к обмену?",
      title: "Опишите ваше предложение",
      description: "Описание",
      descriptionSub:
        "Во время редактирования, выделите текст, который хотите сделать заголовком, жирным или ссылкой",
    },
    wish: {
      title: "Что вы хотели бы получить взамен?",
      category: "Категории товаров",
      categorySub:
        "Укажите через запятую категории товаров, на которые вы готовы меняться",
      addPayment: "Сумма доплаты",
      addPaymentSub:
        "Если будете готовы доплатить за что-то, укажите максимальную сумму",
    },
    notation:
      "Вы можете продолжить заполнение формы позже, сохраненный черновик будет находится в вашем профиле",
  },
  formProfile: {
    fullname: {
      icon: usericon,
      sup: "Полное имя",
      placeholder: "Введите ваше имя",
    },
    tel: {
      icon: tel,
      sup: "Телефон",
      placeholder: "Укажите ваш номер телефона для связи",
    },
    email: {
      icon: email,
      sup: "Электронная почта",
      placeholder: "Ваша электронная почта",
    },
    country: {
      icon: country,
      sup: "Страна",
      placeholder: "Из какой вы страны?",
    },
    city: { icon: city, sup: "Город", placeholder: "Из какого вы города?" },
  },
  formOffer: {
    title: "Что вы хотите предложить взамен?",
    name: { placeholder: "Название" },
    description: { placeholder: "Описание" },
    overprice: { title: "Согласны на доплату при обмене?" },
  },
  addTimeModal: {
    addTimeP1: {
      icon: time,
      title: "Продление объявления на 48 часов",
      text:
        "К счетчику времени публикации вашего объявления будет добавлено 48 часов с момента продления. Таким образом вы можете успеть получить больше интересных предложений",
    },
    addTimeP2: {
      icon: rock,
      title: "При βeta-тестировании всё бесплатно!",
      text: (
        <>
          <div style={{ marginBottom: 16 }}>
            На данный момент все платные фичи ресурса obmen.market
            предоставляются абсолютно бесплатно, т.к. мы собираем много важной
            для нас информации, которая поможет сделать сайт намного удобнее и
            полезней!
          </div>
          <div>
            Спасибо за проявленный интерес к платной услуге,{" "}
            <span style={{ color: "#fff", fontWeight: 700 }}>
              пожалуйста, продолжайте пользоваться сайтом в обычном режиме и
              нажимать любые кнопки
            </span>
            , если вы чувствуете в этом необходимость!
          </div>
        </>
      ),
    },
  },
};

export const ui = (state = initialState) => state;
