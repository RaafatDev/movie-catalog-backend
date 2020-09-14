// const { getMovieDetail } = require("./resolvers/getMovieDetail");
const { getMovieDetail } = require("../resolvers/getMovieDetail");

// the dataLoader ###########
// const DataLoader = require("dataloader");
// const movieLoader = new DataLoader((keys) => getMovieDetail(keys));
// ##########################

const { MovieDetailType } = require("./movieDetailType");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLID,
  GraphQLBoolean,
} = require("graphql");

// Movie List Type
const MovieListType = new GraphQLObjectType({
  name: "MovieList",
  fields: () => ({
    isMOvie: { type: GraphQLBoolean },
    title: { type: GraphQLString },
    release_date: { type: GraphQLString },
    id: { type: GraphQLID },
    poster_path: { type: GraphQLString },
    backdrop_path: { type: GraphQLString },
    overview: { type: GraphQLString },
    genre_ids: { type: GraphQLList(GraphQLID) },
    extraDetails: {
      type: MovieDetailType,
      resolve: (parent, args) => getMovieDetail(parent.id, parent.isMovie),
      // resolve: (parent, args) => movieLoader.loadMany(parent.id),
    },
  }),
});

module.exports = {
  MovieListType,
};
