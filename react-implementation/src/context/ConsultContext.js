import { createContext, useCallback, useContext, useState } from "react";

import ConsultModal from "../components/ConsultModal";

const ConsultContext = createContext({ open: () => {} });

export function ConsultProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  return (
    <ConsultContext.Provider value={{ open }}>
      {children}
      <ConsultModal open={isOpen} onClose={close} />
    </ConsultContext.Provider>
  );
}

export function useConsult() {
  return useContext(ConsultContext);
}
