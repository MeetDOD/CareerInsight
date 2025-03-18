import React from "react";
import Lottie from "react-lottie";
import fail from "../assets/lotties/fail.json";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const PaymentFailure = () => {
  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: fail,
  };
  return (
    <div className="h-screen">
      <div className="p-6 md:mx-auto flex flex-col justify-center items-center ">
        <div className="w-96">
          <Lottie options={defaultOptions} />
        </div>
        <div className="text-center">
          <h3 className="md:text-3xl text-red-500 text-2xl font-bold text-center">
            Payment Failed
          </h3>
          <p className="text-xl font-semibold my-4">
            Unfortunately, there was an issue with your payment
          </p>
          <p className="text-lg">Please try again later</p>
          <div className="py-10 text-center">
            <Link to="/pricing">
              <Button
                variant="destructive"
                className="px-12 font-semibold text-lg py-6"
              >
                Try Again
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentFailure;
