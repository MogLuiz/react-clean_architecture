import faker from "faker";

import { HttpPostClientSpy } from "@/data/test";
import { HttpStatusCode } from "@/data/protocols/http";
import { RemoteAddAccount } from "@/data/usecases/add-account/remote-add-account";

import { AccountModel } from "@/domain/models";
import { AddAccountParams } from "@/domain/usecases";
import { mockAddAccountParams } from "@/domain/test";
import { EmailInUseError } from "@/domain/errors";

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

  test("should throw EmailInUseError if HttpPostclient returns 403", async () => {
    const { setup, httpPostClientSpy } = factorySetupTestHelper();

    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.forbidden,
    };

    const promise = setup.add(mockAddAccountParams());

    await expect(promise).rejects.toThrow(new EmailInUseError());
  });
});
