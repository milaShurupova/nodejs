export class ErrorCodes {
    public static GeneralError: number = 99;
    public static ConnectionError: number = 100;
    public static QueryError: number = 101;
    public static NoData: number = 102;
    public static NonNumericInput: number = 103;
    public static InputParameterNotSupplied: number = 104;

}

export class ErrorMessages {
    public static GeneralErrorMessage: string = "General Error, debug me!"
    public static DbConnectionError: string = "DB server connection error";
    public static SqlQueryError: string = "Incorrect query";
    public static NoDataFound: string = "Not found";
    public static NonNumericInput: string = "Non numberic input";
    public static InputParameterNotSupplied: string = "Input parameter not supplied";
}

export class SqlParameters {
    public static Id: string  = "id";

}

export class Queries {
    public static WhiteBoardTypes: string = `SELECT * FROM white_board_type`;
    public static WhiteBoardTypeByID: string = `SELECT * FROM white_board_type WHERE id = ?`;
    public static UpdateWhiteBoardTypeByID: string = `UPDATE white_board_type SET white_board_type = ? WHERE id = ?`;
    public static WhiteBoardTypeByTitle: string = `SELECT * FROM white_board_type WHERE id = ?`;
    public static AddWhiteBoardType: string = `INSERT white_board_type (white_board_type) VALUES (?)`;
    public static SelectIdentity: string = `SELECT SCOPE_IDENTITY() AS id`;
    public static DeleteBoardTypeByID: string = `DELETE FROM white_board_type WHERE id = ?`;

}

export const DB_CONNECTION_STRING: string = "server=.;Database=masa_school;Trusted_Connection=Yes;Driver={SQL Server Native Client 11.0}";
export const NON_EXISTENT_ID: number = -1;

