const axios = require("axios");
const { getURL } = require("../helperFunctions/getURL");
// const axios = require("axios");
const basePosterUrl = `https://image.tmdb.org/t/p/`;
const baseActorFaceUrl = `https://image.tmdb.org/t/p/w66_and_h66_face/`;
const youtubeBseUrl = `https://www.youtube.com/watch?v=`;
// let popular_url = `https://api.themoviedb.org/3/movie/popular?api_key=${dbKey}&language=en-US&page=1`;

const getMovieDetail = async (movie_id) => {
  //
  console.log("getOnnnne Movie Detail");

  let combined = {};
  let sorted = {};
  tmdb_url = getURL("TMDB_MOVIE", movie_id);
  //   console.log("the TMDB URL: ", tmdb_url);

  try {
    // console.log("#################3");
    // console.log("#################3");
    const tmdb_data = await axios(tmdb_url).then((data) => data.data);

    // * !!!!!!!!!!!!!!!!!!!!!!
    // * !!!!!!!!!!!!!!!!!!!!!!
    // * !!!!!!!!!!!!!!!!!!!!!!
    // * !!!!!!!!!!!!!!!!!!!!!!
    // * !!!!!!!!!!!!!!!!!!!!!!
    // * !!!!!!!!!!!!!!!!!!!!!!
    // * !!!!!!!!!!!!!!!!!!!!!!
    // * !!!!!!!!!!!!!!!!!!!!!!

    const imdb_id = tmdb_data.external_ids.imdb_id;
    if (imdb_id) {
      omdb_url = getURL("OMDB", imdb_id);

      try {
        const omdb_data = await axios.get(omdb_url).then((data) => data.data);

        // combined = { ...tmdb_data, ...omdb_data };
        // console.log("the OOOOOMMMMDDDDDBBBB data : ", omdb_data);

        sorted = sortObj(tmdb_data, omdb_data);
        // console.log("in second try", combined);
        // console.log("in second try", sorted);
        // sortObj(combined);
        // console.log("in second try22222");
        // console.log("in second try22222");
        // console.log(tmdb_url);
      } catch (error) {
        console.log("error rr");
      }
    }
  } catch (error) {
    // setError(error);
    console.log("error: ", error);
  }
  //   setIsLoading(false);
  // };
  //* !!!!!!!!!!!!!!!!!!!!!!!!!!
  //* !!!!!!!!!!!!!!!!!!!!!!!!!!

  //   return { id: movie_id };
  return sorted;
};

module.exports = {
  getMovieDetail,
};

const sortObj = (tmdb_data, omdb_data) => {
  return {
    // imdb_id:combined.imdb_id,
    imdb_id: tmdb_data.imdb_id,
    id: tmdb_data.id,

    //
    title: tmdb_data.title ? tmdb_data.title : tmdb_data.name,
    number_of_episodes: tmdb_data.number_of_episodes,
    number_of_seasons: tmdb_data.number_of_seasons,

    release_date: tmdb_data.release_date
      ? tmdb_data.release_date
      : tmdb_data.first_air_date,
    // id: JSON.stringify(movie.id),
    poster_path: tmdb_data.poster_path
      ? // ? `${basePosterUrl}w1280${movie.poster_path}`
        // `${basePosterUrl}w300${combined.poster_path}`
        `${basePosterUrl}w780${tmdb_data.poster_path}`
      : `${process.env.PUBLIC_URL}/img/no_image.png`,
    backdrop_path: tmdb_data.backdrop_path
      ? // ? `${basePosterUrl}w1280${movie.backdrop_path}`
        `${basePosterUrl}w780${tmdb_data.backdrop_path}`
      : `${process.env.PUBLIC_URL}/img/no_image.png`,
    overview: tmdb_data.overview,
    // credits: { cast: any[] };
    credits: tmdb_data.credits.cast,
    // credits: combined.credits,
    budget: tmdb_data.budget,
    // videos: { results: any[] };
    // videos: combined.videos.results,
    videos: tmdb_data.videos.results,
    // images: { backdrops: any[]; posters: any[] };
    images: tmdb_data.images,
    //
    // Ratings: { Source: string; Value: string }[];
    // Genre: combined.Genre,
    // Director: combined.Director,
    // Writer: combined.Writer,
    // Actors: combined.Actors,
    // Country: combined.Country,
    // Awards: combined.Awards,
    // Ratings: combined.Ratings,
    // imdbRating: combined.imdbRating,
    // Production: combined.Production,
    // Runtime: combined.Runtime,
    // AnotherMovie: omdb_data,
    OMDB_MovieDetail: omdb_data,
  };

  // return sorted;
};
