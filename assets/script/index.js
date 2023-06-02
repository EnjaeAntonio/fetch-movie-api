'use strict';

import { select, onEvent, create } from "./utils.js";
import cities from './cities.js';
import movies from './movies.js';

const movieUrl = './assets/script/movies.json';
const getMoviesImg = select('.row');
const searchCity = select('#search-city');
const searchMovie = select('#search-movie');
const movieList = select('.movies');
const list = select('.cities');
const url = './assets/script/cities.json';

function getMovieImages(arr) {
    getMoviesImg.innerHTML = '';
    let movies = '';

    if (arr.length > 0) {
      arr.forEach(movie => {
        movies += `<div class="movie-item">
                      <img src="${movie.img}" alt="${movie.name}">
                      <p>${movie.name}</p>
                   </div>`;
      });
    } else {
      movies += `<picture><h1>Movies not found<h1></picture>`;
    }
    getMoviesImg.innerHTML = movies;
  }

function listMovies(arr) {
    movieList.innerHTML = '';
    if (searchMovie.value.trim() === '') {
        movieList.classList.add("hidden");
        return;
}

arr.forEach(movie => {
    if(movie.name.toLowerCase().includes(searchMovie.value.toLowerCase())) {
        const movieListItem = create('li');
        movieListItem.textContent = movie.name;
        movieListItem.classList.add("drop-down-bars");
        onEvent('click', movieListItem, () => {
            searchMovie.value = movie.name;
            movieList.classList.add('hidden');
        });
        movieList.appendChild(movieListItem);
    }
});

if(movieList.children.length === 0) {
    movieList.innerHTML = `<li class="disable-dropdown">Movie not found</li>`;
    movieList.classList.remove("hidden");
} else {
    movieList.classList.remove("hidden");
}
}

function listCities(arr){
  list.innerHTML = '';
  
  if (searchCity.value.trim() === '') {
      list.classList.add("hidden");
      return;
  }

  arr.forEach(city => {
      if(city.name.toLowerCase().includes(searchCity.value.toLowerCase())){
          const cityListItem = create('li');
          cityListItem.textContent = city.name;
          cityListItem.classList.add("drop-down-bars");
          onEvent('click', cityListItem, () => {
              searchCity.value = city.name;
              list.classList.add('hidden');
          });
          list.appendChild(cityListItem);
      }
  });

  if(list.children.length === 0) {
      list.innerHTML = `<li class="disable-dropdown">Cities not found</li>`;
      list.classList.remove("hidden");
  } else {
      list.classList.remove("hidden");
  }
}

searchMovie.addEventListener("input", function() {
  listMovies(movies.movies);
});

searchCity.addEventListener("input", function() {
  listCities(cities.cities);
});

listMovies(movies.movies);
getMovieImages(movies.movies);
listCities(cities.cities);
