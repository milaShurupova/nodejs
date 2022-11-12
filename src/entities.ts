import { Request } from "express";
import { AppError, Role, Status } from "./enums";

export interface entityWithId {
    id: number;
}

export interface entityBase extends entityWithId {
    createDate?: string;
    updateDate?: string;
    createUser?: user;
    updateUser?: user;
    statusId?: Status;
}

export interface whiteBoardType extends entityBase {
    type: string;  
    createUserID?: number; // will remove later
    updateUserID?: number; // will remove later
}

export interface classRoom extends entityBase {
    roomNumber: number;
    roomFloor: number;
    hasProjector: boolean;
    whiteBoardType: whiteBoardType;
}

export interface teacher extends entityWithId {
    firstName: string;
    lastName: string;
    birthdate: Date;
    isMale: boolean;
    graduations: teacherGraduation[];
}

export interface profession extends entityWithId {
    title: string;
}

export interface teacherGraduation {
    profession: profession;
    graduationYear: number;
}

export interface systemError {
    key: AppError;
    code: number;
    message: string;
}

export interface sqlParameter {
    name: string;
    type: any;
    value: string | number;
}

export interface authenticationToken {
    userData: jwtUserData;
}

export interface jwtUserData {
    userId: number;
    roleId: Role;
    // roles: Role[];
}

export interface AuthenticatedRequest extends Request, authenticationToken {}

export interface user extends entityWithId {
    firstName: string;
    lastName: string;
    login?: string;
    password?: string;
}

export interface status extends entityWithId {
    statusName: string;
}

export interface environment {
    dbConnectionString: string;
    tokenSecret: string;
    logsFolder: string;
    serverPort: number;
}

// for a few roles from Homework
// interface LocalRole {
//     role_id: number;
// }

// const dbResult: LocalRole[] = [
//     12,
//     15,
//     2
// ]

// dblResult.forEach(element => {
//     jwtData.roles.push(element);
// });

// const jwtData: jwtUserData = {
//     userID: <user id >,
//     roles: []
// }