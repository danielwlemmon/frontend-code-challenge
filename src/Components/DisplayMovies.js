import { render } from '@testing-library/react';
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../Services/API';

const DisplayMovies = () => {
  const [filteredMovieList, setFilteredMovieList] = useState([]);
  const [fullMovieList, setFullMovieList] = useState([]);
  const [genreList, setGenreList] = useState([]);
  const [genreFilter, setGenreFilter] = useState("All");
  const [search, setSearch] = useState("");

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
        setGenreList([...new Set(genreArr)]);
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

  const handleGenreChange = (e) => {
    e.preventDefault();
    setFilteredMovieList(fullMovieList);

    setGenreFilter(e.target.value);
    filterMovies(e.target.value, search);
  }

  const handleSearch = (e) => {
    e.preventDefault();
    setFilteredMovieList(fullMovieList);
    var lowerCase = (e.target.value.toLowerCase());

    setSearch(lowerCase);
    filterMovies(genreFilter, lowerCase);
  };

  const filterMovies = (genre, searchText) => {
    setFilteredMovieList(fullMovieList);

    if (genre !== "All" && searchText === "") {
      let resultGenre = [];
      resultGenre = fullMovieList.filter((data) => {
        return data.genres.toString().search(genre) !== -1;
      });
      setFilteredMovieList(resultGenre);
    } else if (genre === "All" && searchText !== "") {
      let resultOfText = [];
      resultOfText = fullMovieList.filter((data) => {
        return data.title.toLowerCase().search(searchText) !== -1;
      });
      setFilteredMovieList(resultOfText);
    } else if (genre !== "All" && searchText !== "") {
      let resultGenre = [];
      resultGenre = fullMovieList.filter((data) => {
        return data.genres.toString().search(genre) !== -1;
      });
      let resultOfText = [];
      resultOfText = resultGenre.filter((data) => {
        return data.title.toLowerCase().search(searchText) !== -1;
      });
      setFilteredMovieList(resultOfText);
    }
  }

  return (
    <div>
      <div className='search-bar'>
        <label className='search-label' name="search">Search movie list  </label>
        <input label="search" onChange={handleSearch}></input>
        <select className='dropdown' onChange={handleGenreChange}>
          {genreList.length > 1 ? genreList?.map((genre, idx) => (
            <option className='dropdown-item' key={idx}>{genre}</option>
          )) : <option>Loading Genres...</option>}
        </select>
      </div>
      <div className='movies'>
        {filteredMovieList.length > 0 ? filteredMovieList?.map((movie) => (
          <div key={movie.id} className="one_movie">    
            <a href={`/movie-details/${movie.id}`}>
              {checkImg(movie.id)}
            </a>
            <h5 className='movie-title'>{movie.title}</h5>
          </div>
        )) : <p>No results found...</p>}
      </div>
    </div>
  )
};

export default DisplayMovies;