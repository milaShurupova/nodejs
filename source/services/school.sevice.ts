import { Connection, SqlClient, Error } from "msnodesqlv8";
import { DB_CONNECTION_STRING, ErrorCodes, ErrorMessages, Queries } from "../constants";
import { whiteBoardType } from "../entities";
import { ErrorHelper } from "../helpers/error.helpers";

interface ISchoolService {
    getBoardTypes(): Promise<whiteBoardType[]>;
    getBoardType(id: number): Promise<whiteBoardType>;
}

interface localWhiteBoardType {
    id: number;
    white_board_type: string;
}

export class SchoolService implements ISchoolService {

    public getBoardTypes(): Promise<whiteBoardType[]> {

        return new Promise<whiteBoardType[]>((resolve, reject) => {
        
            const sql: SqlClient = require("msnodesqlv8");
            const connectionString: string = DB_CONNECTION_STRING;
            const result: whiteBoardType[] = [];
    
            sql.open(connectionString,  (connectionError: Error, connection: Connection) => {
                
                if(connectionError) {
                    reject(
                        ErrorHelper.parseError(ErrorCodes.ConnectionError, ErrorMessages.DbConnectionError)
                    );
                }

                else {
                    connection.query(Queries.WhiteBoardTypes, (queryError: Error | undefined, queryResult: localWhiteBoardType[] | undefined) => {
                        if (queryError) {
                            reject(
                                ErrorHelper.parseError(ErrorCodes.QueryError, ErrorMessages.SqlQueryError)
                            );
                        }
                        else {
                            
                            if (queryResult !== undefined) {
                                queryResult.forEach((whiteBoardType: localWhiteBoardType) => {
                                result.push(
                                    this.parseLocalBoardType(whiteBoardType)
                                    )
                                })
                            }
                            resolve(result);
                        }
                        
                    })
                }
                
            });

        });

    }

    public getBoardType(id: number): Promise<whiteBoardType> {

        return new Promise<whiteBoardType>((resolve, reject) => {
        
            const sql: SqlClient = require("msnodesqlv8");
            const connectionString: string = DB_CONNECTION_STRING;
            let result: whiteBoardType;
    
            sql.open(connectionString,  (connectionError: Error, connection: Connection) => {
                
                if(connectionError) {
                    reject(
                        ErrorHelper.parseError(ErrorCodes.ConnectionError, ErrorMessages.DbConnectionError)
                    );
                }

                else {
                    connection.query(`${Queries.WhiteBoardTypeByID} ${id}`, (queryError: Error | undefined, queryResult: localWhiteBoardType[] | undefined) => {
                        if (queryError) {
                            reject(
                                ErrorHelper.parseError(ErrorCodes.QueryError, ErrorMessages.SqlQueryError)
                            );
                        }
                        else {
                                if (queryResult !== undefined && queryResult.length === 1) {
                                result = this.parseLocalBoardType(queryResult[0]);
                                }
                                else if (queryResult !== undefined && queryResult.length === 0) {
                                //TODO

                                }
                            }
                            resolve(result);
                    })
                }
            });

        });

    }

    private parseLocalBoardType(local: localWhiteBoardType): whiteBoardType {
        return {
            id: local.id,
            type: local.white_board_type,
        }
    }
}