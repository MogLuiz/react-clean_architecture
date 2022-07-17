import { HttpPostClientSpy } from "@/data/test/mock-http-client";
import { HttpStatusCode } from "@/data/protocols/http/http-response";

import { mockAuthentication } from "@/domain/test/mock-authentication";
import { InvalidCredentialsError } from "@/domain/errors/invalid-credentials-error";
import { UnexpectedError } from "@/domain/errors/unexpected-error";

import { RemoteAuthentication } from "./remote-authentication";

import faker from "faker";

type SutTypes = {
  sut: RemoteAuthentication;
  httpPostClientSpy: HttpPostClientSpy;
};

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy();
  const sut = new RemoteAuthentication(url, httpPostClientSpy);

  return { httpPostClientSpy, sut };
};

describe("RemoteAuthentication", () => {
  test("should call HttpPostclient with correct URL", async () => {
    const url = faker.internet.url();

    const { httpPostClientSpy, sut } = makeSut(url);

    await sut.auth(mockAuthentication());
    expect(httpPostClientSpy.url).toBe(url);
  });

  test("should call HttpPostclient with correct body", async () => {
    const { httpPostClientSpy, sut } = makeSut();
    const authenticationBodyParams = mockAuthentication();

    await sut.auth(authenticationBodyParams);

    expect(httpPostClientSpy.body).toEqual(authenticationBodyParams);
  });

  test("should throw InvalidCredentialsError if HttpPostclient returns 401", async () => {
    const { sut, httpPostClientSpy } = makeSut();

    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.unauthorized,
    };

    const promise = sut.auth(mockAuthentication());

    await expect(promise).rejects.toThrow(new InvalidCredentialsError());
  });

  test("should throw UnexpectedError if HttpPostclient returns 400", async () => {
    const { sut, httpPostClientSpy } = makeSut();

    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.badRequest,
    };

    const promise = sut.auth(mockAuthentication());

    await expect(promise).rejects.toThrow(new UnexpectedError());
  });
});
