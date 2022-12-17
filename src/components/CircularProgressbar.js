export default function CircularProgressbar(props) {
  return (
    <svg
      className={props.className}
      viewBox="0 0 100 100"
      style={{
        width: props.size,
        height: props.size,
        backgroundColor: props.backgroundColor,
      }}
    >
      <path
        d="
        M 50,50
        m 0,-46
        a 46,46 0 1 1 0,92
        a 46,46 0 1 1 0,-92
      "
        strokeWidth="8"
        fillOpacity="0"
        style={{ stroke: props.color, opacity: "0.5"}}
      ></path>
      <path
        d="
        M 50,50
        m 0,-46
        a 46,46 0 1 1 0,92
        a 46,46 0 1 1 0,-92
      "
        strokeWidth="8"
        fillOpacity="0"
        style={{
          stroke: props.color,
          strokeDasharray: ["289.027px", "289.027px"],
          strokeDashoffset: ((100 - props.value) * 289.027) / 100 + "px",
        }}
      ></path>
      <text
        x="50"
        y="50"
        dy="0.35em"
        textAnchor="middle"
        style={{ fill: props.color, fontSize: props.size - 15 + "px" }}
      >
        {props.text}
      </text>
    </svg>
  );
}
