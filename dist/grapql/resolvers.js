// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.
import { db } from "../db.js";
const resolvers = {
    Query: {
        books: () => db.books,
    },
};
export { resolvers };
