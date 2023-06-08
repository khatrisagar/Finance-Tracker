import { Commit } from "vuex";
import { transactionInterface, transactionStateInterFace } from "@/interfaces";

export default {
    namespaced: true,
    state() {
        return {
            transactions: [],
            currentTransaction: null,
        };
    },
    mutations: {
        SET_TRANSACTIONS(
            state: transactionStateInterFace,
            allTransactions: transactionInterface[]
        ) {
            state.transactions = allTransactions;
        },
        SET_CURRENT_TRANSACTION(
            state: transactionStateInterFace,
            transaction: transactionInterface
        ) {
            state.currentTransaction = transaction;
        },
    },
    actions: {
        setTransactionsState(
            { commit }: { commit: Commit },
            transaction: transactionInterface
        ) {
            commit("SET_TRANSACTIONS", transaction);
        },
        setCurrentTransactionState(
            { commit }: { commit: Commit },
            transaction: transactionInterface
        ) {
            commit("SET_CURRENT_TRANSACTION", transaction);
        },
    },
    getters: {
        getTransactionsState(state: transactionStateInterFace) {
            return state.transactions;
        },
        getCurrentTransactionState(state: transactionStateInterFace) {
            return state.currentTransaction;
        },
    },
};
