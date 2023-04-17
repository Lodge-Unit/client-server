import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLScalarType,
  GraphQLInputObjectType,
  GraphQLID,
} from "graphql";

export const ResponseType: GraphQLObjectType = new GraphQLObjectType({
  name: "ResponseType",
  fields: () => ({
    token: { type: GraphQLString },
    message: { type: GraphQLString },
    status: { type: GraphQLString },
    key: { type: GraphQLString },
    reservationID: { type: GraphQLID }
  }),
});

export const DateScalarType = new GraphQLScalarType({
  name: "Date",
  parseValue(value: any) {
    return new Date(value);
  },
  serialize(value: any) {
    return value.toISOString();
  },
});
