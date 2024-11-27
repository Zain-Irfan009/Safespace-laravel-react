import React from "react";
import { Link } from "react-router-dom";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Card from "../Components/Card";
import Button from "../Components/Button";
import h1 from "../../assets/Images/h1.png";
import Shopify1 from "../../assets/Images/Shopify1.png";
import safe from "../../assets/Images/safe.png";
import cart from "../../assets/Images/cart.png";
import ship from "../../assets/Images/ship.png";

// import Shopify from "../../assets/Images/Shopify.png";
import bg from "../../assets/Images/bg.png";

const Home = () => {
  return (
    <div className="bg-gradient-to-r from-[#018ba3] to-[#008d49] font-montserrat">
      <Header />
      <div className="relative p-4 lg:pt-0 lg:px-6 md:p-4 md:pt-0 sm:p-4 sm:pt-0 pt-0 md:pb-0 sm:pb-0 overflow-hidden">
        <div className="isolate relative">
          <img
            alt=""
            src={bg}
            loading="lazy"
            className="h-full w-full top-0 left-0  rounded-3xl  object-cover  absolute"
          />
          <div className=" w-full max-w-[1540px] mx-auto flex p-6 min-h-[40rem] relative z-10 ">
            <div className=" max-w-md  items-start content-center  ">
              <Card className={"!rounded-3xl !px-6 "}>
                <div className=" py-12  sm:py-2 flex flex-col  ">
                  <h1 className="text-2xl font-bold text-gray-900">
                    Trust Matters
                  </h1>
                  <p className="mt-2 text-base text-gray-600">
                    Boost conversions with the e-commerce tool that closes the
                    trust gap between individual stores and large marketplaces.
                  </p>
                  <div className="mt-6 flex justify-end">
                    <Link to="/applyforverification">
                      <Button className="px-12 text-base font-medium">
                        Apply for verification
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full grid lg:grid-rows-none  lg:grid-cols-2 grid-rows-2 max-w-[1540px] mx-auto  rounded-lg  overflow-hidden gap-0 md:gap-0  lg:gap-8 px-4 sm:px-6 lg:py-4 lg:px-1.5 ">
        {/* Left container with image */}
        <div className="flex-1 lg:py-4 md:py-4 pt-0 pb-0">
          <img
            src={h1}
            alt="Person using a tablet"
            loading="lazy"
            className="w-full h-full object-cover rounded-3xl "
          />
        </div>

        {/* Right container with text and overlay */}
        <div className="relative flex-1 lg:py-4 md:py-4 py-4">
          <div className="relative flex flex-col justify-center rounded-3xl overflow-hidden bg-white lg:py-7 h-full">
            <img
              src={Shopify1}
              alt="Shopify logo"
              loading="lazy"
              className="rounded-3xl absolute  object-cover lg:px-12 md:px-10 sm:px-10 px-10"
            />
            <div className="relative z-10 flex flex-col items-center justify-start h-full lg:mt-12 md:mt-12 sm:mt-14 mt-10  ">
              <p className="text-xs lg:text-sm md:text-sm sm:text-xs  text-center text-gray-400 font-normal">
                Now available for Shopify merchants
              </p>
            </div>
          </div>
        </div>
      </div>

      <Card className="!bg-[#ffeda7] !rounded-3xl lg:mx-6 md:mx-4 sm:mx-4 mx-4 mb-6 ">
        <div className="w-full max-w-[1540px] mx-auto flex justify-between text-sm flex-wrap ">
          {/* First SVG Container */}
          <div className="flex-1 p-4 mx-2 flex flex-col items-center justify-center">
            <img
              src={safe}
              alt=""
              className="w-18 h-16 md:w-24 md:h-24 lg:w-24 lg:h-24 object-contain"
            />
            <p className="text-center text-base mt-2">
              Keep customers safe from <br /> unsafe online stores & <br />{" "}
              websites
            </p>
          </div>

          {/* Second SVG Container */}
          <div className="flex-1 p-4 mx-2 flex flex-col items-center justify-center">
            <img
              src={cart}
              alt=""
              className="w-18 h-16 md:w-24 md:h-24 lg:w-24 lg:h-24 object-contain"
            />
            <p className="text-center text-base mt-2">
              Helping legitimate e-commerce <br /> stores boost conversion rates
              & <br /> grow revenue.
            </p>
          </div>

          {/* Third SVG Container */}
          <div className="flex-1 p-4 mx-2 flex flex-col items-center justify-center">
            <img
              src={ship}
              alt=""
              className="w-18 h-16 md:w-24 md:h-24 lg:w-24 lg:h-24 object-contain"
            />
            <p className="text-center text-base mt-2">
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
