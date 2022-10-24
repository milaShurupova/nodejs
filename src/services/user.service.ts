import { Queries } from "../constants";
import { SqlHelper } from "../helpers/sql.helper";
import _ from 'underscore';
import { Status } from "../enums";
import { DateHelper } from "../helpers/date.helper";
import { entityWithId, systemError, user } from "../entities";
import { ErrorService } from "./error.service";
import { Role } from "../enums";

interface IUserService {

    updateById(user: user, userID: number): Promise<user>;
    add(user: user, userID: number): Promise<user>;
    deleteById(id: number, userID: number): Promise<void>;
    
}


export class UserService implements IUserService {

    constructor(
        private errorService: ErrorService
        ) {}
    
    public updateById(user: user, userID: number): Promise<user> {
        return new Promise<user>((resolve, reject) => {
            const updateDate: Date = new Date();

            SqlHelper.executeQueryNoResult(this.errorService, Queries.UpdateUserByID, false, user.firstName, user.lastName, DateHelper.dateToString(updateDate), userID, user.id, Status.Active)
            .then(() => {
                resolve(user);
            })
            .catch((error: systemError) => {
                reject(error);
            });

        })
    }

    public add(user: user, userID: number): Promise<user> {
        return new Promise<user>((resolve, reject) => {
            const createDate: string = DateHelper.dateToString(new Date());

            SqlHelper.createNew(this.errorService, Queries.AddUser, user, user.firstName, user.lastName, user.login as string, user.password as string, Role.RegularUser, createDate, createDate, userID, userID, Status.Active)
            .then((result: entityWithId) => {
                resolve(result as user);
            })
            .catch((error: systemError) => {
                reject(error);
            });

        })
    }

    public deleteById(id: number, userID: number): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            const updateDate: Date = new Date();

            SqlHelper.executeQueryNoResult(this.errorService, Queries.DeleteUserByID, true, DateHelper.dateToString(updateDate),  userID, Status.NotActive, id, Status.Active)
            .then(() => {
                resolve();
            })
            .catch((error: systemError) => {
                reject(error);
            });
        })
    }

}