//

const getURL = (kind, movieId) => {
  //
  let url;
  // console.log("hereeeeeeeeee");
  if (kind === "TMDB_MOVIE") {
    url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.TMDB_API_KEY}&append_to_response=videos,images,credits,external_ids&include_image_language=en,null`;
  } else if (kind === "TMDB_TV_SHOW") {
    url = `https://api.themoviedb.org/3/tv/${movieId}?api_key=${process.env.TMDB_API_KEY}&append_to_response=videos,images,credits,external_ids&include_image_language=en,null`;
  } else if (kind === "OMDB") {
    // the movieId here in OMDB case is the imdb_id !
    url = `https://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&i=${movieId}&plot=full`;
  } else {
    console.log("the parameters are not valid!");
  }
  // if ((api_db = "tmdb")) {
  //   url =
  //     kind === "film"
  //       ?
  //       :
  // } else if ((api_db = "omdb")) {
  //   // url = `https://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&i=${imdb_id}&plot=full`
  //   url =
  // }
  return url;
};
// append_to_response=videos,images,credits,external_ids

module.exports = {
  getURL,
};
