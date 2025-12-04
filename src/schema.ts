export const typeDefs = `#graphql

type Query {
Posts : [Post]
Users : [User]
Profiles(userId: Int!) : Profile
}


type Mutation {
signUp( name: String!, 
        email: String!, 
        password : String!,
        bio : String 
        ) : SignUpResponse 
signIn(
   email: String!
   password: String!
   ): SignInResponse

createPost(
post: PostInput
  ) : PostPayload,

updatePost(
postId:ID!,
title: String, 
content: String
):PostPayload
}



type Post {
id: ID!
title : String!
content : String!
author : User!
createdAt : String!
published : Boolean!
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



type PostPayload {
userError: String
post: Post
}
type SignUpResponse {
token: String!
user: User!
}
type SignInResponse{
token: String!
user: User!
}

input PostInput {
title: String
content: String
}
 
`;




