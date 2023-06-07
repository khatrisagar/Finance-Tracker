export interface transactionInterface {
    id: string;
    transactionDate: string;
    monthYear: string;
    transactionType: string;
    fromAccount: string;
    toAccount: string;
    amount: number;
    receipt: string;
    notes: string;
}
export interface transactionStateInterFace {
    transactions: Array<transactionInterface>;
    currentTransaction: transactionInterface | null;
}
