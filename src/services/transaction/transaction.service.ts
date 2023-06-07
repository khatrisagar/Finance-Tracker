import { transactionInterface } from "@/interfaces";
export const getTransactionFromLocalStorage = () => {
    console.log("gettt");
};
export const setTransactionsToLocalStore = (
    transactions: transactionInterface
) => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
};
