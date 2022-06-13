import React, { useState, useEffect } from 'react';
import API from '../Services/API';
import { useParams } from 'react-router-dom';


const MovieDetails = () => {
  let { id } = useParams();
  const [movie, setMovie] = useState([]);
  const [topCast, setTopCast] = useState([]);
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    //get movie details from API based on the movie id passed via params
    API.getMovieDetails(id).then((res) => {
      if (res.data.message.toLowerCase() === "success") {
        setMovie(res.data.data);
        setGenres(res.data.data.genres);
        setTopCast(res.data.data.topCast);
      } else {
        console.log(res.data.message);
      }

    })
  }, []);

  //check if there is a hero image, if not assign to default
  const checkImg = (id) => {
    try {
      return (<img className='center-fit' src={require(`../Assets/movieHeroImages/${id}.jpeg`)}></img>);
    } catch (err) {
      return (<img className='cetner-fit' src={require(`../Assets/movieHeroImages/defaultImage.jpeg`)}></img>);
    }
  };

  return (
    <div className='movie-details-page'>
      <div className='search-bar'>
        <a className='search-label' href={`/`}>Back To Movie List</a>
      </div>
      <h1 className='one-movie-title'>{movie.title} ({movie.releaseYear})</h1>
      <div className='genre-container'>
        {genres?.map((genre, idx) => (
          <h3 key={idx}>{genre}</h3>
        ))}
      </div>
      <div className='imgbox'>
        {checkImg(id)}
      </div>
      <br></br>
      <div className='movie-description'>
        <p>{movie.description}</p>
      </div>
      <br></br>
      <div className='actors-genres'>
        <ul className='topCast-list'>
          {topCast?.map((actor, idx) => (
            <li key={idx}>{actor.name} as {actor.characterName}</li>
          ))}
        </ul>
      </div>

    </div>
  )
}

export default MovieDetails;