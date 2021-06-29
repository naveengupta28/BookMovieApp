import {
  Button,
  GridList,
  GridListTile,
  GridListTileBar,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import "./Details.css";
import YouTube from "react-youtube";
import StarRatingIcon from "../../common/StarRatingIcon";
import { Link } from "react-router-dom";
const fetchUrl = "/api/v1/movies?page=1&limit=10";
function Details(props) {
  const [Movie, setMovie] = useState([]);
  const [isLoggedOut, setIsloggedOut] = useState(false);
  useEffect(() => {
    setIsloggedOut(false);
  }, [isLoggedOut]);

  let Data = [];
  useEffect(() => {
    async function fetchData() {
      // You can await here
      if (props.match) {
        const response = await fetch("/api/v1/movies/" + props.match.params.id);
        const data = await response.json();
        console.log(data);
        setMovie(data);
      }
    }
    fetchData();
  }, []);

  console.log("details page movie");
  console.log(Movie);
  if (Movie.id == "52974690-a235-11e8-9077-720006ceb890") {
    console.log("inside ifif");
    console.log(Movie["artists"][0].first_name);
  }
  // console.log(Movie.title)
  // console.log(Movie.genres)
  // console.log(Movie.title)
  // console.log(Movie.title)
  const opts = {
    height: "390",
    width: "100%",
    PalyerVars: {
      //https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  let videoCode;
  if (Movie.trailer_url) {
    console.log("inside trailer_url");
    videoCode = Movie.trailer_url.split("v=")[1].split("&")[0];
  }
  let movieGenre = [];
  movieGenre = Movie.genres;
  console.log(movieGenre);
  return (
    <div className="container">
      {localStorage.getItem("user-info") ? (
        <span className="BookShow-btn">
          <Link to={{ pathname: "/" }}>
            <Button id="BookShow-btn" variant="contained" color="primary">BookShow</Button>
          </Link>
        </span>
      ) : null}
      <div className="item item-1">
        <Typography align="left">
          <Link to={{ pathname: "/" }}>
            <button className="backhome_btn">ᑉ Back to home</button>
          </Link>
        </Typography>
        {
          <img
            src={Movie.poster_url}
            className="Movie_poster_details"
            alt={Movie.title}
          />
        }
      </div>
      <div className="item item-2">
        <Typography variant="h5" component="h2">
          {Movie.title}
        </Typography>

        <Typography>
          <b>Genre:</b>
          {Movie.genres &&
            Movie.genres.map((item) => <span key={item}> {item}</span>)}
          <br />
          <b>Duration:</b> {Movie.duration}
          <br />
          <b>Release Date:</b>
          {new Date(Movie.release_date).toDateString()}
          <br />
          <b>Rating:</b> {Movie.rating}
          <br />
          <br />
          <Typography>
            <b>Plot:</b>
            <a href={Movie.wiki_url}> (Wiki link) </a>
            {Movie.storyline}
          </Typography>
          <br />
        </Typography>
        <Typography>
          <b>Trailer:</b>
        </Typography>
        <YouTube videoId={videoCode} opts={opts} />
      </div>
      <div className="item item-3">
        <Typography align="justify">
          <b>Rate this Movie:</b>
        </Typography>
        <StarRatingIcon></StarRatingIcon>

        <br />

        <Typography style={{ marginBottom: "16px" }}>
          <b>Artists:</b>
        </Typography>
        <GridList
          cols={2}
          style={{
            padding: "1px",
            display: "flex",
            flexWrap: "nowrap",
            height: "350px",
          }}
        >
          {Movie.artists &&
            Movie.artists.map((item) => (
              <GridListTile key={item.id + item.first_name}>
                <img
                  src={item.profile_url}
                  className="Artist_image"
                  alt={item.first_name}
                ></img>

                <GridListTileBar
                  key={item.last_name}
                  title={
                    <span>
                      {item.first_name} {item.last_name}
                    </span>
                  }
                  style={{
                    textAlign: "start",
                    marginTop: 16,
                    marginBottom: 16,
                  }}
                />
              </GridListTile>
            ))}
        </GridList>
      </div>
    </div>
  );
}
export default Details;
