<template>
    <div>
        <div
            v-if="isLoader"
            class="d-flex align-items-center"
            style="align-items: center"
        >
            <p style="height: fit-content">GroupBy:</p>
            <div style="height: fit-content">
                <v-select
                    class="d-inline-block"
                    style="width: fit-content"
                    variant="solo-filled"
                    v-model="groupBy"
                    :items="groupBySelections"
                    :item-title="(item) => item.name"
                    :item-value="(item) => item.key"
                >
                </v-select>
            </div>
        </div>
        <div
            v-if="isLoader"
            class="d-flex align-items-center gap-2"
            style="align-items: center"
        >
            <v-sheet :width="200" class="d-flex">
                <v-select
                    variant="solo-filled"
                    v-model="searchBy"
                    :items="searchSelections"
                    :item-title="(item) => item.name"
                    :item-value="(item) => item.key"
                >
                </v-select>
            </v-sheet>

            <v-sheet :width="500" class="ml-4">
                <v-text-field
                    label="Search"
                    v-model="searchValue"
                    @input="searchTransaction"
                >
                </v-text-field>
            </v-sheet>
        </div>
        <commonTransactionTable
            v-if="groupBy == 'none'"
            :transactionsData="getSearchTransaction"
        />

        <div class="group-by-container" v-if="groupBy != 'none'">
            <div v-for="group in getGroupList" :key="group">
                {{ group }}
                <commonTransactionTable
                    :transactionsData="getGroupByTransactions[group]"
                />
            </div>
        </div>
    </div>
</template>

<script>
import commonTransactionTable from "@/components/common/common-transaction-table.component.vue";
import { mapActions, mapGetters } from "vuex";
import { getTransactions, setLoggedInUserToStore } from "@/utils";
export default {
    components: {
        commonTransactionTable,
    },
    created() {
        this.setTransactionsState(getTransactions());
        setLoggedInUserToStore();
        // localStorage.setItem(
        //     "transactions",
        //     JSON.stringify(this.transactionsData)
        // );
        // this.setUserState();
    },
    data() {
        return {
            isLoader: true,
            searchValue: null,
            searchBy: "none",

            searchSelections: [
                { name: "none", key: "none" },
                { name: "Month Year", key: "monthYear" },
                { name: "Transaction Type", key: "transactionType" },
                { name: "From Account", key: "fromAccount" },
                { name: "To Account", key: "toAccount" },
                { name: "Amount", key: "amount" },
                { name: "Transaction Date", key: "transactionDate" },
            ],
            groupBy: "none",
            groupBySelections: [
                { name: "none", key: "none" },
                { name: "Month Year", key: "monthYear" },
                { name: "Transaction Type", key: "transactionType" },
                { name: "From Account", key: "fromAccount" },
                { name: "To Account", key: "toAccount" },
                { name: "Transaction Date", key: "transactionDate" },
            ],
        };
    },
    methods: {
        ...mapActions({ setTransactionsState: "transaction/setTransactions" }),
    },
    computed: {
        ...mapGetters({ getTransactionsState: "transaction/getTransactions" }),

        getSearchTransaction() {
            let searchTransaction = [];
            if (this.searchBy != "none" && this.searchValue) {
                this.getTransactionsState.forEach((transaction) => {
                    if (transaction[this.searchBy] == this.searchValue) {
                        searchTransaction.push(transaction);
                    }
                });
                console.log("searchTransaction", searchTransaction);
                return searchTransaction;
            } else {
                return this.getTransactionsState;
            }
        },
        getGroupList() {
            const groupList = this.getTransactionsState.map(
                (transaction) => transaction[this.groupBy]
            );
            return [...new Set(groupList)];
        },
        getGroupByTransactions() {
            const groupList = this.getTransactionsState.map(
                (transaction) => transaction[this.groupBy]
            );
            const list = [...new Set(groupList)];
            const groupedObject = {};
            list.forEach((group) => {
                groupedObject[group] = [];
            });
            this.getTransactionsState.forEach((transaction) => {
                list.forEach((group) => {
                    if (group === transaction[this.groupBy]) {
                        groupedObject[group].push(transaction);
                    }
                });
            });
            return groupedObject;
        },
    },
};
</script>
