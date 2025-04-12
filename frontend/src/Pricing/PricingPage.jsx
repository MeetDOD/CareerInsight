import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { HiCheckCircle, HiLightningBolt } from "react-icons/hi";
import { ShinyButton } from "@/components/magicui/shiny-button";
import { cashfree } from "@/services/paymentutil";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { userState } from "@/store/auth";

const PricingSection = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const user1 = useRecoilValue(userState);
  const [sessionid, setSessionid] = useState("");

  const createrandomorderid = () => {
    return Math.random().toString(36).substring(7);
  };

  const handleUpgrade = async () => {
    const orderId = createrandomorderid();
    const formdata = new FormData();
    formdata.append("customerEmail", user1.email);
    formdata.append("customerPhone", `${user1.phoneno}`);
    formdata.append("orderAmount", 99);
    formdata.append("orderId", orderId);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/payment/pay`,
        formdata,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 200) {
        setSessionid(response.data.payment_session_id);

        let checkoutOptions = {
          paymentSessionId: response.data.payment_session_id,
          returnUrl: `${import.meta.env.VITE_BASE_URL}/api/payment/verify/${orderId}`,
        };

        cashfree.checkout(checkoutOptions).then(function (result) {
          if (result.error) {
            console.log(result.error);
          }
          if (result.redirect) {
            console.log(result.redirect);
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container px-5 mt-16 mx-auto">
      <div className="flex flex-col items-center gap-2 my-10 px-4 mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-center">
          Our <span className="text-primary">Pricing</span>
        </h1>
        <p className="text-center text-lg opacity-90 tracking-tight">
          Unlock the full potential of <span className="font-semibold">Career Insight</span> with AI-powered
          tools. Get started for free or go unlimited for just <span className="font-semibold">₹99/month</span>.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-6 items-center">
        <div
          className="p-6 w-full sm:w-80 rounded-xl border shadow-md"
          style={{
            backgroundColor: `var(--background-color)`,
            color: `var(--text-color)`,
            borderColor: `var(--borderColor)`,
          }}
        >
          <h2 className="text-sm font-semibold uppercase">Free Plan</h2>
          <h1 className="text-4xl font-bold mt-2">₹0/month</h1>
          <p className="text-gray-600 mt-2">Try all features up to 3 times</p>
          <div className="mt-4 space-y-2">
            <p className="flex items-center gap-2">
              <HiCheckCircle className="text-green-500 text-xl" /> Create Course
              upto 3 times
            </p>
            <p className="flex items-center gap-2">
              <HiCheckCircle className="text-green-500 text-xl" /> AI Resume
              upto 3 times
            </p>
            <p className="flex items-center gap-2">
              <HiCheckCircle className="text-green-500 text-xl" /> AI Portfolio
              upto 3 times
            </p>
            <p className="flex items-center gap-2">
              <HiCheckCircle className="text-green-500 text-xl" /> AI Mock
              Interview upto 3 times
            </p>
          </div>
          <Button className="w-full mt-6">GET STARTED</Button>
        </div>

        <div className="p-8 w-full sm:w-96 border border-primary rounded-xl shadow-md text-white bg-gradient-to-r from-[#7c3aed] to-[#00FFF1] magic-border transform scale-105">
          <h2 className="text-sm font-semibold uppercase">Pro Plan</h2>
          <h1 className="text-5xl font-bold mt-2 break-words">₹99/month</h1>
          <p className="mt-2">Unlimited access to all features</p>
          <div className="mt-4 space-y-3">
            <p className="flex items-center gap-2">
              <HiLightningBolt className="text-yellow-300 text-xl" /> Unlimited
              Course Creation
            </p>
            <p className="flex items-center gap-2">
              <HiLightningBolt className="text-yellow-300 text-xl" /> Unlimited
              AI Resume Builder
            </p>
            <p className="flex items-center gap-2">
              <HiLightningBolt className="text-yellow-300 text-xl" /> Unlimited
              AI Portfolio Builder
            </p>
            <p className="flex items-center gap-2">
              <HiLightningBolt className="text-yellow-300 text-xl" /> Unlimited
              AI Mock Interviews
            </p>
          </div>

          {/* Disable button if user is already subscribed */}
          <ShinyButton
            onClick={handleUpgrade}
            className={`py-3 w-full mt-6 font-semibold text-lg 
              ${user1?.subscribed ? "bg-gray-400 text-gray-700 cursor-not-allowed" : "bg-white text-gray-900"}`}
            disabled={user1?.subscribed}
          >
            {user1?.subscribed ? "Subscribed" : "Upgrade Now"}
          </ShinyButton>
        </div>
      </div>
    </div>
  );
};

export default PricingSection;
