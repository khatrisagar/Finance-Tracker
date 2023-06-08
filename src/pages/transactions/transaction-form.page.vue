<template>
    <v-sheet width="400" class="mx-auto">
        <v-form @submit.prevent v-if="isTransactionData" ref="form">
            <v-text-field
                v-model="transactionDate"
                label="Transaction Date"
                :rules="transactionDateRules"
                type="date"
            ></v-text-field>

            <v-select
                v-model="monthYear"
                label="Month Year"
                variant="solo-filled"
                :rules="monthYearRules"
                :items="monthYearSelections"
            >
            </v-select>
            <v-select
                v-model="transactionType"
                label="Transaction Type"
                variant="solo-filled"
                :rules="transactionTypeRules"
                :items="transactionTypeSelections"
            ></v-select>

            <v-select
                v-model="fromAccount"
                label="From Account"
                variant="solo-filled"
                :rules="fromAccountRules"
                :items="fromAccountSelections"
            ></v-select>
            <v-select
                v-model="toAccount"
                label="To Account"
                variant="solo-filled"
                :rules="toAccountRules"
                :items="toAccountSelections"
            ></v-select>
            <v-text-field
                v-model="amount"
                label="Amount"
                type="number"
                :rules="amountRules"
            ></v-text-field>
            <v-file-input
                v-model="receipt"
                label="File input"
                variant="solo-inverted"
                :rules="receiptRules"
            ></v-file-input>
            <v-textarea
                v-model="notes"
                label="notes"
                variant="solo-inverted"
                :rules="notesRules"
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

export default {
    created() {
        setUserTransactionState();
        this.setFormTransactionData(this.$route);
    },
    data() {
        return {
            transactionDate: null,
            transactionDateRules: [
                (value) => {
                    if (value) return true;

                    return "Transaction Date Should Not be Empty.";
                },
            ],
            monthYear: null,
            monthYearRules: [
                (value) => {
                    if (value) return true;

                    return "Please Select Month Year.";
                },
            ],
            transactionType: null,
            transactionTypeRules: [
                (value) => {
                    if (value) return true;

                    return "Please Select Transaction Type.";
                },
            ],
            fromAccount: null,
            fromAccountRules: [
                (value) => {
                    if (value) return true;

                    return "Please Select From Account Field.";
                },
                (value) => {
                    if (value !== this.toAccount) return true;

                    return "Value Sould be diffrent from To Account.";
                },
            ],
            toAccount: null,
            toAccountRules: [
                (value) => {
                    if (value) return true;

                    return "Please Select To Account Field.";
                },
                (value) => {
                    if (value !== this.fromAccount) return true;

                    return "Value Sould be diffrent from From Account.";
                },
            ],
            amount: null,
            amountRules: [
                (value) => {
                    if (value) return true;

                    return "Amount Should Not be Empty.";
                },
                (value) => {
                    if (value != 0) return true;

                    return "Amount Should Be Greater Than Zero.";
                },
            ],
            receipt: null,
            receiptRules: [
                (value) => {
                    if (value && value?.length > 0) return true;
                    return "Receipt Should Not be Empty.";
                },
                (value) => {
                    const imageTypes = ["image/png", "image/jpeg", "image/jpg"];
                    if (imageTypes.includes(value?.[0]?.type)) return true;
                    return "File sould be only png, jpg or jpeg.";
                },
                (value) => {
                    if (value?.[0]?.size < 1048576) return true;
                    return "File Size Should Be < 1 MB.";
                },
            ],
            notes: null,
            notesRules: [
                (value) => {
                    if (value) return true;

                    return "Notes Should Not be Empty.";
                },
                (value) => {
                    if (value?.length <= 250) return true;

                    return "Maximum Characters Reached";
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
                    this.transactionDate = transaction.transactionDate;
                    this.monthYear = transaction.monthYear;
                    this.transactionType = transaction.transactionType;
                    this.fromAccount = transaction.fromAccount;
                    this.toAccount = transaction.toAccount;
                    this.amount = transaction.amount;
                    this.notes = transaction.notes;

                    const res = await fetch(transaction.receipt.image);
                    // console.log("res", res);
                    const blob = await res.blob();
                    // console.log("blob", blob);
                    this.receipt = [
                        new File([blob], transaction.receipt.name, {
                            type: transaction.receipt.type,
                        }),
                    ];
                    // console.log(this.receipt, "receipt");
                } else {
                    this.isTransactionData = false;
                }
            } else {
                this.transactionDate = null;
                this.monthYear = null;
                this.transactionType = null;
                this.fromAccount = null;
                this.toAccount = null;
                this.amount = null;
                this.notes = null;
                this.receipt = null;

                this.isFormEditMode = false;
            }
        },

        // on transaction add
        async onFormSubmit() {
            const { valid } = await this.$refs.form.validate();
            if (valid) {
                const reader = new FileReader();
                reader.readAsDataURL(this.receipt[0]);
                let receiptImage;
                reader.onload = () => {
                    receiptImage = reader.result;
                };

                setTimeout(() => {
                    const receiptObject = {
                        image: receiptImage,
                        name: this.receipt[0].name,
                        type: this.receipt[0].type,
                    };
                    const transactionId = new Date().getTime();

                    let transactions = getTransactionFromLocalStorage();
                    transactions.push({
                        id: transactionId,
                        transactionDate: this.transactionDate,
                        monthYear: this.monthYear,
                        transactionType: this.transactionType,
                        fromAccount: this.fromAccount,
                        toAccount: this.toAccount,
                        amount: parseInt(this.amount),
                        receipt: receiptObject,
                        notes: this.notes,
                        userId: this.getLoggedInUserState.loggedInUserId,
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
                const transaction = this.getTransactionstate.find(
                    (transaction) => {
                        return transaction.id == transactionId;
                    }
                );
                const reader = new FileReader();
                reader.readAsDataURL(this.receipt[0]);
                let receiptImage;
                reader.onload = () => {
                    receiptImage = reader.result;
                };
                setTimeout(() => {
                    const receiptObject = {
                        image: receiptImage,
                        name: this.receipt[0].name,
                        type: this.receipt[0].type,
                    };

                    transaction.transactionDate = this.transactionDate;
                    transaction.monthYear = this.monthYear;
                    transaction.transactionType = this.transactionType;
                    transaction.fromAccount = this.fromAccount;
                    transaction.toAccount = this.toAccount;
                    transaction.amount = parseInt(this.amount);
                    transaction.receipt = receiptObject;
                    transaction.notes = this.notes;

                    setTransactionsToLocalStorage(transactions);
                    this.$router.push({ name: "transactions" });
                }, 500);
            }
        },
    },
    computed: {
        ...mapGetters({
            getTransactionstate: "transaction/getTransactionsState",
            getLoggedInUserState: "user/getLoggedInUserState",
        }),
    },
    watch: {
        $route(newRoute) {
            this.setFormTransactionData(newRoute);
        },
    },
};
</script>
