export const typeDefs = `#graphql

type Query {
Posts : [Post]
Users : [User]
Profiles : [Profile]
}


type Mutation {
signUp( name: String, 
        email: String, 
        password : String) : User  
}



type Post {
id: ID!
title : String!
content : String!
author : User!
createdAt : String!
published : Boolean!
}


type Comment {
id: ID!
content:String
author:User!
}

type User {
id : ID!
name : String!
email : String!
createdAt : String!
posts : [Post!]!
}


type Profile {
id : ID!
bio : String!
createdAt : String!
user : User!
}
 
`;




