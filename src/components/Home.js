import Category from "../components/Category";
import { useEffect, useState } from "react";

export default function Home(props) {
  const [contents, setContents] = useState();
  const setUp = async () => {
    var data = [];

    const key = "4e44d9029b1270a757cddc766a1bcb63";
    const api = "https://api.themoviedb.org/3/";

    for (let query of props.queries) {
      var response = await fetch(
        api +
          `discover/movie?api_key=${key}&with_original_language=hi` +
          query.value
      );
      var items = await response.json();
      data.push({
        name: query.title,
        content: items,
      });
    }
    setContents(data);
  };

  useEffect(() => {
    if (!contents) setUp();
  });

  if (!contents) return <div className="loading"></div>;

  if (contents)
    return (
      <>
        {contents.map((item) => {
          return (
            <Category
              key={contents.indexOf(item)}
              title={item.name}
              data={item.content.results}
            />
          );
        })}
      </>
    );
}
