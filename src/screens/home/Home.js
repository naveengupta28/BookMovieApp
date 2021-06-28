import React from "react";
import "./Home.css";
import NewReleasedGrid from "./NewReleasedGrid";
import SingleLineGridList from "./SingleLineGridList";
function Home(props) {
  return (
    <div className="Home-page">
      <div className="upcomingMovies">Upcoming Movies</div>
      <SingleLineGridList />
      <NewReleasedGrid />
    </div>
  );
}
export default Home;
