import React, { useState, useEffect } from 'react';
import API from '../Services/API';

const DisplayMovies = () => {
  //declare states
  const [filteredMovieList, setFilteredMovieList] = useState([]);
  const [fullMovieList, setFullMovieList] = useState([]);
  const [genreList, setGenreList] = useState([]);
  const [genreFilter, setGenreFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [bgImg, setBgImg] = useState("");

  useEffect(() => {
    //call API to get the movie data
    API.getMovieList().then((res) => {
      //check if call was successful
      if (res.data.message.toLowerCase() === "success") {
        //initially set the movie lists to the full data
        setFilteredMovieList(res.data.data);
        setFullMovieList(res.data.data);
        //add the All option to the array of Genres that is being built
        let genreArr = ["All"];
        //I'm sure there's a better way to do this. perhaps a forEach function...
        for (let i = 0; i < res.data.data.length; i++) {
          genreArr.push(res.data.data[i].genres); 
        };
        genreArr = genreArr.flat(); //flatten nested array
        setGenreList([...new Set(genreArr)]); //remove duplicate listins of Genres
      } else {
        console.log(res.data.message);
      };
    });
  }, []);

  //check if there is a valid image file for the movie ID, if not assign the default image
  const checkImg = (id) => {
    try {
      return (<img src={require(`../Assets/moviePosterImages/${id}.jpeg`)}></img>);
    } catch (err) {
      return (<img src={require(`../Assets/moviePosterImages/defaultImage.jpeg`)}></img>);
    }
  };

  //when there is a change in the genre filter, set the state and run filter
  const handleGenreChange = (e) => {
    e.preventDefault();
    setFilteredMovieList(fullMovieList);

    setGenreFilter(e.target.value);
    filterMovies(e.target.value, search);
  }

  //when something is typed, set the state and fun filter
  const handleSearch = (e) => {
    e.preventDefault();
    setFilteredMovieList(fullMovieList);
    var lowerCase = (e.target.value.toLowerCase());

    setSearch(lowerCase);
    filterMovies(genreFilter, lowerCase);
  };

  //given the genre and search text filters, return a filtered list of movies
  const filterMovies = (genre, searchText) => {
    //start with the full movie list, assign it incase the change that happend
    //is that the filters were removed
    setFilteredMovieList(fullMovieList);

    if (genre !== "All" && searchText === "") { //run through genre filter
      let resultGenre = [];
      resultGenre = fullMovieList.filter((data) => {
        return data.genres.toString().search(genre) !== -1;
      });
      setFilteredMovieList(resultGenre); 
    } else if (genre === "All" && searchText !== "") { //run through search filter
      let resultOfText = [];
      resultOfText = fullMovieList.filter((data) => {
        return data.title.toLowerCase().search(searchText) !== -1;
      });
      setFilteredMovieList(resultOfText); //run through both filters
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
    <div className='movie-list-page' >
      <div className='search-bar'>
        <label className='search-label' name="search">Search  </label>
        <input label="search" onChange={handleSearch}></input>
        <select className='dropdown' onChange={handleGenreChange}>
          {genreList.length > 1 ? genreList?.map((genre, idx) => (
            <option className='dropdown-item' key={idx}>{genre}</option>
          )) : <option >Loading Genres...</option>}
        </select>
      </div>
      <div className='movies'>
        {filteredMovieList.length > 0 ? filteredMovieList?.map((movie) => (
          <div key={movie.id} className="one_movie">    
            <a onMouseOver={() => setBgImg(`moviePosterImages/${movie.id}.jpeg`)} 
            href={`/movie-details/${movie.id}`}>
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