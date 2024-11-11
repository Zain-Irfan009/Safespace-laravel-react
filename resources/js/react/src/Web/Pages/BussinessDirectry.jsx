import React from "react";
import Card from "../Components/Card";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

const BussinessDirectry = () => {
  return (
    <div className="bg-gradient-to-r from-[#018ba3] to-[#008d49]">
      <Header />
      <div className="w-full max-w-[1540px] mx-auto  px-4 sm:px-6 md:px-2">
        <Card className=" mt-6 !rounded-3xl  px-12 py-12 h-[500px]   mb-6">
          <h2 className="text-pretty text-2xl sm:text-4xl font-semibold tracking-tight text-gray-900">
            Business Directory:
          </h2>
          <p className="text-sm mt-4">
            Search our business directory from merchant profile
          </p>
          <div className="mt-12">
            <label
              htmlFor="url"
              className="block text-sm font-medium text-gray-900"
            >
              Website URL:
            </label>
            <div className="mt-2">
              <input
                id="url"
                name="url"
                type="url"
                placeholder="http://you@example.com"
                className="block w-full sm:w-[32%] md:w-1/2 lg:w-[22%] rounded-md border-0 py-3 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-gray-600 sm:text-sm"
              />
            </div>
          </div>
        </Card>
      </div>
      <Footer className="mt-5" />
    </div>
  );
};

export default BussinessDirectry;
