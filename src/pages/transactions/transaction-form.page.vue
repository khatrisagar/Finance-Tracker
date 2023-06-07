<template>
    <v-sheet width="400" class="mx-auto">
        <v-form @submit.prevent>
            <v-text-field
                v-model="transactionDate"
                label="Transaction Date"
                type="date"
            ></v-text-field>

            <v-select
                label="Month Year"
                variant="solo-filled"
                v-model="monthYear"
                :items="monthYearSelections"
            >
            </v-select>
            <v-select
                label="Transaction Type"
                v-model="transactionType"
                variant="solo-filled"
                :items="transactionTypeSelections"
            ></v-select>

            <v-select
                v-model="fromAccount"
                label="From Account"
                variant="solo-filled"
                :items="fromAccountSelections"
            ></v-select>
            <v-select
                v-model="toAccount"
                label="To Account"
                variant="solo-filled"
                :items="toAccountSelections"
            ></v-select>
            <v-text-field
                v-model="amount"
                label="Amount"
                type="number"
            ></v-text-field>
            <v-file-input
                v-model="receipt"
                label="File input"
                variant="solo-inverted"
            ></v-file-input>
            <v-textarea
                v-model="notes"
                label="notes"
                variant="solo-inverted"
            ></v-textarea>
            <v-btn
                v-if="!isFormEditMode"
                type="submit"
                @click="onFormSubmit"
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
    </v-sheet>

    <!-- {{ getMonthYear }} -->
</template>

<script>
import { getTransactions } from "@/utils";
import { setTransactionsToLocalStore } from "@/services";
import { mapGetters } from "vuex";
export default {
    created() {
        this.setFormTransactionData(this.$route);
    },
    data() {
        return {
            transactionDate: null,
            monthYear: null,
            transactionType: null,
            fromAccount: null,
            toAccount: null,
            amount: null,
            receipt: null,
            notes: null,

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
        async setFormTransactionData(route) {
            const transactionId = route.params.transactionId;
            if (transactionId) {
                this.isFormEditMode = true;
                console.log(this.getTransactionstate);
                const transaction = this.getTransactionstate.find(
                    (transaction) => {
                        return transaction.id == transactionId;
                    }
                );
                if (transaction) {
                    this.transactionDate = transaction.transactionDate;
                    this.monthYear = transaction.monthYear;
                    this.transactionType = transaction.transactionType;
                    this.fromAccount = transaction.fromAccount;
                    this.toAccount = transaction.toAccount;
                    this.amount = transaction.amount;
                    // this.receipt = transaction.receipt;
                    this.notes = transaction.notes;

                    const res = await fetch(transaction.receipt);
                    const blob = await res.blob();

                    this.receipt = new File([blob], "uploadedImage", {
                        type: "image/png",
                    });
                } else {
                    this.$router.push({ name: "404" });
                }
            }
        },
        onFormSubmit() {
            const reader = new FileReader();
            reader.readAsDataURL(this.receipt[0]);
            let receiptImage;
            reader.onload = () => {
                receiptImage = reader.result;
            };
            setTimeout(() => {
                let transactions = getTransactions();
                transactions.push({
                    id: new Date().getTime(),
                    transactionDate: this.transactionDate,
                    monthYear: this.monthYear,
                    transactionType: this.transactionType,
                    fromAccount: this.fromAccount,
                    toAccount: this.toAccount,
                    amount: parseInt(this.amount),
                    receipt: receiptImage,
                    notes: this.notes,
                });
                setTransactionsToLocalStore(transactions);
                this.$router.push({ name: "transactions" });
            }, 500);
        },
        async onEditTransaction() {
            const transactionId = this.$route.params.transactionId;
            const transactions = this.getTransactionstate;
            const transaction = this.getTransactionstate.find((transaction) => {
                return transaction.id == transactionId;
            });
            // const reader = new FileReader();
            // reader.readAsDataURL(this.receipt[0]);
            // let receiptImage;
            // reader.onload = () => {
            //     receiptImage = reader.result;
            // };
            setTimeout(() => {
                transaction.transactionDate = this.transactionDate;
                transaction.monthYear = this.monthYear;
                transaction.transactionType = this.transactionType;
                transaction.fromAccount = this.fromAccount;
                transaction.toAccount = this.toAccount;
                transaction.amount = parseInt(this.amount);
                // transaction.receipt = receiptImage;
                transaction.notes = this.notes;

                setTransactionsToLocalStore(transactions);
                this.$router.push({ name: "transactions" });
            }, 500);
        },
    },
    computed: {
        ...mapGetters({
            getTransactionstate: "transaction/getTransactions",
        }),
    },
    watch: {
        $route(newRoute) {
            this.setFormTransactionData(newRoute);
        },
    },
};
</script>
