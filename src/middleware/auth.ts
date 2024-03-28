import { auth } from "express-oauth2-jwt-bearer";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/UserModel";

declare global {
  namespace Express {
    interface Request {
      auth0id: string;
      userId: string;
    }
  }
}

export const jwtCheck = auth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
  tokenSigningAlg: "RS256",
});

export const jwtParse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authorization.split(" ")[1];
  try {
    const decoded = jwt.decode(token) as jwt.JwtPayload;
    const auth0id = decoded.sub;

    const user = await User.findOne({ auth0id });
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    req.auth0id = auth0id as string;
    req.userId = user._id.toString();
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: "Unauthorized" });
  }
};
