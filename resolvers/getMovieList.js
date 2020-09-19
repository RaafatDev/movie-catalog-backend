const axios = require("axios");
// const getURL = require("../helperFunctions/getURL");
const basePosterUrl = `https://image.tmdb.org/t/p/`;

const getMovieList = async (keyword, searchTerm = "") => {
  // console.log("paraaaa: ", keyword, searchTerm);
  // console.log("getMovieDetailARRRRR");
  let url;

  if (keyword === "MOVIE_POPULAR") {
    // let popular_url = `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=1`;
    url = `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=1`;
  } else if (keyword === "TV_POPULAR") {
    // https://api.themoviedb.org/3/tv/{tv_id}?api_key=<<api_key>>&language=en-US
    url = `https://api.themoviedb.org/3/tv/popular?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=1&append_to_response=external_ids`;
  } else if (keyword === "SEARCH") {
    url = `https://api.themoviedb.org/3/search/multi?api_key=${process.env.TMDB_API_KEY}&language=en-US&query=${searchTerm}&page=1&include_adult=false`;
    // url = `https://api.themoviedb.org/3/search/multi?api_key=${process.env.TMDB_API_KEY}&language=en-US&query=${searchTerm}&page=1&include_adult=false`
  } else {
    console.log("the given KEYWORD is not Correct!");
  }

  // console.log("the url: ", url);
  console.log(
    "the getMovieList() is called: the keyword ",
    keyword,
    "the serchTerm is: ",
    searchTerm
  );

  if (keyword === "SEARCH" && searchTerm === "") return;

  // console.log("the url from the server for search: ", url);
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
