import { Link } from "react-router-dom";

const MoviesList = (props) => {
  //Bring the props from the parent App component and destruture the props object
  const {movies, handleShowClick} = props;

  //Render the movies title list by iterating on each movie 
  return (
    <>
      <div className="list-group">
        {movies.map((movie, i) => {
          return (
            <Link
              className="list-group-item list-group-item-action"
              key={i}
              to={movie.id.toString()}
              onClick={() => handleShowClick()}
            >
              <p>{movie.title}</p>
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default MoviesList;
