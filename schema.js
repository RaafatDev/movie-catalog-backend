const basePosterUrl = `https://image.tmdb.org/t/p/`;
const baseActorFaceUrl = `https://image.tmdb.org/t/p/w66_and_h66_face/`;
const youtubeBseUrl = `https://www.youtube.com/watch?v=`;
// let popular_url = `https://api.themoviedb.org/3/movie/popular?api_key=${dbKey}&language=en-US&page=1`;

// const { combineFetch } = require("./resolvers/getMovieDetail");
// this is the place where all owr GraphQL stuff
// is going to go
const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList,
  GraphQLSchema,
  GraphQLID,
} = require("graphql");

// import axios
const axios = require("axios");
const { getMovieDetail } = require("./resolvers/getMovieDetail");
const { getMoviesArray } = require("./resolvers/getMoviesArray");
const { getMovieDetailArr } = require("./resolvers/getMovieDetailArr");

const DataLoader = require("dataloader");

const movieLoader = new DataLoader((keys) => getMovieDetail(keys));
// const userLoader = new DataLoader(keys => myBatchGetUsers(keys))

// we are going to have two types (object types) >> launches and rockets

// Movie List Type
const MoviesListType = new GraphQLObjectType({
  name: "MoviesList",
  fields: () => ({
    title: { type: GraphQLString },
    release_date: { type: GraphQLString },
    id: { type: GraphQLID },
    poster_path: { type: GraphQLString },
    backdrop_path: { type: GraphQLString },
    overview: { type: GraphQLString },
    genre_ids: { type: GraphQLList(GraphQLID) },
    // : {type: GraphQLString},
    // message: { type: GraphQLString },
    extraDetails: {
      type: MovieDetailType,
      // resolve: (parent, args) => getMovieDetail(parent.id),
      resolve: (parent, args) => movieLoader.loadMany(parent.id),
    },
  }),
});

const VideosType = new GraphQLObjectType({
  name: "videosType",
  fields: () => ({
    name: { type: GraphQLString },
    type: { type: GraphQLString },
    key: { type: GraphQLString },
  }),
});

const CastType = new GraphQLObjectType({
  name: "castType",
  fields: () => ({
    name: { type: GraphQLString },
    character: { type: GraphQLString },
    profile_path: { type: GraphQLString },
  }),
});

// const TMDB_MovieDetails = new GraphQLObjectType({

// })

// Movie Details from Two APIs
const MovieDetailType = new GraphQLObjectType({
  name: "MovieDetail",
  fields: () => ({
    id: { type: GraphQLID },
    imdb_id: { type: GraphQLString },
    title: { type: GraphQLString },
    number_of_episodes: { type: GraphQLInt },
    number_of_seasons: { type: GraphQLInt },
    release_date: { type: GraphQLString },
    poster_path: { type: GraphQLString },
    backdrop_path: { type: GraphQLString },
    overview: { type: GraphQLString },
    credits: {
      type: new GraphQLList(CastType),
      // resolve: () => [{ name: "hi" }],
      resolve: (parent, arg) =>
        parent.credits.map((c) => ({
          ...c,
          profile_path: `${basePosterUrl}w185${c.profile_path}`,
        })),
    },

    // images: {
    //   backdrops: [ [Object], [Object], [Object], [Object], [Object], [Object] ],
    //   posters: [
    //     [Object], [Object],
    //     [Object], [Object],
    //     [Object], [Object],
    //     [Object]
    //   ]
    // },
    budget: { type: GraphQLInt },
    videos: {
      type: new GraphQLList(VideosType),
      resolve: (parent, args) =>
        parent.videos.map((v) => ({
          ...v,
          key: `${youtubeBseUrl}${v.key}`,
        })),
    },

    OMDB_MovieDetail: { type: OMDBMovieDetailType },

    //
    // id: { type: GraphQLID },
  }),
});

// const combineFetch = async (id) => {
// const combineFetch = (id) => {
//   console.log("the idddddddddddd: ", id);
//   return { id: id };
// };

const RatingsType = new GraphQLObjectType({
  name: "ratings",
  fields: () => ({
    Source: { type: GraphQLString },
    Value: { type: GraphQLString },
  }),
});

const OMDBMovieDetailType = new GraphQLObjectType({
  name: "omdbMovieDetail",
  fields: () => ({
    Title: { type: GraphQLString },
    Year: { type: GraphQLString },
    Ratings: { type: new GraphQLList(RatingsType) },
    Runtime: { type: GraphQLString },
    Plot: { type: GraphQLString },
    Country: { type: GraphQLString },
    Language: { type: GraphQLString },
    Genre: { type: GraphQLString },
    Actors: { type: GraphQLString },
    Director: { type: GraphQLString },
    Writer: { type: GraphQLString },
    Awards: { type: GraphQLString },
  }),
});

// axios.get(popular_url).then((data) => console.log(data.data.results));
// Root Query : it is kind of endpoints that have resolvers that
// will resolve our data
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    moviesList: {
      type: new GraphQLList(MoviesListType),
      // resolve: async () => sortArray(),
      // resolve: async () => getMoviesArray(),
      resolve: async () => getMoviesArray(),
      // resolve: async () =>,
      // axios.get(popular_url).then((data) => data.data.results),
    },
    omdbMovieDetails: {
      type: new GraphQLList(OMDBMovieDetailType),
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
        // id: { type: new GraphQLList(GraphQLID) },
      },
      // resolve(parent, args) {
      // args: {type: GraphQLID},
      resolve: async (parent, args) => getMovieDetail(args.id),
      // resolve: async (parent, args) => args.id.map((a) => getMovieDetail(a)),
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
