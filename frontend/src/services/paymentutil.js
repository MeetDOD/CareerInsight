import { load } from "@cashfreepayments/cashfree-js";


export const cashfree = await load({
	mode: "sandbox" //or production
});
//This load function returns a Promise that resolves with a newly created Cashfree object once Cashfree.js has loaded. If you call load in a server environment it will resolve to null.


