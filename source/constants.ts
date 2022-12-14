export class SqlParameters {
    public static Id: string  = "id";

}

export class Queries {
    public static WhiteBoardTypes: string = `SELECT * FROM white_board_type WHERE status_id = ?`;
    public static WhiteBoardTypeByID: string = `SELECT * FROM white_board_type WHERE id = ? AND status_id = ?`;
    public static UpdateWhiteBoardTypeByID: string = `UPDATE white_board_type SET white_board_type = ?, update_date = ?, update_user_id = ? WHERE id = ? AND status_id = ?`;
    public static WhiteBoardTypeByTitle: string = `SELECT * FROM white_board_type WHERE id = ?`;
    public static AddWhiteBoardType: string = `INSERT white_board_type (white_board_type, create_date, update_date, create_user_id, update_user_id, status_id) VALUES (?, ?, ?, ?, ?, ?)`;
    public static SelectIdentity: string = `SELECT SCOPE_IDENTITY() AS id`;
    public static DeleteBoardTypeByID: string = `UPDATE white_board_type SET update_date = ?, update_user_id = ?, status_id = ? WHERE id = ? AND status_id = ?`;

    public static GetUserByLogin: string = `SELECT id, password, role_id FROM [user] WHERE login = ?`;

    public static UpdateUserByID: string = `UPDATE [user] SET first_name = ?, last_name = ?, update_date = ?, update_user_id = ? WHERE id = ? AND status_id = ?`;
    public static AddUser: string = `INSERT [user] (first_name, last_name, login, password, role_id, create_date, update_date, create_user_id, update_user_id, status_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    public static DeleteUserByID: string = `UPDATE [user] SET update_date = ?, update_user_id = ?, status_id = ? WHERE id = ? AND status_id = ?`;
}

export const DB_CONNECTION_STRING: string = "server=.;Database=masa_school;Trusted_Connection=Yes;Driver={SQL Server Native Client 11.0}";
export const NON_EXISTENT_ID: number = -1;
export const TOKEN_SECRET: string = "b0a6b2e5-5839-4a86-8133-564fee43c482";

