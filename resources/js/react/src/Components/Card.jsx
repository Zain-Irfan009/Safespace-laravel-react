import React from "react";
import { PencilIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const StatusBadge = ({ status }) => {
  console.log("Status1:", status);

  const displayStatus = status === null ? "In Progress" : status;

  // Log the resolved display status
  console.log("Display Status2:", displayStatus);

  const badgeStyles =
    displayStatus === "Fail"
      ? "bg-red-100 text-red-800 border border-red-300"
      : displayStatus === "In Progress"
      ? "bg-yellow-100 text-yellow-800 border border-yellow-300"
      : "bg-green-100 text-green-800 border border-green-300";

  return (
    <span
      className={`inline-block px-2 py-1 text-xs font-semibold rounded-md ${badgeStyles}`}
    >
      {displayStatus}
    </span>
  );
};

const Card = ({
  title,
  descriptions,
  button,
  subtitle,
  subDescriptions,
  viewDetail,
  onEdit,
  loading,
  error,
}) => (
  <div className=" bg-white shadow-lg rounded-lg p-4 md:p-6 flex flex-col font-montserrat">
    {loading && <p className="text-gray-600">Loading...</p>}
    {error && <p className="text-red-500">{error}</p>}
    {!loading && !error && (
      <>
        <div className="flex justify-between items-center mb-2 font-montserrat">
          <h2 className="text-base font-bold text-gray-800">{title}</h2>
          {button && (
            <div className="relative">
              {loading ? (
                <Skeleton className="h-8 w-24 rounded" />
              ) : (
                <button
                  onClick={() => viewDetail(title)}
                  className="bg-indigo-600 text-white text-sm py-1 px-2 rounded flex items-center"
                >
                  View Details
                </button>
              )}
            </div>
          )}
        </div>
        <ul className="mt-2 space-y-2 text-gray-600 text-sm ">
          {descriptions.map((description, index) => (
            <li
              key={index}
              className="flex flex-col sm:flex-row justify-between items-start"
            >
              <span className="flex-1 break-words mb-1 sm:mb-0">
                • {description.text}
              </span>
              <div
                className={`flex items-center space-x-2 ${
                  description.text === "Refund Rate:" ||
                  description.text === "Ip address fake order:" ||
                  description.text === "Discount fake order:" ||
                  description.text === "Refund fake order:" ||
                  description.text === "Median delivery time:" ||
                  description.text === "Shipping address fake order:"
                    ? "mr-10"
                    : ""
                }`}
              >
                {typeof description.text === "string" &&
                  !description.text.includes("Open conversion rate data:") && (
                    <>
                      {description.status !== "link" && (
                        <>
                          <StatusBadge status={description.status} />
                          {description.text !== "Refund Rate:" &&
                          description.text !== "Ip address fake order:" &&
                          description.text !== "Discount fake order:" &&
                          description.text !== "Refund fake order:" &&
                          description.text !== "Median delivery time:" &&
                          description.text !== "Match:" &&
                          description.text !==
                            "Shipping address fake order:" ? (
                            <button
                              onClick={() => {
                                onEdit(
                                  description.text,
                                  description.key,
                                  description.status
                                );
                              }}
                              className="bg-indigo-600 text-white py-1 px-2 rounded flex items-center gap-1 text-xs sm:text-sm"
                            >
                              <PencilIcon className="h-4 w-4" />
                              {description.button}
                            </button>
                          ) : null}
                        </>
                      )}
                    </>
                  )}
              </div>
            </li>
          ))}
        </ul>

        {subtitle && (
          <>
            <h3 className="text-base font-semibold text-gray-800 mt-4 ">
              {subtitle}
            </h3>
            <ul className="mt-2 space-y-2 text-gray-600 text-sm ">
              {subDescriptions?.map((subDescription, index) => (
                <li
                  key={index}
                  className="flex flex-col sm:flex-row justify-between items-start font-montserrat"
                >
                  <span className="flex-1 break-words mb-1 sm:mb-0">
                    • {subDescription.text}
                  </span>
                  <div className="flex items-center space-x-2">
                    <StatusBadge status={subDescription.status} />
                    <button
                      onClick={() =>
                        onEdit(
                          subDescription.text,
                          subDescription.key,
                          subDescription.status
                        )
                      }
                      className="bg-indigo-600 text-white py-1 px-2 rounded flex items-center gap-1 text-xs sm:text-sm"
                    >
                      <PencilIcon className="h-4 w-4" />
                      {subDescription.button}
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}
      </>
    )}
  </div>
);

export default Card;
