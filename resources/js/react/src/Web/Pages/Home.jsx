import React from "react";
import { Link } from "react-router-dom";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Card from "../Components/Card";
import Button from "../Components/Button";
// import h1 from "../../assets/Images/h1.png";
// import Shopify1 from "../../assets/Images/Shopify1.png";
import safe from "../../assets/Images/safe.png";
import cart from "../../assets/Images/cart.png";
import ship from "../../assets/Images/ship.png";
import { bg, h1, Shopify1 } from "../../assets/imageData";

// import Shopify from "../../assets/Images/Shopify.png";
// import bg from "../../assets/Images/bg.png";

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
            className="h-full w-full max-h-[350px] md:max-h-[450px] sm:max-h-[450px] lg:max-h-[600px] xl:max-h-[700px] top-0 left-0 rounded-3xl object-cover absolute"
          />
          <div className="w-full max-w-[1540px] mx-auto flex p-6 min-h-[22rem] lg:min-h-[37rem] xl:min-h-[40rem] sm:min-h-[22rem] relative z-10">
            <div className="max-w-md items-start content-end lg:content-center md:content-center sm:content-end  ">
              <Card className="!rounded-3xl !px-6  max-w-[250px] sm:max-w-[400px] md:max-w-[800px] lg:max-w-full ">
                <div className="lg:py-2 md:py-2 sm:py-2 flex flex-col">
                  <h1 className="text-2xl font-bold text-gray-900">
                    Trust Matters
                  </h1>
                  <p className="mt-2 text-sm md:text-base lg:text-base text-gray-600">
                    Boost conversions with the e-commerce tool that closes the
                    trust gap between individual stores and large marketplaces.
                  </p>
                  <div className="mt-6 flex justify-end">
                    <Link to="/applyforverification">
                      <Button className="px-12 text-sm md:text-base lg:text-base font-medium">
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

      <div className="w-full grid lg:grid-rows-none  lg:grid-cols-2 grid-rows-2  max-w-[1600px] mx-auto  rounded-lg  overflow-hidden gap-0 md:gap-0  lg:gap-8 px-4 sm:px-4 lg:py-4 lg:px-6 md:px-4  items-stretch">
        {/* Left container with image */}
        <div className="flex-1 sm:pt-4 lg:py-4 md:pt-4 pt-0 pb-0 aspect-[10/6] w-full h-none">
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
            <div className="relative z-10 flex flex-col items-center justify-start h-full lg:mt-12 md:mt-16 sm:mt-16 mt-6  ">
              <p className="text-xs lg:text-sm md:text-sm sm:text-xs  text-center text-gray-400 font-normal">
                Now available for Shopify merchants
              </p>
            </div>
          </div>
        </div>
      </div>
      <Card className="!bg-[#f6f0a6] !rounded-3xl lg:mx-6 md:mx-4 sm:mx-4 mx-4 mb-6 md:px-1 md:py-2">
        <div className="w-full max-w-[1540px] mx-auto grid grid-cols-2 md:grid-cols-3 gap-4 text-sm md:gap-2">
          {/* First SVG Container */}
          <div className="p-4 mx-2 flex flex-col items-center">
            <img
              src={safe}
              alt=""
              className="w-18 h-16 md:w-24 md:h-24 lg:w-24 lg:h-24 object-contain"
            />
            <p className="text-center text-xs leading-3 sm:text-sm lg:text-base md:text-base mt-2 max-w-32 lg:max-w-64 md:max-w-64">
              Keep customers safe from unsafe online stores & websites
            </p>
          </div>

          {/* Second SVG Container */}
          <div className="p-4 mx-2 flex flex-col items-center">
            <img
              src={cart}
              alt=""
              className="w-18 h-16 md:w-24 md:h-24 lg:w-24 lg:h-24 object-contain"
            />

            <p className="text-center text-xs leading-3 sm:text-sm lg:text-base md:text-base mt-2 max-w-32 lg:max-w-64 md:max-w-64">
              Helping legitimate e-commerce stores boost conversion rates & grow
              revenue
            </p>
          </div>

          {/* Third SVG Container */}
          <div className="p-4 mx-2 flex flex-col items-center col-span-2 md:col-span-1">
            <img
              src={ship}
              alt=""
              className="w-18 h-16 md:w-24 md:h-24 lg:w-24 lg:h-24 object-contain"
            />
            <p className="text-center leading-3 text-xs sm:text-sm lg:text-base md:text-base mt-2 max-w-32 lg:max-w-64 md:max-w-64">
              Ensuring businesses deliver products block and bringing
              transparency to shipping times.
            </p>
          </div>
        </div>
      </Card>

      <Footer />
    </div>
  );
};

export default Home;
