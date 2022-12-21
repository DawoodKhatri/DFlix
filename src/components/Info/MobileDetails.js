import styles from "../../styles/Info/Details.module.css";
import CircularProgressbar from "./CircularProgressbar.js";

export default function MobileDetails(props) {
  return (
    <div className={styles.info}>
      <h1 className={styles.title}>
        {props.details.name ? props.details.name : props.details.title}
      </h1>
      <p className={styles.details}>
        <span className={styles.release}>
          {new Date(props.details.release_date).toLocaleDateString()}
        </span>
        <span className={styles.genres}>
          {props.details.genres
            .map((genre) => genre.name + "")
            .toString()
            .split(",")
            .join(", ")}
        </span>
        {props.details.runtime ? (
          <span className={styles.runtime}>
            {Math.floor(props.details.runtime / 60) +
              "h " +
              Math.floor(props.details.runtime % 60) +
              "m"}
          </span>
        ) : (
          ""
        )}
      </p>
      <div className={styles.rating}>
        <span>
          User
          <br />
          Score
        </span>
        <CircularProgressbar
          className={styles.progress}
          color="var(--color-primary)"
          backgroundColor="var(--color-dark)"
          size="50"
          value={props.details.vote_average * 10}
          text={
            <>
              {Number(props.details.vote_average * 10).toFixed(0)}
              <tspan>%</tspan>
            </>
          }
        />
        <span>
          Total
          <br />
          Ratings
        </span>
        <span>{" " + props.details.vote_count}</span>
      </div>
      <p className={styles.tagline}>{props.details.tagline}</p>
      {props.details.overview && (
        <>
          <p className={styles.overviewH}>Overview</p>
          <p className={styles.overviewT}>{props.details.overview}</p>
        </>
      )}

      <div className={styles.credits}>
        {props.crew &&
          props.crew.map((credit) => {
            return (
              <div key={props.crew.indexOf(credit)} className={styles.credit}>
                <p className={styles.creditTitle}>{credit.name}</p>
                <p className={styles.creditSubtitle}>
                  {credit.jobs.toString().split(",").join(", ")}
                </p>
              </div>
            );
          })}
      </div>
    </div>
  );
}
