import jwt from "jsonwebtoken"
import config from "../config";
require("dotenv").config();

const GenerateToken = async (payload: { userId: any }) => {
  try {
    console.log("Payload....", payload);
    const token = jwt.sign(payload, config.jwt.secret, { expiresIn: "1d" });
    return token;
  } catch (error) {
    console.error("Error generating token:", error);
    throw new Error("Token generation failed");
  }
};

const DecodeToken = async (token: string) => {
  try {
    const userData = jwt.verify(token, config.jwt.secret as string);
    console.log(userData);
  } catch (error) {
    return error;
  }
}


export const JwtHelper = {
  GenerateToken,
  DecodeToken
};

