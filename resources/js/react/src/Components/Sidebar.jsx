// import React, { useEffect } from "react";
// import { Link, useLocation, useParams } from "react-router-dom";
// import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
// import "react-loading-skeleton/dist/skeleton.css";

// const Sidebar = ({
//   stores = [],
//   searchTerm,
//   setSearchTerm,
//   loading,
//   error,

//   isOpen,
//   setIsOpen,
// }) => {
//   const { id } = useParams();
//   useEffect(() => {
//     if (isOpen) {
//       document.body.classList.add("overflow-hidden");
//     } else {
//       document.body.classList.remove("overflow-hidden");
//     }

//     return () => {
//       document.body.classList.remove("overflow-hidden");
//     };
//   }, [isOpen]);

//   const filteredStores = stores.filter((store) =>
//     store.store_name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const navigation = filteredStores.map((store) => ({
//     name: store.store_name,
//     href: `/admin/${store.id}`,
//     analyticsPath: `/admin/analytics/${store.id}`,
//     storeId: store.id,
//   }));

//   return (
//     <div className="">
//       <div
//         className={`fixed inset-0 bg-black bg-opacity-50 md:hidden ${
//           isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
//         } duration-400 transition-opacity ease-out`}
//         onClick={() => setIsOpen(false)}
//       ></div>

//       <div
//         // className={`fixed lg:top-0 left-0 md:relative md:translate-x-0 transition-transform duration-700 ease-in-out w-72 flex flex-col gap-y-5 min-h-screen overflow-y-auto max-h-screen bg-white px-6 shadow-md ${
//         //   isOpen ? "translate-x-0" : "-translate-x-full"
//         // }`}
//         className={`w-72 sticky top-0 h-screen overflow-y-auto  transition-transform duration-500 flex flex-col gap-y-5 bg-white px-6 shadow-md ${
//           isOpen ? "translate-x-0" : "-translate-x-0"
//         }`}
//       >
//         <div className="relative mt-8 md:mt-8">
//           <input
//             type="text"
//             placeholder="Search..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 p-2"
//           />
//         </div>

//         <nav className="flex flex-col flex-1">
//           <ul role="list" className="flex flex-1 flex-col gap-y-7">
//             <li>
//               <ul role="list" className="-mx-2 space-y-1">
//                 {loading ? (
//                   <SkeletonTheme>
//                     <Skeleton className="py-2" />
//                   </SkeletonTheme>
//                 ) : error ? (
//                   <li className="text-red-600">{error}</li>
//                 ) : (
//                   navigation.map((item) => {
//                     const isActive = Number(id) === Number(item.storeId);
//                     return (
//                       <li key={item.name}>
//                         <Link
//                           to={item.href}
//                           className={`group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 ${
//                             isActive
//                               ? "bg-gray-50 text-indigo-600"
//                               : "text-gray-700 hover:bg-gray-50 hover:text-indigo-600"
//                           }`}
//                         >
//                           {item.name}
//                         </Link>
//                       </li>
//                     );
//                   })
//                 )}
//               </ul>
//             </li>
//           </ul>
//         </nav>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;

import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { XMarkIcon } from "@heroicons/react/24/outline";

const Sidebar = ({
  stores = [],
  searchTerm,
  setSearchTerm,
  loading,
  error,
  isOpen,
  setIsOpen,
}) => {
  const { id } = useParams();

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen]);

  const filteredStores = stores.filter((store) =>
    store.store_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const navigation = filteredStores.map((store) => ({
    name: store.store_name,
    verfStatus: store.status,
    href: `/admin/${store.id}`,
    storeId: store.id,
  }));

  const getBadgeClass = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-800 border border-yellow-300";
      case "Approved":
        return "bg-green-100 text-green-800 border border-green-300";
      case "Denied":
        return "bg-red-100 text-red-800 border border-red-300";
      default:
        return "bg-gray-300 text-gray-800 border border-gray-300";
    }
  };

  return (
    <>
      {/* Overlay */}

      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        } transition-opacity lg:hidden`}
        onClick={() => setIsOpen(false)}
      ></div>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 w-72 bg-white shadow-lg z-50 transition-transform duration-500 ease-in-out transform overflow-y-auto ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:relative lg:translate-x-0 lg:w-72`}
      >
        {/* Header */}
        <div className="lg:p-2.5 p-7 flex justify-between items-center">
          <button onClick={() => setIsOpen(false)} className="lg:hidden">
            <XMarkIcon className="h-6 w-6 text-gray-600" />
          </button>
        </div>

        {/* Search Input */}
        <div className="p-4">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-md p-2 border"
          />
        </div>

        {/* Navigation Links */}
        <nav className="p-2">
          <ul>
            {loading || error ? (
              <SkeletonTheme>
                <Skeleton count={2} className="py-2 mb-3" />
              </SkeletonTheme>
            ) : (
              navigation.map((item) => {
                const isActive = Number(id) === Number(item.storeId);
                return (
                  <li key={item.name} className="flex items-center mb-2">
                    <Link
                      to={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center justify-between p-2 rounded text-sm font-medium w-full ${
                        isActive
                          ? "bg-gray-100 text-indigo-600"
                          : "text-gray-700"
                      }`}
                    >
                      {item.name}
                      <span
                        className={`ml-2 px-2 py-0.5 rounded-md text-xs  font-semibold ${getBadgeClass(
                          item.verfStatus
                        )}`}
                      >
                        {item.verfStatus}
                      </span>
                    </Link>
                  </li>
                );
              })
            )}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
