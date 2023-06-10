import { recieptInterface } from "@/interfaces";

export const transactionFormValidation = {
    transactionDateRules: [
        (value: string) => {
            if (value) return true;

            return "Transaction Date Should Not be Empty.";
        },
    ],
    monthYearRules: [
        (value: string) => {
            if (value) return true;

            return "Please Select Month Year.";
        },
    ],
    transactionTypeRules: [
        (value: string) => {
            if (value) return true;

            return "Please Select Transaction Type.";
        },
    ],

    amountRules: [
        (value: number) => {
            if (value) return true;

            return "Amount Should Not be Empty.";
        },
        (value: number) => {
            if (value != 0) return true;

            return "Amount Should Be Greater Than Zero.";
        },
    ],
    receiptRules: [
        (value: Array<recieptInterface>) => {
            if (value && value?.length > 0) return true;
            return "Receipt Should Not be Empty.";
        },
        (value: Array<recieptInterface>) => {
            const imageTypes = ["image/png", "image/jpeg", "image/jpg"];
            if (imageTypes.includes(value?.[0]?.type)) return true;
            return "File sould be only png, jpg or jpeg.";
        },
        (value: Array<recieptInterface>) => {
            if (value?.[0]?.size < 1048576) return true;
            return "File Size Should Be < 1 MB.";
        },
    ],
    notesRules: [
        (value: string) => {
            if (value) return true;

            return "Notes Should Not be Empty.";
        },
        (value: string) => {
            if (value?.length <= 250) return true;

            return "Maximum Characters Reached";
        },
    ],
};
