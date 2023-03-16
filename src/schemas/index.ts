import { GraphQLObjectType, GraphQLSchema } from "graphql";
import userQueries from "./users/queries";
import userMutations from "./users/mutations";
import reservationQueries from "./reservations/queries";
import reservationMutations from "./reservations/mutations";

const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    ...userQueries,
    ...reservationQueries,
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    ...userMutations,
    ...reservationMutations,
  },
});

export default new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
