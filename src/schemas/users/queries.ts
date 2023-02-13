import { GraphQLID, GraphQLList, GraphQLString } from "graphql";
import UserType from "./type";
import UserController from "../../controllers/userController";

const userCtl = new UserController();

const userQueries = {
  user: {
    type: UserType,
    args: {
      id: { type: GraphQLID },
    },
    async resolve(parent: any, args: any, context: any) {
      return await userCtl.getUser(args, context.headers?.authorization);
    },
  },
  users: {
    type: new GraphQLList(UserType),
    async resolve(parent: any, args: any, context: any, root: any) {
      return await userCtl.getUsers();
    },
  },
};

export default userQueries;
