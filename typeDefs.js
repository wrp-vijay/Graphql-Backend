// const { gql } = require('apollo-server-express');

// const typeDefs = gql`
//   type Post {
//     id: ID
//     name: String
//     age: Int
//     country: String
//   }

//   type PaginatedPosts {
//     totalCount: Int!
//     totalPages: Int!
//     currentPage: Int!
//     pageSize: Int!
//     results: [Post]!
//   }

//   type Query {
//     hello: String
//     getAll(search: String, page: Int, pageSize: Int): PaginatedPosts
//   }

//   input UserInput {
//     name: String
//     age: Int
//     country: String
//   }

//   type Mutation {
//         createUser(post: UserInput): Post
//         updateUser(id: ID!, input: UserInput!): Post
//         deleteUser(id: ID!): String
//       }
// `;

// module.exports = typeDefs;


const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    id: ID
    name: String
    age: Int
    country: String
  }

  type UserInquiry {
    id: ID
    userId: ID
    title: String
    description: String
  }

  type PaginatedPosts {
    totalCount: Int!
    totalPages: Int!
    currentPage: Int!
    pageSize: Int!
    results: [User]!
  }

  type PaginatedUserInquiries {
    totalCount: Int!
    totalPages: Int!
    currentPage: Int!
    pageSize: Int!
    results: [UserInquiry]!
  }

  input UserInput {
    name: String
    age: Int
    country: String
  }

  input UserInquiryInput {
    userId: ID!
    title: String!
    description: String!
  }

  type Query {
    hello: String
    getAllUsers(search: String, page: Int, pageSize: Int): PaginatedPosts
    getAllUserInquiries(search: String, page: Int, pageSize: Int): PaginatedUserInquiries
    getSingleUserInquiry(userId: ID!): PaginatedUserInquiries
  }

  type Mutation {
    createUser(post: UserInput): User
    updateUser(id: ID!, input: UserInput!): User
    deleteUser(id: ID!): String
    createUserInquiry(post: UserInquiryInput): UserInquiry
    updateUserInquiry(id: ID!, input: UserInquiryInput!): UserInquiry
    deleteUserInquiry(id: ID!): String
  }
`;

module.exports = typeDefs;
