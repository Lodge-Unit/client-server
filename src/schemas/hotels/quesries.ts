// import { 
//     GraphQLObjectType, 
//     GraphQLString, 
//     GraphQLSchema, 
//     GraphQLID,
//     GraphQLList, 
//     GraphQLInt,
//     GraphQLNonNull } from "graphql"


//     export default {
//         book: { 
//             type: BookType,
//             args: {
//                 id: { type: GraphQLID },
//             },
//             resolve(parent: any, args: any){
//                 // return _.find(books, {
//                 //     id: args.id
//                 // })
//                 return Book.findById(args.id)
//             }
//          },
//     }