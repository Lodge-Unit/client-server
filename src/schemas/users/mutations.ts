import { GraphQLString, GraphQLID, GraphQLNonNull } from "graphql";

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
    async resolve(parent: any, args: any) {
      return await userCtl.login(args);
    },
  },
  updateUser: {
    type: UserType,
    args: {
      id: { type: GraphQLID },
      fname: { type: new GraphQLNonNull(GraphQLString) },
      lname: { type: new GraphQLNonNull(GraphQLString) },
      email: { type: new GraphQLNonNull(GraphQLString) },
      phone: { type: new GraphQLNonNull(GraphQLString) },
    },
    async resolve(parent: any, args: any, context: any) {
      return await userCtl.update(args, context.headers?.authorization);
    },
  },
  updatePassword: {
    type: UserType,
    args: {
      old_password: { type: new GraphQLNonNull(GraphQLString) },
      new_password: { type: new GraphQLNonNull(GraphQLString) },
    },
    async resolve(parent: any, args: any, context: any) {
      return await userCtl.updatePassword(args, context.headers?.authorization);
    },
  },
  forgotPassword: {
    type: UserType,
    args: {
      email: { type: new GraphQLNonNull(GraphQLString) },
    },
    async resolve(parent: any, args: any) {
      return await userCtl.forgotPassword(args);
    },
  },
  resetPassword: {
    type: UserType,
    args: {
      token: { type: new GraphQLNonNull(GraphQLString) },
      password: { type: new GraphQLNonNull(GraphQLString) },
    },
    async resolve(parent: any, args: any) {
      return await userCtl.resetPassword(args);
    },
  },
};

export default userMutations;
