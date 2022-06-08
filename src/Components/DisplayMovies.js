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


  //update movie list function

  //handle searchChange

  //handle filterSelect

  return (
    <div>
      {/* <img src={require('../Assets/moviePosterImages/defaultImage.jpeg')}></img> */}
      <ul>
        {filteredMovieList?.map((movie) => {
          return (
            <div key={movie.id}>

              <li>{movie.title} {movie.id}</li>
              <img src={require(`../Assets/moviePosterImages/defaultImage.jpeg`)} onError={
                () => this.img.src = '../Assets/moviePosterImages/defaultImage.jpeg'
              }
              // src={require(`../Assets/moviePosterImages/${movie.id}.jpeg`)} onerror="this.onerror=null; this.src='../Assets/moviePosterImages/defaultImage.jpg'"
              ></img>

            </div>
          )
        })}
      </ul>
    </div>
  )
};

export default DisplayMovies;