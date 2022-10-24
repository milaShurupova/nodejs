import _ from "underscore";
import { Queries } from "../../constants";
import { whiteBoardType, systemError, entityWithId } from "../../entities";
import { Status } from "../../enums";
import { DateHelper } from "../../framework/date.helper";
import { SqlHelper } from "../../core/sql.helper";


interface ISchoolService {


    getBoardTypes(): Promise<whiteBoardType[]>;
    getBoardTypeById(id: number): Promise<whiteBoardType>;
    updateBoardTypeById(whiteBoardType: whiteBoardType, userID: number): Promise<whiteBoardType>;
    addBoardType(whiteBoardType: whiteBoardType, userID: number): Promise<whiteBoardType>;
    deleteBoardTypeById(id: number, userID: number): Promise<void>;
    getBoardTypeByTitle(title: string): Promise<whiteBoardType[]>;
}

interface localWhiteBoardType {
    id: number;
    white_board_type: string;
    create_date: Date;
    update_date: Date;
    create_user_id: number;
    update_user_id: number;
    status_id: Status;
}
class SchoolService implements ISchoolService {

    constructor( ) {}
    

    public getBoardTypes(): Promise<whiteBoardType[]> {
        return new Promise<whiteBoardType[]>((resolve, reject) => {
            const result: whiteBoardType[] = [];
                SqlHelper.executeQueryArrayResult<localWhiteBoardType>(Queries.WhiteBoardTypes, Status.Active)
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
            SqlHelper.executeQuerySingleResult<localWhiteBoardType>(Queries.WhiteBoardTypeByID, id, Status.Active)
                .then((queryResult: localWhiteBoardType) => {
                    resolve(this.parseLocalBoardType(queryResult));
                })
                .catch((error: systemError) => {
                    reject(error);
                });
            });
    }

    public updateBoardTypeById(whiteBoardType: whiteBoardType, userID: number): Promise<whiteBoardType> {
        return new Promise<whiteBoardType>((resolve, reject) => {
            const updateDate: Date = new Date();

            SqlHelper.executeQueryNoResult<localWhiteBoardType>(Queries.UpdateWhiteBoardTypeByID, false, whiteBoardType.type, DateHelper.dateToString(updateDate), userID, whiteBoardType.id, Status.Active)
            .then(() => {
                resolve(whiteBoardType);
            })
            .catch((error: systemError) => {
                reject(error);
            });

        })
    }

    // public getBoardTypeByTitle(title: string): Promise<whiteBoardType[]> {
    //     return new Promise<whiteBoardType[]>((resolve, reject) => {    

    //         SqlHelper.executeQueryArrayResult<localWhiteBoardType>(Queries.WhiteBoardTypeByTitle, `%${title}%`)
    //         .then((queryResult: localWhiteBoardType[]) => {
    //             resolve(_.map(queryResult, (result: localWhiteBoardType) => 
    //                 this.parseLocalBoardType(result)
    //             ))
    //         })     
    //         .catch((error: systemError) => {
    //             reject(error);
    //         });
    //     });
    // }

    public addBoardType(whiteBoardType: whiteBoardType, userID: number): Promise<whiteBoardType> {
        return new Promise<whiteBoardType>((resolve, reject) => {
            const createDate: string = DateHelper.dateToString(new Date());

            SqlHelper.createNew(Queries.AddWhiteBoardType, whiteBoardType, whiteBoardType.type, createDate, createDate, userID, userID, Status.Active)
            .then((result: entityWithId) => {
                resolve(result as whiteBoardType);
            })
            .catch((error: systemError) => {
                reject(error);
            });

        })
    }

    public deleteBoardTypeById(id: number, userID: number): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            const updateDate: Date = new Date();

            SqlHelper.executeQueryNoResult(Queries.DeleteBoardTypeByID, true, DateHelper.dateToString(updateDate),  userID, Status.NotActive, id, Status.Active)
            .then(() => {
                resolve();
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
                    resolve(_.map(queryResult, (result: localWhiteBoardType) => this.parseLocalBoardType(result)));
                })
                .catch((error: systemError) => {
                    reject(error);
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

export default new SchoolService();