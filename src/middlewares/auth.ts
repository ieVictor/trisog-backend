import { Request, Response, NextFunction } from "express";
import { Token } from "../securities/token";

declare global {
  namespace Express {
    interface Request {
      user_id: string;
    }
  }
}

export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) return res.status(401).json({ msg: 'JWT token was not provided or is invalid'});

  try {
    const user_id = await Token.verifyToken(token);

    if (typeof user_id !== 'string' ||  !user_id) {
      return res.status(403).json({ msg: 'You do not have permission to access the requested resource' });
    }

    req.user_id = user_id;
    next();
  } catch (error) {
    console.error('Token verification error: ', error);
    return res.status(500).json({ msg: 'Internal server error'});
  }
}