"use client"

import { createContext, useContext, useState } from "react"

type ModalState =
  | { type: null }
  | { type: "createEvent" }
  | { type: "updateEvent"; eventId: number };

type ModalContextType = {
  modal: ModalState;
  openModal: (type: "createEvent" | "updateEvent", eventId?: number) => void;
  closeModal: () => void
}

const ModalContext = createContext<ModalContextType | null>(null)

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [modal, setModal] = useState<ModalState>({ type: null });

  const [isOpen, setOpen] = useState(false)

  const openModal = (type: "createEvent" | "updateEvent", eventId?: number) => {
    if (type === "createEvent") {
      setModal({ type: "createEvent" });
      return;
    }

    if (type === "updateEvent") {
      if (eventId === undefined) {
        throw new Error("updateEvent modal için eventId gerekli");
      }
      setModal({ type: "updateEvent", eventId });
    }
  };

  const closeModal = () => {
    setModal({ type: null });
  };

  return (
    <ModalContext.Provider value={{ modal, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  )
}

export function useModal() {
  const context = useContext(ModalContext)

  if (!context) {
    throw new Error("useModal must be used inside ModalProvider")
  }

  return context
}