import faker from "faker";

import { SetStorageSpy } from "@/data/test";
import { LocalSaveAccessToken } from "@/data/usecases/save-access-token/local-save-access-token";

type TFactorySetup = {
  setup: LocalSaveAccessToken;
  setStorageSpy: SetStorageSpy;
};

const factorySetupTestHelper = (): TFactorySetup => {
  const setStorageSpy = new SetStorageSpy();
  const setup = new LocalSaveAccessToken(setStorageSpy);

  return { setup, setStorageSpy };
};

describe("LocalSaveAccessToken", () => {
  const accessToken = faker.random.uuid();

  test("should call SetStorage with correct value", async () => {
    const { setStorageSpy, setup } = factorySetupTestHelper();

    await setup.save(accessToken);

    expect(setStorageSpy.key).toBe("accessToken");
    expect(setStorageSpy.value).toBe(accessToken);
  });
});
