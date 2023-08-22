import { createStore } from "vuex";

import user from "@/store/modules/user/user.store";
import transaction from "@/store/modules/transaction/transaction.store";

export default createStore({
    modules: {
        user,
        transaction,
    },
});
