import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from 'express';
import { TOKEN_SECRET } from "../constants";
import { authenticationToken, jwtUserData, authenticatedRequest } from '../entities';
import { Role } from "../enums";


interface jwtBase {
    userData: jwtUserData;
    exp: number;
    iat: number;

}

const verifyToken = (roles: Role[]) => (req: Request, res: Response, next: NextFunction) => {
  let token: string | undefined = req.headers["authorization"]?.toString();

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }

  try {
    token = token.substring("Bearer ".length);
    const decoded: string | JwtPayload = jwt.verify(token, TOKEN_SECRET);
    if(roles.indexOf((decoded as jwtBase).userData.userId) === -1) {
      return res.sendStatus(401);
    }
    (req as authenticatedRequest).userData = (decoded as jwtBase).userData;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }

  return next();
};

export default { verifyToken };