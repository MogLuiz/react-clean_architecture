import { HttpPostClientSpy } from "@/data/test/mock-http-client";
import { RemoteAuthentication } from "./remote-authentication";

type SutTypes = {
  sut: RemoteAuthentication;
  httpPostClientSpy: HttpPostClientSpy;
};

const makeSut = (url: string = "any_url"): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy();
  const sut = new RemoteAuthentication(url, httpPostClientSpy);

  return { httpPostClientSpy, sut };
};

describe("RemoteAuthentication", () => {
  test("should call HttpPostclient with correct URL", async () => {
    const url = "other_url";

    const { httpPostClientSpy, sut } = makeSut(url);

    await sut.auth();
    expect(httpPostClientSpy.url).toBe(url);
  });
});
