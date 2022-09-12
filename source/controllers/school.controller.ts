import { Request, Response, NextFunction } from 'express';
import { ErrorCodes, ErrorMessages, NON_EXISTENT_ID } from '../constants';
import { systemError, whiteBoardType } from '../entities';
import { ResponseHelper } from '../helpers/response.helper';
import { SchoolService } from '../services/school.sevice';
import { ErrorHelper } from '../helpers/error.helper';
import { RequestHelper } from '../helpers/request.helper';

const schoolService: SchoolService = new SchoolService();

const getBoardTypes = async (req: Request, res: Response, next: NextFunction) => {
    
    schoolService.getBoardTypes()
        .then((result: whiteBoardType[]) => {
            return res.status(200).json({
                types: result
            });
        })
        .catch((error: systemError) => {
            return ResponseHelper.handleError(res, error);   
        })
};

const getBoardTypebyId = async (req: Request, res: Response, next: NextFunction) => {
    const numericParamOrError: number | systemError = RequestHelper.ParseNumericInput(req.params.id);
    if(typeof numericParamOrError === "number") {
        if (numericParamOrError > 0) {
            schoolService.getBoardTypeById(numericParamOrError)
                .then((result: whiteBoardType) => {
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

const updateBoardTypeById = async (req: Request, res: Response, next: NextFunction) => {
    const numericParamOrError: number | systemError = RequestHelper.ParseNumericInput(req.params.id);
    if(typeof numericParamOrError === "number") {
        if (numericParamOrError > 0) {
            const body: whiteBoardType = req.body;
            schoolService.updateBoardTypeById({
                id: numericParamOrError,
                type: body.type
            })
                .then((result: whiteBoardType) => {
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

    
const addBoardType = async (req: Request, res: Response, next: NextFunction) => {
    const body: whiteBoardType = req.body;

    schoolService.addBoardType({
        id: NON_EXISTENT_ID,
        type: body.type
    })
        .then((result: whiteBoardType) => {
            return res.status(200).json(result);
        })
        .catch((error: systemError) => {
            return ResponseHelper.handleError(res, error);
        });
};

const deleteBoardTypeById = async (req: Request, res: Response, next: NextFunction) => {
    const numericParamOrError: number | systemError = RequestHelper.ParseNumericInput(req.params.id);
    if(typeof numericParamOrError === "number") {
        if (numericParamOrError > 0) {
            schoolService.deleteBoardTypeById(numericParamOrError)
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


export default { getBoardTypes, getBoardTypebyId, updateBoardTypeById, addBoardType, deleteBoardTypeById };