import { 
    GraphQLObjectType, 
    GraphQLString, 
    GraphQLSchema, 
    GraphQLID,
    GraphQLList, 
    GraphQLInt,
    GraphQLNonNull } from "graphql"

import User from "../../models/user"   
import { ResponseType } from "../types"



 const UserType: GraphQLObjectType = new GraphQLObjectType({
    name: "User",
    fields: () => ({
        id: { type: GraphQLID },
        fname: { type: GraphQLString },
        lname: { type: GraphQLString },
        email: { type: GraphQLString },
        phone: { type: GraphQLString },
        password: { type: GraphQLString },
        response: { type: ResponseType },
      
    })
})

export default UserType
