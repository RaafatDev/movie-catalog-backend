const axios = require("axios");
const { getURL } = require("../helperFunctions/getURL");
// const axios = require("axios");
const basePosterUrl = `https://image.tmdb.org/t/p/`;
const baseActorFaceUrl = `https://image.tmdb.org/t/p/w66_and_h66_face/`;
const youtubeBseUrl = `https://www.youtube.com/watch?v=`;
// let popular_url = `https://api.themoviedb.org/3/movie/popular?api_key=${dbKey}&language=en-US&page=1`;

const getMovieDetail = async (movie_id) => {
  // console.log("the movie IDDDDDD: ", movie_id);
  //
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

        combined = { ...tmdb_data, ...omdb_data };

        sorted = sortObj(combined);
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

const sortObj = (combined) => {
  return {
    // imdb_id:combined.imdb_id,
    imdb_id: combined.imdb_id,
    id: combined.id,

    //
    title: combined.title ? combined.title : combined.name,
    number_of_episodes: combined.number_of_episodes,
    number_of_seasons: combined.number_of_seasons,

    release_date: combined.release_date
      ? combined.release_date
      : combined.first_air_date,
    // id: JSON.stringify(movie.id),
    poster_path: combined.poster_path
      ? // ? `${basePosterUrl}w1280${movie.poster_path}`
        // `${basePosterUrl}w300${combined.poster_path}`
        `${basePosterUrl}w780${combined.poster_path}`
      : `${process.env.PUBLIC_URL}/img/no_image.png`,
    backdrop_path: combined.backdrop_path
      ? // ? `${basePosterUrl}w1280${movie.backdrop_path}`
        `${basePosterUrl}w780${combined.backdrop_path}`
      : `${process.env.PUBLIC_URL}/img/no_image.png`,
    overview: combined.overview,
    // credits: { cast: any[] };
    credits: combined.credits.cast,
    // credits: combined.credits,
    budget: combined.budget,
    // videos: { results: any[] };
    // videos: combined.videos.results,
    videos: combined.videos.results,
    // images: { backdrops: any[]; posters: any[] };
    images: combined.images,
    //
    Genre: combined.Genre,
    Director: combined.Director,
    Writer: combined.Writer,
    Actors: combined.Actors,
    Country: combined.Country,
    Awards: combined.Awards,
    // Ratings: { Source: string; Value: string }[];
    Ratings: combined.Ratings,
    Production: combined.Production,
    Runtime: combined.Runtime,
  };

  // return sorted;
};
