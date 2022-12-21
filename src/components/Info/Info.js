import styles from "../../styles/Info/Info.module.css";
import { json, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Cast from "./Cast.js";
import Details from "./Details.js";
import MobileDetails from "./MobileDetails.js";
import Status from "./Status.js";
import Video from "./Video";
import Provider from "./Provider";

export default function Info() {
  const [data, setData] = useState();
  const [cast, setCast] = useState();
  const [crew, setCrew] = useState();
  const [videos, setVideos] = useState();
  const [providers, setProviders] = useState();
  const [mobile, setMobile] = useState();
  const type = useParams().movie.split("-")[0];
  const id = useParams().movie.split("-")[1];
  const key = "4e44d9029b1270a757cddc766a1bcb63";
  const api = "https://api.themoviedb.org/3";

  const setUpData = async () => {
    var response = await fetch(`${api}/${type}/${id}?api_key=${key}`);
    var result = await response.json();
    setData(result);
  };

  const setUpCastCrew = async () => {
    var response = await fetch(`${api}/${type}/${id}/credits?api_key=${key}`);
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

  const setUpVideos = async () => {
    var response = await fetch(`${api}/${type}/${id}/videos?api_key=${key}`);
    var result = (await response.json()).results;
    result = result.filter(
      (item) => item.type === "Trailer" && item.site === "YouTube"
    );
    setVideos(result);
  };

  const setUpProviders = async () => {
    var country = (await (await fetch("https://ipapi.co/json/")).json())
      .country_code;
    var response = await fetch(
      `${api}/${type}/${id}/watch/providers?api_key=${key}`
    );
    var result = (await response.json()).results;
    if (!result[country]) {
      setProviders("NA");
    } else {
      setProviders(result[country]);
    }
  };

  useEffect(() => {
    if (!data) setUpData();
    if (!cast || !crew) setUpCastCrew();
    if (!videos) setUpVideos();
    if (!providers) setUpProviders();
    if (!mobile) {
      window.addEventListener("resize", () => {
        setMobile(window.innerWidth <= 800);
      });
      setMobile(window.innerWidth <= 800);
    }
  });
  return (
    <>
      {data && (
        <div className={styles.background}>
          <Details details={data} crew={crew} mobile={mobile} />
        </div>
      )}
      {mobile && data && (
        <div className={`bg ${styles.background}`}>
          <MobileDetails details={data} crew={crew} />
        </div>
      )}

      <div className={`${styles.background} ${styles.main}`}>
        {data && providers && (
          <div className={`bg ${styles.provider_container}`}>
            <Provider
              providers={providers}
              title={data.name ? data.name : data.title}
            />
          </div>
        )}
        {data && (
          <div className={`bg ${styles.status_container}`}>
            <Status data={data} />
          </div>
        )}
      </div>

      {cast && (
        <div className={`${styles.background}`}>
          <div className={`bg ${styles.cast_container}`}>
            <p className={styles.cast_title}>Top Cast</p>
            <div className={styles.cast}>
              {cast.map((castInfo) => {
                return <Cast key={cast.indexOf(castInfo)} cast={castInfo} />;
              })}
            </div>
          </div>
        </div>
      )}

      {videos && videos.length !== 0 && (
        <div className={`${styles.background}`}>
          <div className={`bg ${styles.video_container}`}>
            <p className={styles.video_title}>Trailers</p>
            <div className={styles.video}>
              {videos.map((video) => {
                return <Video data={video} />;
              })}
            </div>
          </div>
        </div>
      )}

      {!(data && providers && cast && videos) && <div className="loading" />}
    </>
  );
}
