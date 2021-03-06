const axios = require("axios");
const { getMovieURL } = require("../helperFunctions/getMovieURL");
const basePosterUrl = `https://image.tmdb.org/t/p/`; // w1280 // w300 // w780 //

const getMovieDetail = async (movie_id, isMovie) => {
  //

  let sorted = {};
  tmdb_url = getMovieURL("TMDB_MOVIE", { isMovie, movie_id });

  try {
    const tmdb_data = await axios(tmdb_url).then((data) => data.data);

    const tmdb_sorted = await getSortedTMDB(tmdb_data);

    const imdb_id = tmdb_data.external_ids.imdb_id;
    if (imdb_id) {
      omdb_url = getMovieURL("OMDB", { imdb_id });

      try {
        const omdb_data = await axios.get(omdb_url).then((data) => data.data);

        sorted = {
          TMDB_MovieDetail: { ...tmdb_sorted },
          OMDB_MovieDetail: { ...omdb_data },
        };
        //
      } catch (error) {
        console.log("error rr");
      }
    } else {
      sorted = {
        TMDB_MovieDetail: { ...tmdb_sorted },
      };
    }
  } catch (error) {
    console.log("error: ", error);
  }

  return sorted;
};

module.exports = {
  getMovieDetail,
};

const getSortedTMDB = (tmdb_data) => {
  return {
    imdb_id: tmdb_data.imdb_id,
    id: tmdb_data.id,
    title: tmdb_data.title ? tmdb_data.title : tmdb_data.name,
    number_of_episodes: tmdb_data.number_of_episodes,
    number_of_seasons: tmdb_data.number_of_seasons,
    release_date: tmdb_data.release_date
      ? tmdb_data.release_date
      : tmdb_data.first_air_date,
    poster_path: tmdb_data.poster_path
      ? `${basePosterUrl}w780${tmdb_data.poster_path}`
      : // : `${process.env.PUBLIC_URL}/img/no_image.png`,
        "no_image",
    backdrop_path: tmdb_data.backdrop_path
      ? `${basePosterUrl}w780${tmdb_data.backdrop_path}`
      : // : `${process.env.PUBLIC_URL}/img/no_image.png`,
        "no_image",
    overview: tmdb_data.overview,
    credits: tmdb_data.credits.cast,
    budget: tmdb_data.budget,
    videos: tmdb_data.videos.results,
    images: tmdb_data.images,
  };
};
