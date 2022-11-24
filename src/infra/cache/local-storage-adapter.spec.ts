import faker from "faker";
import "jest-localstorage-mock";

import { LocalStorageAdapter } from "@/infra/cache/local-storage-adapter";

describe("LocalStorageAdapter", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("should call localStorage with correct values", async () => {
    const setup = new LocalStorageAdapter();
    const key = faker.database.column();
    const value = faker.random.word();

    await setup.set(key, value);

    expect(localStorage.setItem).toHaveBeenCalledWith(key, value);
  });
});
