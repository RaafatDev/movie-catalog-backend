//

// const getMovieURL = (kind, movieId, isMovie) => {
const getMovieURL = (
  kind,
  { isMovie = "movie", movie_id = 0, imdb_id = 0 } = {}
) => {
  //

  const type = isMovie ? "movie" : "tv";

  let url;
  // 
  if (kind === "TMDB_MOVIE") {
    // url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.TMDB_API_KEY}&append_to_response=videos,images,credits,external_ids&include_image_language=en,null`;
    url = `https://api.themoviedb.org/3/${type}/${movie_id}?api_key=${process.env.TMDB_API_KEY}&append_to_response=videos,images,credits,external_ids&include_image_language=en,null`;
  } else if (kind === "TMDB_TV_SHOW") {
    url = `https://api.themoviedb.org/3/${type}/${movie_id}?api_key=${process.env.TMDB_API_KEY}&append_to_response=videos,images,credits,external_ids&include_image_language=en,null`;
  } else if (kind === "OMDB") {
    // url = `https://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&i=${movieId}&plot=full`;
    url = `https://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&i=${imdb_id}&plot=full`;
  } else {
    console.log("the parameters are not valid!");
  }
  //
  return url;
};

module.exports = {
  getMovieURL,
};
