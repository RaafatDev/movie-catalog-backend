const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLID,
} = require("graphql");

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

const ImagesType = new GraphQLObjectType({
  name: "images",
  fields: () => ({
    backdrops: {
      type: new GraphQLList(
        new GraphQLObjectType({
          name: "backdrops",
          fields: { file_path: { type: GraphQLString } },
        })
      ),
    },
    posters: {
      type: new GraphQLList(
        new GraphQLObjectType({
          name: "posters",
          fields: { file_path: { type: GraphQLString } },
        })
      ),
    },
  }),
});

const TMDB_MovieDetailType = new GraphQLObjectType({
  name: "TMDB_MovieDetail",
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
    },

    images: { type: ImagesType },
    budget: { type: GraphQLInt },
    videos: {
      type: new GraphQLList(VideosType),
    },
  }),
});

module.exports = {
  TMDB_MovieDetailType,
};
