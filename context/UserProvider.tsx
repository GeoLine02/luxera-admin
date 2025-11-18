"use client";

import { UserType } from "@/types/user";
import { createContext, useContext, useState } from "react";

type UserContextType = {
  user: UserType | null;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderType {
  children: React.ReactNode;
  userData: UserType;
}

export const UserProvider = ({ children, userData }: UserProviderType) => {
  const [user] = useState<UserType | null>(userData);
  console.log(user);
  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
};

// Custom hook for easier usage
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
