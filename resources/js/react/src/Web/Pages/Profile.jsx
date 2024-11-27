import React, { useEffect, useState, useContext } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { AuthContext } from "../../Context/AuthContext";
import "animate.css";

const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const [verification, setVerification] = useState(null);
  const [createDate, setCreateDate] = useState(null);
  const { token } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          "https://phpstack-1359771-5005546.cloudwaysapps.com/api/store/details?shop=tlx-new-brand.myshopify.com",
          {
            method: "GET",
            headers: {
              Authorization: `${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch profile data");
        }

        const data = await response.json();
        setProfileData(data.data);
        setVerification(data.verfication_request);
        setCreateDate(data.verfication_request?.created_at);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [token]);

  const handleNavigate = () => {
    if (profileData && profileData.store_name) {
      const url = `https://${profileData.store_name}/password`;
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  const checklistItems = [
    {
      label: "Passed delivery verification checks.",
      key: "product_reception_30orders_delivered",
    },
    {
      label: "Passed safe payment gateway checks.",
      key: "payment_processing",
    },
    {
      label: "Passed domain registration checks.",
      key: "domain_match_trusted_register",
    },
    {
      label: "Passed registered business check.",
      key: "business_found",
    },
    {
      label: "Passed physical address check.",
      key: "physical_address_found",
    },
    {
      label: "Passed customer service and contact information check.",
      key: "contact_info_valid_phone_number",
    },
    {
      label: "Passed privacy policy and refund policy checks.",
      key: "return_policy_accept_return",
    },
  ];

  return (
    <div className="bg-gradient-to-r from-[#018ba3] to-[#008d49] font-montserrat">
      <Header />
      <div className="w-full max-w-[1540px] mx-auto px-4 sm:px-6 md:px-2 flex flex-col items-center bg-white rounded-3xl mb-4">
        <div className="w-full max-w-[850px] mb-0 mt-8 px-4 sm:px-6">
          <h1 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-900 text-center lg:text-left break-words">
            {loading || error ? (
              <div className="w-[300px] h-[30px] bg-gray-300 rounded-md animate-pulse sm:mx-0 mx-auto"></div>
            ) : (
              profileData?.store_name || "Store Name"
            )}
          </h1>
          <div>
            {loading || error ? (
              <div className="w-36 h-4 bg-gray-300 rounded-lg animate-pulse mt-3 mb-3 sm:mx-0 mx-auto"></div>
            ) : (
              createDate && (
                <p className="mb-2 mt-2 text-sm font-semibold text-black text-center lg:text-left break-words">
                  Created on:{" "}
                  {new Date(createDate).toLocaleDateString("en-US", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              )
            )}
          </div>
        </div>

        {/* Top Circular Progress Bar Section */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-12 mb-6 md:grid-cols-2 md:gap-12">
          {/* Orders */}
          <div className="flex flex-col items-center border border-gray-300 sm:border-none rounded-lg p-4 sm:p-0">
            <p className="flex items-center justify-center text-base lg:text-lg lg:mb-4 md:text-lg md:mb-4 sm:mb-4 sm:border-b-2 font-bold lg:border-b-2 md:border-b-2 border-black text-center">
              {loading || error ? (
                <div className="mb-2">
                  <Skeleton width={90} height={20} />
                </div>
              ) : (
                "Orders:"
              )}
            </p>
            <span className="block sm:hidden text-2xl font-bold text-green-600">
              {profileData?.returns_total_orders || "0"}
            </span>
            <div className="w-[7rem] h-[7rem] font-bold hidden sm:block">
              {loading || error ? (
                <Skeleton circle={true} height={115} width={115} />
              ) : (
                <CircularProgressbar
                  value={profileData?.returns_total_orders || 0}
                  text={`${profileData?.returns_total_orders || "0"}`}
                  styles={buildStyles({
                    textSize: "18px",
                    pathColor: "#7ed957",
                    textColor: "black",
                    fontWeight: 700,
                    trailColor: "#00bf63",
                  })}
                  strokeWidth={15}
                />
              )}
            </div>
          </div>

          {/* Refund Rate */}
          <div className="flex flex-col items-center border border-gray-300 sm:border-none rounded-lg p-4 sm:p-0">
            <p className="flex items-center justify-center text-base lg:text-lg lg:mb-4 md:text-lg md:mb-4 sm:mb-4 sm:border-b-2 font-bold lg:border-b-2 md:border-b-2 border-black text-center">
              {loading || error ? (
                <div className="mb-2">
                  <Skeleton width={90} height={20} />
                </div>
              ) : (
                "Refund Rate:"
              )}
            </p>
            <span className="block sm:hidden text-2xl font-bold text-green-600">
              {profileData?.return_policy_refund_rate || "0%"}
            </span>
            <div className="w-[7rem] h-[7rem] font-bold hidden sm:block">
              {loading || error ? (
                <Skeleton circle={true} height={115} width={115} />
              ) : (
                <CircularProgressbar
                  value={profileData?.return_policy_refund_rate || 0}
                  text={`${profileData?.return_policy_refund_rate || "0"}%`}
                  styles={buildStyles({
                    pathColor: "#7ed957",
                    textColor: "black",
                    fontWeight: 700,
                    trailColor: "#00bf63",
                  })}
                  strokeWidth={15}
                />
              )}
            </div>
          </div>

          {/* Median Delivery Time */}
          <div className="flex flex-col items-center border border-gray-300 sm:border-none rounded-lg p-4 sm:p-0">
            <p className="flex items-center justify-center text-base lg:text-lg lg:mb-4 md:text-lg md:mb-4 sm:mb-4 sm:border-b-2 font-bold lg:border-b-2 md:border-b-2 border-black text-center">
              {loading || error ? (
                <div className="mb-2">
                  <Skeleton width={90} height={20} />
                </div>
              ) : (
                "Median Delivery Time:"
              )}
            </p>
            <span className="block sm:hidden text-2xl font-bold text-green-600">
              {loading ? (
                <Skeleton width={50} height={30} />
              ) : (
                `${parseInt(
                  profileData?.product_reception_median_delivery_time || "0"
                )}D`
              )}
            </span>
            <div className="w-[7rem] h-[7rem] font-bold hidden sm:block">
              {loading || error ? (
                <Skeleton circle={true} height={115} width={115} />
              ) : (
                <CircularProgressbar
                  value={parseInt(
                    profileData?.product_reception_median_delivery_time || "0"
                  )}
                  text={`${parseInt(
                    profileData?.product_reception_median_delivery_time || "0"
                  )}D`}
                  styles={buildStyles({
                    pathColor: "#7ed957",
                    textColor: "black",
                    fontWeight: 700,
                    trailColor: "#00bf63",
                  })}
                  strokeWidth={15}
                />
              )}
            </div>
          </div>

          {/* Safety Rating */}
          <div className="flex flex-col items-center border border-gray-300 sm:border-none rounded-lg p-4 sm:p-0">
            <p className="flex items-center justify-center text-base lg:text-lg lg:mb-4 md:text-lg md:mb-4 sm:mb-4 sm:border-b-2 font-bold lg:border-b-2 md:border-b-2 border-black text-center">
              {loading || error ? (
                <div className="mb-2">
                  <Skeleton width={90} height={20} />
                </div>
              ) : (
                "Safety Rating:"
              )}
            </p>
            <span className="block sm:hidden text-2xl font-bold text-green-600">
              {profileData?.safetyRating || "0%"}
            </span>
            <div className="w-[7rem] h-[7rem] font-bold hidden sm:block ">
              {loading || error ? (
                <Skeleton circle={true} height={115} width={115} />
              ) : (
                <CircularProgressbar
                  value={profileData?.safetyRating || 0}
                  text={`${profileData?.safetyRating || "0"}%`}
                  styles={buildStyles({
                    pathColor: "#7ed957",
                    textColor: "black",
                    fontWeight: 700,
                    trailColor: "#00bf63",
                  })}
                  strokeWidth={15}
                />
              )}
            </div>
          </div>
        </div>

        {/* New Details Section */}

        <div className="w-full max-w-4xl bg-[#00bf63] text-white p-6 rounded-2xl mb-6">
          {loading || error ? (
            <div className="h-6 w-20 bg-gray-300 rounded animate-pulse mb-4"></div>
          ) : (
            <h2 className="text-lg font-bold mb-4">Details:</h2>
          )}
          <ul>
            {loading || error
              ? // Skeleton Loader
                Array.from({ length: 7 }).map((_, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 border-b  border-white pt-4 animate-pulse"
                  >
                    <div className="h-5 w-5 mb-2 rounded bg-gray-300"></div>
                    <div className="h-4 rounded mb-2 bg-gray-300 w-3/4"></div>
                  </li>
                ))
              : // Actual Content
                checklistItems.map(({ label, key }, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3  border-b border-white pt-4  "
                  >
                    <input
                      type="checkbox"
                      className="h-5 w-5 rounded text-green-600 bg-[#00bf63] border border-white "
                      checked={profileData?.[key] === "Passed"}
                    />
                    <label className="text-sm font-bold mb-2">{label}</label>
                  </li>
                ))}
          </ul>
        </div>

        {/* Customer Service Section */}
        <div className="w-full max-w-4xl bg-[#00bf63] text-white p-4 rounded-2xl mb-6 sm:px-8">
          {loading || error ? (
            <>
              <Skeleton width={120} height={20} className="mb-4" />
              <div className="container mx-auto flex flex-col sm:flex-row justify-center items-center sm:space-x-12 mt-2 text-center space-y-4 sm:space-y-0">
                <Skeleton width={100} height={20} />
                <div className="hidden sm:block  md:border-l lg:border-l border-white h-6"></div>
                <Skeleton width={100} height={20} />
                {/* <Skeleton width={100} height={20} /> */}
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center space-x-4">
                <span className="font-bold">Customer Service:</span>
              </div>

              <div className="container mx-auto flex flex-col sm:flex-row justify-center items-center sm:space-x-12 mt-2 text-center space-y-4 sm:space-y-0">
                <div>
                  <span>
                    {verification?.email || "Support@teststore123.com"}
                  </span>
                </div>
                <div className="hidden sm:block border-l border-white h-6"></div>
                <div>
                  <span>{verification?.phone_no || "+1(XXX)XXX-XXX"}</span>
                </div>

                {/* <div>
                  <span>
                    {profileData?.customerService?.workingHours || ""}
                  </span>
                </div> */}
              </div>
            </>
          )}
        </div>

        {/* Returns Section */}
        <div className="w-full max-w-4xl bg-[#00bf63] text-white p-4 rounded-2xl mb-6 px-8">
          {loading || error ? (
            <>
              <Skeleton width={150} height={20} className="mb-2" />
              <Skeleton width={200} height={20} />
            </>
          ) : (
            <>
              <p className="font-bold">Returns:</p>
              <p>Accepts returns on most items within 10 days.</p>
            </>
          )}
        </div>

        {/* Back to Store Button */}
        <div>
          {loading || error ? (
            <Skeleton width={150} height={40} className="mb-4 rounded-lg" />
          ) : (
            <button
              onClick={handleNavigate}
              className="px-6 py-3 mb-4 bg-[#00bf63] text-white font-bold rounded-lg shadow-lg hover:bg-green-600"
            >
              Go to Store
            </button>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
