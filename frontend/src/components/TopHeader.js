import React from "react";
import { Dropdown, Avatar, Button } from "antd";
import {
  MoonOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";
import { SIDEBAR_CONFIG } from "../config/sidebarConfig";
import { getAuthUser, logout } from "../auth/auth";


const TopHeader = ({ onToggleSidebar }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ MINIMUM FIX: read user from localStorage
  const userData = getAuthUser() || {};

  // 🔥 Dynamic page title
  const currentPage = (() => {
    const pathname = location.pathname;

    const exact = SIDEBAR_CONFIG.find(
      (item) => item.path === pathname
    );
    if (exact) return exact.label;

    const partial = SIDEBAR_CONFIG
      .filter((item) => pathname.startsWith(item.path))
      .sort((a, b) => b.path.length - a.path.length)[0];

    return partial?.label || "";
  })();

  const userMenuItems = [
    {
      key: "user-info",
      label: (
        <div className="px-2 py-1 flex items-center space-x-3">
          <Avatar
            size="large"
            src={userData.avatar}
            icon={!userData.avatar && <UserOutlined />}
            className="border-2 border-gray-200"
          />
          <div>
            {/* <div className="font-semibold">
              <span className="font-bold">
                {userData.name || userData.username || "User"}
              </span>
              <span className="text-green-500 ml-1">Pro</span>
            </div> */}
            {/* ✅ EMAIL NOW WORKS */}
            <div className="text-gray-500 text-sm">
              {userData.email}
            </div>
          </div>
        </div>
      ),
      disabled: true,
    },
    { type: "divider" },
    {
      key: "/profile",
      icon: <UserOutlined />,
      label: "Profile",
      onClick: () => navigate("/profile"),
    },
    { type: "divider" },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Sign Out",
      onClick: () => {
        logout();
        navigate("/login");
      },
    },
  ];

  // Hamburger Icon
  const HamburgerIcon = () => (
    <div className="w-6 h-6 flex flex-col justify-between cursor-pointer">
      <div className="w-full h-0.5 bg-white rounded"></div>
      <div className="w-full h-0.5 bg-white rounded"></div>
      <div className="w-full h-0.5 bg-white rounded"></div>
    </div>
  );

  return (
    <header className="app-header bg-gradient-to-r from-blue-400 to-purple-500 px-4 sm:px-6 py-3 flex justify-between items-center shadow-md">
      {/* Left */}
      <div className="flex items-center space-x-3 sm:space-x-4 flex-1">
        <img src="/logo.jpg" alt="Logo" className="h-8 w-auto" />
        <div className="text-white text-lg font-bold hidden sm:block">
          ERP
        </div>
        <div
          onClick={onToggleSidebar}
          className="cursor-pointer p-2 hover:bg-blue-300 rounded-lg transition-colors"
        >
          <HamburgerIcon />
        </div>
      </div>

      {/* Center */}
      <div className="flex-1 flex justify-center">
        <div className="text-white text-lg font-semibold">
          {currentPage}
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center space-x-3 sm:space-x-4 flex-1 justify-end">
        <Button
          type="text"
          icon={<MoonOutlined />}
          className="text-white hover:bg-white hover:bg-opacity-20 hidden sm:flex"
        />

        <Dropdown
          menu={{ items: userMenuItems }}
          placement="bottomRight"
          trigger={["click"]}
        >
          <div
            className="flex items-center cursor-pointer bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-1 transition-all"
            onClick={(e) => e.preventDefault()}
          >
            <Avatar
              size="default"
              src={userData.avatar}
              icon={!userData.avatar && <UserOutlined />}
              className="border-2 border-white"
            />
          </div>
        </Dropdown>
      </div>
    </header>
  );
};

export default TopHeader;
