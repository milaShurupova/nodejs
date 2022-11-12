import { Request, Response, NextFunction } from "express";
import { RequestHelper } from "../../core/request.helper";
import { AuthenticatedRequest, classRoom, systemError, teacher, whiteBoardType } from "../../entities";
import { ResponseHelper } from "../../framework/response.helper";
import SchoolService from "./school.service";

class SchoolController {

  constructor() {}

  async getBoardTypes(req: Request, res: Response, next: NextFunction) {

    SchoolService.getBoardTypes()
        .then((result: whiteBoardType[]) => {
            return res.status(200).json({
                types: result
            });
        })
        .catch((error: systemError) => {
            return ResponseHelper.handleError(res, error);   
        })
  }

  async getBoardTypebyId(req: Request, res: Response, next: NextFunction) {
        const numericParamOrError: number | systemError = RequestHelper.ParseNumericInput(req.params.id);

        if(typeof numericParamOrError === "number") {
            if (numericParamOrError > 0) {
                SchoolService.getBoardTypeById(numericParamOrError)
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
    }

    async getRoomById(req: Request, res: Response, next: NextFunction) {
        const numericParamOrError: number | systemError = RequestHelper.ParseNumericInput(req.params.id);

        if(typeof numericParamOrError === "number") {
            if (numericParamOrError > 0) {
                SchoolService.getRoomById(numericParamOrError)
                    .then((result: classRoom) => {
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
    }

    async updateRoomById(req: Request, res: Response, next: NextFunction) {
        const numericParamOrError: number | systemError = RequestHelper.ParseNumericInput(req.params.id);
        if(typeof numericParamOrError === "number") {
            if (numericParamOrError > 0) {
                const body: classRoom = req.body;
    
                
                SchoolService.updateRoomById(body, (req as AuthenticatedRequest).userData.userId)
                    .then((result: classRoom) => {
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
    }

    async getTeacherById(req: Request, res: Response, next: NextFunction) {
        const numericParamOrError: number | systemError = RequestHelper.ParseNumericInput(req.params.id);

        if(typeof numericParamOrError === "number") {
            if (numericParamOrError > 0) {
                SchoolService.getTeacherById(numericParamOrError)
                    .then((result: teacher) => {
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
    } 

}

export default new SchoolController();