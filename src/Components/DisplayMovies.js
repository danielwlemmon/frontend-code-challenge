import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../Services/API';

const DisplayMovies = () => {
  // let fullMovieList;
  const [filteredMovieList, setFilteredMovieList] = useState([]);


  useEffect(() => {
    API.getMovieList().then((res) => {
      // fullMovieList = res.data.data;
      setFilteredMovieList(res.data.data);
    });

  }, []);


  const checkImg = (id) => {
    try {
      return (<img src={require(`../Assets/moviePosterImages/${id}.jpeg`)}></img>);
    } catch(err) {
      return (<img src={require(`../Assets/moviePosterImages/defaultImage.jpeg`)}></img>);
    }
  };



  //update movie list function

  //handle searchChange

  //handle filterSelect

  return (
    <div>

      <ul>
        {filteredMovieList?.map((movie) => {
          return (
            <div key={movie.id}>

              <li>{movie.title} {movie.id}</li>
              
              {checkImg(movie.id)}
            </div>
          )
        })}

      </ul>
    </div>
  )
};

export default DisplayMovies;