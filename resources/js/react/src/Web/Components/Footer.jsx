import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/Images/logo.png";

const Footer = () => {
  const navigation = {
    "Safe Space": [
      { name: "The SafeSpace Stack", href: "/safespacestack" },
      { name: "Business Directory", href: "/businessdirectory" },
      { name: "Get Verified", href: "/applyforverification" },
    ],
    "Contact Us": [
      { name: "info@safespacego.com", href: "mailto:info@safespacego.com" },
    ],
  };
  const location = useLocation();

  useEffect(() => {
    // Scroll to the top whenever the route changes
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="">
      <footer className="bg-white font-montserrat">
        <div className="w-full max-w-[1540px] mx-auto px-6 py-4 sm:py-4 lg:px-12 lg:py-8">
          <div className="xl:grid xl:grid-cols-3  xl:gap-8 text-center lg:text-start  sm:text-center md:text-start">
            {/* Logo */}
            <Link
              to="/"
              className="flex justify-center lg:justify-start md:justify-start"
            >
              <img alt="Company name" src={logo} className="h-16 w-auto" />
            </Link>

            {/* Navigation */}
            <div className="mt-6 lg:mt-8 grid lg:grid-cols-2 md:grid-cols-2 gap-8 xl:col-span-2 xl:mt-0 sm:mt-6 md:mt-6">
              <div className="md:grid md:grid-cols-2 md:gap-8">
                <div className="">
                  <h3 className="text-base font-bold text-gray-900">
                    Safe Space
                  </h3>
                  <ul role="list" className="mt-2 space-y-2">
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
                  <h3 className="text-base mt-4 lg:mt-0 md:mt-0 font-bold text-gray-900">
                    Contact Us
                  </h3>
                  <ul role="list" className="mt-2 space-y-2">
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

          {/* Terms & Policy */}
          <div className="mt-8 text-center lg:text-left">
            <Link
              to="/termsprivacypolicy"
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              Terms Privacy Policy
            </Link>
          </div>

          {/* Footer */}
          <div className="mt-4 text-center lg:text-left text-sm font-bold text-gray-600">
            © 2024 . Safe Space . All Right Reserved
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
