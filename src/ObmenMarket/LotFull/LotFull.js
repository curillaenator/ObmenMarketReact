import { useState, useEffect, useRef, useCallback } from "react";
import { connect, useSelector } from "react-redux";
import { useLocation, useHistory, useParams } from "react-router-dom";

import { Loading } from "../Components/Loading/Loading";
import { Author } from "../Components/Author/Author";
import { Gallery } from "../Components/Gallery/Gallery";
import { Prolong } from "./Prolong/Prolong";
import { StatusBar } from "../Components/StatusBar/StatusBar";
import { Button } from "../Components/Button/Button";
import { ButtonGhost } from "../Components/Button/ButtonGhost";
import { Controls } from "../Components/Controls/Controls";
import { FormFull } from "../Components/FormFull/FormFull";
import { FormOffer } from "../Components/FormOffer/FormOffer";

import {
  setNewLotId,
  getLotMeta,
  updateLotFromEditForm,
  removeLot,
  onOfferCreate,
  onOfferCancel,
  removeOffer,
  createOffer,
  acceptConfirmOffer,
} from "../../Redux/Reducers/lots";

import { setFormMode, setIsModalOn } from "../../Redux/Reducers/home";

import { chatRoom, setChatFromLotFull } from "../../Redux/Reducers/chat";

import readytopay from "../../Assets/Icons/readytopay.svg";
import shrink from "../../Assets/Icons/shrink.svg";

import styles from "./lotfull.module.scss";

const Buttons = ({
  icons,
  isOfferForm,
  isChatOn,
  lotMeta,
  ownerID,
  handleOfferForm,
  setIsModalOn,
  setChatFromLotFull,
}) => {
  // eslint-disable-next-line
  const [draw, callDraw] = useState(null);

  const btnContainer = useRef(0);

  const drawCaller = () => callDraw(window.innerWidth);

  useEffect(() => {
    callDraw(window.innerWidth);
    window.addEventListener("resize", drawCaller);
    return () => {
      window.removeEventListener("resize", drawCaller);
    };
  }, []);

  const offerTitle = isOfferForm ? "Передумал" : "Предложить обмен";
  const ctaIcon = isOfferForm ? icons.cancel : icons.pencil;

  return (
    <div className={styles.buttons} ref={btnContainer}>
      <div className={styles.spacer}></div>

      {draw && !lotMeta.acceptedOffer && ownerID !== lotMeta.uid && (
        <div className={styles.buttons_block}>
          <Button
            width={btnContainer.current.clientWidth}
            height={56}
            title={offerTitle}
            icon={ctaIcon}
            handler={handleOfferForm}
            active={isOfferForm}
          />
        </div>
      )}

      {draw && lotMeta.acceptedOffer && (
        <div className={styles.buttons_block}>
          <Button
            width={btnContainer.current.clientWidth}
            height={56}
            title="Перейти в чат"
            disabled={!lotMeta.offerConfirmed || isChatOn}
            // icon={icons.add}
            handler={setChatFromLotFull}
          />
        </div>
      )}

      {draw && !lotMeta.acceptedOffer && ownerID === lotMeta.uid && (
        <div className={styles.buttons_block}>
          <Prolong
            butCont={btnContainer.current.clientWidth}
            setIsModalOn={setIsModalOn}
          />
        </div>
      )}
    </div>
  );
};

//DESCRIPTION

const Descrption = ({ lotMeta }) => {
  // console.log(lotMeta);
  return (
    <div className={styles.description}>
      <div className={styles.author}>
        <Author
          authorID={lotMeta.uid}
          avatar={lotMeta.avatar}
          name={lotMeta.username}
        />
      </div>

      <div className={styles.majortitle}>{lotMeta.title}</div>

      <div className={styles.majortext}>{lotMeta.description}</div>

      {lotMeta.categories && (
        <div className={styles.addinfo}>
          <h3 className={styles.addinfo_title}>Категория</h3>
          <p className={styles.addinfo_value}>{lotMeta.categories}</p>
        </div>
      )}

      {lotMeta.price && (
        <div className={styles.addinfo}>
          <h3 className={styles.addinfo_title}>Примерная оценка стоимости</h3>
          <p className={styles.addinfo_value}>{`${lotMeta.price} руб.`}</p>
        </div>
      )}

      {lotMeta.overprice && (
        <div className={styles.addinfo}>
          <h3 className={styles.addinfo_title}>Автор готов доплатить</h3>
          <p className={styles.addinfo_value}>Да</p>
        </div>
      )}

      {lotMeta.wishes && (
        <div className={styles.addinfo}>
          <h3 className={styles.addinfo_title}>
            Приоритетные категории обмена
          </h3>
          <p className={styles.addinfo_value}>{lotMeta.wishes}</p>
        </div>
      )}
    </div>
  );
};

// OFFERS

const OfferCard = ({
  offerMeta,
  lotMeta,
  ownerID,
  acceptConfirmOffer,
  selectedOffer,
  setSelectedOffer,
  removeOffer,
  chatRoom,
}) => {
  const icons = useSelector((state) => state.ui.icons);
  const ref = useRef({});
  const [openHeigth, setOpenHeigth] = useState(null);

  const select = useCallback(() => {
    setSelectedOffer(offerMeta.offerID);
    setOpenHeigth(ref.current.scrollHeight);
  }, [offerMeta.offerID, setSelectedOffer]);

  const deselect = () => setOpenHeigth(null);

  useEffect(() => {
    if (lotMeta.acceptedOffer) select();
    if (offerMeta.offerID !== selectedOffer) deselect();
  }, [
    select,
    selectedOffer,
    ref.current.scrollHeight,
    lotMeta.acceptedOffer,
    offerMeta.offerID,
  ]);

  const handleSelectOffer = () => (openHeigth ? deselect() : select());

  const acceptConfirmReset = {
    acceptedOffer: null,
    offerConfirmed: null,
  };

  const approveOfferByLotAuthor = () => {
    if (lotMeta.acceptedOffer)
      return acceptConfirmOffer(lotMeta, offerMeta, acceptConfirmReset);

    if (!lotMeta.acceptedOffer)
      return acceptConfirmOffer(lotMeta, offerMeta, {
        acceptedOffer: offerMeta.offerID,
      });
  };

  const confirmOfferByOfferAuthor = () => {
    if (lotMeta.offerConfirmed) {
      return acceptConfirmOffer(lotMeta, offerMeta, acceptConfirmReset);
    }

    if (!lotMeta.offerConfirmed) {
      acceptConfirmOffer(lotMeta, offerMeta, {
        offerConfirmed: offerMeta.offerID,
      });
      chatRoom(lotMeta, offerMeta);
      return null;
    }
  };

  return (
    <div className={styles.offer}>
      <div
        className={
          openHeigth
            ? `${styles.minimized} ${styles.minimized_active}`
            : styles.minimized
        }
        style={lotMeta.acceptedOffer ? { justifyContent: "flex-end" } : {}}
      >
        {!lotMeta.acceptedOffer && (
          <div
            className={styles.minimized_detailes}
            onClick={handleSelectOffer}
          >
            <img
              className={styles.minimized_detailes_img}
              src={openHeigth ? shrink : offerMeta.photoURLs[0]}
              alt={offerMeta.name}
            />

            <div className={styles.minimized_detailes_title}>
              {openHeigth ? "Свернуть" : offerMeta.name}
            </div>
          </div>
        )}

        <div className={styles.minimized_buttons}>
          {ownerID !== offerMeta.authorID && (
            <Button
              width={116}
              height={24}
              title={lotMeta.acceptedOffer ? "Отменить обмен" : "Согласиться"}
              fontsize={12}
              handler={approveOfferByLotAuthor}
              active={lotMeta.acceptedOffer}
            />
          )}

          {!!lotMeta.acceptedOffer &&
            lotMeta.acceptedOffer === offerMeta.offerID &&
            offerMeta.authorID === ownerID && (
              <Button
                width={126}
                height={24}
                title={
                  lotMeta.offerConfirmed ? "Отменить обмен" : "Подтвердить"
                }
                fontsize={12}
                handler={confirmOfferByOfferAuthor}
                active={lotMeta.offerConfirmed}
              />
            )}

          <ButtonGhost
            icon={icons.delete}
            handler={() => removeOffer(offerMeta.offerID)}
          />
        </div>
      </div>

      <div
        className={styles.maximized}
        ref={ref}
        style={{ maxHeight: `${openHeigth ? openHeigth : 0}px` }}
      >
        <div className={styles.maximized_title}>{offerMeta.name}</div>

        <Gallery lotPhotos={offerMeta.photoURLs} />

        <div className={styles.maximized_author}>
          <Author
            authorID={offerMeta.authorID}
            avatar={offerMeta.avatar}
            name={offerMeta.authorName}
          />
        </div>

        <div className={styles.maximized_text}>{offerMeta.description}</div>

        <div className={styles.maximized_overprice}>
          {offerMeta.overprice && <img src={readytopay} alt="" />}

          <p>
            {offerMeta.overprice
              ? "Автор готов доплатить"
              : "Автор не готов к доплате"}
          </p>
        </div>
      </div>
    </div>
  );
};

const Offers = ({
  query,
  querySelector,
  ownerID,
  lotMeta,
  acceptConfirmOffer,
  chatRoom,
  removeOffer,
}) => {
  const offers = lotMeta.offers;

  const history = useHistory();
  const [selectedOffer, setSelectedOffer] = useState(null);

  useEffect(() => {
    const action = (offersArr) => {
      const offerMeta = offersArr.find(
        (o) => o.offerID === query.get("offerID")
      );

      offerMeta
        ? querySelector[query.get("action")](offerMeta)
        : history.push(`/posts/${lotMeta.postid}`);
    };

    query.has("action") && action(offers);
  }, [offers, lotMeta.postid, query, querySelector, history]);

  const handleOffersIfAccepted = () => {
    if (lotMeta.acceptedOffer)
      return offers.filter((offer) => offer.offerID === lotMeta.acceptedOffer);

    return offers;
  };

  const handleOffersIfConfirmed = () => {
    if (!lotMeta.offerConfirmed && !lotMeta.acceptedOffer) {
      return offers.filter((offer) => offer.authorID === ownerID);
    }

    return offers.filter(
      (offer) =>
        offer.offerID === lotMeta.acceptedOffer && offer.authorID === ownerID
    );
  };

  const handleFilteredOffers = () => {
    if (ownerID === lotMeta.uid) return handleOffersIfAccepted();
    if (ownerID !== lotMeta.uid) return handleOffersIfConfirmed();
  };

  const filteredOffers = offers ? handleFilteredOffers() : null;

  return (
    filteredOffers && (
      <div className={styles.offers}>
        {filteredOffers.length > 0 && (
          <div className={styles.offers_title}>
            {ownerID === lotMeta.uid
              ? "Вам предложили в обмен:"
              : "Вы предложили к обмену:"}
          </div>
        )}

        <div className={styles.offers_list}>
          {filteredOffers.map((offer) => (
            <OfferCard
              key={offer.offerID}
              query={query}
              ownerID={ownerID}
              offerMeta={offer}
              lotMeta={lotMeta}
              removeOffer={removeOffer}
              acceptConfirmOffer={acceptConfirmOffer}
              selectedOffer={selectedOffer}
              setSelectedOffer={setSelectedOffer}
              chatRoom={chatRoom}
            />
          ))}
        </div>
      </div>
    )
  );
};

// MAIN COMPONENT

const LotFull = ({
  icons,
  isAuth,
  ownerID,
  user,
  formFullUI,
  formOfferUI,
  isFormModeOn,
  setFormMode,
  createOfferId,
  lotMeta,
  getLotMeta,
  isChatOn,
  setNewLotId,
  updateLotFromEditForm,
  removeLot,
  onOfferCreate,
  onOfferCancel,
  removeOffer,
  createOffer,
  acceptConfirmOffer,
  setIsModalOn,
  chatRoom,
  setChatFromLotFull,
}) => {
  const history = useHistory();
  const { lotid } = useParams();
  const query = new URLSearchParams(useLocation().search);

  const querySelector = {
    approved: (offerMeta) => {
      acceptConfirmOffer(lotMeta, offerMeta, {
        acceptedOffer: query.get("offerID"),
      });
      history.push(`/posts/${lotMeta.postid}`);
    },
    confirmed: (offerMeta) => {
      acceptConfirmOffer(lotMeta, offerMeta, {
        offerConfirmed: query.get("offerID"),
      });
      history.push(`/posts/${lotMeta.postid}`);
    },
  };

  const [isOfferForm, setIsOfferForm] = useState(false);
  const handleOfferForm = () => {
    if (!isAuth) return history.push("/login");

    if (isOfferForm) {
      setIsOfferForm(false);
      onOfferCancel(createOfferId);
    }

    if (!isOfferForm) {
      setIsOfferForm(true);
      onOfferCreate(lotMeta);
    }
  };

  useEffect(() => {
    setNewLotId(null);
    getLotMeta(lotid, history);
  }, [lotid, setNewLotId, getLotMeta, history]);

  if (!lotMeta) return <Loading />;

  return (
    <div className={styles.lotwrapper}>
      <Controls
        icons={icons}
        isAuth={isAuth}
        isAdmin={user.isAdmin}
        ownerID={ownerID}
        isFormModeOn={isFormModeOn}
        lotMeta={lotMeta}
        history={history}
        editLot={() => setFormMode(!isFormModeOn)}
        removeLot={removeLot}
      />

      {!isFormModeOn && (
        <div className={styles.lot}>
          <div className={styles.detailes}>
            <Gallery lotPhotos={lotMeta.photoLinks} />

            <div className={styles.status}>
              <StatusBar
                offersQty={lotMeta.offers ? lotMeta.offers.length : 0}
                expiryDate={lotMeta.expireDate}
              />
            </div>

            <Buttons
              icons={icons}
              isOfferForm={isOfferForm}
              isChatOn={isChatOn}
              lotMeta={lotMeta}
              ownerID={ownerID}
              handleOfferForm={handleOfferForm}
              setIsModalOn={setIsModalOn}
              setChatFromLotFull={setChatFromLotFull}
            />

            {isOfferForm && (
              <FormOffer
                ownerID={ownerID}
                user={user}
                icons={icons}
                formOfferUI={formOfferUI}
                lotMeta={lotMeta}
                createOffer={createOffer}
                createOfferId={createOfferId}
                setIsOfferForm={setIsOfferForm}
              />
            )}

            <div className={styles.spacer}></div>

            {isAuth && (
              <Offers
                query={query}
                querySelector={querySelector}
                lotMeta={lotMeta}
                acceptConfirmOffer={acceptConfirmOffer}
                ownerID={ownerID}
                removeOffer={removeOffer}
                chatRoom={chatRoom}
              />
            )}
          </div>

          <Descrption lotMeta={lotMeta} />
        </div>
      )}

      {isFormModeOn && (
        <FormFull
          icons={icons}
          formFullUI={formFullUI}
          lotMeta={lotMeta}
          update={true}
          setFormMode={setFormMode}
          formHandler={updateLotFromEditForm}
        />
      )}
    </div>
  );
};

const mstp = (state) => ({
  icons: state.ui.icons,
  isAuth: state.auth.isAuth,
  ownerID: state.auth.ownerID,
  user: state.auth.user,
  formFullUI: state.ui.formFull,
  formOfferUI: state.ui.formOffer,
  isFormModeOn: state.home.isFormModeOn,
  lotMeta: state.lots.currentLotMeta,
  createOfferId: state.lots.createOfferId,
  isChatOn: state.chat.isChatOn,
});

export const LotFullCont = connect(mstp, {
  setFormMode,
  setNewLotId,
  getLotMeta,
  updateLotFromEditForm,
  // onLotCreateFormCancel,
  removeLot,
  onOfferCreate,
  onOfferCancel,
  removeOffer,
  createOffer,
  acceptConfirmOffer,
  setIsModalOn,
  chatRoom,
  setChatFromLotFull,
})(LotFull);
