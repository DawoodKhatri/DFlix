import styles from "../../styles/Info/Details.module.css";
import CircularProgressbar from "./CircularProgressbar.js";

export default function Details(props) {
  const image = "https://image.tmdb.org/t/p/w500";
  const backdrop = "https://image.tmdb.org/t/p/original";
  return (
    <div className={`bg ${styles.main}`}>
      {props.details.backdrop_path && (
        <>
          <img
            className={styles.backdrop}
            src={backdrop + props.details.backdrop_path}
          />
          <div className={styles.overlay}></div>
        </>
      )}
      {props.details.poster_path && (
        <div className={styles.posterContainer}>
          <img
            className={styles.poster}
            src={image + props.details.poster_path}
          />
        </div>
      )}
      {!props.details.poster_path && (
        <div className={styles.posterContainer}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            id="glyphicons-basic"
            viewBox="0 0 32 32"
            fill="var(--color-primary)"
            style={{ margin: "auto", width: "100px" }}
          >
            <path d="M27.5,5H4.5A1.50008,1.50008,0,0,0,3,6.5v19A1.50008,1.50008,0,0,0,4.5,27h23A1.50008,1.50008,0,0,0,29,25.5V6.5A1.50008,1.50008,0,0,0,27.5,5ZM26,18.5l-4.79425-5.2301a.99383.99383,0,0,0-1.44428-.03137l-5.34741,5.34741L19.82812,24H17l-4.79291-4.793a1.00022,1.00022,0,0,0-1.41418,0L6,24V8H26Zm-17.9-6a2.4,2.4,0,1,1,2.4,2.4A2.40005,2.40005,0,0,1,8.1,12.5Z" />
          </svg>
        </div>
      )}
      {!props.mobile && (
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
                  <div
                    key={props.crew.indexOf(credit)}
                    className={styles.credit}
                  >
                    <p className={styles.creditTitle}>{credit.name}</p>
                    <p className={styles.creditSubtitle}>
                      {credit.jobs.toString().split(",").join(", ")}
                    </p>
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
}
