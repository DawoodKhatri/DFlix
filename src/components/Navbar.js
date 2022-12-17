import styles from "../styles/Navbar.module.css";
import { useState } from "react";

export default function Navbar(props) {
  const [links, setLinks] = useState([
    {
      title: "Home",
      href: "/",
      active: props.active === "Home",
    },
    {
      title: "Hindi Movies",
      href: "/hindi",
      active: props.active === "Hindi Movies",
    },
    {
      title: "TV Series",
      href: "/tv",
      active: props.active === "TV Series",
    },
  ]);

  return (
    <div className={`bg ${styles.background}`}>
      <h1 className={`${styles.title}`}>Flix</h1>
      {/* <div className={`${styles.links}`}>
        {links.map((link) => {
          return (
              <p className={link.active ? styles.active : ""}>{link.title}</p>
          );
        })}
      </div> */}
    </div>
  );
}
