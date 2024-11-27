import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ClipLoader from "react-spinners/ClipLoader";

const StatusForm = ({
  handleSubmit,
  status = "Pending",
  handleStatusChange,
  storeId,
}) => {
  const [loading, setLoading] = React.useState(false);

  const handleCheckboxChange = (option) => {
    handleStatusChange(option);
  };

  return (
    <div className="mb-8 inset-0 z-10 w-full">
      <form
        className="mt-8 bg-white p-6 rounded-lg shadow-md"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col sm:flex-col md:flex-row items-start flex-wrap justify-between mb-4 mt-4">
          <h1 className="text-base sm:text-base md:text-lg lg:text-xl font-semibold text-gray-900 mb-4 md:mb-0">
            Approved/Denied
          </h1>
          <div className="flex flex-col sm:flex-row sm:space-x-3 items-start md:items-center space-y-3 sm:space-y-0 md:space-x-4 mb-4 md:mb-0">
            {["Approved", "Denied", "Pending"].map((option) => {
              const checkboxColor = {
                Approved: "text-green-600",
                Denied: "text-red-600",
                Pending: "text-yellow-500",
              };
              const currentColor = checkboxColor[option] || "text-gray-600";

              return (
                <div className="flex items-center " key={option}>
                  <input
                    id={`${option}_${storeId}`}
                    name="status"
                    type="checkbox"
                    className={`h-4 w-4 border-gray-300 rounded focus:ring-2 ${currentColor}`}
                    style={{ accentColor: currentColor }}
                    checked={status === option}
                    onChange={() => handleCheckboxChange(option)}
                  />
                  <label
                    htmlFor={`${option}_${storeId}`}
                    className="ml-2 block text-sm font-medium text-gray-700"
                  >
                    {option.charAt(0).toUpperCase() + option.slice(1)}
                  </label>
                </div>
              );
            })}
          </div>
          <button
            type="submit"
            className="bg-indigo-600 text-white py-2 px-4 rounded-md text-sm  md:text-base lg:text-lg"
          >
            {loading ? (
              <ClipLoader color={"#FFFFFF"} loading={loading} size={20} />
            ) : (
              "Submit"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default StatusForm;
