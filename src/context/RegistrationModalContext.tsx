"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface RegistrationModalContextType {
  isOpen: boolean;
  openModal: (program?: string) => void;
  closeModal: () => void;
  initialProgram: string;
}

const RegistrationModalContext = createContext<RegistrationModalContextType>({
  isOpen: false,
  openModal: () => {},
  closeModal: () => {},
  initialProgram: "",
});

export function RegistrationModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [initialProgram, setInitialProgram] = useState("");

  const openModal = (program = "") => {
    setInitialProgram(program);
    setIsOpen(true);
  };

  const closeModal = () => setIsOpen(false);

  return (
    <RegistrationModalContext.Provider value={{ isOpen, openModal, closeModal, initialProgram }}>
      {children}
    </RegistrationModalContext.Provider>
  );
}

export const useRegistrationModal = () => useContext(RegistrationModalContext);
