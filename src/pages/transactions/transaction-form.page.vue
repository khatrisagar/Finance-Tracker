<template>
    <v-sheet width="400" class="mx-auto">
        <v-form @submit.prevent v-if="isTransactionData" ref="form">
            <v-text-field
                v-model="transaction.transactionDate"
                label="Transaction Date"
                :rules="transactionFormValidation.transactionDateRules"
                type="date"
            ></v-text-field>

            <v-select
                v-model="transaction.monthYear"
                label="Month Year"
                variant="solo-filled"
                :rules="transactionFormValidation.monthYearRules"
                :items="monthYearSelections"
            >
            </v-select>
            <v-select
                v-model="transaction.transactionType"
                label="Transaction Type"
                variant="solo-filled"
                :rules="transactionFormValidation.transactionTypeRules"
                :items="transactionTypeSelections"
            ></v-select>

            <v-select
                v-model="transaction.fromAccount"
                label="From Account"
                variant="solo-filled"
                :rules="fromAccountRules"
                :items="fromAccountSelections"
            ></v-select>
            <v-select
                v-model="transaction.toAccount"
                label="To Account"
                variant="solo-filled"
                :rules="toAccountRules"
                :items="toAccountSelections"
            ></v-select>
            <v-text-field
                v-model="transaction.amount"
                label="Amount"
                type="number"
                :rules="transactionFormValidation.amountRules"
            ></v-text-field>
            <v-file-input
                v-model="transaction.receipt"
                label="File input"
                variant="solo-inverted"
                :rules="transactionFormValidation.receiptRules"
            ></v-file-input>
            <v-textarea
                v-model="transaction.notes"
                label="notes"
                variant="solo-inverted"
                :rules="transactionFormValidation.notesRules"
            ></v-textarea>
            <v-btn
                v-if="!isFormEditMode"
                type="submit"
                @click="onAddTransaction"
                block
                class="mt-2"
                >Add Transaction</v-btn
            >
            <v-btn
                v-if="isFormEditMode"
                type="submit"
                @click="onEditTransaction"
                block
                class="mt-2"
                >Update Transaction</v-btn
            >
        </v-form>
        <v-container class="d-flex justify-center" v-if="!isTransactionData">
            <v-sheet w-100>
                <h2>No Transaction Data Available</h2>
            </v-sheet>
        </v-container>
    </v-sheet>

    <!-- {{ getMonthYear }} -->
</template>

<script>
import { getTransactionFromLocalStorage } from "@/services";
import { setTransactionsToLocalStorage } from "@/services";
import { mapGetters } from "vuex";
import { getUsersFromLocalStorage, setUsersToLocalStorage } from "@/services";
import { setUserTransactionState } from "@/utils";
import { transactionFormValidation } from "@/validations";

export default {
    created() {
        this.initialTransactionObject = JSON.parse(
            JSON.stringify(this.transaction)
        );
        setUserTransactionState();
        this.setFormTransactionData(this.$route);
    },
    data() {
        return {
            initialTransactionObject: null,
            transaction: {
                id: null,
                transactionDate: null,
                monthYear: null,
                transactionType: null,
                fromAccount: null,
                toAccount: null,
                amount: null,
                receipt: null,
                notes: null,
            },
            fromAccountRules: [
                (value) => {
                    if (value) return true;

                    return "Please Select From Account Field.";
                },
                (value) => {
                    if (value !== this.transaction.toAccount) return true;

                    return "Value Sould be diffrent from To Account.";
                },
            ],
            toAccountRules: [
                (value) => {
                    if (value) return true;

                    return "Please Select To Account Field.";
                },
                (value) => {
                    if (value !== this.transaction.fromAccount) return true;

                    return "Value Sould be diffrent from From Account.";
                },
            ],
            isTransactionData: true,
            isFormEditMode: false,

            monthYearSelections: [
                "Jan 2023",
                "Feb 2023",
                "Mar 2023",
                "Arp 2023",
                "May 2023",
                "Jun 2023",
                "Jul 2023",
                "Aug 2023",
                "Sep 2023",
                "Oct 2023",
                "Nov 2023",
                "Des 2023",
            ],
            transactionTypeSelections: [
                "Home Expense",
                "Personal Expense",
                "Income",
            ],
            fromAccountSelections: [
                "Personal Account",
                "Real Living",
                "My Dream Home",
                "Full Circle",
                "Core Realtors",
                "Big Block",
            ],
            toAccountSelections: [
                "Personal Account",
                "Real Living",
                "My Dream Home",
                "Full Circle",
                "Core Realtors",
                "Big Block",
            ],
        };
    },

    methods: {
        convertImageToBase64() {
            return new Promise((resolve) => {
                const reader = new FileReader();
                reader.readAsDataURL(this.transaction.receipt[0]);
                let receiptObject;
                reader.onload = () => {
                    receiptObject = {
                        image: reader.result,
                        name: this.transaction.receipt[0].name,
                        type: this.transaction.receipt[0].type,
                    };
                    resolve(receiptObject);
                };
            });
        },

        // on load edit form
        async setFormTransactionData(route) {
            const transactionId = route.params.transactionId;
            if (transactionId) {
                this.isFormEditMode = true;
                const transaction = this.getTransactionstate.find(
                    (transaction) => {
                        return transaction.id == transactionId;
                    }
                );
                if (transaction) {
                    this.transaction = JSON.parse(JSON.stringify(transaction));

                    const res = await fetch(transaction.receipt.image);
                    const blob = await res.blob();
                    this.transaction.receipt = [
                        new File([blob], transaction.receipt.name, {
                            type: transaction.receipt.type,
                        }),
                    ];
                    console.log;
                } else {
                    this.isTransactionData = false;
                }
            } else {
                this.transaction = this.initialTransactionObject;

                this.isFormEditMode = false;
            }
        },

        // on transaction add
        async onAddTransaction() {
            const { valid } = await this.$refs.form.validate();
            if (valid) {
                const receiptObject = await this.convertImageToBase64();
                setTimeout(() => {
                    const transactionId = new Date().getTime();

                    let transactions = getTransactionFromLocalStorage();
                    transactions.push({
                        ...this.transaction,
                        id: transactionId,
                        receipt: receiptObject,
                        amount: parseInt(this.transaction.amount),
                        users: [this.getLoggedInUserState.loggedInUserId],
                    });
                    const users = getUsersFromLocalStorage();
                    const user = users.find((user) => {
                        return (
                            user.id === this.getLoggedInUserState.loggedInUserId
                        );
                    });
                    user.transactions.push(transactionId);
                    setUsersToLocalStorage(users);
                    setTransactionsToLocalStorage(transactions);
                    this.$router.push({ name: "transactions" });
                }, 500);
            }
        },

        // on form edit
        async onEditTransaction() {
            const { valid } = await this.$refs.form.validate();
            if (valid) {
                const transactionId = this.$route.params.transactionId;
                const transactions = this.getTransactionstate;
                let transactionIndex = transactions.findIndex(
                    (transaction) => transaction.id == transactionId
                );
                const receiptObject = await this.convertImageToBase64();
                transactions[transactionIndex] = {
                    ...JSON.parse(JSON.stringify(this.transaction)),
                    receipt: receiptObject,
                    amount: parseInt(this.transaction.amount),
                };

                setTransactionsToLocalStorage(transactions);
                this.$router.push({ name: "transactions" });
            }
        },
    },
    computed: {
        ...mapGetters({
            getTransactionstate: "transaction/getTransactionsState",
            getLoggedInUserState: "user/getLoggedInUserState",
        }),
        transactionFormValidation() {
            return transactionFormValidation;
        },
    },
    watch: {
        $route(newRoute) {
            this.setFormTransactionData(newRoute);
        },
    },
};
</script>
