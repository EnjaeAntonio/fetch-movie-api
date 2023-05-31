'use strict';

import { select, print, onEvent, create } from "./utils.js";
import cities from './cities.js';
import movies from './movies.js';
print(movies.movies);
print(cities.cities);

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
                      <img src="./assets/img/${movie.img}" alt="${movie.name}">
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
    movieList.innerHTML = `<li class="list-movies drop-down-bars">Movie not found</li>`;
    movieList.classList.remove("hidden");
} else {
    movieList.classList.remove("hidden");
}
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

function getLocation(position){
    const { longitude, latitude } = position.coords;
};



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
      list.innerHTML = `<li class="drop-down-bars">Cities not found</li>`;
      list.classList.remove("hidden");
  } else {
      list.classList.remove("hidden");
  }
}

async function getCities(){
  try{
      const response = await fetch(url);

      if(!response.ok){
          throw new Error (`${response.statusText} (${response.status})`)
      }

      const data = await response.json();
      print(data.cities);
      listCities(data.cities);
  }catch (error){
      print(error.message);
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
getMovies();
getCities();

