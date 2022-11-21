import { Authentication } from "@/domain/usecases";

import { RemoteAuthentication } from "@/data/usecases/authentication/remote-authentication";

import { MakeApiUrlFactory } from "@/main/factories/http/api-url-factory";
import { makeAxiosHttpClientFactory } from "@/main/factories/http/axios-http-client-factory";

export const MakeRemoteAuthenticationFactory = (): Authentication =>
  new RemoteAuthentication(MakeApiUrlFactory(), makeAxiosHttpClientFactory());
