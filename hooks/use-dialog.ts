import { useState, useEffect } from "react";

export function useTermsDialog() {
  const [isOpen, setIsOpen] = useState(true);
  const [hasAccepted, setHasAccepted] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem("termsAccepted");
    if (accepted) {
      setHasAccepted(true);
      setIsOpen(false);
    }
  }, []);

  const acceptTerms = () => {
    localStorage.setItem("termsAccepted", "true");
    setHasAccepted(true);
    setIsOpen(false);
  };

  return {
    isOpen,
    setIsOpen,
    hasAccepted,
    acceptTerms,
  };
}
