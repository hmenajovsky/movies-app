const MovieDefault = () => {
  // render the default movie details picture and information with the whished layout
  return (
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
            <span className="movie-label">Polularity</span>: {167.327}
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
        <ul><p className="movie-label">Genres:</p>
          <li>Adventure</li>
          <li>Fantasy</li>
          <li>Drama</li>
        </ul>
        <p>
          <span className="movie-label">Overview:</span> Young hobbit Frodo
          Baggins, after inheriting a mysterious ring from his uncle Bilbo, must
          leave his home in order to keep it from falling into the hands of its
          evil creator. Along the way, a fellowship is formed to protect the
          ringbearer and make sure that the ring arrives at its final
          destination: Mt. Doom, the only place where it can be destroyed
        </p>
      </div>
    </div>
  );
};

export default MovieDefault;
