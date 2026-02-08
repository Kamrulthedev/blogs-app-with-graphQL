import path from "path";

require("dotenv").config({ path: path.join(process.cwd(), ".env") });

const config = {
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
};

export default config;
