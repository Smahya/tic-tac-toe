import { useEffect, useState } from "react";

export const Popup = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(true);
  }, []);

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 flex items-center transition-opacity delay-200 duration-300 ${
        isOpen ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        className={`bg-dark-navy p-4 min-h-[250px] w-full transition-all duration-300 delay-200 ${
          isOpen ? "opacity-100 scale-100" : "opacity-0 scale-90"
        }`}
      >
        {children}
      </div>
    </div>
  );
};
