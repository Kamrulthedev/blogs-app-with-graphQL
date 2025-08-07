import jwt from "jsonwebtoken"

export const jwtHelper = async (payload: { userId: string, email: string, name: string }) => {
    const token = jwt.sign(
        { userId: payload.userId, email: payload.email, name: payload.name },
        process.env.jwtSecret as string | "kamrul1234567899",
        { expiresIn: "1d" });
};

