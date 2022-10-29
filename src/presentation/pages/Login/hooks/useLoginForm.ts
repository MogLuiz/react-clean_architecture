import { useState } from "react";

export const useLoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  return { isLoading, setIsLoading, errorMessage, setErrorMessage };
};
