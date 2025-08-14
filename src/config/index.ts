import { Secret } from "jsonwebtoken";
import path from "path";
import config from "../config/index.js";


require("dotenv").config({path: path.join(process.cwd(), ".env")});

export default {
    jwt :{
       secret : process.env.jwtSecret as Secret
    }
};