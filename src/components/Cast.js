import styles from "../styles/Cast.module.css";

export default function Cast(props) {
  const profile = "https://image.tmdb.org/t/p/w200";
  return (
    <div className={`bg ${styles.background}`}>
      {props.cast.profile_path && (
        <img className={styles.image} src={profile + props.cast.profile_path} loading="lazy" />
      )}
      {!props.cast.profile_path && (
        <div className={styles.svg}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            id="glyphicons-basic"
            viewBox="0 0 32 32"
            fill="var(--color-primary)"
            style={{ margin: "auto", width: "120px" }}
          >
            <path
              d="M27,24.23669V27a1,1,0,0,1-1,1H5a1,1,0,0,1-1-1V24.23669a1.57806,1.57806,0,0,1,.93115-1.36462L10.0672,20.167A5.02379,5.02379,0,0,0,14.55273,23h1.89454a5.02336,5.02336,0,0,0,4.48535-2.83313l5.13623,2.7052A1.57806,1.57806,0,0,1,27,24.23669ZM9.64478,14.12573a2.99143,2.99143,0,0,0,1.31073,1.462l.66583,3.05176A2.99994,2.99994,0,0,0,14.55237,21h1.89526a2.99994,2.99994,0,0,0,2.931-2.36047l.66583-3.05176a2.99115,2.99115,0,0,0,1.31073-1.462l.28-.75146A1.2749,1.2749,0,0,0,21,11.62988V9c0-3-2-5-5.5-5S10,6,10,9v2.62988a1.2749,1.2749,0,0,0-.63519,1.74439Z"
            />
          </svg>
        </div>
      )}
      <p className={styles.name}>{props.cast.name}</p>
      <p className={styles.character}>{props.cast.character}</p>
    </div>
  );
}
