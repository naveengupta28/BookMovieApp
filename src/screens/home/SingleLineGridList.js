import {
  Grid,
  GridList,
  GridListTile,
  GridListTileBar,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Grid.css";


function SingleLineGridList(props) {
  const [movie, setMovies] = useState([]);
  const fetchUrl = "/api/v1/movies?page=1&limit=10";
  useEffect(() => {
    async function fetchData() {
      // You can await here
      const response = await fetch("/api/v1/movies?page=1&limit=100");
      const data = await response.json();
      console.log(data.movies);
      setMovies(data.movies);
    }
    fetchData();
  }, [fetchUrl]); // Or [] if effect doesn't need props or state

  let latestReleased = [];

  for (let releMovie of movie) {
    if (
      releMovie.title !== "Bad Boys For Life" &&
      releMovie.title !== "Mowgli" &&
      releMovie.title !== "Hellboy" &&
      releMovie.title !== "Sanju"
    ) {
      console.log(`${movie.status}:${movie.title}`);
      latestReleased.push(releMovie);
    }
  }

  return (
    <Grid className="grid-Div-container">
      <GridList
        cellHeight={250}
        cols={6}
        className="uppergrid"
        style={{
          padding: "1px",
          display: "flex",
          flexWrap: "nowrap",
          height: "250px",
          overflow: "auto",
        }}
      >
        {latestReleased.map((data) => (
          <GridListTile key={data.id} className="gridListTile">
            <Link
              to={{
                pathname: `/details/${data.id}`,
                moviesProps: data.id,
              }}
            >
              <img
                src={data.poster_url}
                className="upper_grid_poster"
                alt={data.title}
              />
            </Link>
            <GridListTileBar
              title={data.title}
              subtitle={data.description}
              style={{ textAlign: "start" }}
            />
          </GridListTile>
        ))}
      </GridList>
    </Grid>
  );
}
export default SingleLineGridList;
