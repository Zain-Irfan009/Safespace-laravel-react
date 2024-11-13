import React from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Card from "../Components/Card";
import Button from "../Components/Button";
import h1 from "../../assets/Images/h1.jpg";
import Shopify1 from "../../assets/Images/Shopify1.png";
import Shopify from "../../assets/Images/Shopify.png";
import bg from "../../assets/Images/bg.jpg";

const Home = () => {
    return (
        <div className="bg-gradient-to-r from-[#018ba3] to-[#008d49]">
            <Header />
            <div className="relative">
                <div className="isolate ">
                    <img
                        alt=""
                        src={bg}
                        className="h-full  w-full  object-cover  absolute"
                    />
                    <div className=" w-full max-w-[1540px] mx-auto flex p-6 min-h-[35rem] relative z-10 ">
                        <div className=" max-w-md  items-start content-center rounded-3xl ">
                            <Card>
                                <div className=" py-12  sm:py-2 flex flex-col  ">
                                    <h1 className="text-2xl font-bold text-gray-900">
                                        Trust Matters
                                    </h1>
                                    <p className="mt-4 text-base text-gray-600">
                                        Boost conversions with the e-commerce tool that closes the
                                        trust gap between individual stores and large marketplaces.
                                    </p>
                                    <div className="mt-6 flex justify-start">
                                        <Button className="px-12 text-base font-medium">
                                            Apply for verification
                                        </Button>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full max-w-[1540px] mx-auto flex flex-col md:flex-row bg-card rounded-lg  overflow-hidden gap-6 px-4 sm:px-6 md:px-8">
                {/* Left container with image */}
                <div className="flex-1 py-4">
                    <img
                        src={h1}
                        alt="Person using a tablet"
                        className="w-full h-full object-cover rounded-3xl"
                    />
                </div>

                {/* Right container with text and overlay */}
                <div className="relative flex-1 py-4">
                    <div className="relative flex flex-col justify-center rounded-3xl overflow-hidden">
                        <img
                            src={Shopify1}
                            alt="Shopify logo"
                            className="rounded-3xl absolute inset-0 w-full h-full object-cover"
                        />
                        <div className="relative z-10 flex flex-col items-center justify-start min-h-[28rem]">
                            <p className="text-sm mt-12 text-center">
                                Now available for Shopify merchants
                            </p>
                        </div>
                    </div>
                </div>
                {/* <div className="bg-white flex items-center px-52 my-4 rounded-3xl">
          <img src={Shopify} alt="" className="object-cover max-w-[300px]" />
        </div> */}
            </div>

            <Card className="!bg-[#ffeda7] !rounded-none">
                <div className=" w-full max-w-[1540px] mx-auto flex justify-between text-sm flex-wrap">
                    {/* First SVG Container */}
                    <div className="flex-1 p-4 mx-2 flex flex-col items-center justify-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                            stroke="currentColor"
                            className="w-12 h-12 mb-2"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
                            />
                        </svg>
                        <p className="text-center text-base">
                            Keep customers safe from <br /> unsafe online stores & <br />{" "}
                            websites
                        </p>
                    </div>

                    {/* Second SVG Container */}
                    <div className="flex-1 p-4 mx-2 flex flex-col items-center justify-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                            stroke="currentColor"
                            className="w-12 h-12 mb-2"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 2 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                            />
                        </svg>
                        <p className="text-center text-base">
                            Helping legitimate e-commerce <br /> stores boost conversion rates
                            & <br /> grow revenue.
                        </p>
                    </div>

                    {/* Third SVG Container */}
                    <div className="flex-1 p-4 mx-2 flex flex-col items-center justify-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                            stroke="currentColor"
                            className="w-16 h-16 mb-2"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
                            />
                        </svg>
                        <p className="text-center text-base">
                            Ensuring businesses deliver product <br /> and bringing
                            transparency to <br /> shipping times.
                        </p>
                    </div>
                </div>
            </Card>

            <Footer />
        </div>
    );
};

export default Home;
