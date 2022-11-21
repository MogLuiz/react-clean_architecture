import React from "react";

import { Login } from "@/presentation/pages/Login";

import { MakeRemoteAuthenticationFactory } from "@/main/factories/usecases/authentication/remote-authentication-factory";
import { MakeLoginValidationFactory } from "@/main/factories/pages/login/login-validation-factory";

export const MakeLoginFactory = (): JSX.Element => {
  return (
    <Login
      authentication={MakeRemoteAuthenticationFactory()}
      validation={MakeLoginValidationFactory()}
    />
  );
};
