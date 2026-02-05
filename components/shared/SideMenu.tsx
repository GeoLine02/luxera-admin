"use client";

import { toggleMenu } from "@/state/features/sideMenuSlice";
import { AppDispatch, RootState } from "@/state/store";
import { X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const routesData = [
  {
    key: "categories",
    label: "Categories",
    href: "/categories",
    children: [
      {
        key: "all-categories",
        label: "All Categories",
        href: "/categories/all-categories",
      },
      {
        key: "create-category",
        label: "Create Category",
        href: "/categories/create",
      },
    ],
  },
  {
    key: "products",
    label: "Products",
    href: "/products",
    children: [
      {
        key: "active-products",
        label: "Active Products",
        href: "/products/active-products",
      },
      {
        key: "pending-products",
        label: "Pending Products",
        href: "/products/pending-products",
      },
      {
        key: "rejected-products",
        label: "Rejected Products",
        href: "/products/rejected-products",
      },
    ],
  },
  {
    key: "users",
    label: "Users",
    href: "/users",
    children: [
      { key: "all-users", label: "All Users", href: "/users/all-users" },
    ],
  },
];

const SideMenu = () => {
  const pathname = usePathname();
  const [openSection, setOpenSection] = useState<string | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const toggleSection = (key: string) => {
    setOpenSection((prev) => (prev === key ? null : key));
  };

  const handleToggleMenu = () => {
    dispatch(toggleMenu());
  };
  const { isMenuOpen } = useSelector(
    (state: RootState) => state.sideMenuReducer,
  );
  return (
    <aside
      className={`${isMenuOpen ? "left-0" : "-left-80"} w-full max-w-[300px] bg-medium-gray flex flex-col items-center min-h-screen px-2 py-4 fixed md:static top-0 z-50 transition-all duration-200 ease-in-out`}
    >
      <div className="flex items-center justify-between w-full">
        <h1 className="text-3xl font-bold text-white">Luxera Admin</h1>
        <X className="md:hidden" onClick={handleToggleMenu} color="white" />
      </div>

      <div className="w-full flex flex-col gap-2 mt-11">
        {routesData.map((route) => {
          const isActiveSection =
            pathname === route.href ||
            route.children?.some((child) => pathname === child.href);

          return (
            <div key={route.key} className="w-full">
              {/* Parent section */}
              <button
                onClick={() => toggleSection(route.key)}
                className={`w-full py-2 px-4 rounded-xl font-medium text-white flex justify-between items-center
                  ${
                    isActiveSection
                      ? "bg-light-gray/70"
                      : "hover:bg-medium-gray/80"
                  }`}
              >
                {route.label}
                <span
                  className={`transition-transform ${
                    openSection === route.key ? "rotate-180" : ""
                  }`}
                >
                  ▾
                </span>
              </button>

              {/* Subsections */}
              {openSection === route.key && route.children && (
                <div className="ml-4 mt-2 flex flex-col gap-1">
                  {route.children.map((child) => (
                    <Link
                      key={child.key}
                      href={child.href}
                      className={`py-2 px-4 rounded-lg text-sm text-white
                        ${
                          pathname === child.href
                            ? "bg-light-gray/70"
                            : "hover:bg-medium-gray/80"
                        }`}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </aside>
  );
};

export default SideMenu;
