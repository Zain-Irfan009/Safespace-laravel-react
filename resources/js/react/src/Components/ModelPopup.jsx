import React, { useState, useEffect } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import PropTypes from "prop-types";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { XMarkIcon, InformationCircleIcon } from "@heroicons/react/24/outline";

const ModelPopup = ({ title, onClose, onConfirm, onCancel, children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    return () => {
      setIsVisible(false);
    };
  }, []);

  const handleConfirm = async () => {
    setLoading(true);
    try {
      await onConfirm();
    } finally {
      setLoading(false);
      onClose();
    }
  };

  const handleCancel = () => {
    onCancel();
    onClose();
  };

  return (
    <Dialog open={isVisible} onClose={onClose} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-black bg-opacity-60 transition-opacity"
      />
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 text-center">
          <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:w-full sm:max-w-lg sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-100">
                  <InformationCircleIcon
                    aria-hidden="true"
                    className="h-6 w-6 text-yellow-600"
                  />
                </div>
                <DialogTitle
                  as="h2"
                  className="text-lg font-semibold leading-6 text-gray-900"
                >
                  {title}
                </DialogTitle>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <span className="sr-only">Close</span>
                <XMarkIcon aria-hidden="true" className="h-6 w-6" />
              </button>
            </div>

            <div className="mt-2">
              <p className="text-sm text-gray-500">{children}</p>
            </div>
            <div className="flex justify-end mt-5">
              <button
                disabled={loading}
                onClick={handleConfirm}
                className="ml-2 inline-flex w-full justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 sm:ml-3 sm:w-auto"
              >
                {loading ? (
                  <ClipLoader color={"#fff"} loading={loading} size={20} />
                ) : (
                  "OK"
                )}
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

ModelPopup.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default ModelPopup;
