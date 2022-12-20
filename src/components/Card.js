import styles from "../styles/Card.module.css";
import { Link } from "react-router-dom";

export default function Card(props) {
  const image = "https://image.tmdb.org/t/p/w500";
  let currLink = window.location.href.split("/").filter((item) => item !== "");
  var link = "";
  if (currLink.length === 2) {
    link += props.title + "/";
  }

  link += `${props.type}-${props.data.id}-${
    props.data.name ? props.data.name : props.data.title
  }`;

  link = link.toLowerCase().split(" ").join("-");
  return (
    <>
      <div
        id={props.id}
        className={`bg ${styles.background}`}
        title={props.data.name ? props.data.name : props.data.title}
        onClick={props.onClick}
      >
        <Link to={link}>
          <div
            className={`${styles.info} ${
              props.data.poster_path && styles.about
            }`}
          >
            <p className={`${styles.infoTitle}`}>
              {props.data.name ? props.data.name : props.data.title}
            </p>
            <p className={`${styles.infoAbout}`}>
              <span>
                {props.data.first_air_date
                  ? props.data.first_air_date
                  : props.data.release_date}
              </span>
              <span>{Number(props.data.vote_average).toFixed(1)}☆</span>
            </p>
            <p className={`${styles.infoDescription}`}>{props.data.overview}</p>
          </div>
          {props.data.poster_path && (
            <img
              className={styles.image}
              src={image + props.data.poster_path}
              loading="lazy"
            />
          )}
        </Link>
      </div>
    </>
  );
}
