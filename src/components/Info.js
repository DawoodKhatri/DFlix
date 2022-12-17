import styles from "../styles/Info.module.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Cast from "./Cast";
import Details from "./Details";
import MobileDetails from "./MobileDetails";
import Status from "./Status";

export default function Info() {
  const [data, setData] = useState();
  const [cast, setCast] = useState();
  const [crew, setCrew] = useState();
  const [mobile, setMobile] = useState()
  const id = useParams().movie.split("-")[0];
  const key = "4e44d9029b1270a757cddc766a1bcb63";
  const api = "https://api.themoviedb.org/3";

  const setUpData = async () => {
    var response = await fetch(`${api}/movie/${id}?api_key=${key}`);
    var result = await response.json();
    setData(result);
  };

  const setUpCastCrew = async () => {
    var response = await fetch(`${api}/movie/${id}/credits?api_key=${key}`);
    var result = await response.json();
    setCast(result.cast);
    var temp = result.crew.filter(
      (crew) =>
        crew.job === "Director" ||
        crew.job === "Screenplay" ||
        crew.job === "Story" ||
        crew.job === "Writer"
    );
    var names = [
      ...new Set(
        temp.map((item) => {
          return item.name;
        })
      ),
    ];
    var sorted = [];
    for (let name of names) {
      sorted.push({
        name: name,
        profile_path: temp
          .filter((item) => item.name === name)
          .map((item) => item.profile_path),
        jobs: temp.filter((item) => item.name === name).map((item) => item.job),
      });
    }
    setCrew(sorted);
  };

  useEffect(() => {
    if (!data) setUpData();
    if (!cast || !crew) setUpCastCrew();
    if(!mobile) {
      window.addEventListener('resize',()=>{
        setMobile(window.innerWidth <= 800)
      })
      setMobile(window.innerWidth <= 800)
    }
  });
  return (
    <>
    {!(data && cast) && <div className="loading"></div>}
      <div className={styles.background}>
        {data && <Details details={data} crew={crew} mobile={mobile} />}
      </div>
      <div className={`bg ${styles.background}`}>
        {mobile && data && <MobileDetails details={data} crew={crew} />}
      </div>

      <div className={`${styles.background} ${styles.main}`}>
        {cast && (
          <div className={`bg ${styles.castBG}`}>
            <p className={styles.castT}>Top Cast</p>
            <div className={styles.cast}>
              {cast.map((castInfo) => {
                return <Cast key={cast.indexOf(castInfo)} cast={castInfo} />;
              })}
            </div>
          </div>
        )}
        <div className={`bg ${styles.status}`}>
          {data && <Status data={data} />}
        </div>
      </div>
    </>
  );
}
