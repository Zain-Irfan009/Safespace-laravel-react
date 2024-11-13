// import { useState } from "react";
// import { Dialog, DialogPanel } from "@headlessui/react";
// import {
//   Bars3Icon,
//   XMarkIcon,
//   Squares2X2Icon,
// } from "@heroicons/react/24/outline";
// import logo from "../assets/Images/logo.png";

// const navigation = [
//   { name: "The SafeSpace Stack", href: "safespacestack" },
//   { name: "Business Directory", href: "bussinessdirectry" },
//   { name: "Apply for Verification", href: "applyforverifecation" },
// ];

// const Heasder = () => {
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   return (
//     <header className="bg-gradient-to-r from-[#018ba3] to-[#008d49] w-full max-w-[1600px] mx-auto">
//       <nav
//         aria-label="Global"
//         className="flex items-end max-w-[1200px] mx-auto  p-6 lg:px-12"
//       >
//         <div className="flex w-1/4 justify-center lg:justify-start">
//           <a href="home" className="-m-1.5 p-1.5">
//             <span className="sr-only">Your Company</span>
//             <img alt="logo" src={logo} className="h-12 w-auto" />
//           </a>
//         </div>
//         <div className="flex lg:hidden ">
//           <button
//             type="button"
//             onClick={() => setMobileMenuOpen(true)}
//             className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
//           >
//             <span className="sr-only">Open main menu</span>
//             <Bars3Icon aria-hidden="true" className="h-6 w-6" />
//           </button>
//         </div>
//         <div className="hidden lg:flex lg:gap-x-12">
//           {navigation.map((item) => (
//             <a
//               key={item.name}
//               href={item.href}
//               className="text-lg font-bold text-gray-900"
//             >
//               {item.name}
//             </a>
//           ))}
//         </div>
//       </nav>
//       <Dialog
//         open={mobileMenuOpen}
//         onClose={setMobileMenuOpen}
//         className="lg:hidden"
//       >
//         <div className="fixed inset-0 z-10" />
//         <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
//           <div className="flex items-center justify-between">
//             <a href="#" className="-m-1.5 p-1.5">
//               <span className="sr-only">Your Company</span>
//               <img alt="" src={logo} className="h-8 w-auto" />
//             </a>
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
//                   <a
//                     key={item.name}
//                     href={item.href}
//                     className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
//                   >
//                     {item.name}
//                   </a>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </DialogPanel>
//       </Dialog>
//     </header>
//   );
// };

// export default Heasder;

import { useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Link } from "react-router-dom";
import {
    Bars3Icon,
    XMarkIcon,
    Squares2X2Icon,
} from "@heroicons/react/24/outline";
import logo from "../../assets/Images/logo.png";

const navigation = [
    { name: "The SafeSpace Stack", href: "/safespacestack" },
    { name: "Business Directory", href: "/bussinessdirectry" },
    { name: "Apply for Verification", href: "/applyforverifecation" },
];

const Heasder = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    return (
        <header className="bg-gradient-to-r from-[#018ba3] to-[#008d49] w-full max-w-[1600px] mx-auto">
            <nav
                aria-label="Global"
                className=" w-full max-w-[1540px] mx-auto flex items-center justify-between p-6 lg:px-12"
            >
                <div className="flex flex-1 justify-center lg:justify-start">
                    <Link to="/" className="-m-1.5 p-1.5">
                        <span className="sr-only">Your Company</span>
                        <img alt="logo" src={logo} className="h-12 w-auto" />
                    </Link>
                </div>
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
                <div className="hidden lg:flex lg:gap-x-12">
                    {navigation.map((item) => (
                        <Link
                            key={item.name}
                            to={item.href}
                            className="text-lg font-bold text-gray-900"
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>
            </nav>
            <Dialog
                open={mobileMenuOpen}
                onClose={setMobileMenuOpen}
                className="lg:hidden"
            >
                <div className="fixed inset-0 z-10" />
                <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                    <div className="flex items-center justify-between">
                        <Link to="/" className="-m-1.5 p-1.5">
                            <span className="sr-only">Your Company</span>
                            <img alt="logo" src={logo} className="h-8 w-auto" />
                        </Link>
                        <button
                            type="button"
                            onClick={() => setMobileMenuOpen(false)}
                            className="-m-2.5 rounded-md p-2.5 text-gray-700"
                        >
                            <span className="sr-only">Close menu</span>
                            <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                        </button>
                    </div>
                    <div className="mt-6 flow-root">
                        <div className="-my-6 divide-y divide-gray-500/10">
                            <div className="space-y-2 py-6">
                                {navigation.map((item) => (
                                    <Link
                                        key={item.name}
                                        to={item.href}
                                        className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                                    >
                                        {item.name}
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

export default Heasder;
