import styles from "../../styles/Info/Video.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";
// import { useState } from "react";

export default function Video(props) {
  // const [playing, setPlaying] = useState(false);
  return (
    <>
      <div
        className={`bg ${styles.container}`}
      >
        {/* {!playing && (
          <>
            <img
              className={styles.thumbnail}
              src={`https://i.ytimg.com/vi/${props.data.key}/sddefault.jpg`}
            />
            <div className={styles.iconBG}></div>
            <FontAwesomeIcon
              className={styles.icon}
              icon={faYoutube}
              size="3x"
            />
            <div className={styles.gradient}>
              <p className={styles.name}>{props.data.name}</p>
            </div>
          </>
        )} */}

        <div className={`bg ${styles.player}`}>
          <iframe
            src={`https://youtube.com/embed/${props.data.key}`}
            frameBorder="0"
            allowFullScreen
          />
        </div>
      </div>
    </>
  );
}
