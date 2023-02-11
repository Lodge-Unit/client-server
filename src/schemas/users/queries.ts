import { 
    GraphQLObjectType, 
    GraphQLString, 
    GraphQLSchema, 
    GraphQLID,
    GraphQLList, 
    GraphQLInt,
    GraphQLNonNull } from "graphql"
import UserType from "./type"
import User from "../../models/user" 

const userQueries =  {
    user: { 
        type: UserType,
        args: {
            id: { type: GraphQLID },
        },
        resolve(parent: any, args: any){
            return User.findById(args.id)
        }
     }
}

export default userQueries