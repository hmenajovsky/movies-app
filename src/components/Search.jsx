import React from "react";
import "./../App.css";

const Search = props => {
  //Bring the props from the parent App component and destruture the props object
  const { searched, searchFilter, searchClick} = props;

  //STEP2: add the value and the onChange attributes with the fetched searched string value and search filter callback from parent through the props object
  return (
    <nav className="navbar navbar bg-dark searchbar"> 
    <i className="fa fa-search"></i>     
      <input
        className="form-control"
        type="search"
        placeholder= "Search"
        aria-label="Search"
        value={searched}
        onChange={e => searchFilter(e.target.value)}
      />
      <button className="btn btn-sm btn-outline-light" onClick = { () => searchClick(searched)}>OK</button>
    </nav>
  );
};

export default Search;
