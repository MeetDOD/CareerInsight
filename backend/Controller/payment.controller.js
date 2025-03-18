const express = require("express");
const { User } = require("../Models/user.model");
const axios = require("axios");


const CASHFREE_APP_ID = process.env.CASHFREE_APP_ID;
const CASHFREE_SECRET_KEY = process.env.CASHFREE_SECRET_KEY;
const CASHFREE_URL = "https://sandbox.cashfree.com/pg/orders"; // Use production URL in live mode

const createorder = async (req, res) => {

    try {
        const userid = req.user._id;
        const { orderId, orderAmount, customerEmail, customerPhone } = req.body;

        const response = await axios.post(
            CASHFREE_URL,
            {
                order_id: orderId,
                order_amount: orderAmount,
                order_currency: "INR",
                customer_details: {
                    customer_id: "12345",
                    customer_email: customerEmail,
                    customer_phone: customerPhone,
                },
                order_note:userid,
                order_meta: {
                    return_url: `${process.env.CLIENT_URL}/payment-success?order_id={order_id}`,
                },
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    "x-client-id": CASHFREE_APP_ID,
                    "x-client-secret": CASHFREE_SECRET_KEY,
                    "x-api-version": "2022-09-01",
                },
            }
        );

        console.log(response.data);

        res.json(response.data);
    } catch (error) {
        console.error("Error creating order:", error);
        res.status(500).json({ error: "Failed to create order" });
    }
}


const checkStatus = async (req, res) => {
    const orderId = req.params.orderId;

    try {
        const options = {
            method: 'GET',
            url: `https://sandbox.cashfree.com/pg/orders/${orderId}`,
            headers: {
                accept: 'application/json',
                'x-api-version': '2022-09-01',
                'x-client-id': process.env.CASHFREE_APP_ID, // Ensure env variables are used correctly
                'x-client-secret': process.env.CASHFREE_SECRET_KEY
            }
        };

        // Await axios request properly
        const response = await axios.request(options);

        console.log(response.data);

        if (response.data.order_status === "PAID") {
            const user = await User.findById(response.data.order_note);
            
            if (!user) {
                return res.status(404).json({ success: false, message: "User not found" });
            }

            console.log("User found:", user);

            user.subscribed = true;
            await user.save();

            return res.redirect(`${process.env.CLIENT_URL}/success`);
        } else {
            return res.redirect(`${process.env.CLIENT_URL}/failed`);
        }

    } catch (error) {
        console.error("Error fetching order status:", error);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};








module.exports = { createorder ,checkStatus};