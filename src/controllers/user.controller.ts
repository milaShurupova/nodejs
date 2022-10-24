import { Request, Response, NextFunction } from 'express';
import { NON_EXISTENT_ID } from '../constants';
import { authenticatedRequest, systemError, user } from '../entities';
import { ResponseHelper } from '../helpers/response.helper';
import { ErrorService } from '../services/error.service';
import { UserService } from '../services/user.service';
import { RequestHelper } from '../helpers/request.helper';
import bcrypt from "bcryptjs";

const errorService: ErrorService = new ErrorService();
const userService: UserService = new UserService(errorService);

const updateById = async (req: Request, res: Response, next: NextFunction) => {
    const numericParamOrError: number | systemError = RequestHelper.ParseNumericInput(errorService, req.params.id);
    if(typeof numericParamOrError === "number") {
        if (numericParamOrError > 0) {
            const body: user = req.body;

            userService.updateById({
                id: numericParamOrError,
                firstName: body.firstName,
                lastName: body.lastName,
            }, (req as authenticatedRequest).userData.userId)
                .then((result: user) => {
                    return res.status(200).json(result);
                })
                .catch((error: systemError) => {
                    return ResponseHelper.handleError(res, error);
                })
        }
        else {
            //TODO: 
        }

    }
    else {
        return ResponseHelper.handleError(res, numericParamOrError);
    }
};

    
const add = async (req: Request, res: Response, next: NextFunction) => {
    const body: user = req.body;
    const hashedPassword: string = bcrypt.hashSync(body.password as string);

    userService.add({
        id: NON_EXISTENT_ID,
        firstName: body.firstName,
        lastName: body.lastName,
        login: body.login,
        password: hashedPassword
    }, (req as authenticatedRequest).userData.userId)
        .then((result: user) => {
            const returnedUser: user = {
                id: result.id,
                firstName: result.firstName,
                lastName: result.lastName,
            }
            return res.status(200).json(returnedUser);
        })
        .catch((error: systemError) => {
            return ResponseHelper.handleError(res, error);
        });
};

const deleteById = async (req: Request, res: Response, next: NextFunction) => {
    const numericParamOrError: number | systemError = RequestHelper.ParseNumericInput(errorService, req.params.id);
    if(typeof numericParamOrError === "number") {
        if (numericParamOrError > 0) {
            userService.deleteById(numericParamOrError, (req as authenticatedRequest).userData.userId)
                .then(() => {
                    return res.sendStatus(200);
                })
                .catch((error: systemError) => {
                    return ResponseHelper.handleError(res, error);
                })
        }
        else {
            //TODO: 
        }

    }
    else {
        return ResponseHelper.handleError(res, numericParamOrError);
    }
};



export default { updateById, add, deleteById };