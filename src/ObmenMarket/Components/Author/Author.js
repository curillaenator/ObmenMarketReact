import { Link } from "react-router-dom";

import styles from "./author.module.scss";

export const Author = ({ authorID, avatar, name }) => {
  if (!authorID) return <div></div>;

  return (
    <Link to={`/profile/${authorID}`} className={styles.author}>
      <img src={avatar} alt="Username" />
      <p>{name}</p>
    </Link>
  );
};
