import { useState, useEffect } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Link, useLocation } from "react-router-dom";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import logo from "../../assets/Images/logo.png";

const navigation = [
  {
    name: "The SafeSpace Stack",
    href: "/safespacestack",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="h-6 w-6 inline-block ml-2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6.429 9.75 2.25 12l4.179 2.25m0-4.5 5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0 4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0-5.571 3-5.571-3"
        />
      </svg>
    ),
  },
  { name: "Business Directory", href: "/businessdirectory" },
  { name: "Apply for Verification", href: "/applyforverification" },
];

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <header className="bg-gradient-to-r from-[#018ba3] to-[#008d49] w-full max-w-[1600px] mx-auto font-montserrat">
      <nav
        aria-label="Global"
        className="w-full max-w-[1540px] mx-auto flex items-center justify-between p-4 sm:p-6 md:px-8 lg:px-12"
      >
        {/* Logo Section */}
        <div className="flex flex-1 justify-center lg:justify-start min-w-36">
          <Link to="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img
              alt="logo"
              src={logo}
              className="h-16 w-auto sm:h-16 lg:h-16 object-cover"
            />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="h-6 w-6" />
          </button>
        </div>

        {/* Desktop Navigation */}
        <div
          className="hidden lg:flex flex-grow lg:pr-4
         justify-start"
        >
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className="text-lg md:text-xl font-bold text-gray-900 lg:px-6  "
            >
              {item.name}
              {item.icon && item.icon}
            </Link>
          ))}
        </div>
      </nav>

      {/* Mobile Menu */}
      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden"
      >
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full max-w-xs sm:max-w-sm overflow-y-auto bg-white px-6 py-6 sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link to="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img alt="logo" src={logo} className="h-8 w-auto" />
            </Link>
            <div className="ml-auto">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="h-6 w-6" />
              </button>
            </div>
          </div>

          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50"
                  >
                    {item.name}
                    {item.icon && item.icon}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
};

export default Header;

// import { useState, useEffect } from "react";
// import { Dialog, DialogPanel } from "@headlessui/react";
// import { Link, useLocation } from "react-router-dom";
// import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
// import logo from "../../assets/Images/logo.png";

// const navigation = [
//   { name: "The SafeSpace Stack", href: "/safespacestack" },
//   { name: "Business Directory", href: "/businessdirectory" },
//   { name: "Apply for Verification", href: "/applyforverification" },
// ];

// const Header = () => {
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const location = useLocation();

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, [location]);

//   return (
//     <header className="bg-gradient-to-r from-[#018ba3] to-[#008d49] w-full max-w-[1600px] mx-auto">
//       <nav
//         aria-label="Global"
//         className="w-full max-w-[1540px] mx-auto flex items-center justify-between p-6 lg:px-12"
//       >
//         <div className="flex items-center">
//           {/* Logo */}
//           <Link to="/" className="flex-shrink-0">
//             <img alt="logo" src={logo} className="h-12 w-auto" />
//           </Link>

//           {/* Navigation Links */}
//           <div className="flex flex-grow justify-center pl-48">
//             {navigation.map((item) => (
//               <Link
//                 key={item.name}
//                 to={item.href}
//                 className="text-xl font-bold text-gray-900 px-16"
//               >
//                 {item.name}
//               </Link>
//             ))}
//           </div>
//         </div>

//         {/* Mobile Menu Button */}
//         <div className="flex lg:hidden">
//           <button
//             type="button"
//             onClick={() => setMobileMenuOpen(true)}
//             className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
//           >
//             <span className="sr-only">Open main menu</span>
//             <Bars3Icon aria-hidden="true" className="h-6 w-6" />
//           </button>
//         </div>
//       </nav>

//       {/* Mobile Menu */}
//       <Dialog
//         open={mobileMenuOpen}
//         onClose={setMobileMenuOpen}
//         className="lg:hidden"
//       >
//         <div className="fixed inset-0 z-10" />
//         <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
//           <div className="flex items-center justify-between">
//             <Link to="/" className="-m-1.5 p-1.5">
//               <span className="sr-only">Your Company</span>
//               <img alt="logo" src={logo} className="h-8 w-auto" />
//             </Link>
//             <button
//               type="button"
//               onClick={() => setMobileMenuOpen(false)}
//               className="-m-2.5 rounded-md p-2.5 text-gray-700"
//             >
//               <span className="sr-only">Close menu</span>
//               <XMarkIcon aria-hidden="true" className="h-6 w-6" />
//             </button>
//           </div>
//           <div className="mt-6 flow-root">
//             <div className="-my-6 divide-y divide-gray-500/10">
//               <div className="space-y-2 py-6">
//                 {navigation.map((item) => (
//                   <Link
//                     key={item.name}
//                     to={item.href}
//                     className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50"
//                   >
//                     {item.name}
//                   </Link>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </DialogPanel>
//       </Dialog>
//     </header>
//   );
// };

// export default Header;
