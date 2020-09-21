const axios = require("axios");
const basePosterUrl = `https://image.tmdb.org/t/p/`;
const { getMovieListURL } = require("../helperFunctions/getMovieListURL");

// const getMovieList = async (keyword, searchTerm = "") => {
const getMovieList = async (keyword, { searchTerm = "", genre = "" } = {}) => {
  //
  const url = getMovieListURL(keyword, { searchTerm, genre });

  console.log(
    "the getMovieList() is called: the keyword ",
    keyword,
    "the serchTerm is: ",
    searchTerm
  );

  if (keyword === "SEARCH" && searchTerm === "") return;

  let movieArr = [];
  const data = await axios.get(url);

  for await (movie of data.data.results) {
    // if a the media_type === "person" => that means the object has an array of movies under the known_for element!
    if (movie.media_type && movie.media_type === "person") {
      for await (movieOfPerson of movie.known_for) {
        const sortedMovieOfPerson = getMovieSorted(movieOfPerson);
        movieArr.push(sortedMovieOfPerson);
      }
    } else {
      const sortedMovie = getMovieSorted(movie);
      movieArr.push(sortedMovie);
    }
  }
  return movieArr;
};

module.exports = {
  getMovieList,
};

const getMovieSorted = (movie) => {
  return {
    isMovie: movie.title ? true : false,
    title: movie.title ? movie.title : movie.name,
    release_date: movie.release_date
      ? movie.release_date
      : movie.first_air_date,
    id: movie.id,
    poster_path: movie.poster_path
      ? // ? `${basePosterUrl}w1280${movie.poster_path}`
        `${basePosterUrl}w780${movie.poster_path}`
      : "no_image",
    backdrop_path: movie.backdrop_path
      ? // ? `${basePosterUrl}w1280${movie.backdrop_path}`
        `${basePosterUrl}w780${movie.backdrop_path}`
      : "no_image",
    overview: movie.overview,
    genre_ids: movie.genre_ids,
  };
};
