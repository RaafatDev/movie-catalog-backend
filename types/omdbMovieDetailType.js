const { GraphQLObjectType, GraphQLString, GraphQLList } = require("graphql");

const RatingsType = new GraphQLObjectType({
  name: "ratings",
  fields: () => ({
    Source: { type: GraphQLString },
    Value: { type: GraphQLString },
  }),
});

const OMDB_MovieDetailType = new GraphQLObjectType({
  name: "OMDB_MovieDetail",
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
    Production: { type: GraphQLString },
    imdbRating: { type: GraphQLString },
  }),
});

module.exports = { OMDB_MovieDetailType };
