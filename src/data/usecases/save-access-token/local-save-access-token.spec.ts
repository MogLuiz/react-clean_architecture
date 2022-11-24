import faker from "faker";

import { SetStorageMock } from "@/data/test";
import { LocalSaveAccessToken } from "@/data/usecases/save-access-token/local-save-access-token";

type TFactorySetup = {
  setup: LocalSaveAccessToken;
  setStorageMock: SetStorageMock;
};

const factorySetupTestHelper = (): TFactorySetup => {
  const setStorageMock = new SetStorageMock();
  const setup = new LocalSaveAccessToken(setStorageMock);

  return { setup, setStorageMock };
};

describe("LocalSaveAccessToken", () => {
  const accessToken = faker.random.uuid();

  test("should call SetStorage with correct value", async () => {
    const { setStorageMock, setup } = factorySetupTestHelper();

    await setup.save(accessToken);

    expect(setStorageMock.key).toBe("accessToken");
    expect(setStorageMock.value).toBe(accessToken);
  });

  test("should call SetStorage with correct value", async () => {
    const { setStorageMock, setup } = factorySetupTestHelper();
    
    jest.spyOn(setStorageMock, "set").mockRejectedValueOnce(new Error())
    const promise = setup.save(accessToken);

    await expect(promise).rejects.toThrow(new Error());
  });
});
