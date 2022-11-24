import { ISaveAccessToken } from "@/domain/usecases";
import { ISetStorage } from "@/data/protocols/cache";

export class LocalSaveAccessToken implements ISaveAccessToken {
  constructor(private readonly setStorage: ISetStorage) {}

  async save(accessToken: string): Promise<void> {
    await this.setStorage.set("accessToken", accessToken);
  }
}
