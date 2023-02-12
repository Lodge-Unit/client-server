import { GraphQLString, GraphQLID, GraphQLNonNull } from "graphql";

import UserType from "./type";
import HotelUserController from "../../controllers/hotelUserController";

const hotelUserctl = new HotelUserController();

const userMutations = {
  signUp: {
    type: UserType,
    args: {
      fname: { type: new GraphQLNonNull(GraphQLString) },
      lname: { type: new GraphQLNonNull(GraphQLString) },
      email: { type: new GraphQLNonNull(GraphQLString) },
      phone: { type: new GraphQLNonNull(GraphQLString) },
      role: { type: new GraphQLNonNull(GraphQLString) },
      password: { type: new GraphQLNonNull(GraphQLString) },
    },
    async resolve(parent: any, args: any) {
      return await hotelUserctl.signUp(args);
    },
  },
  login: {
    type: UserType,
    args: {
      phone: { type: new GraphQLNonNull(GraphQLString) },
      password: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve(parent: any, args: any) {
      return hotelUserctl.login(args);
    },
  },
  updateUser: {
    type: UserType,
    args: {
      id: { type: new GraphQLNonNull(GraphQLID) },
      fname: { type: new GraphQLNonNull(GraphQLString) },
      lname: { type: new GraphQLNonNull(GraphQLString) },
      email: { type: new GraphQLNonNull(GraphQLString) },
      role: { type: new GraphQLNonNull(GraphQLString) },
      phone: { type: new GraphQLNonNull(GraphQLString) },
    },
    async resolve(parent: any, args: any) {
      return await hotelUserctl.update(args);
    },
  },
  updatePassword: {
    type: UserType,
    args: {
      token: { type: new GraphQLNonNull(GraphQLString) },
      password: { type: new GraphQLNonNull(GraphQLString) },
    },
    async resolve(parent: any, args: any) {
      return await hotelUserctl.updatePassword(args);
    },
  },
  forgotPassword: {
    type: UserType,
    args: {
      email: { type: new GraphQLNonNull(GraphQLString) },
    },
    async resolve(parent: any, args: any) {
      return await hotelUserctl.forgotPassword(args);
    },
  },
  resetPassword: {
    type: UserType,
    args: {
      token: { type: new GraphQLNonNull(GraphQLString) },
      password: { type: new GraphQLNonNull(GraphQLString) },
    },
    async resolve(parent: any, args: any) {
      return await hotelUserctl.resetPassword(args);
    },
  },
};

export default userMutations;
