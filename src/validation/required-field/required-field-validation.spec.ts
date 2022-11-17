import faker from "faker";

import { RequiredFieldError } from "@/validation/errors";
import { RequiredFieldValidation } from "@/validation/required-field/required-field-validation";

const factorySetupTestHelper = (): RequiredFieldValidation => {
  return new RequiredFieldValidation(faker.database.column())
};

describe("RequiredFieldValidation", () => {
  test("should return error if field is empty", () => {
    const sut = factorySetupTestHelper();
    const error = sut.validate("");

    expect(error).toEqual(new RequiredFieldError());
  });

  test("should return false if field isn't empty", () => {
    const sut = factorySetupTestHelper();
    const error = sut.validate(faker.random.word());

    expect(error).toBeFalsy();
  });
});
