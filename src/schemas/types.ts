import { 
    GraphQLObjectType, 
    GraphQLString,  
    } from "graphql"



 export const ResponseType: GraphQLObjectType = new GraphQLObjectType({
    name: "ResponseType",
    fields: () => ({
        token: { type: GraphQLString },
        message: { type: GraphQLString },
        status: { type: GraphQLString },
      
    })
})

