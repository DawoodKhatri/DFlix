import { useParams } from "react-router-dom";
export default function CategoryView(props) {
  const params = useParams();
  return <div>{params.title}</div>;
}
