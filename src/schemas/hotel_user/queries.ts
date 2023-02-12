import { GraphQLID, GraphQLList } from "graphql";
import UserType from "./type";
import HotelUserController from "../../controllers/hotelUserController";

const hotelUserctl = new HotelUserController();

const userQueries = {
  user: {
    type: UserType,
    args: {
      id: { type: GraphQLID },
    },
    async resolve(parent: any, args: any) {
      return await hotelUserctl.getUser(args);
    },
  },
  users: {
    type: new GraphQLList(UserType),
    async resolve(parent: any, args: any) {
      return await hotelUserctl.getUsers();
    },
  },
};

export default userQueries;
