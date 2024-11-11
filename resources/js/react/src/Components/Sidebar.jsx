import React, { useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

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
        href: `/admin/${store.id}`,
        analyticsPath: `/admin/analytics/${store.id}`,
        storeId: store.id,
    }));

    return (
        <div>
            <div
                className={`fixed inset-0 bg-black bg-opacity-50 md:hidden ${
                    isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                } duration-400 transition-opacity ease-out`}
                onClick={() => setIsOpen(false)}
            ></div>

            <div
                className={`fixed lg:top-0 left-0 md:relative md:translate-x-0 transition-transform duration-700 ease-in-out w-72 flex flex-col gap-y-5 min-h-screen overflow-y-auto max-h-screen bg-white px-6 shadow-md ${
                    isOpen ? "translate-x-0" : "-translate-x-full"
                }`}
            >
                <div className="relative mt-8 md:mt-8">
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 p-2"
                    />
                </div>

                <nav className="flex flex-col flex-1">
                    <ul role="list" className="flex flex-1 flex-col gap-y-7">
                        <li>
                            <ul role="list" className="-mx-2 space-y-1">
                                {loading ? (
                                    <SkeletonTheme>
                                        <Skeleton className="py-2" />
                                    </SkeletonTheme>
                                ) : error ? (
                                    <li className="text-red-600">{error}</li>
                                ) : (
                                    navigation.map((item) => {
                                        const isActive = Number(id) === Number(item.storeId);
                                        return (
                                            <li key={item.name}>
                                                <Link
                                                    to={item.href}
                                                    className={`group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 ${
                                                        isActive
                                                            ? "bg-gray-50 text-indigo-600"
                                                            : "text-gray-700 hover:bg-gray-50 hover:text-indigo-600"
                                                    }`}
                                                >
                                                    {item.name}
                                                </Link>
                                            </li>
                                        );
                                    })
                                )}
                            </ul>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default Sidebar;
