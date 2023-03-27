import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLScalarType,
  GraphQLInputObjectType,
} from "graphql";

export const ResponseType: GraphQLObjectType = new GraphQLObjectType({
  name: "ResponseType",
  fields: () => ({
    token: { type: GraphQLString },
    message: { type: GraphQLString },
    status: { type: GraphQLString },
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
