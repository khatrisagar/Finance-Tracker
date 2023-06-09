import { getTransactionFromLocalStorage } from "@/services";
import { transactionInterface } from "@/interfaces";
import store from "@/store";

export const setUserTransactionState = () => {
  const userTransactions = getTransactionFromLocalStorage().filter(
    (transaction: transactionInterface) =>
      transaction.users.includes(
        store.getters["user/getLoggedInUserState"].loggedInUserId
      )
  );
  console.log(getTransactionFromLocalStorage());
  store.dispatch("transaction/setTransactionsState", userTransactions);
};
