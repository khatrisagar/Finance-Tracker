<template>
    <div v-if="isTransactionData">
        <viewTransactionCard :transaction="getCurrentTransactionState" />
    </div>
    <v-container class="d-flex justify-center" v-if="!isTransactionData">
        <v-sheet w-100>
            <h2>No Transaction Data Available</h2>
        </v-sheet>
    </v-container>
</template>

<script>
import viewTransactionCard from "@/components/common/view-transaction-card.component.vue";
import { mapActions, mapGetters } from "vuex";
import { setUserTransactionState } from "@/utils";
export default {
    components: {
        viewTransactionCard,
    },
    created() {
        setUserTransactionState();
        const currentTransaction = this.getTransactionsState.find(
            (transaction) => {
                return transaction.id == this.$route.params.transactionId;
            }
        );
        if (currentTransaction) {
            this.setCurrentTransactionState(currentTransaction);
            this.isTransactionData = true;
        } else {
            this.isTransactionData = false;
        }
    },
    data() {
        return {
            isTransactionData: false,
        };
    },
    methods: {
        ...mapActions({
            setCurrentTransactionState:
                "transaction/setCurrentTransactionState",
        }),
    },
    computed: {
        ...mapGetters({
            getTransactionsState: "transaction/getTransactionsState",
            getCurrentTransactionState:
                "transaction/getCurrentTransactionState",
        }),
    },
};
</script>
