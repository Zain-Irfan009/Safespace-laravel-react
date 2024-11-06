import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PropTypes from "prop-types";
import { getAuthToken } from "../Unit-api/CookieUtils";
import ClipLoader from "react-spinners/ClipLoader";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import {
  ExclamationTriangleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

const Popup = ({
  title,
  content,
  onClose,
  id,
  fieldName,
  onUpdateComplete,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    return () => {
      setIsVisible(false);
    };
  }, []);

  const handleRadioChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    const token = getAuthToken();
    setLoading(true);

    try {
      const response = await fetch(
        "https://phpstack-362288-4960243.cloudwaysapps.com/api/update-verification-detail-status",
        {
          method: "POST",
          headers: {
            Authorization: `${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id,
            [fieldName]: selectedOption,
          }),
        }
      );

      const data = await response.json();
      console.log("the data is = ", data);

      onUpdateComplete(id);
      toast.success("Status updated successfully!");
    } catch (error) {
      toast.error("Error updating status");
      console.error("error  == ", error);
    } finally {
      setLoading(false);
      onClose();
    }
  };

  return (
    <>
      {/* <ToastContainer position="bottom-center" /> */}

      <Dialog open={isVisible} onClose={onClose} className="relative z-10">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-black bg-opacity-60 transition-opacity"
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6"
            >
              <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  <span className="sr-only">Close</span>
                  <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                </button>
              </div>
              <div className="sm:flex sm:items-start">
                <div className="mx-auto -mt-2 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-yellow-100 sm:mx-0 sm:h-10 sm:w-10">
                  <ExclamationTriangleIcon
                    aria-hidden="true"
                    className="h-6 w-6 text-yellow-600"
                  />
                </div>
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <DialogTitle
                    as="h3"
                    className="text-base font-semibold leading-6 text-gray-900"
                  >
                    {title}
                  </DialogTitle>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">{content}</p>
                    <div className="mt-6">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          value="Passed"
                          checked={selectedOption === "Passed"}
                          onChange={handleRadioChange}
                          className="mr-2"
                        />
                        Passed
                      </label>
                      <label className="flex items-center mt-2">
                        <input
                          type="radio"
                          value="Fail"
                          checked={selectedOption === "Fail"}
                          onChange={handleRadioChange}
                          className="mr-2"
                        />
                        Fail
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={handleUpdate}
                  disabled={loading}
                  className={`inline-flex w-full justify-center rounded-md ${
                    loading ? "bg-indigo-500" : "bg-indigo-600"
                  } px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 sm:ml-3 sm:w-auto`}
                >
                  {loading ? (
                    <ClipLoader color={"#FFFFFF"} loading={loading} size={20} />
                  ) : (
                    "Update"
                  )}
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                >
                  Cancel
                </button>
              </div>
            </DialogPanel>
          </div>
          <ToastContainer />
        </div>
      </Dialog>
    </>
  );
};

Popup.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  onUpdateComplete: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  fieldName: PropTypes.string.isRequired,
};

Popup.defaultProps = {
  title: "Confirmation",
};

export default Popup;
