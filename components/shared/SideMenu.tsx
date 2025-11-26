"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const rotuesData = [
  {
    key: "categories",
    lable: "Categories",
    href: "/categories",
    icon: "",
  },
  {
    key: "products",
    lable: "Products",
    href: "/produts",
    icon: "",
  },
  {
    key: "users",
    lable: "Users",
    href: "/users",
    icon: "",
  },
];

const SideMenu = () => {
  const [rotues] = useState(rotuesData);
  const pathname = usePathname();

  return (
    <aside className="w-full max-w-[300px] bg-medium-gray/70 flex flex-col items-center min-h-screen px-2 py-4">
      <h1 className="text-3xl font-bold">Luxera Admin</h1>
      <div className="w-full flex flex-col gap-2 mt-11">
        {rotues.map((route) => (
          <Link
            className={`${
              pathname === route.href && "bg-light-gray/70"
            } cursor-pointer py-2 px-4 w-full font-medium text-white flex items-center justify-center hover:bg-medium-gray/80 rounded-xl`}
            href={route.href}
            key={route.key}
          >
            {route.lable}
          </Link>
        ))}
      </div>
    </aside>
  );
};

export default SideMenu;
