export const resolvers = {
  Query: {
  
  },

  Mutation : {
    signUp : (parent: any, args: any, content: any) => {
      
      console.log("Sign Up Mutation called with args : ", args);
      
    }
  }

};

