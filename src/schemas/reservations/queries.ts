import { GraphQLID, GraphQLList, GraphQLString } from "graphql";
import ReservationType from "./type";
import ReservationController from "../../controllers/reservationController";

const reservationCtl = new ReservationController();

const reservationQueries = {
  reservation: {
    type: ReservationType,
    args: {
      id: { type: GraphQLID },
    },
    async resolve(parent: any, args: any, context: any) {
      return await reservationCtl.getReservation(
        args,
        context.headers?.authorization
      );
    },
  },

  reservations: {
    type: new GraphQLList(ReservationType),
    async resolve(parent: any, args: any, context: any, root: any) {
      return await reservationCtl.getReservations();
    },
  },
};

export default reservationQueries;
