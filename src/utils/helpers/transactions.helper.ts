export const getTransactions = () => {
    const transactions = localStorage.getItem("transactions");
    return transactions !== null ? JSON.parse(transactions) : [];
};

export const setTransactions = (transactions: Array<object>) => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
};

// export const setTransactionStore = ()
