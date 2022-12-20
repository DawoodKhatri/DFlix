import Card from "./Card";
import styles from "../styles/Category.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export default function Category(props) {
  const scroll = (e) => {
    var direction = e.target;
    while (direction.tagName !== "DIV") {
      direction = direction.parentElement;
    }

    var x = 0;

    if (direction.classList.toString().includes("Right")) {
      direction = "right";
      x = window.innerWidth;
    } else {
      direction = "left";
      x = 5;
    }

    const y =
      e.screenY < window.innerHeight ? e.screenY : window.innerHeight - 5;
    var condition = direction === "right" ? x > 0 : x < window.innerWidth - 5;
    var increment = () => (direction === "right" ? (x -= 5) : (x += 5));
    var element = null;

    while (condition) {
      element = document.elementFromPoint(x, y);
      if (element) {
        if (
          element.classList.toString().includes("Card_image" || "Card_info")
        ) {
          element = element.parentElement.parentElement;
          break;
        }
      }
      increment();
    }

    var distance = null;
    if (direction === "right") {
      distance = element.getBoundingClientRect().x - 60;
    } else {
      let elementWidth = ((window.innerWidth - 108) * 18) / 100 + 14;
      distance =
        element.getBoundingClientRect().x -
        (Math.floor((window.innerWidth - 108) / elementWidth) - 1) *
          elementWidth -
        54;
    }
    element.parentElement.scrollBy(distance, 0);
  };
  return (
    <>
      <div className={`bg ${styles.background}`}>
        <h3>{props.title}</h3>
        <Link to={props.title.split(" ").join("-").toLowerCase()}>
          More <FontAwesomeIcon icon={faAngleRight} size="1x" />
        </Link>
      </div>
      <div className={styles.container}>
        <div
          className={`bg ${styles.icon} ${styles.iconLeft}`}
          onClick={scroll}
        >
          <FontAwesomeIcon icon={faAngleLeft} size="2x" />
        </div>
        <div className={styles.list}>
          {props.data.map((item) => {
            return (
              <Card
                key={props.data.indexOf(item)}
                id={props.data.indexOf(item)}
                title={props.title}
                type={props.type}
                data={item}
              />
            );
          })}
        </div>
        <div
          className={`bg ${styles.icon} ${styles.iconRight}`}
          onClick={scroll}
        >
          <FontAwesomeIcon icon={faAngleRight} size="2x" />
        </div>
      </div>
    </>
  );
}
