export enum Status {
    Active = 1,
    NotActive = 2
}

export enum Role {
    Administator = 1,
    RegularUser = 2
}

export enum  AppError {
    General = "General",
    ConnectionError = "ConnectionError",
    QueryError = "QueryError",
    NoData = "NoData",
    NonNumericInput = "NonNumericInput",
    InputParameterNotSupplied = "InputParameterNotSupplied",
    DeletionConflict = "DeletionConflict",
}