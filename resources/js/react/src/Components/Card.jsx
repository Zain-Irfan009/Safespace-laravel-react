// import React from "react";
// import { PencilIcon } from "@heroicons/react/24/outline";
// import StatusBadge from "./StatusBadge";
// import { Link } from "react-router-dom";

// const Card = ({
//   title,
//   descriptions,
//   button,
//   subtitle,
//   subDescriptions,
//   viewDetail,
//   onEdit,
//   loading,
//   error,
// }) => (
//   <div className="bg-white shadow-lg rounded-lg p-4 md:p-6 flex flex-col">
//     {loading && <p className="text-gray-600">Loading...</p>}
//     {error && <p className="text-red-500">{error}</p>}
//     {!loading && !error && (
//       <>
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-base font-medium text-gray-800">{title}</h2>
//           {button && (
//             <button
//               onClick={() => viewDetail(title)}
//               className="bg-indigo-500 text-white text-sm py-1 px-2 rounded flex items-center"
//             >
//               View Details
//             </button>
//           )}
//         </div>
//         <ul className="mt-2 space-y-2 text-gray-600 text-sm">
//           {descriptions.map((description, index) => (
//             <li
//               key={index}
//               className="flex flex-col sm:flex-row justify-between items-start"
//             >
//               <span className="flex-1 break-words mb-2 sm:mb-0">
//                 • {description.text}
//               </span>
//               <div className="flex items-center space-x-4">
//                 {description.status && description.status !== "link" && (
//                   <>
//                     <StatusBadge status={description.status} />
//                     <button
//                       onClick={() => {
//                         onEdit(description.text, description.key);
//                         console.log("description111", description);
//                       }}
//                       className="bg-indigo-500 text-white py-1 px-2 rounded flex items-center gap-1 text-xs sm:text-sm"
//                     >
//                       <PencilIcon className="h-4 w-4" />
//                       {description.button}
//                     </button>
//                   </>
//                 )}
//                 {description.status === "link" && (
//                   <Link to="" className="hover:underline hover:text-indigo-500">
//                     {description.text}
//                   </Link>
//                 )}
//               </div>
//             </li>
//           ))}
//         </ul>
//         {subtitle && (
//           <>
//             <h3 className="text-base font-semibold text-gray-800 mt-4">
//               {subtitle}
//             </h3>
//             <ul className="mt-2 space-y-2 text-gray-600 text-sm">
//               {subDescriptions?.map((subDescription, index) => (
//                 <li
//                   key={index}
//                   className="flex flex-col sm:flex-row justify-between items-start"
//                 >
//                   <span className="flex-1 break-words mb-2 sm:mb-0">
//                     • {subDescription.text}
//                   </span>
//                   <div className="flex items-center space-x-4">
//                     {subDescription.status && (
//                       <>
//                         <StatusBadge status={subDescription.status} />
//                         <button
//                           onClick={() => onEdit(subDescription.text)}
//                           className="bg-indigo-500 text-white py-1 px-2 rounded flex items-center gap-1 text-xs sm:text-sm"
//                         >
//                           <PencilIcon className="h-4 w-4" />
//                           {subDescription.button}
//                         </button>
//                       </>
//                     )}
//                   </div>
//                 </li>
//               ))}
//             </ul>
//           </>
//         )}
//       </>
//     )}
//   </div>
// );

// export default Card;
import React from "react";
import { PencilIcon } from "@heroicons/react/24/outline";
import StatusBadge from "./StatusBadge";
import { Link } from "react-router-dom";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

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
  <div className="bg-white shadow-lg rounded-lg p-4 md:p-6 flex flex-col">
    {loading && <p className="text-gray-600">Loading...</p>}
    {error && <p className="text-red-500">{error}</p>}
    {!loading && !error && (
      <>
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-base font-medium text-gray-800">{title}</h2>
          {button && (
            <div className="relative">
              {loading ? (
                <Skeleton className="h-8 w-24 rounded" />
              ) : (
                <button
                  onClick={() => viewDetail(title)}
                  className="bg-indigo-500 text-white text-sm py-1 px-2 rounded flex items-center"
                >
                  View Details
                </button>
              )}
            </div>
          )}
        </div>
        <ul className="mt-2 space-y-2 text-gray-600 text-sm">
          {descriptions.map((description, index) => (
            <li
              key={index}
              className="flex flex-col sm:flex-row justify-between items-start"
            >
              <span className="flex-1 break-words mb-1 sm:mb-0">
                • {description.text}
              </span>
              <div className="flex items-center space-x-2">
                {description.status && description.status !== "link" && (
                  <>
                    <StatusBadge status={description.status} />
                    <button
                      onClick={() => {
                        onEdit(description.text, description.key);
                        console.log("description111", description);
                      }}
                      className="bg-indigo-500 text-white py-1 px-2 rounded flex items-center gap-1 text-xs sm:text-sm"
                    >
                      <PencilIcon className="h-4 w-4" />
                      {description.button}
                    </button>
                  </>
                )}
                {description.status === "link" && (
                  <Link to="" className="hover:underline hover:text-indigo-500">
                    {description.text}
                  </Link>
                )}
              </div>
            </li>
          ))}
        </ul>
        {subtitle && (
          <>
            <h3 className="text-base font-semibold text-gray-800 mt-4">
              {subtitle}
            </h3>
            <ul className="mt-2 space-y-2 text-gray-600 text-sm">
              {subDescriptions?.map((subDescription, index) => (
                <li
                  key={index}
                  className="flex flex-col sm:flex-row justify-between items-start"
                >
                  <span className="flex-1 break-words mb-1 sm:mb-0">
                    • {subDescription.text}
                  </span>
                  <div className="flex items-center space-x-2">
                    {subDescription.status && (
                      <>
                        <StatusBadge status={subDescription.status} />
                        <button
                          onClick={() => onEdit(subDescription.text)}
                          className="bg-indigo-500 text-white py-1 px-2 rounded flex items-center gap-1 text-xs sm:text-sm"
                        >
                          <PencilIcon className="h-4 w-4" />
                          {subDescription.button}
                        </button>
                      </>
                    )}
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
