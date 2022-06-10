import axios from 'axios';
import React from 'react';


const baseURL = "https://code-challenge.spectrumtoolbox.com/api/movies";
const headers = { Authorization: { 'Api-Key': 'q3MNxtfep8Gt' }, };
const config = ({
  headers: {
    Authorization: 'Api-Key q3MNxtfep8Gt',
  },
});

const API = {
  getMovieList: () => {
    return axios.get(`${baseURL}`, config);
  },

  getMovieDetails: (id) => {
    return axios.get(`${baseURL}/${id}`, config);
  }
};


export default API;