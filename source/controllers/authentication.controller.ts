import { Request, Response, NextFunction } from 'express';
import bcrypt from "bcryptjs";
import { ErrorService } from '../services/error.service';
import { AuthenticationService } from '../services/authentication.service';
import { jwtUserData, systemError } from '../entities';
import { ResponseHelper } from '../helpers/response.helper';
import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../constants";



interface localUser {
    login: string;
    password: string;
}

const errorService: ErrorService = new ErrorService();
const authenticationService: AuthenticationService = new AuthenticationService(errorService);

const login = async (req: Request, res: Response, next: NextFunction) => {
    const user: localUser = req.body;

    authenticationService.login(user.login, user.password)
        .then((id: number) => {
            const jwtUser: jwtUserData = {
                userId: id
            };
            const token: string = jwt.sign(
               jwtUser,
               TOKEN_SECRET,
               {
                expiresIn: "2h",
               }
            );
            res.status(200).json({
                token: token
        });
    })
    .catch((error: systemError) => {
        return ResponseHelper.handleError(res, error, true);
    });
    
};

export default { login }