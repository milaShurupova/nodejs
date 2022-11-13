import { Request, Response, NextFunction } from "express";
import { StaticEnvironment } from "../environment.static";
import { jwtUserData, authenticationToken, systemError } from "../../entities";
import { ResponseHelper } from "../../framework/response.helper";
import AuthenticationService from './authentication.service';
import jwt from 'jsonwebtoken';

interface localUser {
  login: string;
  password: string;
}

class AuthenticationController {

  constructor() {}
 
  async login(req: Request, res: Response, next: NextFunction) {
      const user: localUser = req.body;

      AuthenticationService.login(user.login, user.password)
            .then((userData: jwtUserData) => {
                            
              const authenticationToken: authenticationToken = {
                  userData: userData
              };
  
              const token: string = jwt.sign(
                 authenticationToken,
                 StaticEnvironment.tokenSecret,
                 {
                  expiresIn: "2h",
                 }
              );

              return res.status(200).json({
                  token: token
              });
              
          })
          .catch((error: systemError) => {
              return ResponseHelper.handleError(res, error, true);
          });
      
  };

}


export default new AuthenticationController();