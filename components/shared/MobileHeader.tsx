"use client";

import { toggleMenu } from "@/state/features/sideMenuSlice";
import { AppDispatch } from "@/state/store";
import { TextAlignJustify } from "lucide-react";
import { useDispatch } from "react-redux";

const MobileHeader = () => {
  const dispatch = useDispatch<AppDispatch>();

  const handleOpenSideMenu = () => {
    dispatch(toggleMenu());
  };

  return (
    <header className="w-full p-4 bg-medium-gray md:hidden">
      <div className="max-w-[74%] flex justify-between items-center">
        <TextAlignJustify onClick={handleOpenSideMenu} color="white" />
        <h1 className="text-2xl font-bold">Luxera Admin</h1>
      </div>
    </header>
  );
};

export default MobileHeader;
