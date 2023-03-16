import { GraphQLString, GraphQLID, GraphQLNonNull } from "graphql";

import ReservationType from "./type";
import { DateScalarType } from "../types";
import ReservationController from "../../controllers/reservationController";

const reservationCtl = new ReservationController();

const reservationMutations = {
  reserve: {
    type: ReservationType,
    args: {
      hotelID: { type: new GraphQLNonNull(GraphQLString) },
      userID: { type: new GraphQLNonNull(GraphQLString) },
      roomID: { type: new GraphQLNonNull(GraphQLString) },
      checkIn: { type: new GraphQLNonNull(DateScalarType) },
      checkOut: { type: new GraphQLNonNull(DateScalarType) },
      guestAdults: { type: new GraphQLNonNull(GraphQLString) },
      guestChildren: { type: new GraphQLNonNull(GraphQLString) },
      guestInfants: { type: new GraphQLNonNull(GraphQLString) },
    },
    async resolve(parent: any, args: any, context: any) {
      return await reservationCtl.reserve(args, context.headers?.authorization);
    },
  },

  cancelReservation: {
    type: ReservationType,
    args: {
      id: { type: GraphQLID },
    },
    async resolve(parent: any, args: any, context: any) {
      return await reservationCtl.cancelReservation(
        args,
        context.headers?.authorization
      );
    },
  },
};

export default reservationMutations;
