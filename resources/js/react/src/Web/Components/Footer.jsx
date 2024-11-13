import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/Images/logo.png";

const Footer = () => {
    const navigation = {
        "Safe Space": [
            { name: "The SafeSpace Stack", href: "/safespacestack" },
            { name: "Business Directory", href: "/businessdirectory" },
            { name: "Get Verified", href: "/getverified" },
        ],
        "Contact Us": [
            { name: "Application Inquiries", href: "/applicationinquiries" },
            { name: "General Inquiries", href: "/generalinquiries" },
        ],
    };

    return (
        <div className="">
            <footer className="bg-white ">
                <div className="w-full max-w-[1540px] mx-auto px-6 py-16 sm:py-24 lg:px-12 lg:py-8">
                    <div className="xl:grid xl:grid-cols-3 xl:gap-8">
                        <Link to="/">
                            <img alt="Company name" src={logo} className="h-12 w-auto" />
                        </Link>
                        <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
                            <div className="md:grid md:grid-cols-2 md:gap-8">
                                <div className="">
                                    <h3 className="text-base font-bold text-gray-900">
                                        Safe Space
                                    </h3>
                                    <ul role="list" className="mt-6 space-y-4">
                                        {navigation["Safe Space"].map((item) => (
                                            <li key={item.name}>
                                                <Link
                                                    to={item.href}
                                                    className="text-sm/6 text-gray-600 hover:text-gray-900"
                                                >
                                                    {item.name}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="">
                                    <h3 className=" text-base font-bold text-gray-900">
                                        Contact Us
                                    </h3>
                                    <ul role="list" className="mt-6 space-y-4">
                                        {navigation["Contact Us"].map((item) => (
                                            <li key={item.name}>
                                                <Link
                                                    to={item.href}
                                                    className="text-sm/6 text-gray-600 hover:text-gray-900"
                                                >
                                                    {item.name}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 text-left">
                        <Link
                            to="/terms-and-policies"
                            className="text-sm text-gray-600 hover:text-gray-900"
                        >
                            Terms and Policies
                        </Link>
                    </div>
                    <div className="mt-4 text-left text-sm font-bold text-gray-600">
                        © 2024 . Safe Space . All Right Reserved
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Footer;
