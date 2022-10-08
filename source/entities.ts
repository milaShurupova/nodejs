import { Request } from "express";
import { AppError, Role } from "./enums";

export interface entityWithId {
    id: number;
}

export interface whiteBoardType extends entityWithId {
    type: string;   
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

export interface authenticatedRequest extends Request, authenticationToken {}

export interface user extends entityWithId {
    firstName: string;
    lastName: string;
    login?: string;
    password?: string;
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