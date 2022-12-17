import styles from "../styles/Card.module.css";
import { Link } from "react-router-dom";

export default function Card(props) {
  const image = "https://image.tmdb.org/t/p/w500";
  return (
    <>
      <div
        id={props.id}
        className={`${styles.background}  ${!props.data.poster_path && "bg"}`}
        onClick={props.onClick}
      >
        <Link
          to={`${props.title}/${props.data.id}-${
            props.data.name ? props.data.name : props.data.title
          }`
            .replaceAll(" ", "-")
            .toLowerCase()}
        >
          <div
            className={`${styles.info} ${
              props.data.poster_path && styles.about
            }`}
          >
            <p
              className={`${styles.infoTitle}`}
              title={props.data.name ? props.data.name : props.data.title}
            >
              {props.data.name ? props.data.name : props.data.title}
            </p>
            <div>
              <p>
                {props.data.first_air_date
                  ? props.data.first_air_date
                  : props.data.release_date}
              </p>
              <p>
                {props.data.vote_average}
                <span>☆</span>
              </p>
            </div>
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
