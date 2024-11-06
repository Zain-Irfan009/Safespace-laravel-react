import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { getAuthToken } from "../Unit-api/CookieUtils";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import EditPopup from "../Components/EditPopup";
import Analytics_Page from "../Pages/Analytics_Page";
import { Skeleton } from "../Components/Skeleton";
import Sidebar from "../Components/Sidebar";
import CardContainer from "../Components/CardContainer";
import StatusForm from "../Components/StatusForm";
import ModelPopup from "../Components/ModelPopup";
import Navbar from "../Components/Navbar";

export default function DashboardPage() {
  // const { id } = useParams();
  const navigate = useNavigate();
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
  const [id, setId] = useState(null);

  React.useEffect(() => {
    const savedStatus = localStorage.getItem("status");
    if (savedStatus) {
      setStatus(savedStatus);
    }
  }, []);

  const handleFormStatusChange = (newStatus) => {
    setStatus(newStatus);
  };

  console.log(" the store ame is == ", id);
  console.log(" keykeykeykeykeykey ", key);

  useEffect(() => {
    const fetchInitialData = async () => {
      const token = getAuthToken();
      if (!token) {
        setError("No authentication token found");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `https://phpstack-362288-4960243.cloudwaysapps.com/api/dashboard?search=${searchTerm}`,
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

        if (data.stores && data.stores.length > 0) {
          loadStoreDetails(data.stores[0].id);
        }
      } catch (error) {
        setError(error.message);
      }
    };

    fetchInitialData();
  }, [searchTerm]);

  const loadStoreDetails = async (storeId) => {
    setId(storeId);
    const token = getAuthToken();

    if (!token) {
      setError("No authentication token found");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `https://phpstack-362288-4960243.cloudwaysapps.com/api/store-details/${storeId}`,
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
              status: storeDetail.ssl_certification,
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
              status: storeDetail.contact_info_disposable_email_detected,
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
        },
        {
          title: "Privacy Policy:",
          descriptions: [
            {
              text: "Match:",
              status: storeDetail.privacy_policy_matches,
            },
          ],
          subtitle: "Return Policy:",
          subDescriptions: [
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
          title: "Payment Processing",
          descriptions: [
            {
              text: "Payment gateway active:",
              status: storeDetail.payment_processing,
            },
          ],
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
              status: storeDetail.median_delivery_time,
            },
          ],
        },
        {
          title: "Fake orders:",
          descriptions: [
            {
              text: "Number of fake orders found:",
              status: storeDetail.fake_order_found,
            },
          ],
        },
        {
          title: "Conversion Rate Data:",
          descriptions: [
            {
              text: (
                <Link
                  to="/open-conversion-rate-data"
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
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (description, key) => {
    setSelectedDescription(description);
    console.log("description === ", description);
    console.log("key === ", key);
    setKey(key || "");
    setShowPopup(true);
  };

  const handlePopupClose = () => {
    setShowPopup(false);
    setSelectedDescription(null);
  };

  const handlePopupConfirm = (newStatus) => {
    setStatus(newStatus);

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
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!status) {
      toast.alert("Please select an option before submitting.");
      return;
    }

    const token = getAuthToken();
    try {
      const response = await fetch(
        "https://phpstack-362288-4960243.cloudwaysapps.com/api/save-store-data",
        {
          method: "POST",
          headers: {
            Authorization: `${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status, id }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      console.log("Success:", data);

      loadStoreDetails(id);
      setLoading(true);
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to update status. Please try again.", {
        position: "bottom-right",
      });
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
  const onStoreClick = (storeId) => {
    console.log("Store clicked:", storeId);
    loadStoreDetails(storeId);
  };
  return (
    <div>
      <Navbar
        stores={stores}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        loading={loading}
        error={error}
        onStoreClick={onStoreClick}
      />

      <div className="flex">
        <Sidebar
          stores={stores}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          // loading={loading}
          error={error}
          onStoreClick={loadStoreDetails}
        />

        <div className=" px-4 sm:px-4 lg:px-10 bg-gray-100 flex-1 min-h-screen overflow-y-auto max-h-screen scrollbar-hidden">
          <div className="flex items-center justify-between mb-8 mt-8">
            <h1 className="text-base font-bold text-gray-900 sm:text-xl md:text-2xl">
              {showAnalytics ? "Analytics" : storeName}
            </h1>

            <button
              onClick={handleButtonClick}
              className="bg-indigo-600 text-white py-2 px-4 rounded-lg"
            >
              {showAnalytics ? "View Detail" : "Analytics"}
            </button>
          </div>

          {showAnalytics ? (
            <Analytics_Page />
          ) : (
            <>
              {loading ? (
                <Skeleton />
              ) : error ? (
                <p className="text-red-600">{error}</p>
              ) : cardData.length === 0 ? (
                <div className="flex justify-center items-center">
                  <p className="text-gray-700">Data is not found</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4">
                  <CardContainer
                    cards={cardData.slice(0, 11)}
                    onEdit={(text, key) => {
                      handleEditClick(text, key);
                      console.log("------------", key);
                    }}
                    viewDetail={handleOpenModal}
                  />
                  {/* <CardContainer
                    cards={cardData.slice(5, 10)}
                    onEdit={(text, key) => {
                      handleEditClick(text, key);
                      console.log("------------", key);
                    }}
                    viewDetail={handleOpenModal}
                  /> */}
                </div>
              )}
              {!loading ? (
                <StatusForm
                  handleSubmit={handleSubmit}
                  status={status}
                  handleStatusChange={handleStatusChange}
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
              onIdChange={id}
              fieldName={key}
              id={id}
            />
          )}

          {console.log("storeDetail", storeDetails)}
          {console.log("key", key)}
          {console.log("detailData", detailData)}
          {console.log("id===", id)}
          {console.log("onchangeid===", id)}

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
                    <strong>• Updated Date:</strong>{" "}
                    {storeDetails?.domain_details_updated_date ||
                      "No update date available"}
                  </span>
                  <span>
                    <strong>• Registered Date:</strong>{" "}
                    {storeDetails?.domain_registered_date ||
                      "No registered date available"}
                  </span>
                  <span>
                    <strong>• Registerer:</strong>{" "}
                    {storeDetails?.domain_registerer ||
                      "No registerer information available"}
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
                    <strong>• Update:</strong>{" "}
                    {storeDetails?.contact_information_updated_date ||
                      "No contact information available"}
                  </span>
                  <span>
                    <strong>• Phone Number Type:</strong>{" "}
                    {storeDetails?.phone_number_type ||
                      "No Phone Number available"}
                  </span>
                  <span>
                    <strong>• Phone Number Location:</strong>{" "}
                    {storeDetails?.phone_number_location ||
                      "No Loaction available"}
                  </span>
                  <span>
                    <strong>• Phone Number Carrier:</strong>{" "}
                    {storeDetails?.phone_number_carrier ||
                      "No Number Carrier available"}
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
            </ModelPopup>
          )}

          <ToastContainer />
        </div>
      </div>
      {/* <div className="dashboard-content">
        <Outlet />
      </div> */}
    </div>
  );
}

DashboardPage.jsx;
