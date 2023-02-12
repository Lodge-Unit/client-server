import { GraphQLID, GraphQLList, GraphQLString } from "graphql";
import UserType from "./type";
import UserController from "../../controllers/userController";

const userCtl = new UserController();

const userQueries = {
  user: {
    type: UserType,
    args: {
      id: { type: GraphQLID },
      token: { type: GraphQLString },
    },
    async resolve(parent: any, args: any) {
      return await userCtl.getUser(args);
    },
  },
  users: {
    type: new GraphQLList(UserType),
    async resolve(parent: any, args: any) {
      return await userCtl.getUsers();
    },
  },
};

export default userQueries;
