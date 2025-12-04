import { authResolvers } from "./auth.js";
import { PostResolvers } from "./post.js";

export const Mutation = {
...authResolvers,
...PostResolvers
};