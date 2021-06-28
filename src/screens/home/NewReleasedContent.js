import React, { useEffect, useState } from "react";
import { GridList, GridListTile, GridListTileBar } from "@material-ui/core";
import { BrowserRouter, Link } from "react-router-dom";
import "./Grid.css";
function NewReleasedContent({ filteredData }) {
  const [newMovie, setNewMovie] = useState([]);

  let title = filteredData.movie_Name;

  let artists = filteredData.movie_Artists;

  let startTime = filteredData.movie_startTime;

  let endTime = filteredData.movie_endTime;
  let genres = filteredData.movie_genere;

  let UrlGenre = genres;
  let UrlArtists = artists;

  console.log("URLARTIST");
  console.log(UrlArtists);
  let urlEncode = genres;
  console.log("URLEnCOde");
  console.log(urlEncode);
  let fetchUrl;

  if (UrlArtists) {
    const parameterizeArray = (key, arr) => {
      arr = arr.map(encodeURIComponent);
      return "&" + key + "=" + arr.join("&" + key + "=");
    };

    console.log(parameterizeArray("genre", urlEncode));

    fetchUrl = `/api/v1/movies?page=1&limit=10&title=${title}&status=RELEASED&start_date=&end_date=${parameterizeArray("genre", urlEncode)}${parameterizeArray("artists", UrlArtists)}`;
    console.log("fetchUrl");
    console.log(fetchUrl);
  } else {
    fetchUrl = "/api/v1/movies?page=1&limit=10";
  }

  useEffect(() => {
    async function fetchData() {
      // You can await here
      const response = await fetch(fetchUrl);
      const data = await response.json();
      console.log(data.movies);
      setNewMovie(data.movies);
    }
    fetchData();
  }, [fetchUrl]); // Or [] if effect doesn't need props or state

  let latestReleased = [];
  for (let movie of newMovie) {
    if (movie.status === "RELEASED" && movie.title != "Sanju") {
      console.log(`${movie.status}:${movie.title}`);
      latestReleased.push(movie);
    }
  }
  console.log("newrElease");
  console.log(latestReleased);

  return (
    <div>
      <GridList cellHeight={350} cols={4} spacing={20}>
        {latestReleased.map((data) => (
          <GridListTile key={data.id} className="gridListTile">
            <Link to={{ pathname: `/details/${data.id}` }}>
              <img
                src={data.poster_url}
                className="Released_poster"
                alt={data.title}
              ></img>
            </Link>
            <GridListTileBar
              title={data.title}
              subtitle={
                <p>
                  Released Date {new Date(data.release_date).toDateString()}
                </p>
              }
              style={{ textAlign: "start" }}
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}
export default NewReleasedContent;
