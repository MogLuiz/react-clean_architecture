import { ISetStorage } from "@/data/protocols/cache";

export class LocalStorageAdapter implements ISetStorage {
  async set(key: string, value: any): Promise<void> {
    localStorage.setItem(key, value);
  }
}
