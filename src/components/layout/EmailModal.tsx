"use client";

import { useState, useEffect, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { motion } from "framer-motion";
import { X, Mail, Gift } from "lucide-react";
import Button from "@/components/ui/Button";

export default function EmailModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    // Check if user already subscribed
    const hasSubscribed = localStorage.getItem("email-subscribed");
    if (hasSubscribed) return;

    // Show modal after 30 seconds
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 30000);

    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send to your email service
    console.log("Email submitted:", email);
    localStorage.setItem("email-subscribed", "true");
    setSubmitted(true);
    setTimeout(() => {
      setIsOpen(false);
    }, 2000);
  };

  const handleClose = () => {
    setIsOpen(false);
    // Set a flag to not show again this session
    sessionStorage.setItem("modal-dismissed", "true");
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-[60]" onClose={handleClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="relative w-full max-w-md transform overflow-hidden rounded-2xl bg-[#141414] border border-[#D4A74B]/20 p-8 text-left align-middle shadow-xl transition-all">
                {/* Close button */}
                <button
                  onClick={handleClose}
                  className="absolute top-4 right-4 p-2 text-[#666666] hover:text-white transition-colors"
                  aria-label="Cerrar"
                >
                  <X size={24} />
                </button>

                {!submitted ? (
                  <>
                    {/* Icon */}
                    <div className="flex justify-center mb-6">
                      <div className="p-4 rounded-full bg-gradient-to-br from-[#FF6B00] to-[#E91E8C]">
                        <Gift size={32} className="text-white" />
                      </div>
                    </div>

                    {/* Title */}
                    <Dialog.Title
                      as="h3"
                      className="text-2xl font-bold text-center text-white mb-2 font-[family-name:var(--font-oswald)] uppercase"
                    >
                      Clase de Prueba GRATIS
                    </Dialog.Title>

                    {/* Description */}
                    <p className="text-[#A0A0A0] text-center mb-6">
                      Suscríbete y recibe tu clase de prueba gratuita más tips
                      exclusivos de entrenamiento.
                    </p>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="relative">
                        <Mail
                          size={20}
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-[#666666]"
                        />
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Tu correo electrónico"
                          required
                          className="w-full pl-12 pr-4 py-3 bg-[#0A0A0A] border border-[#1A1A1A] rounded-lg text-white placeholder-[#666666] focus:outline-none focus:border-[#D4A74B] transition-colors"
                        />
                      </div>
                      <Button type="submit" fullWidth>
                        Obtener Mi Clase Gratis
                      </Button>
                    </form>

                    {/* Privacy note */}
                    <p className="text-[#666666] text-xs text-center mt-4">
                      No spam. Puedes cancelar cuando quieras.
                    </p>
                  </>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8"
                  >
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#D4A74B] flex items-center justify-center">
                      <Mail size={32} className="text-[#0A0A0A]" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2 font-[family-name:var(--font-oswald)]">
                      ¡LISTO!
                    </h3>
                    <p className="text-[#A0A0A0]">
                      Revisa tu correo para tu clase gratis.
                    </p>
                  </motion.div>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
