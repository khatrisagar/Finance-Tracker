export interface recieptInterface {
    size: number;
    type: string;
    image: string;
}

export interface transactionInterface {
    id: number;
    transactionDate: string;
    monthYear: string;
    transactionType: string;
    fromAccount: string;
    toAccount: string;
    amount: number;
    receipt: Array<recieptInterface>;
    notes: string;
    users: number[];
}
export interface transactionStateInterFace {
    transactions: Array<transactionInterface>;
    currentTransaction: transactionInterface | null;
}
