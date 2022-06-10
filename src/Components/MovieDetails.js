import React, { useState, useEffect } from 'react';
import API from '../Services/API';
import { useParams } from 'react-router-dom';


const MovieDetails = () =>{
  let { id } = useParams();
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    API.getMovieDetails(id).then((res) =>{
      if(res.data.message.toLowerCase() === "success") {
        setMovie(res.data.data);
      } else {
        console.log(res.data.message);
      }
      
    })
  }, []);

  const checkImg = (id) => {
    try {
      return (<img src={require(`../Assets/movieHeroImages/${id}.jpeg`)}></img>);
    } catch (err) {
      return (<img src={require(`../Assets/movieHeroImages/defaultImage.jpeg`)}></img>);
    }
  };
  
  return(
    <div>
     
      <a>{movie.title}:</a>
      {checkImg(id)}
      <br></br>
      <a>description: {movie.description}</a>
    </div>
  )
}

export default MovieDetails;