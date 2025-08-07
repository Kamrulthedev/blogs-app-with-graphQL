import jwt from "jsonwebtoken"

export const tokenHelper = async (payload: { userId: number, email: string, name: string }) => {
  const token = jwt.sign(payload, process.env.jwtSecret || "kamrul1234567899", { expiresIn: "1d" });
  return token;
};