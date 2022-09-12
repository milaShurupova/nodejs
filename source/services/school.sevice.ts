import { Queries } from "../constants";
import { systemError, whiteBoardType } from "../entities";
import { SqlHelper } from "../helpers/sql.helper";
import _ from 'underscore';

interface ISchoolService {
    getBoardTypes(): Promise<whiteBoardType[]>;
    getBoardTypeById(id: number): Promise<whiteBoardType>;
    updateBoardTypeById(whiteBoardType: whiteBoardType): Promise<whiteBoardType>;
    addBoardType(whiteBoardType: whiteBoardType): Promise<whiteBoardType>;
    deleteBoardTypeById(id: number): Promise<void>;
}

interface localWhiteBoardType {
    id: number;
    white_board_type: string;
}

export class SchoolService implements ISchoolService {

    public getBoardTypes(): Promise<whiteBoardType[]> {
        return new Promise<whiteBoardType[]>((resolve, reject) => {
            const result: whiteBoardType[] = [];
                SqlHelper.executeQueryArrayResult<localWhiteBoardType>(Queries.WhiteBoardTypes)
                .then((queryResult: localWhiteBoardType[]) => {
                    queryResult.forEach((whiteBoardType: localWhiteBoardType) => {
                        result.push(this.parseLocalBoardType(whiteBoardType));
                    });

                    resolve(result);
                })     
                .catch((error: systemError) => {
                    reject(error);
                });
        });
    }

    public getBoardTypeById(id: number): Promise<whiteBoardType> {
        return new Promise<whiteBoardType>((resolve, reject) => {       
            SqlHelper.executeQuerySingleResult<localWhiteBoardType>(Queries.WhiteBoardTypeByID, id)
                .then((queryResult: localWhiteBoardType) => {
                    resolve(this.parseLocalBoardType(queryResult));
                })
                .catch((error: systemError) => {
                    reject(error);
                });
            });
    }

    public updateBoardTypeById(whiteBoardType: whiteBoardType): Promise<whiteBoardType> {
        return new Promise<whiteBoardType>((resolve, reject) => {
            SqlHelper.executeQueryNoResult<localWhiteBoardType>(Queries.UpdateWhiteBoardTypeByID, false, whiteBoardType.type, whiteBoardType.id)
            .then(() => {
                resolve(whiteBoardType);
            })
            .catch((error: systemError) => {
                reject(error);
            });

        })
    }

    public getBoardTypeByTitle(title: string): Promise<whiteBoardType[]> {
        return new Promise<whiteBoardType[]>((resolve, reject) => {    

            SqlHelper.executeQueryArrayResult<localWhiteBoardType>(Queries.WhiteBoardTypeByTitle, `%${title}%`)
            .then((queryResult: localWhiteBoardType[]) => {
                resolve(_.map(queryResult, (result: localWhiteBoardType) => 
                    this.parseLocalBoardType(result)
                ))
            })     
            .catch((error: systemError) => {
                reject(error);
            });
        });
    }

    public addBoardType(whiteBoardType: whiteBoardType): Promise<whiteBoardType> {
        return new Promise<whiteBoardType>((resolve, reject) => {
            SqlHelper.createNew<whiteBoardType>(Queries.AddWhiteBoardType, whiteBoardType, whiteBoardType.type)
            .then((result: whiteBoardType) => {
                resolve(result);
            })
            .catch((error: systemError) => {
                reject(error);
            });

        })
    }

    public deleteBoardTypeById(id: number): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            SqlHelper.executeQueryNoResult(Queries.DeleteBoardTypeByID, true, id)
            .then(() => {
                resolve();
            })
            .catch((error: systemError) => {
                reject(error);
            });
        })
    }

    private parseLocalBoardType(local: localWhiteBoardType): whiteBoardType {
        return {
            id: local.id,
            type: local.white_board_type,
        }
    }
}