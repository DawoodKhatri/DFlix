import styles from "../styles/Status.module.css";

export default function Status(props) {
  return (
    <div className={styles.main}>
      <div>
        <p className={styles.title}>Original Title</p>
        <p className={styles.value}>{props.data.original_title}</p>
      </div>
      <div>
        <p className={styles.title}>Status</p>
        <p className={styles.value}>{props.data.status}</p>
      </div>
      <div>
        <p className={styles.title}>Original Language</p>
        <p className={styles.value}>
          {new Intl.DisplayNames(["en"], { type: "language" }).of(
            props.data.original_language
          )}
        </p>
      </div>
      <div>
        <p className={styles.title}>Budget</p>
        <p className={styles.value}>
          {props.data.budget
            ? Intl.NumberFormat("en-IN", {
                style: "currency",
                currency: "USD",
              })
                .format(props.data.budget)
                .replace("US", "")
            : "Not Available"}
        </p>
      </div>
      <div>
        <p className={styles.title}>Revenue</p>
        <p className={styles.value}>
          {props.data.revenue
            ? Intl.NumberFormat("en-IN", {
                style: "currency",
                currency: "USD",
              })
                .format(props.data.revenue)
                .replace("US", "")
            : "Not Available"}
        </p>
      </div>
    </div>
  );
}
