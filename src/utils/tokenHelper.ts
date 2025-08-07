import jwt from "jsonwebtoken"

export const tokenHelper = async (payload: { userId: number }) => {
  const token = jwt.sign(payload, process.env.jwtSecret || "kamrul1234567899", { expiresIn: "1d" });
  return token;
};