import { transactionInterface } from "@/interfaces";
export const getTransactionFromLocalStorage = () => {
    const transactions = localStorage.getItem("transactions");
    return transactions !== null ? JSON.parse(transactions) : [];
};
export const setTransactionsToLocalStorage = (
    transactions: transactionInterface
) => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
};
