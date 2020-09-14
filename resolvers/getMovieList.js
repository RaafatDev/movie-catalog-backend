const axios = require("axios");
// const getURL = require("../helperFunctions/getURL");
const basePosterUrl = `https://image.tmdb.org/t/p/`;

const getMovieList = async (keyword, searchTerm = "") => {
  console.log("paraaaa: ", keyword, searchTerm);
  // console.log("getMovieDetailARRRRR");
  let url;

  if (keyword === "MOVIE_POPULAR") {
    // let popular_url = `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=1`;
    url = `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=1`;
  }
  if (keyword === "TV_POPULAR") {
    // https://api.themoviedb.org/3/tv/{tv_id}?api_key=<<api_key>>&language=en-US
    url = `https://api.themoviedb.org/3/tv/popular?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=1&append_to_response=external_ids`;
  }
  if (keyword === "SEARCH") {
    url = `https://api.themoviedb.org/3/search/multi?api_key=${process.env.TMDB_API_KEY}&language=en-US&query=${searchTerm}&page=1&include_adult=false`;
  } else {
    console.log("the given KEYWORD is not Correct!");
  }

  let arr = await axios.get(url).then((data) => {
    // console.log(data.data.results);
    return (movie = data.data.results.map((movie) => {
      return {
        isMovie: movie.title ? true : false,
        title: movie.title ? movie.title : movie.name,
        release_date: movie.release_date
          ? movie.release_date
          : movie.first_air_date,
        id: movie.id,
        poster_path: movie.poster_path
          ? // ? `${basePosterUrl}w1280${movie.poster_path}`
            `${basePosterUrl}w300${movie.poster_path}`
          : `${process.env.PUBLIC_URL}/img/no_image.png`,
        backdrop_path: movie.backdrop_path
          ? // ? `${basePosterUrl}w1280${movie.backdrop_path}`
            `${basePosterUrl}w780${movie.backdrop_path}`
          : `${process.env.PUBLIC_URL}/img/no_image.png`, // todo : give a valid url for image incase there is no img_ url
        overview: movie.overview,
        genre_ids: movie.genre_ids,
      };
    }));
  });

  // console.log(arr);
  return arr;
};

module.exports = {
  getMovieList,
};
