"use client";

import {
  useState,
  useRef,
  useEffect,
  ReactNode,
  createContext,
  useContext,
} from "react";

// Context for managing dropdown state
interface DropdownContextType {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  toggle: () => void;
}

const DropdownContext = createContext<DropdownContextType | undefined>(
  undefined
);

const useDropdownContext = () => {
  const context = useContext(DropdownContext);
  if (!context) {
    throw new Error("Dropdown components must be used within a Dropdown");
  }
  return context;
};

// Main Dropdown Component
interface DropdownProps {
  children: ReactNode;
  className?: string;
}

function Dropdown({ children, className = "" }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggle = () => setIsOpen(!isOpen);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <DropdownContext.Provider value={{ isOpen, setIsOpen, toggle }}>
      <div ref={dropdownRef} className={`relative inline-block ${className}`}>
        {children}
      </div>
    </DropdownContext.Provider>
  );
}

// Trigger Component
interface TriggerProps {
  children: ReactNode;
  className?: string;
  asChild?: boolean;
}

function Trigger({ children, className = "", asChild = false }: TriggerProps) {
  const { toggle } = useDropdownContext();

  if (asChild) {
    // Clone the child element and add onClick handler
    return (
      <div onClick={toggle} className={className}>
        {children}
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className={`inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${className}`}
    >
      {children}
    </button>
  );
}

// Menu Component
interface MenuProps {
  children: ReactNode;
  className?: string;
  align?: "left" | "right";
}

function Menu({ children, className = "", align = "left" }: MenuProps) {
  const { isOpen } = useDropdownContext();

  if (!isOpen) return null;

  const alignmentClass = align === "right" ? "right-0" : "left-0";

  return (
    <div
      className={`absolute ${alignmentClass} mt-2 w-fit rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50 ${className}`}
    >
      <div className="py-1" role="menu">
        {children}
      </div>
    </div>
  );
}

// Item Component
interface ItemProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  icon?: ReactNode;
}

function Item({
  children,
  onClick,
  className = "",
  disabled = false,
  icon,
}: ItemProps) {
  const { setIsOpen } = useDropdownContext();

  const handleClick = () => {
    if (!disabled && onClick) {
      onClick();
      setIsOpen(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      type="button"
      className={`w-full text-left px-4 py-2 text-sm flex items-center gap-3 ${
        disabled
          ? "text-gray-400 cursor-not-allowed"
          : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
      } ${className}`}
      role="menuitem"
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </button>
  );
}

// Divider Component
function Divider({ className = "" }: { className?: string }) {
  return <div className={`border-t border-gray-200 my-1 ${className}`} />;
}

// Attach sub-components to main component
Dropdown.Trigger = Trigger;
Dropdown.Menu = Menu;
Dropdown.Item = Item;
Dropdown.Divider = Divider;

export default Dropdown;
