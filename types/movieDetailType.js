const { GraphQLObjectType } = require("graphql");
const { TMDB_MovieDetailType } = require("./tmdbMovieDetailType");
const { OMDB_MovieDetailType } = require("./omdbMovieDetailType");

// Movie Details from Two APIs
const MovieDetailType = new GraphQLObjectType({
  name: "MovieDetail",
  fields: () => ({
    TMDB_MovieDetail: { type: TMDB_MovieDetailType },
    OMDB_MovieDetail: { type: OMDB_MovieDetailType },
  }),
});

module.exports = { MovieDetailType };
