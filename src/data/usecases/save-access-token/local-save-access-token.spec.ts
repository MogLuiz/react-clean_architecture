import faker from "faker";

import { SetStorageSpy } from "@/data/test";
import { LocalSaveAccessToken } from "@/data/usecases/save-access-token/local-save-access-token";

describe("LocalSaveAccessToken", () => {
  test("should call SetStorage with correct value", async () => {
    const setStorageSpy = new SetStorageSpy();
    const setup = new LocalSaveAccessToken(setStorageSpy);
    const accessToken = faker.random.uuid();

    await setup.save(accessToken);

    expect(setStorageSpy.key).toBe("accessToken");
    expect(setStorageSpy.value).toBe(accessToken);
  });
});
