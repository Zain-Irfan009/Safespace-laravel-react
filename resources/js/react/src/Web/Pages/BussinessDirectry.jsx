// import React, { useState } from "react";
// import Card from "../Components/Card";
// import Header from "../Components/Header";
// import Footer from "../Components/Footer";
// import { useNavigate } from "react-router-dom";
// const BussinessDirectry = () => {
//   const [url, setUrl] = useState("");
//   const navigate = useNavigate();
//   const handleGoClick = () => {
//     if (url) {
//       window.location.href = url;
//     } else {
//       alert("Please enter a valid URL");
//     }
//   };
//   return (
//     <div className="bg-gradient-to-r from-[#018ba3] to-[#008d49] font-montserrat">
//       <Header />
//       <div className="w-full max-w-[1540px] mx-auto  px-4 sm:px-6 md:px-2">
//         <Card className="!rounded-3xl px-12 py-12 h-[500px] mb-6">
//           <h2 className="text-pretty text-2xl sm:text-4xl font-semibold tracking-tight text-gray-900">
//             Business Directory:
//           </h2>
//           <p className="text-sm mt-4">
//             Search our business directory from merchant profile
//           </p>
//           <div className="mt-12">
//             <label
//               htmlFor="url"
//               className="block text-sm font-medium text-gray-900"
//             >
//               Website URL:
//             </label>
//             <div className="mt-2 flex items-center space-x-4">
//               <input
//                 id="url"
//                 name="url"
//                 type="url"
//                 placeholder="http://you@example.com"
//                 value={url}
//                 onChange={(e) => setUrl(e.target.value)}
//                 className="block w-full sm:w-[32%] md:w-1/2 lg:w-[20%] rounded-lg border-0 py-2 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-offset-2 sm:text-sm"
//               />
//               <button
//                 onClick={handleGoClick}
//                 className="px-4 py-2 bg-[#00bf63] text-white font-bold rounded-lg hover:bg-green-600"
//               >
//                 Go
//               </button>
//             </div>
//           </div>
//         </Card>
//       </div>
//       <Footer className="mt-5" />
//     </div>
//   );
// };

// export default BussinessDirectry;
import React, { useState } from "react";
import Card from "../Components/Card";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { useNavigate } from "react-router-dom";

const BusinessDirectory = () => {
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validateURL = (inputUrl) => {
    try {
      new URL(inputUrl); // Checks if the URL is valid
      return true;
    } catch {
      return false;
    }
  };

  const handleGoClick = () => {
    if (url) {
      if (validateURL(url)) {
        const hasProtocol = /^https?:\/\//i.test(url);
        const validUrl = hasProtocol ? url : `https://${url}`; // Add https:// if not present
        window.location.href = validUrl; // Redirect to the external URL
      } else {
        setError("Please enter a valid URL."); // Show error if URL is invalid
      }
    } else {
      setError("URL field cannot be empty."); // Show error if field is empty
    }
  };

  return (
    <div className="bg-gradient-to-r from-[#018ba3] to-[#008d49] font-montserrat">
      <Header />
      <div className="w-full max-w-[1540px] mx-auto px-4 sm:px-6 md:px-2">
        <Card className="!rounded-3xl px-12 py-12 h-[500px] mb-6">
          <h2 className="text-pretty text-2xl sm:text-4xl font-semibold tracking-tight text-gray-900">
            Business Directory:
          </h2>
          <p className="text-sm mt-4">
            Search our business directory from merchant profile
          </p>
          <div className="mt-12">
            <label
              htmlFor="url"
              className="block text-sm font-medium text-gray-900"
            >
              Website URL:
            </label>
            <div className="mt-2 flex items-center space-x-4">
              <input
                id="url"
                name="url"
                type="url"
                placeholder="http://domain/profile/example.com"
                value={url}
                onChange={(e) => {
                  setUrl(e.target.value);
                  setError(""); // Clear error when typing
                }}
                className={`block w-full sm:w-[32%] md:w-1/2 lg:w-[20%] text-sm rounded-lg border-0 py-2 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-offset-2 sm:text-sm ${
                  error ? "ring-red-500 focus:ring-red-500" : ""
                }`}
              />
              <button
                onClick={handleGoClick}
                className="px-4 py-2 bg-[#00bf63] text-white font-bold rounded-lg hover:bg-green-600"
              >
                Go
              </button>
            </div>
            {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
          </div>
        </Card>
      </div>
      <Footer className="mt-5" />
    </div>
  );
};

export default BusinessDirectory;
