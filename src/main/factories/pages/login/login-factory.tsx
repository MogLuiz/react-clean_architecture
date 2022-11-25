import React from "react";

import { Login } from "@/presentation/pages/Login";

import { MakeLoginValidationFactory } from "@/main/factories/pages/login/login-validation-factory";
import { MakeRemoteAuthenticationFactory } from "@/main/factories/usecases/authentication/remote-authentication-factory";
import { makeLocalSaveAccessTokenFactory } from "@/main/factories/usecases/save-access-token/local-save-access-token-factory";

export const MakeLoginFactory = (): JSX.Element => {
  return (
    <Login
      authentication={MakeRemoteAuthenticationFactory()}
      validation={MakeLoginValidationFactory()}
      saveAccessToken={makeLocalSaveAccessTokenFactory()}
    />
  );
};
