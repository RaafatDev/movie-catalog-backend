const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLSchema,
  GraphQLID,
  GraphQLBoolean,
} = require("graphql");

const { MovieListType } = require("./types/movieListType");
const { OMDB_MovieDetailType } = require("./types/omdbMovieDetailType");
const { MovieDetailType } = require("./types/movieDetailType");

const { getMovieList } = require("./resolvers/getMovieList");
const { getMovieDetailArr } = require("./resolvers/getMovieDetailArr");
const { getMovieDetail } = require("./resolvers/getMovieDetail");

// Root Query : it is kind of endpoints that have resolvers that
// will resolve our data
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    movieList: {
      type: new GraphQLList(MovieListType),
      resolve: async () => getMovieList("MOVIE_POPULAR"),
    },
    TVShowList: {
      type: new GraphQLList(MovieListType),
      resolve: async () => getMovieList("TV_POPULAR"),
    },
    searchMovieList: {
      type: new GraphQLList(MovieListType),
      args: { searchTerm: { type: GraphQLString } },
      resolve: async (parent, args) => getMovieList("SEARCH", args.searchTerm),
    },
    omdbMovieDetails: {
      type: new GraphQLList(OMDB_MovieDetailType),
      args: {
        // ids: ["tt11576124", "tt7550000"]
        ids: { type: new GraphQLList(GraphQLString) },
      },
      resolve: async (parent, args) => getMovieDetailArr(args.ids),
    },
    movieDetail: {
      type: MovieDetailType,
      args: {
        id: { type: GraphQLID },
        isMovie: { type: GraphQLBoolean },
      },
      resolve: async (parent, args) => getMovieDetail(args.id, args.isMovie),
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
