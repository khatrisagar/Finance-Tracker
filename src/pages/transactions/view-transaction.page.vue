<template>
    <div v-if="isTransactionData">
        <viewTransactionCard :transaction="getCurrentTransaction" />
    </div>
    <div v-if="!isTransactionData">No transactions Found</div>
</template>

<script>
import viewTransactionCard from "@/components/common/view-transaction-card.component.vue";
import { mapActions, mapGetters } from "vuex";
export default {
    components: {
        viewTransactionCard,
    },
    created() {
        const currentTransaction = this.getTransactions.find((transaction) => {
            return transaction.id == this.$route.params.transactionId;
        });
        if (currentTransaction) {
            this.setCurrentTransaction(currentTransaction);
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
            setCurrentTransaction: "transaction/setCurrentTransaction",
        }),
    },
    computed: {
        ...mapGetters({
            getTransactions: "transaction/getTransactions",
            getCurrentTransaction: "transaction/getCurrentTransaction",
        }),
    },
};
</script>
