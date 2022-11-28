import faker from "faker";

import { HttpPostClientSpy } from "@/data/test";
import { RemoteAddAccount } from "@/data/usecases/add-account/remote-add-account";

import { AccountModel } from "@/domain/models";
import { AddAccountParams } from "@/domain/usecases";
import { mockAddAccountParams } from "@/domain/test";

type TFactorySetup = {
  setup: RemoteAddAccount;
  httpPostClientSpy: HttpPostClientSpy<AddAccountParams, AccountModel>;
};

const factorySetupTestHelper = (
  url: string = faker.internet.url()
): TFactorySetup => {
  const httpPostClientSpy = new HttpPostClientSpy<
    AddAccountParams,
    AccountModel
  >();
  const setup = new RemoteAddAccount(url, httpPostClientSpy);

  return { httpPostClientSpy, setup };
};

describe("RemoteAddAccount", () => {
  test("should call HttpPostclient with correct URL", async () => {
    const url = faker.internet.url();

    const { httpPostClientSpy, setup } = factorySetupTestHelper(url);

    await setup.add(mockAddAccountParams());
    expect(httpPostClientSpy.url).toBe(url);
  });

  test("should call HttpPostclient with correct body", async () => {
    const authenticationBodyParams = mockAddAccountParams();
    const { httpPostClientSpy, setup } = factorySetupTestHelper();

    await setup.add(authenticationBodyParams);

    expect(httpPostClientSpy.body).toEqual(authenticationBodyParams);
  });
});
