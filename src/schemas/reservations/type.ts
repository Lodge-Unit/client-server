import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull,
} from "graphql";

import Reservation from "../../models/reservation";
import { ResponseType, DateScalarType } from "../types";

const ReservationType: GraphQLObjectType = new GraphQLObjectType({
  name: "Reservation",
  fields: () => ({
    id: { type: GraphQLID },
    hotelID: { type: GraphQLString },
    userID: { type: GraphQLString },
    roomID: { type: GraphQLString },
    checkIn: { type: DateScalarType },
    checkOut: { type: DateScalarType },
    status: { type: GraphQLString },
    guestAdults: { type: GraphQLString },
    guestChildren: { type: GraphQLString },
    guestInfants: { type: GraphQLString },
    response: { type: ResponseType },
  }),
});

export default ReservationType;