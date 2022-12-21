import { BrowserRouter, Routes, Route } from "react-router-dom";
import CategoryView from "./components/CategoryView/CategoryView.js";
import Home from "./components/Home/Home.js";
import Info from "./components/Info/Info.js";
import Navbar from "./components/Navbar.js";

export default function App() {
  const today = new Date().toISOString().substring(0, 10);
  let tomorrow = new Date();
  tomorrow.setDate(new Date().getDate() + 1);
  tomorrow = tomorrow.toISOString().substring(0, 10);
  const queries = [
    {
      title: "Trending Movies",
      type: "movie",
      value: `/trending/movie/week?api_key={key}`,
    },
    {
      title: "Most Watched Movies",
      type: "movie",
      value: `/discover/movie?api_key={key}&sort_by=vote_count.desc&release_date.lte=${today}`,
    },
    {
      title: "Popular TV Series",
      type: "tv",
      value: `/trending/tv/week?api_key={key}`,
    },
    {
      title: "Latest in Hindi",
      type: "movie",
      value: `/discover/movie?api_key={key}&sort_by=release_date.desc&release_date.lte=${today}&with_original_language=hi`,
    },
    {
      title: "Popular in Hindi",
      type: "movie",
      value: `/discover/movie?api_key={key}&sort_by=popularity.desc&release_date.lte=${today}&with_original_language=hi`,
    },
    {
      title: "Most Watched in Hindi",
      type: "movie",
      value: `/discover/movie?api_key={key}&sort_by=vote_count.desc&release_date.lte=${today}&with_original_language=hi`,
    },
  ];
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home queries={queries} />} />
        <Route path="/:category" element={<CategoryView queries={queries} />} />
        <Route path="/:category/:movie" element={<Info />} />
      </Routes>
    </BrowserRouter>
  );
}
