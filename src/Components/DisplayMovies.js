import { render } from '@testing-library/react';
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../Services/API';

const DisplayMovies = () => {
  const [filteredMovieList, setFilteredMovieList] = useState([]);
  const [fullMovieList, setFullMovieList] = useState([]);
  const [genreList, setGenreList] = useState([]);
  const [genreFilter, setGenreFilter] = useState("All");

  useEffect(() => {
    API.getMovieList().then((res) => {
      if (res.data.message.toLowerCase() === "success") {
        setFilteredMovieList(res.data.data);
        setFullMovieList(res.data.data);
        let genreArr = ["All"];
        for (let i = 0; i < res.data.data.length; i++) {
          genreArr.push(res.data.data[i].genres);
        };
        genreArr = genreArr.flat();
        // setTimeout(() => {

        setGenreList([...new Set(genreArr)]);
        // }, "300")
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

  // const filterByGenre = (e) => {
  //   e.preventDefault();

  //   console.log(e.target.value);
  // }

  const handleSearch = (e) => {
    e.preventDefault();
    var lowerCase = (e.target.value.toLowerCase());
    let result = [];

    result = fullMovieList.filter((data) => {
      return data.title.toLowerCase().search(lowerCase) != -1;
    });
    setFilteredMovieList(result);

  };

  return (
    <div>
      <div className='search-bar'>
        <label className='search-label' name="search">Search movie list  </label>
        <input label="search" onChange={handleSearch}></input>
        <select>
          {genreList.length > 1 ? genreList?.map((genre, idx) => (
            <option key={idx}>{genre}</option>
          )) : <option>Loading Genres...</option>}
        </select>
      </div>
      <div className='movies'>
        {filteredMovieList.length > 0 ? filteredMovieList?.map((movie) => (
          <div key={movie.id} className="one_movie">
            <h5 className='movie-title'>{movie.title}</h5>
            <a href={`/movie-details/${movie.id}`}>
              {checkImg(movie.id)}
            </a>
          </div>
        )) : <p>No results found...</p>}
      </div>
    </div>
  )
};

export default DisplayMovies;