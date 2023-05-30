'use strict';

import { select, print } from "./utils.js";
// 'info' doesnt need braces because it is from 'export default'
// Don't use this on your assignment
import cities from './cities.js';
import movies from './movies.js';
print(movies.movies);
print(cities.cities);

const movieUrl = './assets/script/movies.json';
const getMoviesImg = select('.row');

const listCities = select('nav');
const cityUrl = './assets/script/cities.json';

function listMovies(arr) {
    getMoviesImg.innerHTML = '';

    let movies = '';
  
    if (arr.length > 0) {
      arr.forEach(movie => {
        movies += `<img src="./assets/img/${movie.img}" alt="${movie.name}">`;
      });
    } else {
      movies += `<picture><h1>Movies not found<h1></picture>`;
    }
  
    getMoviesImg.innerHTML = movies;
  }
  
async function getMovies(){
    try{
        const response = await fetch(movieUrl);
        if(!response.ok){
            throw new Error (`${response.statusText} (${response.status})`)
        }

        const data = await response.json();
        print(data.movies);
        listMoviesRowOne(data.movies);
    }catch (error){
        print(error.message);
    }
}
listMovies(movies.movies);
getMovies();

