import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../Services/API';

const DisplayMovies = () => {
  const [filteredMovieList, setFilteredMovieList] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [fullMovieList, setFullMovieList] = useState([]);

  //will change to pulling genre names from data object
  const [genres, setGenres] = useState(
    ["Action", "Thriller", "Crime drama", "Mystery", "Children", "Comedy", 
    "Adventure", "Animated", "Drama", "Comedy Drama", "Western", "Historical drama"]
    );

  useEffect(() => {
    API.getMovieList().then((res) => {
      if (res.data.message.toLowerCase() === "success") {
        setFilteredMovieList(res.data.data);
        setFullMovieList(res.data.data);
      } else {
        console.log(res.data.message);
      };
    });

  }, []);

  const checkImg = (id) => {
    try {
      return (<img src={require(`../Assets/moviePosterImages/${id}.jpeg`)}></img>);
    } catch (err) {
      return (<img src={require(`../Assets/moviePosterImages/defaultImage.jpeg`)}></img>);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    var lowerCase = (e.target.value.toLowerCase());
    let result = [];
    
    result = fullMovieList.filter((data) =>{
      return data.title.toLowerCase().search(lowerCase) != -1;
    });
    setFilteredMovieList(result);
  };

  

  return (
    <div>
        <label name="search">Search movie list  </label> 
        <input label="search" onChange={handleSearch}></input>     
        {filteredMovieList?.map((movie) => {
          return (
            <div key={movie.id}>
              <Link to={`/movie-details/${movie.id}`}>
                {checkImg(movie.id)}
              </Link>
            </div>
          )
        })}

    
    </div>
  )
};

export default DisplayMovies;