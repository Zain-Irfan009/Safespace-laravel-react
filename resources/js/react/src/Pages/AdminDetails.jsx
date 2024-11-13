import { Link, useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { getAuthToken } from "../Unit-api/CookieUtils";
import { ToastContainer, toast } from "react-toastify";
import { twMerge } from "tailwind-merge";

import "react-toastify/dist/ReactToastify.css";
import EditPopup from "../Components/EditPopup";
import AnalyticsPage from "./AnalyticsPage";
import { Skeleton } from "../Components/Skeleton";

import CardContainer from "../Components/CardContainer";
import StatusForm from "../Components/StatusForm";
import ModelPopup from "../Components/ModelPopup";

function AdminDetails() {
    const navigate = useNavigate();
    const location = useLocation();
    const id = location?.pathname?.split("/").pop();
    const [cardData, setCardData] = useState([]);
    const [stores, setStores] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [showAnalytics, setShowAnalytics] = useState(false);
    const [approved, setApproved] = useState(false);
    const [denied, setDenied] = useState(false);
    const [pending, setPending] = useState(false);
    const [status, setStatus] = useState("");
    const [showPopup, setShowPopup] = useState(false);
    const [selectedDescription, setSelectedDescription] = useState(null);
    const [key, setKey] = useState("");
    const [storeName, setStoreName] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [detailData, setDetailData] = useState(null);
    const [storeDetails, setStoreDetails] = useState(null);
    const [verificationdata, setVerificationData] = useState(null);

    const [statusState, setStatusState] = useState("");

    React.useEffect(() => {
        const savedStatus = localStorage.getItem("status");
        if (savedStatus) {
            setStatus(savedStatus);
            console.log("Initial status from localStorage: ", savedStatus);
        }
    }, []);

    const handleFormStatusChange = (newStatus) => {
        setStatus(newStatus);
        console.log("Form status changed to: ", newStatus);
    };

    console.log("Store ID: ", id);
    console.log("Key: ", key);

    useEffect(() => {
        const fetchInitialData = async () => {
            const token = getAuthToken();
            console.log("admin1 g: ", token);
            if (!token) {
                setError("No authentication token found");
                setLoading(false);
                return;
            }

            try {
                const response = await fetch(
                    `https://phpstack-1359771-5005546.cloudwaysapps.com/api/dashboard?search=${searchTerm}`,
                    {
                        method: "GET",
                        headers: {
                            Authorization: `${token}`,
                            "Content-Type": "application/json",
                        },
                    }
                );

                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }

                const data = await response.json();

                setStores(data.stores);

                console.log("Fetched stores data: ", data.stores);
            } catch (error) {
                setError(error.message);
                console.error("Error fetching stores data: ", error.message);
            }
        };

        fetchInitialData();
    }, [searchTerm]);

    const loadStoreDetails = async () => {
        const token = getAuthToken();
        console.log("admg2: ", token);
        setLoading(true);

        if (!token) {
            setError("No authentication token found");
            setLoading(false);
            return;
        }

        try {
            const response = await fetch(
                `https://phpstack-1359771-5005546.cloudwaysapps.com/api/store-details/${id}`,
                {
                    method: "GET",
                    headers: {
                        Authorization: token,
                        "Content-Type": "application/json",
                    },
                }
            );

            if (!response.ok) {
                throw new Error("Failed to fetch store details");
            }
            const storeDetailData = await response.json();
            const storeDetail = storeDetailData.store_detail;
            setStoreName(storeDetail?.store_name || "");
            setStoreDetails(storeDetail);
            const verification = storeDetailData.verification_data;
            setVerificationData(verification);
            console.log("verificationdata", verification);
            console.log("Store details fetched: ", storeDetail);
            const transformedData = [
                {
                    title: "Domain Registration:",
                    descriptions: [
                        {
                            text: "Matches trusted register:",
                            key: "domain_match_trusted_register",
                            status: storeDetail.domain_match_trusted_register,
                        },
                        {
                            text: "Registered > 1 year:",
                            key: "domain_register_1year_plus",
                            status: storeDetail.domain_register_1year_plus,
                        },
                        {
                            text: "DNS/DNSSEC Enabled:",
                            key: "domain_dns_enabled",
                            status: storeDetail.domain_dns_enabled,
                        },
                    ],
                    button: true,
                },
                {
                    title: "SSL Certification:",
                    descriptions: [
                        {
                            text: "SSL Certification:",
                            status: storeDetail.ssl_certifciation,
                        },
                    ],
                },

                {
                    title: "Contact Information:",
                    descriptions: [
                        {
                            text: "Valid email address:",
                            key: "contact_info_valid_email",
                            status: storeDetail.contact_info_valid_email,
                        },
                        {
                            text: "Disposable email detected:",
                            key: "contact_info_disposable_email_detected",
                            status: storeDetail.contact_info_disposible_email_detected,
                        },
                        {
                            text: "Valid phone number:",
                            key: "contact_info_valid_phone_number",
                            status: storeDetail.contact_info_valid_phone_number,
                        },
                    ],
                    subtitle: "Physical Address:",
                    subDescriptions: [
                        {
                            text: "Found Address:",
                            key: "physical_address_found",
                            status: storeDetail.physical_address_found,
                        },
                    ],
                    button: true,
                },
                {
                    title: "Business Registration:",
                    descriptions: [
                        {
                            text: "Found business:",
                            key: "business_found",
                            status: storeDetail.business_found,
                        },
                    ],
                    button: true,
                },
                {
                    title: "Privacy Policy:",
                    descriptions: [
                        {
                            text: "Match:",
                            status: storeDetail.privacy_policy_matches,
                        },
                    ],
                    button: true,
                },
                {
                    title: "Product Reception:",
                    descriptions: [
                        {
                            text: "30 orders over 35 days or older:",
                            key: "product_reception_30days_older",
                            status: storeDetail.product_reception_30days_older,
                        },
                        {
                            text: "20/30 orders marked as delivered:",
                            key: "product_reception_30orders_delivered",
                            status: storeDetail.product_reception_30orders_delivered,
                        },
                        {
                            text: "Median delivery time:",
                            status: storeDetail.product_reception_median_delivery_time,
                        },
                    ],
                },
                {
                    title: "Return Policy:",
                    descriptions: [
                        {
                            text: "Accept Returns:",
                            key: "return_policy_accept_return",
                            status: storeDetail.return_policy_accept_return,
                        },
                        {
                            text: "Refund Rate:",
                            status: `${storeDetail.return_policy_refund_rate}%`,
                        },
                    ],
                    button: true,
                },
                {
                    title: "Store Age:",
                    descriptions: [
                        {
                            text: "Older than 1 year:",
                            key: "store_age_1year_plus",
                            status: storeDetail.store_age_1year_plus,
                        },
                    ],
                },
                {
                    title: "Fake orders:",
                    descriptions: [
                        {
                            text: "Ip address fake order:",
                            status: storeDetail.ip_address_fake_order,
                        },
                        {
                            text: "Discount fake order:",
                            status: storeDetail.discount_fake_order,
                        },
                        {
                            text: "Refund fake order:",
                            status: storeDetail.refund_fake_order,
                        },
                        {
                            text: "Shipping address fake order:",
                            status: storeDetail.shipping_address_fake_order,
                        },
                    ],
                },
                {
                    title: "Payment Processing",
                    descriptions: [
                        {
                            text: "Payment gateway active:",
                            status: storeDetail.payment_processing,
                        },
                    ],
                },

                {
                    title: "Conversion Rate Data:",
                    descriptions: [
                        {
                            text: (
                                <Link
                                    to={`/admin/${id}/analytics`}
                                    className="text-indigo-500 underline"
                                >
                                    Open conversion rate data:
                                </Link>
                            ),
                            status: storeDetail.conversion_rate_data,
                        },
                    ],
                },
            ];

            setCardData(transformedData);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadStoreDetails();
    }, [id]);

    const handleEditClick = (description, key, status) => {
        setSelectedDescription(description);
        console.log("description === ", description);
        console.log("key === ", key);
        console.log("status === ", status);
        console.log("setStatusState === ", status);

        setKey(key || "");
        setStatusState(status);
        setShowPopup(true);
    };

    const handlePopupClose = () => {
        setShowPopup(false);
        setSelectedDescription(null);
    };

    const handlePopupConfirm = (newStatus) => {
        setStatus(newStatus);
        console.log("Popup confirmed with status: ", newStatus);

        handlePopupClose();

        toast.success(`Status updated to ${newStatus} for ${selectedDescription}`);
    };

    const handleOpenModal = (title) => {
        setDetailData(title);
        setIsModalOpen(true);
    };
    const handleCloseModal = () => setIsModalOpen(false);
    const handleConfirm = () => {
        console.log("Confirmed!");
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        console.log("Cancelled!");
        setIsModalOpen(false);
    };

    const handleStatusChange = (newStatus) => {
        setApproved(newStatus === "approved");
        setDenied(newStatus === "denied");
        setPending(newStatus === "pending");
        setStatus(newStatus);
        console.log(`Status changed to: ${newStatus}`);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!status) {
            toast.alert("Please select an option before submitting.");
            return;
        }
        const token = getAuthToken();
        console.log("admg3", token);
        try {
            const response = await fetch(
                "https://phpstack-1359771-5005546.cloudwaysapps.com/api/save-store-data",
                {
                    method: "POST",
                    headers: {
                        Authorization: `${token}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ status, id }),
                }
            );
            if (!response.ok) throw new Error("Failed to update status");

            const data = await response.json();
        } catch (error) {}
    };

    const loadAndSubmit = async (e) => {
        e.preventDefault();
        // setLoading(true);
        try {
            await Promise.all([loadStoreDetails(), handleSubmit(e)]);
            toast.success("Store status updated successfully", {
                position: "bottom-center",
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                toastClassName: twMerge(
                    "bg-indigo-600 text-white p-3 rounded shadow-lg"
                ),
                bodyClassName: twMerge("text-sm font-medium"),
            });
        } catch (error) {
            toast.error("Error loading details or updating status", {
                position: "bottom-center",
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                toastClassName: twMerge(
                    "bg-indigo-600 text-white p-3 rounded shadow-lg"
                ),
                bodyClassName: twMerge("text-sm font-medium"),
            });
        } finally {
            setLoading(false);
        }
    };
    const handleButtonClick = () => {
        setShowAnalytics((prev) => !prev);
        if (!showAnalytics) {
            navigate(`/admin/${id}/analytics`);
        } else {
            navigate(`/admin/${id}`);
        }
    };

    return (
        // <div className="px-4 sm:px-4 lg:px-14 bg-gray-100 flex-1 min-h-screen overflow-y-auto max-h-screen scrollbar-hidden">
        <div className="px-4  bg-gray-100 flex-1 min-h-screen ">
            <div className="flex items-center justify-between mb-8 pt-8">
                <h1 className="text-base font-bold text-gray-900 sm:text-xl md:text-2xl">
                    {showAnalytics ? "Analytics" : storeName}
                </h1>

                {loading ? (
                    <div className="bg-gray-300 rounded-lg h-10 w-24 animate-pulse"></div> // Skeleton for button
                ) : (
                    cardData.length > 0 && (
                        <button
                            onClick={handleButtonClick}
                            className="bg-indigo-600 text-white py-2 px-4 rounded-lg"
                        >
                            {showAnalytics ? "View Detail" : "Analytics"}
                        </button>
                    )
                )}
            </div>

            {showAnalytics ? (
                <AnalyticsPage />
            ) : (
                <>
                    {loading ? (
                        <>
                            <Skeleton />
                        </>
                    ) : cardData.length === 0 ? (
                        <div className="flex justify-center items-center w-full">
                            <div className="bg-white p-4 rounded-lg shadow flex justify-center items-center h-[500px] w-full text-center">
                                <p className="text-gray-500 text-2xl font-medium">
                                    Data is not found
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-4">
                            <CardContainer
                                cards={cardData.slice(0, 11)}
                                onEdit={(text, key, status) => {
                                    handleEditClick(text, key, status);
                                    console.log("------------", key, status);
                                }}
                                viewDetail={handleOpenModal}
                            />
                        </div>
                    )}

                    {!loading && cardData.length > 0 ? (
                        <StatusForm
                            handleSubmit={loadAndSubmit}
                            status={status}
                            handleStatusChange={handleStatusChange}
                            storeId={id}
                        />
                    ) : null}
                </>
            )}

            {showPopup && (
                <EditPopup
                    title={`Update Status for ${selectedDescription}`}
                    onClose={handlePopupClose}
                    onConfirm={handlePopupConfirm}
                    onUpdateComplete={loadStoreDetails}
                    statusState={statusState}
                    onIdChange={id}
                    fieldName={key}
                    id={id}
                />
            )}

            {console.log("storeDetail", storeDetails)}
            {console.log("key", key)}
            {console.log("detailData", detailData)}
            {console.log("id===", id)}
            {console.log("onchangeid===", statusState)}

            {isModalOpen && (
                <ModelPopup
                    title={`View Detail for ${detailData}`}
                    onClose={handleCloseModal}
                    onConfirm={handleConfirm}
                    onCancel={handleCancel}
                >
                    {detailData === "Domain Registration:" ? (
                        <div className="flex flex-col space-y-2 mt-5">
              <span>
                <strong>• Registerer:</strong>{" "}
                  {storeDetails?.domain_registerer ||
                      "No registerer information available"}
              </span>
                            <span>
                <strong>• Registered Date:</strong>{" "}
                                {storeDetails?.domain_registered_date ||
                                    "No registered date available"}
              </span>
                            <span>
                <strong>• Updated Date:</strong>{" "}
                                {storeDetails?.domain_details_updated_date ||
                                    "No update date available"}
              </span>
                        </div>
                    ) : (
                        ""
                    )}

                    {detailData == "Contact Information:" ? (
                        <div className="flex flex-col space-y-2 mt-5">
              <span>
                <strong>• Phone Number:</strong>{" "}
                  {storeDetails?.contact_info_phone ||
                      "No phone number available"}
              </span>
                            <span>
                <strong>• Email:</strong>{" "}
                                {storeDetails?.contact_info_email || "No email available"}
              </span>
                            <span>
                <strong>• Physical Adress Update:</strong>{" "}
                                {storeDetails?.physical_address_updated_date ||
                                    "No Physical Adress Update"}
              </span>

                            <span>
                <strong>• Phone Number Type:</strong>{" "}
                                {storeDetails?.phone_number_type || "No Phone Number available"}
              </span>
                            <span>
                <strong>• Phone Number Location:</strong>{" "}
                                {storeDetails?.phone_number_location || "No Loaction available"}
              </span>
                            <span>
                <strong>• Phone Number Carrier:</strong>{" "}
                                {storeDetails?.phone_number_carrier ||
                                    "No Number Carrier available"}
              </span>
                            <span>
                <strong>• Update:</strong>{" "}
                                {storeDetails?.contact_information_updated_date ||
                                    "No contact information available"}
              </span>
                        </div>
                    ) : (
                        ""
                    )}
                    {detailData === "Privacy Policy:" ? (
                        <div className="flex flex-col space-y-2 mt-5">
              <span>
                <strong>• Privacy Policy Found Keywords:</strong>{" "}
                  {storeDetails?.privacy_policy_found_keywords ||
                      "No Privacy Policy Keywords available"}
              </span>
                            <span>
                <strong>• Privacy Policy Matches:</strong>{" "}
                                {storeDetails?.privacy_policy_matches ||
                                    "No privacy policy matches"}
              </span>

                            <span>
                <strong>• Privacy Policy Updated Date:</strong>{" "}
                                {storeDetails?.privacy_policy_updated_date ||
                                    "No privacy policy updated date"}
              </span>
                        </div>
                    ) : (
                        ""
                    )}
                    {detailData === "Business Registration:" ? (
                        <div className="flex flex-col space-y-2 mt-5">
              <span>
                <strong>• Bussiness Name:</strong>{" "}
                  {verificationdata?.bussiness_name ||
                      "No Bussiness Name available"}
              </span>
                            <span>
                <strong>• Bussiness Type:</strong>{" "}
                                {verificationdata?.bussiness_type ||
                                    "No Bussiness Type available"}
              </span>
                        </div>
                    ) : (
                        ""
                    )}
                    {detailData === "Return Policy:" ? (
                        <div className="flex flex-col space-y-2 mt-5">
              <span>
                <strong>• Returns Updated Date:</strong>{" "}
                  {storeDetails?.returns_updated_date ||
                      "No Returns Updated Date"}
              </span>
                        </div>
                    ) : (
                        ""
                    )}
                </ModelPopup>
            )}

            <ToastContainer />
        </div>
    );
}

export default AdminDetails;
