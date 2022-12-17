import { useState } from "react";
import { BrowserRouter, Routes, Route, Router } from "react-router-dom";
import CategoryView from "./components/CategoryView.js";
import Home from "./components/Home.js";
import Info from "./components/Info.js";
import Navbar from "./components/Navbar.js";

export default function App() {
  const [currCategory, setCurrCategory] = useState();
  // const today = new Date().toISOString().substring(0, 10);
  let tomorrow = new Date();
  tomorrow.setDate(new Date().getDate() + 1);
  tomorrow = tomorrow.toISOString().substring(0, 10);
  const queries = [
    {
      title: "Upcoming Movies",
      value: `&sort_by=release_date.asc&release_date.gte=${tomorrow}`,
    },
    {
      title: "Latest on OTT",
      value: `&sort_by=release_date.desc&with_release_type=4&release_date.lte=${tomorrow}`,
    },
    {
      title: "Latest in Cinema",
      value: `&sort_by=release_date.desc&with_release_type=3&release_date.lte=${tomorrow}`,
    },
    {
      title: "Popular",
      value: `&sort_by=popularity.desc&release_date.lte=${tomorrow}`,
    },
    {
      title: "Most Watched",
      value: `&sort_by=vote_count.desc&release_date.lte=${tomorrow}`,
    },
  ];
  return (
    <BrowserRouter>
      <Navbar active="Home" />
      <Routes>
        <Route
          path="/"
          element={<Home queries={queries} setCurrCategory={setCurrCategory} />}
        />
        <Route path="/:title" element={<CategoryView queries={queries} />} />
        <Route path="/:title/:movie" element={<Info />} />
      </Routes>
    </BrowserRouter>
  );
}
