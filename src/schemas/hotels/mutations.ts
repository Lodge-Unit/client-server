// import { 
//     GraphQLObjectType, 
//     GraphQLString, 
//     GraphQLSchema,
//     GraphQLID,
//     GraphQLList, 
//     GraphQLInt,
//     GraphQLNonNull } from "graphql"


// const AuthorType: GraphQLObjectType = new GraphQLObjectType({
//     name: "Author",
//     fields: () => ({
//         id: { type: GraphQLID },
//         name: { type: GraphQLString },
//         age: { type: GraphQLInt },
//         books: {
//             type: new GraphQLList(BookType),
//             resolve(parent: any, args: any){
//                 // return _.filter(books, {
//                 //     authorId: parent.id
//                 // })
//                 return Book.find({ authorId: parent.id})
//             }
//         }
//     })
// })
