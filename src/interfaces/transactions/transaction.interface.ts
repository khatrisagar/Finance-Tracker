export interface transactionInterface {
    id: number;
    transactionDate: string;
    monthYear: string;
    transactionType: string;
    fromAccount: string;
    toAccount: string;
    amount: number;
    receipt: string;
    notes: string;
    users: number[];
}
export interface transactionStateInterFace {
    transactions: Array<transactionInterface>;
    currentTransaction: transactionInterface | null;
}
