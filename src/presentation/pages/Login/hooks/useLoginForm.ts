import { useState } from "react";

export const useLoginForm = () => {
  const [formState, setFormState] = useState({
    isLoading: false,
    errorMessage: "",
    emailError: "Campo obrigatório",
    passwordError: "Campo obrigatório",
  });

  const handleChangeFormState = (
    field: keyof typeof formState,
    value: string | boolean
  ) => {
    setFormState((previous) => ({ ...previous, [field]: value }));
  };

  return { formState, handleChangeFormState };
};
