const axios = require("axios");
const getURL = require("../helperFunctions/getURL");
const basePosterUrl = `https://image.tmdb.org/t/p/`;
const baseActorFaceUrl = `https://image.tmdb.org/t/p/w66_and_h66_face/`;
const youtubeBseUrl = `https://www.youtube.com/watch?v=`;

const getMoviesArray = async (isMovie = true) => {
  console.log("getMovieDetailARRRRR");

  // let arr = [];
  // let movie;
  // return
  // let arr = await axios.get(popular_url).then((data) => data.data.results);

  let popular_url = `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=1`;

  let arr = await axios.get(popular_url).then((data) => {
    // console.log(data.data.results);
    return (movie = data.data.results.map((movie) => {
      return {
        isMovie: movie.title ? true : false,
        title: movie.title ? movie.title : movie.name,
        release_date: movie.release_date
          ? movie.release_date
          : movie.first_air_date,
        // imdbID: movie.id,
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
        // Genres: movie_genre,
      };
    }));
  });

  // console.log(arr);
  return arr;
};

module.exports = {
  getMoviesArray,
};
