import React from "react";
import "./../App.css";

const Search = () => {
  return (
    <nav className="navbar navbar navbar-light bg-light">
      <input
        className=" search form-control"
        type="search"
        placeholder="Search"
        aria-label="Search"
      />
      <button className="btn btn-sm btn-outline-success">OK</button>
      <button className="btn btn-sm btn-outline-warning">Home</button>
    </nav>
  );
};

export default Search;
