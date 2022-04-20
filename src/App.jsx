import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import MoviesList from "./components/MoviesList";
import MovieDetails from "./components/MovieDetails";
import Search from "./components/Search";
import MovieDefault from "./components/MovieDefault";
import json from "./movies.json";
import axios from "axios";

function App() {
  /*STEP 1 and 2 : Fetch the movies list from the provided JSON file*/
  const jsonMovies = json.results;

  // STEP 3 :  create a state variable for movies and genres list
  // Initialize them to en empty array
  const [movies, setMovies] = useState([]);
  const [genresList, setGenresList] = useState([]);

  /* STEP 2 : Fetch the filtered search results by typing a word matching with a title of he list without using the search api */
  // Create a state variable for serached string and initialize it to en empty string
  const [searchedString, setSearchedString] = useState("");
  // Define the filter search callback function which set the search string the state to the value entered into the input field
  const handleFilterSearch = value => setSearchedString(value);

  //STEP 3-4 : use useNavigate hook to redirect to "/" when click on home button
  const navigate = useNavigate();


  /* STEP 3 : fetch the movies list from the api*/
  //Fetch the movies list when the component did mount, for example the most popular movies will be displayed here*/
  useEffect(() => {
    axios
      .get(
        "https://api.themoviedb.org/3/movie/popular?api_key=ec2624e09bf84899d3c3ea754947f60c"
      )
      // this endpoint gets the most popular movies from the whole database movies list
      .then(response => {
        setMovies(response.data.results);
      })
      .catch(e => console.log(e));
  }, []);

  /* STEP 2/3-3 : Fetch the filtered search dipslayed results by typing a word matching with a movie title from the json file or most popular movies list */
  // When no results are found from the most popular movies list, a message is displayed instead the result, inviting to click OK button to get the results from the search API
  let searchedMovies;
  searchedMovies = movies;
  if (searchedString !== "") {
    const filteredMovies = movies.filter(movie => {
      return movie.title.toLowerCase().includes(searchedString.toLowerCase());
    });
    searchedMovies =
      filteredMovies.length !== 0
        ? filteredMovies
        : [
          //a dummy object is used to be able to display the default fallback message result instead the one matchi ng with "undefined" keyword
            {
              id: 675353,
              title:
                "no results found on most popular movies list, click Ok to find in the whole list"
            }
          ];
  } else {
    searchedMovies = movies;
  }

  // Fetch the genres list to display their names in the movie details component
  useEffect(() => {
    axios
      .get(
        "https://api.themoviedb.org/3/genre/movie/list?api_key=ec2624e09bf84899d3c3ea754947f60c"
      )
      .then(response => {
        setGenresList(response.data.genres);
      })
      .catch(e => console.log(e));
  }, []);

  // STEP 3-4 : fetch the searched list by using the search API on click on the OK search button
  const handleSearchClick = string => {
    // redirect to "/" route path since the movie variale is not available anymore otherwise
    navigate('/');
    axios
      .get(
        "https://api.themoviedb.org/3/search/movie?api_key=ec2624e09bf84899d3c3ea754947f60c&query=" +
          string
      )
      .then(response => {
        setMovies(response.data.results);
      })
      .catch(e => console.log(e));
  };
  

  //Render the movies list component and create a route displaying the movie detail when clicked into the movies list
  //Display whatever Movie (Lord of the ring in my case) by default by adding a default movie component for "/" route path
  //Add props to Search component so the searched string variable and the search filter callback can be used in the child Search component
  return (
    <div className="container">
      <div className="row">
        <div className="col movies-list">
          <Search searched={searchedString} searchFilter={handleFilterSearch} searchClick = {handleSearchClick} />
          <MoviesList movies={searchedMovies} />
        </div>
        <div className="col movie-details">
          <Routes>
            <Route path="/" element={<MovieDefault />} />
            <Route />
            <Route path="/">
              <Route
                path=":id"
                element={<MovieDetails movies={searchedMovies} genres={genresList} />}
              />
            </Route>
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
