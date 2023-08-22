<template>
  <v-container class="d-flex align-center" v-if="isCollaboratorContainer">
    <v-container>
      <v-text-field
        label="Email address"
        v-model="collaboratorEmail"
        type="email"
        hide-details="auto"
      ></v-text-field>
      <p v-if="collaboratorWarning" class="text-red">
        {{ collaboratorWarning }}
      </p>
    </v-container>
    <v-Btn class="ml-5" @click="addCollaborator">Add Collaborator</v-Btn>
  </v-container>
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
          <td>
            {{
              Intl.NumberFormat("en-in", {
                style: "currency",
                currency: "INR",
              }).format(transaction.amount)
            }}
          </td>
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
      v-if="isOwnerOfTransaction"
      :to="{
        name: 'editTransaction',
        params: { transactionId: transaction.id },
      }"
      ><v-Btn>Edit</v-Btn></router-link
    >
    <v-Btn
      v-if="isOwnerOfTransaction"
      @click="showCollaboratorContainer"
      class="ml-2"
      >Share</v-Btn
    >
    <v-Btn
      v-if="isOwnerOfTransaction"
      @click="deleteTransaction(transaction.id)"
      class="ml-2"
      >Delete</v-Btn
    >
  </v-sheet>
</template>

<script>
import {
  getTransactionFromLocalStorage,
  setTransactionsToLocalStorage,
  getUsersFromLocalStorage,
} from "@/services";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      collaboratorEmail: null,
      isCollaboratorContainer: false,
      collaboratorWarning: null,
      onDeleteWarning: null,
    };
  },
  props: {
    transaction: {
      type: Object,
    },
  },
  methods: {
    showCollaboratorContainer() {
      this.isCollaboratorContainer = true;
    },
    addCollaborator() {
      const transactions = getTransactionFromLocalStorage();
      const transaction = transactions.find(
        (transaction) => transaction.id === this.transaction.id
      );
      const user = getUsersFromLocalStorage().find(
        (user) => user.email === this.collaboratorEmail
      );
      if (user) {
        if (!transaction.users.includes(user.id)) {
          transaction.users.push(user.id);
          this.collaboratorWarning = null;
          this.collaboratorEmail = null;
          setTransactionsToLocalStorage(transactions);
        } else {
          this.collaboratorWarning = "User Already Exist";
        }
      } else {
        this.collaboratorWarning = "User Doesn't Exist";
      }
    },
    deleteTransaction(transactionId) {
      const transactions = getTransactionFromLocalStorage();
      const transactionIndex = transactions.findIndex(
        (transaction) => transaction.id == transactionId
      );

      transactions.splice(transactionIndex, 1);
      setTransactionsToLocalStorage(transactions);
      this.$router.push({ name: "transactions" });
    },
  },
  computed: {
    ...mapGetters({
      getLoggedInUserState: "user/getLoggedInUserState",
    }),
    isOwnerOfTransaction() {
      const user = getUsersFromLocalStorage().find(
        (user) => user.id == this.getLoggedInUserState?.loggedInUserId
      );
      if (user?.transactions?.includes?.(this.transaction?.id)) {
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>
