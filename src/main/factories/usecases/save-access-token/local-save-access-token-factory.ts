import { LocalSaveAccessToken } from "@/data/usecases/save-access-token/local-save-access-token";
import { ISaveAccessToken } from "@/domain/usecases";
import { makeLocalStorageAdapterFactory } from "@/main/factories/cache/local-storage-adapter-factory";

export const makeLocalSaveAccessTokenFactory = (): ISaveAccessToken => {
  return new LocalSaveAccessToken(makeLocalStorageAdapterFactory());
};
