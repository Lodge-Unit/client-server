import { GraphQLObjectType, GraphQLSchema } from "graphql";
import userQueries from "./users/queries";
import userMutations from "./users/mutations";

const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    ...userQueries,
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    ...userMutations,
  },
});

export default new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
