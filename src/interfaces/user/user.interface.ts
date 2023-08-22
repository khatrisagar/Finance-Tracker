export interface userInterface {
    id: number;
    name: string;
    email: string;
    password: string;
    transactions: number[];
}
export interface userStateInterFace {
    isUserLoggedIn: boolean;
    loggedInUserId: number | null;
    userName: string | null;
}
