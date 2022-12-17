import Card from "./Card";
import styles from "../styles/Category.module.css";
import { useState } from "react";

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
      distance =
        element.getBoundingClientRect().x -
        (Math.floor((window.innerWidth - 120) / 216) - 1) * 216 -
        60;
    }
    element.parentElement.scrollBy(distance, 0);
  };
  return (
    <>
      <div className={`bg ${styles.background}`}>
        <h3>{props.title}</h3>
      </div>
      <div className={styles.container}>
        <div
          className={`bg ${styles.icon} ${styles.iconLeft}`}
          onClick={scroll}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30px"
            style={{ transform: "scaleX(-1)" }}
            viewBox="0 0 90 90"
          >
            <g>
              <path d="M 6.241 90 c -2.196 0 -4.311 -1.209 -5.365 -3.305 c -1.489 -2.96 -0.297 -6.567 2.664 -8.056 L 70.413 45 L 3.539 11.361 c -2.96 -1.489 -4.153 -5.096 -2.664 -8.056 c 1.489 -2.959 5.095 -4.153 8.056 -2.664 L 86.46 39.64 c 2.025 1.019 3.304 3.092 3.304 5.36 s -1.278 4.341 -3.304 5.36 L 8.932 89.359 C 8.067 89.794 7.147 90 6.241 90 z" />
            </g>
          </svg>
        </div>
        <div className={styles.list}>
          {props.data &&
            props.data.map((item) => {
              return (
                <Card
                  key={props.data.indexOf(item)}
                  id={props.data.indexOf(item)}
                  title={props.title}
                  data={item}
                />
              );
            })}
        </div>
        <div
          className={`bg ${styles.icon} ${styles.iconRight}`}
          onClick={scroll}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30px"
            viewBox="0 0 90 90"
          >
            <g>
              <path d="M 6.241 90 c -2.196 0 -4.311 -1.209 -5.365 -3.305 c -1.489 -2.96 -0.297 -6.567 2.664 -8.056 L 70.413 45 L 3.539 11.361 c -2.96 -1.489 -4.153 -5.096 -2.664 -8.056 c 1.489 -2.959 5.095 -4.153 8.056 -2.664 L 86.46 39.64 c 2.025 1.019 3.304 3.092 3.304 5.36 s -1.278 4.341 -3.304 5.36 L 8.932 89.359 C 8.067 89.794 7.147 90 6.241 90 z" />
            </g>
          </svg>
        </div>
      </div>
    </>
  );
}
