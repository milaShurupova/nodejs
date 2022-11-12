import _ from "underscore";
import { Queries } from "../../constants";
import { whiteBoardType, systemError, entityWithId, classRoom, teacherGraduation, teacher, status } from "../../entities";
import { AppError, Status, TableNames } from "../../enums";
import { DateHelper } from "../../framework/date.helper";
import { SqlHelper } from "../../core/sql.helper";
import ErrorService from "../../core/error.service";
import DbService from "../../core/db.service"


interface localWhiteBoardType {
    id: number;
    white_board_type: string;
    create_date: Date;
    update_date: Date;
    create_user_id: number;
    update_user_id: number;
    status_id: Status;
}

interface localClassRoom {
    id: number;
    room_number: number;
    room_floor: number;
    is_has_projector: boolean;
    create_user_id: number;
    create_user_first_name: string;
    create_user_last_name: string;
    update_user_id: number;
    update_user_first_name: string;
    update_user_last_name: string;
    white_board_type_id: number;
    white_board_type: string;

}

interface localTeacher {
    id: number;
    first_name: string;
    last_name: string;
    is_male: boolean;
    birthdate: Date;
    profession_id: number;
    profession: string;
    graduation_year: number;
}

interface ISchoolService {

    getBoardTypes(): Promise<whiteBoardType[]>;
    getBoardTypeById(id: number): Promise<whiteBoardType>;
    updateBoardTypeById(whiteBoardType: whiteBoardType, userID: number): Promise<whiteBoardType>;
    addBoardType(whiteBoardType: whiteBoardType, userID: number): Promise<whiteBoardType>;
    deleteBoardTypeById(id: number, userID: number): Promise<void>;
    getBoardTypeByTitle(title: string): Promise<whiteBoardType[]>;

    getRoomById(id: number): Promise<classRoom>;
    addRoom(room: classRoom, userId: number): Promise<classRoom>;
    updateRoomById(room: classRoom, userId: number): Promise<classRoom>;

    getTeacherById(id: number): Promise<teacher>;
    updateTeacherById(room: teacher, userId: number): Promise<teacher>;

    //getStatusById(id: number): Promise<status>;
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

    


    public async getRoomById(id: number): Promise<classRoom> {
        return new Promise<classRoom>((resolve, reject) => {
     
            SqlHelper.executeQuerySingleResult<localClassRoom>(Queries.GetRoomById, id, Status.Active)
                .then((queryResult: localClassRoom) => {
                    resolve(this.parseLocalClassRoom(queryResult));
                })
                .catch((error: systemError) => {
                    reject(error);
                });
            });
    }
    
    public updateRoomById(room: classRoom, userID: number): Promise<classRoom> {
        return new Promise<classRoom>((resolve, reject) => {
            const updateDate: Date = new Date();

            SqlHelper.executeQueryNoResult<classRoom>(Queries.UpdateRoomById, false, room.roomNumber, room.roomFloor, room.hasProjector, room.whiteBoardType.id, DateHelper.dateToString(updateDate), userID, room.id, Status.Active)
                .then(() => {
                    return this.getRoomById(room.id);
                })
                .then((result: classRoom) => {
                    resolve(result);
                })
                .catch((error: systemError) => {
                    reject(error);
                });

        })
    }

    public async addRoom(room: classRoom, userId: number): Promise<classRoom> {
        return new Promise<classRoom>((resolve, reject) => {
            const now = DateHelper.dateToString(new Date);
            SqlHelper.createNew(Queries.AddRoom, room, room.roomNumber, room.roomFloor, room.hasProjector, room.whiteBoardType.id, userId, room.id, Status.Active)
                .then((result: entityWithId) => {
                    return this.getRoomById(room.id);
                })
                .then((result: classRoom) => {
                    resolve(result);
                })
                .catch((error: systemError) => {
                    reject(error);
                });
        })

    }

    public async getTeacherById(id: number): Promise<teacher> {
        return new Promise<teacher>((resolve, reject) => {
     
            SqlHelper.executeQueryArrayResult<localTeacher>(Queries.GetTeacherById, id)
                .then((queryResult: localTeacher[]) => {
                    resolve(this.parseLocalTeacher(queryResult));
                })
                .catch((error: systemError) => {
                    reject(error);
                });
        });
    }

    public updateTeacherById(teacher: teacher, userID: number): Promise<teacher> {
        return new Promise<teacher>((resolve, reject) => {

            SqlHelper.executeQueryNoResult(Queries.EraseTeacherProfessionByTeacherId, true, teacher.id)
                .then(() => {
                    teacher.birthdate = new Date(teacher.birthdate as unknown as string);
                    const promises: Promise<void>[]= _.map(teacher.graduations, (graduation: teacherGraduation, index: number) => {
                        return SqlHelper.executeQueryNoResult(Queries.AddProfessionToTeacher, false, teacher.id, graduation.profession.id, graduation.graduationYear, index + 1 )
                    });
                    promises.push(
                        SqlHelper.executeQueryNoResult(Queries.UpdateTeacherById, false, teacher.firstName, teacher.lastName, teacher.isMale, DateHelper.dateToString(teacher.birthdate), teacher.id)
                    );

                    return Promise.all(promises);
                    
                })
                .then(() => {
                    return this.getTeacherById(teacher.id);
                })
                .then((result: teacher) => {
                    resolve(result);
                })
                .catch((error: systemError) => {
                    reject(error);
                });
        });
    }

    public async getStatusById(id: number): Promise<status> {
        return await DbService.getFromTableById(TableNames.Status, id);
    }

    private parseLocalClassRoom(local: localClassRoom): classRoom {
        return {
            id: local.id,
            roomFloor: local.room_floor,
            roomNumber: local.room_number,
            hasProjector: local.is_has_projector,
            createUser: {
                id: local.create_user_id,
                firstName: local.create_user_first_name,
                lastName: local.create_user_last_name,
            },
            updateUser: {
                id: local.update_user_id,
                firstName: local.update_user_first_name,
                lastName: local.update_user_last_name,
            },
            whiteBoardType: {
                id: local.white_board_type_id,
                type: local.white_board_type
            }
        };
    }

    private parseLocalBoardType(local: localWhiteBoardType): whiteBoardType {
        return {
            id: local.id,
            type: local.white_board_type,
        };
    }

    private parseLocalTeacher(local: localTeacher[]): teacher {
        if (local.length === 0) {
            throw ErrorService.getError(AppError.NoData);
        }

        return {
            id: local[0].id,
            firstName: local[0].first_name,
            lastName: local[0].last_name,
            birthdate: local[0].birthdate,
            isMale: local[0].is_male,
            graduations: _.map(local, (teacher: localTeacher) => {
                return {
                    profession: {
                        id: teacher.profession_id,
                        title: teacher.profession
                    },
                    graduationYear: teacher.graduation_year
                };
            })
        };
    }

    private parseLocalTeachers(local: localTeacher[]): teacher[] {
        const teacherGroups: _.Dictionary<localTeacher[]> = _.groupBy(local, (teacher: localTeacher) => teacher.id);
        const result: teacher[] = [];

        for (let key in teacherGroups) {
            let value: localTeacher[] = teacherGroups[key];
            result.push(this.parseLocalTeacher(value));
        }
       return result;
    }

}

export default new SchoolService();