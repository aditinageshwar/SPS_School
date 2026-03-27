import React from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import { Outlet, useLocation } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";

const AcademicAdminDashboard = () => {
  const location = useLocation();
  const userName = localStorage.getItem("userName") || "User";
  const isSubRoute = location.pathname !== "/academic-admin";

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 bg-gray-100 min-h-screen">
        <Navbar />

        {isSubRoute ? (
          <Outlet />
        ) : (
          <div className="p-6 space-y-6">

            {/* 🔷 Welcome Banner */}
            <div className="bg-gradient-to-r from-yellow-100 to-blue-100 rounded-2xl p-6 flex justify-between items-center shadow">
              <div>
                <h2 className="text-2xl font-semibold">
                  Welcome back,
                </h2>
                <h1 className="text-3xl font-bold text-blue-700">
                   {userName}!
                </h1>
                <p className="text-gray-600 mt-2">
                  Academic Administrator • Leading Excellence in Education
                </p>

                <div className="bg-white p-3 rounded-lg mt-4 italic text-gray-600 shadow-sm w-fit">
                  “Education is the foundation of progress. <br />
                  Manage, innovate, and inspire.”
                </div>
              </div>

              <img
                src="https://cdn-icons-png.flaticon.com/512/3135/3135755.png"
                alt="education"
                className="w-40"
              />
            </div>

            {/* 🔷 About Section */}
            <div className="bg-white rounded-2xl p-6 shadow flex gap-6 items-center">
              <img
                src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f"
                alt="book"
                className="w-60 h-36 object-cover rounded-lg"
              />

              <div>
                <h3 className="text-xl font-semibold text-blue-700 mb-2">
                  About Academic Administration
                </h3>

                <p className="text-gray-600 mb-3">
                  The Academic Administration handles the core academic operations
                  of the institution, ensuring quality education delivery,
                  effective teacher management, and streamlined curriculum planning.
                </p>

                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center gap-2">
                    <FaCheckCircle className="text-blue-500" />
                    Maintaining academic standards and policies
                  </li>
                  <li className="flex items-center gap-2">
                    <FaCheckCircle className="text-blue-500" />
                    Coordinating between teachers, students, and departments
                  </li>
                </ul>
              </div>
            </div>

            {/* 🔷 Responsibilities */}
            <div className="grid grid-cols-2 gap-6">

              <div className="bg-white rounded-2xl p-6 shadow">
                <h3 className="text-xl font-semibold text-blue-700 mb-4">
                  Key Responsibilities
                </h3>

                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-center gap-2">
                    <FaCheckCircle className="text-green-500" />
                    Teacher recruitment and management
                  </li>
                  <li className="flex items-center gap-2">
                    <FaCheckCircle className="text-green-500" />
                    Subject allocation and curriculum planning
                  </li>
                  
                  
                </ul>
              </div>

              {/* 🔷 Right Side Image Card */}
              <div className="bg-white rounded-2xl p-6 shadow flex items-center justify-center">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/3135/3135789.png"
                  alt="education"
                  className="w-40 opacity-80"
                />
              </div>

            </div>

          </div>
        )}
      </div>
    </div>
  );
};

export default AcademicAdminDashboard;