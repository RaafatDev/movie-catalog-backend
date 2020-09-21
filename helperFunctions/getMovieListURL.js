const { getGenreID } = require("./getGenreID");

const getMovieListURL = (keyword, { searchTerm = "", genre = "" } = {}) => {
  //
  let url;

  if (keyword === "MOVIE_POPULAR") {
    url = `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=1`;
    //
  } else if (keyword === "TV_POPULAR") {
    url = `https://api.themoviedb.org/3/tv/popular?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=1&append_to_response=external_ids`;
    //
  } else if (keyword === "SEARCH") {
    url = `https://api.themoviedb.org/3/search/multi?api_key=${process.env.TMDB_API_KEY}&language=en-US&query=${searchTerm}&page=1&include_adult=false`;
    //
  } else if (keyword === "LIST_BASED_ON_GENRE") {
    //
    const genre_id = getGenreID(genre);
    url = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${genre_id}`;
    //
  } else {
    console.log("the given KEYWORD is not Correct!");
  }

  return url;
};

module.exports = {
  getMovieListURL,
};
