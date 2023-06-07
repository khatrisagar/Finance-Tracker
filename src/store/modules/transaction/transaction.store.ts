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
    // transactionStateInterFace
    mutations: {
        SET_TRANSACTIONS(state: any, allTransactions: transactionInterface) {
            state.transactions = allTransactions;
        },
        SET_CURRENT_TRANSACTION(state: any, transaction: transactionInterface) {
            state.currentTransaction = transaction;
        },
    },
    actions: {
        setTransactions(
            { commit }: { commit: Commit },
            transaction: transactionInterface
        ) {
            commit("SET_TRANSACTIONS", transaction);
        },
        setCurrentTransaction(
            { commit }: { commit: Commit },
            transaction: transactionInterface
        ) {
            commit("SET_CURRENT_TRANSACTION", transaction);
        },
    },
    getters: {
        getTransactions(state: transactionStateInterFace) {
            return state.transactions;
        },
        getCurrentTransaction(state: transactionStateInterFace) {
            return state.currentTransaction;
        },
    },
};
