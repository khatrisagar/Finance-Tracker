<template>
    <v-sheet
        :elevation="5"
        border
        rounded
        class="ma-10 py-5 d-flex justify-center"
    >
        <v-table class="w-75 d-flex justify-center">
            <thead class="text-h5">
                <tr>
                    <th>Transaction Id</th>
                    <th>{{ transaction.id }}</th>
                </tr>
            </thead>
            <tbody class="text-subtitle-1">
                <tr>
                    <td>Transaction Date</td>
                    <td>{{ transaction.transactionDate }}</td>
                </tr>
                <tr>
                    <td>Month Year</td>
                    <td>{{ transaction.monthYear }}</td>
                </tr>
                <tr>
                    <td>Transaction Type</td>
                    <td>{{ transaction.transactionType }}</td>
                </tr>
                <tr>
                    <td>From Account</td>
                    <td>{{ transaction.fromAccount }}</td>
                </tr>
                <tr>
                    <td>To Account</td>
                    <td>{{ transaction.toAccount }}</td>
                </tr>
                <tr>
                    <td>Amount</td>
                    <td>{{ transaction.amount }}</td>
                </tr>
                <tr>
                    <td>Receipt</td>
                    <td>
                        <v-img
                            :width="400"
                            aspect-ratio="16/9"
                            cover
                            :src="transaction.receipt.image"
                        ></v-img>
                    </td>
                </tr>
                <tr>
                    <td>Notes</td>
                    <td>{{ transaction.notes }}</td>
                </tr>
            </tbody>
        </v-table>
        <router-link
            :to="{
                name: 'editTransaction',
                params: { transactionId: transaction.id },
            }"
            >Edit</router-link
        >
    </v-sheet>
</template>

<script>
export default {
    props: {
        transaction: {
            type: Object,
        },
    },
};
</script>
