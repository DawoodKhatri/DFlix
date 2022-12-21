import { useEffect, useState } from "react";
import { json, useParams } from "react-router-dom";
import styles from "../../styles/CategoryView/CategoryView.module.css";
import Card from "../Home/Card.js";
export default function CategoryView(props) {
  const params = useParams();

  const query = props.queries.filter(
    (item) => item.title.split(" ").join("-").toLowerCase() === params.category
  )[0];

  const [content, setContent] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPage, setTotalPage] = useState();
  const key = "4e44d9029b1270a757cddc766a1bcb63";
  const api = "https://api.themoviedb.org/3";

  const addPage = async () => {
    if (!totalPage || page < totalPage) {
      var response = await fetch(
        api + query.value.replace("{key}", key) + `&page=${page + 1}`
      );
      var result = await response.json();
      let items = result.results;
      setPage(result.page);
      setTotalPage(result.total_Pages);
      setContent(content.concat(items));
    }
  };

  useEffect(() => {
    if (!content.length) {
      window.addEventListener("scroll", () => {
        const totalHeight = window.innerHeight + window.scrollY;
        const bodyHeight =
          document.body.getBoundingClientRect().x +
          document.body.getBoundingClientRect().height;
        if (totalHeight > bodyHeight) {
          document.getElementsByTagName("button")[0].click();
        }
      });
    }
    if (!content.length) addPage();
  });

  return (
    <>
      <div className={`bg ${styles.background}`}>
        <h2>{query.title}</h2>
      </div>
      {content.length === 0 && <div className="loading"/>}
      {content.length !== 0 && (
        <div className={styles.container}>
          <div className={styles.list}>
            {content.map((item) => {
              return (
                <Card
                  key={content.indexOf(item)}
                  id={content.indexOf(item)}
                  title={query.title}
                  type={query.type}
                  data={item}
                />
              );
            })}
            {/* <div className="loading"></div> */}
            <button onClick={addPage} style={{ display: "none" }} />
          </div>
        </div>
      )}
    </>
  );
}
