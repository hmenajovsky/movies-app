import { useParams } from "react-router-dom";

const MovieDetails = props => {
  //Bring the props from the parent App component and destruture the props object
  const { movies, genres } = props;

  //Find the movie from the fetch movies list which had the id matching with the URL parameter one id 
  const params = useParams();
  const movie = movies.find(movie => movie.id === Number(params.id));

// render that movie details picture and information with the whished layout
  return (
    <>
      <div className="row">
        <div className="col">
          <img
            src={"https://image.tmdb.org/t/p/original" + movie.poster_path}
            alt="movie poster"
            style={{ width: "300px" }}
          />
        </div>
        <div className="col">
          <h1>{movie.title}</h1>
          <p>
            <span className="movie-label">Movie average:</span>
            {" "} {movie.vote_average}
          </p>
          <p>
            <span className="movie-label"> Polularity:</span> {movie.popularity}
          </p>
          <p>
            <span className="movie-label">Vote count:</span>{" "}
            {movie.vote_count}
          </p>
          <p>
            <span className="movie-label"> Release date:</span>
            {" "}{movie.release_date}
          </p>
        </div>
      </div>
      <div className="row">
      <ul>        
          <p className="movie-label"> Movie genres:</p>
          {movie.genre_ids.map((genreId, i) => {
          return <li key={i}>{genres.filter((genre) => genre.id === genreId)[0].name}</li>;
          })}
          </ul>

        <p><span className="movie-label">Overview:</span>{" "}{movie.overview}</p>
      </div>
    </>
  );
};

export default MovieDetails;
