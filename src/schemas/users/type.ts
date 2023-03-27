import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull,
} from "graphql";
import { GraphQLUpload } from "graphql-upload-minimal";

import User from "../../models/user";
import { ResponseType, DateScalarType } from "../types";

const UserType: GraphQLObjectType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLID },
    profilePic: { type: GraphQLUpload },
    fname: { type: GraphQLString },
    lname: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
    status: { type: GraphQLString },
    password: { type: GraphQLString },
    response: { type: ResponseType },
    createdAt: { type: DateScalarType },
  }),
});

export default UserType;
