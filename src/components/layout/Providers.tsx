"use client";

import { ReactNode } from "react";
import { RegistrationModalProvider } from "@/context/RegistrationModalContext";
import RegistrationModal from "@/components/layout/RegistrationModal";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <RegistrationModalProvider>
      {children}
      <RegistrationModal />
    </RegistrationModalProvider>
  );
}
