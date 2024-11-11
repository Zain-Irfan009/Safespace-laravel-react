// import React from "react";
// import { Outlet } from "react-router-dom";

// const Layout = () => {
//   return (
//     <div className="flex min-h-screen ">
//       <main className="w-full max-w-[1600px] mx-auto">
//         <Outlet />
//       </main>
//     </div>
//   );
// };

// export default Layout;

import React from "react";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="">
      <main className="">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
