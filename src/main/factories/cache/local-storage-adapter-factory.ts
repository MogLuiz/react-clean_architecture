import { ISetStorage } from "@/data/protocols/cache";
import { LocalStorageAdapter } from "@/infra/cache/local-storage-adapter";

export const makeLocalStorageAdapterFactory = (): ISetStorage => {
  return new LocalStorageAdapter();
};
