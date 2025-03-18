import React from "react";
import Lottie from "react-lottie";
import success from "../assets/lotties/success.json";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const PaymentSuccess = () => {
  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: success,
  };
  return (
    <div className="h-screen">
      <div className="p-6 md:mx-auto flex flex-col justify-center items-center ">
        <div className="w-40">
          <Lottie options={defaultOptions} />
        </div>
        <div className="text-center mt-10">
          <h3 className="md:text-3xl text-green-600 text-2xl font-bold text-center">
            Payment Done Successfully
          </h3>
          <p className="text-xl font-semibold my-4">
            Thank you for completing your secure online payment
          </p>
          <p className="text-lg">Have a great day!</p>
          <div className="py-10 text-center">
            <Link to="/dashboard">
              <Button className="px-12 bg-green-700 hover:bg-green-800 font-semibold text-lg py-6">
                Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
