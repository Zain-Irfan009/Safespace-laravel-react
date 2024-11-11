import React from "react";
import Card from "../Components/Card";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Button from "../Components/Button";
import Shopify from "../../assets/Images/Shopify.png";
import big from "../../assets/Images/big.png";
import woo from "../../assets/Images/woo.png";

const ApplyForVerifecation = () => {
  return (
    <div className="bg-gradient-to-r from-[#018ba3] to-[#008d49]">
      <Header />
      <div className="w-full max-w-[1540px] mx-auto  px-4 sm:px-6 md:px-2">
        <Card className="  mt-6 !rounded-3xl mb-6">
          <div className="p-8 bg-white">
            <h2 className="text-pretty text-2xl sm:text-4xl font-semibold tracking-tight text-gray-900">
              Apply for Verification:
            </h2>
            <p className="text-sm my-4">Supported e-commerce software.</p>

            <div className="flex flex-col items-center sm:items-start text-center space-y-6 mb-16 mx-auto">
              <img
                src={Shopify}
                alt="Shopify"
                className="max-w-[10rem] sm:max-w-[12rem] h-auto"
              />
              <Button className="bg-green-600 hover:bg-green-700 !text-black font-medium !text-sm py-2 !px-8 rounded-full inline-flex items-center">
                Apply through Shopify
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="3"
                  stroke="currentColor"
                  className="ml-4 w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m8.25 4.5 7.5 7.5-7.5 7.5"
                  />
                </svg>
              </Button>
            </div>

            <div className="flex flex-col flex-wrap sm:flex-row sm:gap-32 items-center sm:items-start">
              <div className="flex flex-col text-center space-y-6 sm:space-y-9 mb-6 sm:mb-0">
                <img
                  src={woo}
                  alt="WooCommerce"
                  className="max-w-[10rem] sm:max-w-[13rem] h-auto"
                />
                <Button className="bg-yellow-300 hover:bg-yellow-400 !text-black font-medium !text-sm py-2 px-8 rounded-full flex justify-center items-center">
                  Coming soon
                </Button>
              </div>

              <div className="flex flex-col text-center space-y-[26px]">
                <img
                  src={big}
                  alt="BigCommerce"
                  className="max-w-[10rem] sm:max-w-[17rem] h-auto"
                />
                <Button className="bg-yellow-300 hover:bg-yellow-400 !text-black font-medium !text-sm py-2 px-8 rounded-full flex justify-center items-center">
                  Coming soon
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default ApplyForVerifecation;
