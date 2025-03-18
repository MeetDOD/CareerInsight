import { load } from "@cashfreepayments/cashfree-js";

let cashfree;

const initializeCashfree = async () => {
    cashfree = await load({
        mode: "sandbox" // or "production"
    });
};

initializeCashfree();

export { cashfree };
