import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../Services/API';

const DisplayMovies = () => {
  //declare states


  useEffect(() => {
    //API call here
    API.getMovieList().then(res => {
      console.log("received");
    });
  });

  //update movie list function

  //handle searchChange

  //handle filterSelect

  return (
    <div>test

    </div>
  )
};

export default DisplayMovies;