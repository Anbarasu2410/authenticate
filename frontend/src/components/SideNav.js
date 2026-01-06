// SideNav.js
import React, { useMemo, useState, useEffect } from 'react';
import { Menu } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import { SIDEBAR_CONFIG } from '../config/sidebarConfig';
import { DoubleLeftOutlined, LogoutOutlined } from '@ant-design/icons';

/* ----------------- helpers ----------------- */

// Recursively find clicked item by key
const findItem = (items, key) => {
  for (const item of items) {
    if (item.key === key) return item;
    if (item.children) {
      const found = findItem(item.children, key);
      if (found) return found;
    }
  }
  return null;
};

// Recursively find which submenus should be open based on current path
const findOpenKeys = (items, path, parents = []) => {
  for (const item of items) {
    if (item.path === path) return parents;
    if (item.children) {
      const found = findOpenKeys(item.children, path, [...parents, item.key]);
      if (found.length) return found;
    }
  }
  return [];
};

// Normalize path to remove trailing slash
const normalizePath = (path) => path.replace(/\/$/, '');

const SideNav = ({ collapsed, onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();

  /* ----------------- user context ----------------- */

  const user = JSON.parse(localStorage.getItem('user')) || {};
  const permissions = Array.isArray(user.permissions) ? user.permissions : [];
  const role = user.role;
  const isAdmin = role === 'ADMIN';

  /* ----------------- permission filtering ----------------- */

  const filterMenu = (items) =>
    items
      .filter(item => {
        if (!item.permission) return true; // no permission required
        if (isAdmin) return true; // admin sees all
        return permissions.includes(item.permission);
      })
      .map(item => {
        const children = item.children ? filterMenu(item.children) : [];
        return {
          key: item.key,
          label: item.label,
          icon: item.icon ? React.createElement(item.icon) : null,
          path: item.path,
          children: children.length > 0 ? children : undefined,
          disabled: !item.path && children.length === 0,
        };
      })
      .filter(item => !item.children || item.children.length > 0); // remove empty parents

  const menuItems = useMemo(() => filterMenu(SIDEBAR_CONFIG), [permissions, isAdmin]);

  /* ----------------- submenu open logic ----------------- */

  const [openKeys, setOpenKeys] = useState(() =>
    findOpenKeys(menuItems, location.pathname)
  );

 useEffect(() => {
  setOpenKeys(findOpenKeys(menuItems, location.pathname));
}, [location.pathname]);


  /* ----------------- handlers ----------------- */

  const handleMenuClick = ({ key }) => {
    const clickedItem = findItem(menuItems, key);

    if (!clickedItem || !clickedItem.path) return; // only navigate leaf items

    navigate(clickedItem.path);
    onClose?.();
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
    onClose?.();
  };

  /* ----------------- render ----------------- */

  return (
    <>
      {!collapsed && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onClose}
        />
      )}

      <div
        className={`fixed inset-y-0 left-0 z-50 bg-white shadow-xl transform transition-transform duration-300 ${
          collapsed ? '-translate-x-full' : 'translate-x-0 w-64'
        } flex flex-col`}
      >
        {/* Header */}
        <div className="p-3 border-b flex items-center justify-between">
          <img src="/logo.jpg" alt="Logo" className="h-6 w-6 rounded-lg" />
          <div className="flex-1 text-center">
            <div className="text-sm font-bold">ITOOOO</div>
            <div className="text-xs text-gray-500">
              react.writecabthemes.com
            </div>
          </div>
          <DoubleLeftOutlined className="cursor-pointer" onClick={onClose} />
        </div>

        {/* Menu */}
        <div className="flex-1 overflow-y-auto">
          <Menu
            mode="inline"
            items={menuItems}
            selectedKeys={[normalizePath(location.pathname)]}
            openKeys={openKeys}
            onOpenChange={(keys) => setOpenKeys(keys)}
            className="border-0"
            onClick={handleMenuClick}
          />
        </div>

        {/* Logout */}
        <div className="p-3 border-t">
          <div
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 h-12 rounded-lg cursor-pointer text-white font-semibold bg-gradient-to-r from-blue-800 via-blue-700 to-cyan-700"
          >
            <LogoutOutlined />
            Logout
          </div>
        </div>
      </div>
    </>
  );
};

export default SideNav;
