import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
} from "graphql";

import UserType from "./type";
import UserController from "../../controllers/userController";

const userCtl = new UserController();

const userMutations = {
  signUp: {
    type: UserType,
    args: {
      fname: { type: new GraphQLNonNull(GraphQLString) },
      lname: { type: new GraphQLNonNull(GraphQLString) },
      email: { type: new GraphQLNonNull(GraphQLString) },
      phone: { type: new GraphQLNonNull(GraphQLString) },
      password: { type: new GraphQLNonNull(GraphQLString) },
    },
    async resolve(parent: any, args: any) {
      return await userCtl.signUp(args);
    },
  },
  login: {
    type: UserType,
    args: {
      phone: { type: new GraphQLNonNull(GraphQLString) },
      password: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve(parent: any, args: any) {
      return userCtl.login(args);
    },
  },
  updateUser: {
    type: UserType,
    args: {
      fname: { type: new GraphQLNonNull(GraphQLString) },
      lname: { type: new GraphQLNonNull(GraphQLString) },
      email: { type: new GraphQLNonNull(GraphQLString) },
      phone: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve(parent: any, args: any) {
      return userCtl.update(args);
    },
  },
  updatePassword: {
    type: UserType,
    args: {
      old_password: { type: new GraphQLNonNull(GraphQLString) },
      new_password: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve(parent: any, args: any) {
      return userCtl.updatePassword(args);
    },
  },
  forgotPassword: {
    type: UserType,
    args: {
      email: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve(parent: any, args: any) {
      return userCtl.forgotPassword(args);
    },
  },
  resetPassword: {
    type: UserType,
    args: {
      password: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve(parent: any, args: any) {
      return userCtl.resetPassword(args);
    },
  },
};

export default userMutations;
