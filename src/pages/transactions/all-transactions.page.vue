<template>
    <div v-if="isTransactionData">
        <div class="d-flex align-center">
            <div class="d-flex align-items-center" style="align-items: center">
                <p style="height: fit-content">GroupBy:</p>
                <div style="height: fit-content">
                    <v-select
                        class="d-inline-block"
                        style="width: fit-content"
                        variant="solo-filled"
                        hide-details="auto"
                        v-model="groupBy"
                        :items="groupBySelections"
                        :item-title="(item) => item.name"
                        :item-value="(item) => item.key"
                    >
                    </v-select>
                </div>
            </div>
            <v-spacer></v-spacer>
            <div
                class="d-flex align-items-center -2 gap-2"
                style="align-items: center"
                v-if="isSearchContainer"
            >
                <v-sheet :width="200" class="d-flex">
                    <v-select
                        variant="solo-filled"
                        v-model="searchBy"
                        hide-details="auto"
                        :items="searchSelections"
                        :item-title="(item) => item.name"
                        :item-value="(item) => item.key"
                    >
                    </v-select>
                </v-sheet>

                <v-sheet :width="500" class="ml-4">
                    <v-text-field
                        label="Search"
                        hide-details="auto"
                        v-model="searchValue"
                        @input="searchTransaction"
                    >
                    </v-text-field>
                </v-sheet>
            </div>
            <v-Btn class="ml-2" @click="toggleSeachContainer" icon>
                <v-icon v-if="!isSearchContainer">fa fa-search</v-icon>
                <v-icon v-if="isSearchContainer">fa-solid fa-xmark </v-icon>
            </v-Btn>
        </div>
        <commonTransactionTable
            class="mt-4"
            v-if="groupBy == 'none'"
            :colors="colors"
            :transactionsData="getSearchTransaction"
        />

        <div class="group-by-container mt-4" v-if="groupBy != 'none'">
            <div
                v-for="group in Object.keys(getGroupByTransactions)"
                :key="group"
                class="ma-2"
            >
                <v-chip :color="getFieldColor(group)" label class="mb-4">
                    {{ group }}
                </v-chip>
                <commonTransactionTable
                    :transactionsData="getGroupByTransactions[group]"
                    :colors="colors"
                />
            </div>
        </div>
    </div>
    <v-container class="d-flex justify-center" v-if="!isTransactionData">
        <v-sheet w-100>
            <h2>No Transaction Data Available</h2>
        </v-sheet>
    </v-container>
</template>

<script>
import commonTransactionTable from "@/components/common/common-transaction-table.component.vue";
import { mapActions, mapGetters } from "vuex";
import { setUserTransactionState } from "@/utils";
export default {
    components: {
        commonTransactionTable,
    },
    created() {
        setUserTransactionState();
        if (this.getTransactionsState.length === 0) {
            this.isTransactionData = false;
        } else {
            this.isTransactionData = true;
        }
    },
    data() {
        return {
            isTransactionData: true,
            isSearchContainer: false,
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
            colors: [
                {
                    fieldName: [
                        "Personal Expense",
                        "My Dream Home",
                        "Jan 2023",
                    ],
                    color: "#FB8C00",
                },
                {
                    fieldName: ["Home Expense", "Personal Account", "Feb 2023"],
                    color: "#29B6F6",
                },
                {
                    fieldName: ["Real Living", "Mar 2023"],
                    color: "#FF3D00",
                },
                {
                    fieldName: ["Full Circle", "Arp 2023"],
                    color: "#FFC400",
                },
                {
                    fieldName: ["Core Realtors", "May 2023"],
                    color: "#F9A825",
                },
                {
                    fieldName: ["Big Block", "Jun 2023"],
                    color: "#76FF03",
                },
                {
                    fieldName: ["Jul 2023", "Transaction Date"],
                    color: "#33691E",
                },
                {
                    fieldName: ["Aug 2023", "Income"],
                    color: "#1DE9B6",
                },
                {
                    fieldName: ["Sep 2023"],
                    color: "#01579B",
                },
                {
                    fieldName: ["Oct 2023"],
                    color: "#7C4DFF",
                },
                {
                    fieldName: ["Nov 2023"],
                    color: "#FF4081",
                },
                {
                    fieldName: ["Des 2023"],
                    color: "#FF5252",
                },
            ],
        };
    },
    methods: {
        ...mapActions({
            setTransactionsState: "transaction/setTransactionsState",
        }),
        toggleSeachContainer() {
            this.isSearchContainer = !this.isSearchContainer;
            this.searchBy = "none";
            this.searchValue = null;
        },
        getFieldColor(name) {
            const colorObj = this.colors.find((colorObj) => {
                if (colorObj.fieldName.includes(name)) {
                    return colorObj;
                }
            });
            return colorObj?.color;
        },
    },
    computed: {
        ...mapGetters({
            getTransactionsState: "transaction/getTransactionsState",
            getLoggedInUserState: "user/getLoggedInUserState",
        }),

        getSearchTransaction() {
            let searchTransaction = [];
            if (this.searchBy != "none" && this.searchValue) {
                this.getTransactionsState.forEach((transaction) => {
                    if (transaction[this.searchBy] == this.searchValue) {
                        searchTransaction.push(transaction);
                    }
                });
                return searchTransaction;
            } else {
                return this.getTransactionsState;
            }
        },
        // getGroupList() {
        //     const groupList = this.getTransactionsState.map(
        //         (transaction) => transaction[this.groupBy]
        //     );
        //     return [...new Set(groupList)];
        // },
        getGroupByTransactions() {
            // const groupList = this.getTransactionsState.map(
            //     (transaction) => transaction[this.groupBy]
            // );
            // const list = [...new Set(groupList)];
            // const groupedObject = {};
            // list.forEach((group) => {
            //     groupedObject[group] = [];
            // });
            // this.getTransactionsState.forEach((transaction) => {
            //     list.forEach((group) => {
            //         if (group === transaction[this.groupBy]) {
            //             groupedObject[group].push(transaction);
            //         }
            //     });
            // });

            const groupByObject = (transactions, groupBy) => {
                return transactions.reduce((groupedData, currentValue) => {
                    let groupKey = currentValue[groupBy];
                    if (!groupedData[groupKey]) {
                        groupedData[groupKey] = [];
                    }
                    groupedData[groupKey].push(currentValue);
                    return groupedData;
                }, {});
            };
            const groupedObject = groupByObject(
                this.getSearchTransaction,
                this.groupBy
            );
            return groupedObject;
        },
    },
};
</script>
