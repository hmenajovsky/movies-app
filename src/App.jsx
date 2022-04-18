import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import MoviesList from "./components/MoviesList";
import MovieDetails from "./components/MovieDetails";
import Search from "./components/Search";
import MovieDefault from './components/MovieDefault';
//import json from "./movies.json";
import axios from "axios";

function App() {

  /*STEP 1 and 2 : Fetch the movies list from the provided JSON file*/
  //const jsonMovies = json.results;

  // STEP 3 :  create a state variable for movies and genres list
  // Initialize them to en empty array
  const [movies, setMovies] = useState([]);
  const [genresList, setGenresList] = useState([]);

  /* STEP 2 : Fetch the filtered search results by typing a word matching with a title of he list without using the search api */
  // Create a state variable for serached string and initialize it to en empty string
  const [searchedString, setSearchedString] = useState("");
  // Define the filter search callback function which set the search string the state to the value entered into the input field
  const handleFilterSearch = (value) => setSearchedString(value);

  /* STEP 3 : fetch the movies list from the api*/
  //fetch the movies list before the component is mounted, for example the most popular movies will be displayed here*/
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


  let searchedMovies;
      searchedMovies = movies;
    if (searchedString !== "") {
        const  filteredMovies = movies.filter(movie => {
        return movie.title.toLowerCase().includes(searchedString.toLowerCase());
      });
        searchedMovies = filteredMovies.length !== 0 ? filteredMovies: [{id: 675353, title: 'no results found on most popular movies list, click Ok to find on the whole list'}];
    } else {
      searchedMovies = movies;
    }

   // fetch the genres list to display them in the movie details component
    useEffect(() => {

      axios
      .get('https://api.themoviedb.org/3/genre/movie/list?api_key=ec2624e09bf84899d3c3ea754947f60c')
      .then((response) => {      
      setGenresList(response.data.genres);
      })
      .catch((e) => console.log(e));
    }, [])

  //Render the movies list component and create a route displaying the movie detail when clicked into the movies list
  //Display whatever Movie (Lord of the ring in my case) by default by adding a default movie component for "/" route path
  //Add props to Search component so the searched string variable and the search filter callback can be used in the child Search component
  return (
    <div className="container">
      <div className="row">
        <div className="col movies-list">
          <Search searched = {searchedString} searchFilter = {handleFilterSearch}/>
          <MoviesList movies={searchedMovies} />
        </div>
        <div className="col movie-details">
          <Routes>
          <Route
                path="/"
                element={<MovieDefault/>}
              />
            <Route/>
            <Route path="/">
              <Route
                path=":id"
                element={<MovieDetails movies={movies} genres = {genresList} />}
              />
            </Route>
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
