import styles from "../../styles/Info/Providers.module.css";

export default function Provider(props) {
  const types = [
    {
      name: "Streaming on",
      title: "flatrate",
    },
    {
      name: "Rent",
      title: "rent",
    },
    {
      name: "Buy",
      title: "buy",
    },
  ];
  const image = "https://image.tmdb.org/t/p/w200";
  return (
    <div className={styles.main}>
      <div>
        <img
          className={styles.justwatch_logo}
          src="https://www.justwatch.com/appassets/img/logo/JustWatch-logo-large.png"
        />
        <p>
          JustWatch makes it easy to find out where you can legally watch your
          favorite movies & TV shows online. Visit{" "}
          <a
            className={styles.justwatch_link}
            href="https://justwatch.com"
            target="_blank"
          >
            JustWatch
          </a>{" "}
          for more information.
        </p>
      </div>
      {props.providers === "NA" && (
        <p className={`${styles.title} ${styles.not_available}`}>
          There are no offers for {props.title}</p>
      )}
      {props.providers !== "NA"  &&
        types.map((type) => {
          return (
            <>
              {props.providers[type.title] && (
                <>
                  <p className={styles.title}>{type.name}</p>
                  <div className={styles.list}>
                    {props.providers[type.title].map((provider) => {
                      return (
                        <img
                          key={props.providers[type.title].indexOf(provider)}
                          className={`bg ${styles.provider}`}
                          src={image + provider.logo_path}
                        />
                      );
                    })}
                  </div>
                </>
              )}
            </>
          );
        })}
    </div>
  );
}
