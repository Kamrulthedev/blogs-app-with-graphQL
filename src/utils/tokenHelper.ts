import jwt from "jsonwebtoken"
import config from "../config";
require("dotenv").config();

export const tokenHelper = async (payload: { userId: number }) => {
  const token = jwt.sign(payload, config.jwt.secret, { expiresIn: "1d" });
  return token;
};

