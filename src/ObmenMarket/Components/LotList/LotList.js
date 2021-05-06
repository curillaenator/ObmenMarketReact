import { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import {
  getPaginationFirstPage,
  getPaginationNextPage,
  setMyLotsPage,
} from "../../../Redux/Reducers/lots";

import { Button } from "../Button/Button";
import { StatusBar } from "../StatusBar/StatusBar";

import ImageShadow from "react-image-shadow";
import "./imageshadow.scss";

import styles from "./lotlist.module.scss";

const Lot = ({ data }) => {
  return (
    <div className={styles.lot}>
      <Link to={`/profile/${data.uid}`} className={styles.author}>
        <img src={data.avatar} alt={data.username} draggable="false" />
        <p>{data.username}</p>
      </Link>

      <Link to={`/posts/${data.postid}`} className={styles.content}>
        <ImageShadow
          src={data.photoURL}
          className={styles.photo}
          shadowRadius="16"
          shadowBlur="20"
          width="100%"
        />

        <div className={styles.title}>{data.title}</div>

        <div className={styles.description}>{data.description}</div>

        <StatusBar offersQty={data.offersQty} expiryDate={data.expireDate} />
      </Link>
    </div>
  );
};

const Pagination = ({ lotsPending, allLotsLoaded, handleNextPage }) => {
  return (
    <div className={styles.lotlist_pagination}>
      {!allLotsLoaded && (
        <Button
          title={lotsPending ? "Загрузка" : "Загрузить еще..."}
          width={217}
          height={56}
          loader={lotsPending}
          disabled={lotsPending}
          handler={handleNextPage}
        />
      )}

      {allLotsLoaded && (
        <div className={styles.message}>Все лоты загружены!</div>
      )}
    </div>
  );
};

const LotList = ({
  myLots = false, // false for main page, true for profile page

  // main page params (are used when myLots is false)
  lotList,
  allLotsLoaded,
  lotsPending,
  endBeforeID,
  getPaginationFirstPage,
  getPaginationNextPage,

  // profile page params (are used when myLots is true)
  myLotList,
  myLotsPending,
  myLotsPage, // current num of lots loaded
  myLotsPerPage, // num of lots to add on loadmore click
  setMyLotsPage,
}) => {
  useEffect(() => lotList.length === 0 && getPaginationFirstPage(), [
    getPaginationFirstPage,
    lotList.length,
  ]);

  const handleNextPage = myLots
    ? () => setMyLotsPage(myLotsPage + myLotsPerPage)
    : () => getPaginationNextPage(endBeforeID);

  return (
    <div className={styles.lotlist}>
      <div className={styles.lotlist_list}>
        {myLots && myLotList.map((lot) => <Lot data={lot} key={lot.postid} />)}

        {!myLots && lotList.map((lot) => <Lot data={lot} key={lot.postid} />)}
      </div>

      <Pagination
        allLotsLoaded={myLots ? myLotList.length < myLotsPage : allLotsLoaded}
        lotsPending={myLots ? myLotsPending : lotsPending}
        handleNextPage={handleNextPage}
      />
    </div>
  );
};

const mstp = (state) => ({
  lotList: state.lots.lotList,
  myLotList: state.lots.myLotList,
  allLotsLoaded: state.lots.allLotsLoaded,
  endBeforeID: state.lots.endBeforeID,
  myLotsPage: state.lots.myLotsPage,
  myLotsPerPage: state.lots.myLotsPerPage,
  lotsPending: state.lots.lotsPending,
  myLotsPending: state.lots.myLotsPending,
});

export const LotListCont = connect(mstp, {
  getPaginationFirstPage,
  getPaginationNextPage,
  setMyLotsPage,
})(LotList);
