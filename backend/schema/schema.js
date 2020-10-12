const graphql = require("graphql");
const _ = require('lodash')
const {
   GraphQLObjectType,
   GraphQLString, 
   GraphQLSchema,
   GraphQLID,
   GraphQLInt,
   GraphQLList
  } = graphql;

// dummy data
 let books = [
   {name: "Rief Book", genre:'Fantasy',  id:'1', authorId: "1"},
   {name: "The Final Empire", genre: 'Horror', id:'2', authorId: "3"},
   {name: "After Earth", genre: 'Sci-Fi', id:'3', authorId: "2"},
   {name: "Going to The Sun", genre:'Fantasy',  id:'1', authorId: "1"},
   {name: "The Final Fantasy", genre: 'Horror', id:'2', authorId: "3"},
   {name: "The Final Chapter", genre: 'Sci-Fi', id:'3', authorId: "3"}
 ]

 let authors = [
  {name: "Rifqi", age: 21,  id:'1'},
  {name: "Citizen", age: 25, id:'2'},
  {name: "Unknown", age: 22, id:'3'}
]

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: { 
      type: AuthorType,
      resolve(parent, args) {
        return _.find(authors, {id: parent.authorId})
      }
    }
  }),
});

const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return _.filter(books, {authorId: parent.id})
      }
    }
  }),
});


const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID }},
      resolve(parent, args) {
        return _.find(books, {id: args.id})
      },
    },
    author: {
      type: AuthorType,
      args: {id : {type: GraphQLID }},
      resolve(parent, args) {
        return _.find(authors, {id: args.id})
      }
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args){
        return books
      }
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args){
        return authors
      }
    }
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});