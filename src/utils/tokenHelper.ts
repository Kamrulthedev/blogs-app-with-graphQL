import jwt from "jsonwebtoken"
import config from "../config";
require("dotenv").config();

const GenerateToken = async (payload: { userId: number }) => {
  const token = jwt.sign(payload, config.jwt.secret, { expiresIn: "1d" });
  return token;
};

const DecodeToken = async() =>{

}


export const JwtHelper = {
  GenerateToken
};

