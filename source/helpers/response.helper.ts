import { Response } from 'express';
import { systemError } from "../entities";
import { ErrorCodes } from "../constants";

export class ResponseHelper {
    public static handleError(response: Response<any, Record<string, any>>, error: systemError): Response<any, Record<string, any>> {
        switch (error.code) {
            case ErrorCodes.ConnectionError:
                return response.status(408).json({
                    errorMessage: error.message
                });
            case ErrorCodes.QueryError:
            case ErrorCodes.NonNumericInput:
                return response.status(406).json({
                    errorMessage: error.message
                });
            default:
                return response.status(400).json({
                    errorMessage: error.message
                });
        }
    }
}