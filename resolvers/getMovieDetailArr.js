const axios = require("axios");
const { getMovieURL } = require("../helperFunctions/getMovieURL");

const getMovieDetailArr = async (imdb_id_arr) => {
  //
  let idArr = [];

  for (const imdb_id of imdb_id_arr) {
    //
    const omdb_url = getMovieURL("OMDB", { imdb_id });

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
