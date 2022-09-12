import { Connection, SqlClient, Error, Query } from "msnodesqlv8";
import { DB_CONNECTION_STRING, ErrorCodes, ErrorMessages, SqlParameters, Queries } from "../constants";
import { systemError } from "../entities";
import { ErrorHelper } from "./error.helper";

export class SqlHelper {

    static sql: SqlClient = require("msnodesqlv8");

    public static executeQueryArrayResult<T>(query: string, ...params: (string | number)[]): Promise<T[]> {
        return new Promise<T[]>((resolve, reject) => {
            SqlHelper.openConnection()
                .then((connection: Connection) => {
                    connection.query(query, params, (queryError: Error | undefined, queryResult: T[] | undefined) => {
                        if (queryError) {
                            reject(
                                ErrorHelper.createError(ErrorCodes.QueryError, ErrorMessages.SqlQueryError)
                            );
                        }
                        else {
                            if (queryResult !== undefined) {
                                resolve(queryResult);
                            }
                            else {
                                resolve([]);
                            }
                        }
                });
            })
                .catch((error: systemError) => {
                    reject(error);
                });
            });
    }

    public static executeQuerySingleResult<T>(query: string, ...params: (string | number)[]): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            SqlHelper.openConnection()
                .then((connection: Connection) => {
                connection.query(query, params, (queryError: Error | undefined, queryResult: T[] | undefined) => {
                if (queryError) {
                    reject(ErrorHelper.createError(ErrorCodes.QueryError, ErrorMessages.SqlQueryError));
                }
                else {
                    const notFoundError: systemError = ErrorHelper.createError(ErrorCodes.NoData, ErrorMessages.NoDataFound);
                    if (queryResult !== undefined) {
                        switch (queryResult.length) {
                            case 0:
                                reject(notFoundError);
                                break;
                            case 1:
                                resolve(queryResult[0]);
                                break;
                            default:
                                resolve(queryResult[0]);
                                break;
                        }
                    }
                    else {
                        reject(notFoundError);
                    }
                }
            })
        })
        .catch((error: systemError) => reject(error));

    })
    }

    public static executeQueryNoResult<T>(query: string, ...params: (string | number)[]): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            SqlHelper.openConnection()
                .then((connection: Connection) => {
                    const q: Query = connection.query(query, params, (queryError: Error | undefined) => {
                        if (queryError) {
                            reject(ErrorHelper.createError(ErrorCodes.QueryError, ErrorMessages.SqlQueryError));
                        }
                    });


                    q.on('rowcount', (count: number) => {
                        if (count === 0) {
                            reject(ErrorHelper.createError(ErrorCodes.NoData, ErrorMessages.NoDataFound));
                            return;
                        }
                        resolve();
                    });
                })   
                .catch((error: systemError) => {
                    reject(error);
                });
        })
    }

    public static createNew<T>(query: string, original: T, ...params: (string | number)[]): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            SqlHelper.openConnection()
                .then((connection: Connection) => {
                    const queries: string[] = [query, Queries.SelectIdentity];
                    const executeQuery: string = queries.join(";");
                    let executionCounter: number = 0;
                        connection.query(executeQuery, params, (queryError: Error | undefined, queryResult: T[] | undefined) => {
                            if (queryError) {
                                reject(ErrorHelper.createError(ErrorCodes.QueryError, ErrorMessages.SqlQueryError));
                            }
                            else {
                                executionCounter++;
                                const badQueryError: systemError = ErrorHelper.createError(ErrorCodes.QueryError, ErrorMessages.SqlQueryError);
                                if (executionCounter === queries.length) {
                                    if (queryResult !== undefined) {
                                        if (queryResult.length === 1) {
                                            (original as any).id = (queryResult[0] as any).id;
                                            resolve(original);
                                        }
                                        else {
                                            reject(badQueryError);
                                        }
                                    }
                                    else {
                                        reject(badQueryError);
                                    }
                                }
                            }   
                        })
                })   
            .catch((error: systemError) => reject(error));
        })
    }

    private static openConnection(): Promise<Connection> {
        return new Promise<Connection>((resolve, reject) => {

            SqlHelper.sql.open(DB_CONNECTION_STRING,  (connectionError: Error, connection: Connection) => {
                
                if (connectionError) {
                    reject(ErrorHelper.createError(ErrorCodes.ConnectionError, ErrorMessages.DbConnectionError));
                }
                else {
                  resolve(connection);
                }
            });
        });
    }

}