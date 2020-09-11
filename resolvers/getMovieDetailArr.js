const axios = require("axios");
const { getURL } = require("../helperFunctions/getURL");
// const axios = require("axios");
const basePosterUrl = `https://image.tmdb.org/t/p/`;
const baseActorFaceUrl = `https://image.tmdb.org/t/p/w66_and_h66_face/`;
const youtubeBseUrl = `https://www.youtube.com/watch?v=`;
// let popular_url = `https://api.themoviedb.org/3/movie/popular?api_key=${dbKey}&language=en-US&page=1`;

const getMovieDetailArr = async (movie_id) => {
  //

  // console.log("the arguments from parent!!!", movie_id);
  let idArr = [];

  for (const id of movie_id) {
    //
    const omdb_url = getURL("OMDB", id);

    let res = await axios.get(omdb_url);

    const infos = {
      Title: res.data.Title,
      Year: res.data.Year,
      Ratings: res.data.Ratings,
      Runtime: res.data.Runtime,
      Plot: res.data.Plot,
      Country: res.data.Country,
      Language: res.data.Language,
      Genre: res.data.Genre,
      Actors: res.data.Actors,
      Director: res.data.Director,
      Writer: res.data.Writer,
      Awards: res.data.Awards,
    };

    idArr = [...idArr, { ...infos }];
  }

  return idArr;
};

module.exports = {
  getMovieDetailArr,
};
