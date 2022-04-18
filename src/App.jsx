import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import MoviesList from "./components/MoviesList";
import MovieDetails from "./components/MovieDetails";
import Search from "./components/Search";
import json from "./movies.json";

function App() {

  /*STEP 1 and 2 : Fetch the movies list from the provided JSON file*/
  const jsonMovies = json.results;

  // Handle the default movie detail view before clicking on a movie link : initiate and use a boolean state value wheter
  // a movie link has been clicked or not
  const [clicked, setClicked] = useState(false);

  const showDetail = () => {
    setClicked(true);
  };

  //Render the movies list component and create a route displaying the movie detail when clicked into the movies list
  //Display whatever Movie ( Lord of the ring in my case) by default (before clicking on a movie title link)
  return (
    <div className="container">
      <div className="row">
        <div className="col movies-list">
          <Search />
          <MoviesList movies={jsonMovies} handleShowClick={showDetail} />
        </div>
        <div className="col movie-details">
          {clicked === false && (
            <div>
              <div className="row">
                <div className="col">
                  <img
                    src={
                      "https://image.tmdb.org/t/p/original/6oom5QYQ2yQTMJIbnvbkBL9cHo6.jpg"
                    }
                    alt="The lord of the rings poster"
                    style={{ width: "300px" }}
                  />
                </div>
                <div className="col">
                  <h1>The Lord of the Rings: The Fellowship of the Ring</h1>
                  <p>
                    <span className="movie-label">Movie average</span>: {8.4}
                  </p>
                  <p>
                    <span className="movie-label"> Polularity</span>: {167.327}
                  </p>
                  <p>
                    <span className="movie-label">Vote count</span>: {20792}
                  </p>
                  <p>
                    <span className="movie-label">Release date</span>: 2001-12-18
                  </p>
                </div>
              </div>
              <div className="row">
                <p>
                  <span className="movie-label">Overview:</span> Young hobbit Frodo Baggins, after inheriting a
                  mysterious ring from his uncle Bilbo, must leave his home in
                  order to keep it from falling into the hands of its evil
                  creator. Along the way, a fellowship is formed to protect the
                  ringbearer and make sure that the ring arrives at its final
                  destination: Mt. Doom, the only place where it can be
                  destroyed
                </p>
              </div>
            </div>
          )}

          <Routes>
            <Route path="/">
              <Route
                path=":id"
                element={<MovieDetails movies={jsonMovies} />}
              />
            </Route>
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
