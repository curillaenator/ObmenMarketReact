import { StatusBar } from "../StatusBar/StatusBar";
import { Link } from "react-router-dom";

import styles from "./lot.module.scss";

const Owner = (props) => {
  return (
    <div className={styles.owner}>
      <img src={props.avatar} alt={props.username} draggable="false" />
      <p>{props.ownerName}</p>
    </div>
  );
};

const LotImage = (props) => {
  return (
    <div className={styles.photo}>
      <img src={props.lotImage} alt={props.lotName} draggable="false" />
    </div>
  );
};

export const Lot = ({ data }) => {
  // console.log(data);
  return (
    <div className={styles.lot}>
      <Owner avatar={data.avatar} ownerName={data.username} />

      <Link to={`/posts/${data.postid}`} className={styles.content}>
        <LotImage lotImage={data.photos[0]} lotnName={data.title} />

        <div className={styles.title}>{data.title}</div>

        <div className={styles.description}>{data.description}</div>

        <StatusBar offersQty={data.offersQty} expiryDate={data.expireDate} />
      </Link>
    </div>
  );
};
