import faker from "faker";

import { RequiredFieldError } from "@/validation/errors";
import { RequiredFieldValidation } from "@/validation/validators/required-field/required-field-validation";

const factorySetupTestHelper = (): RequiredFieldValidation => {
  return new RequiredFieldValidation(faker.database.column());
};

describe("RequiredFieldValidation", () => {
  test("should return error if field is empty", () => {
    const setup = factorySetupTestHelper();
    const error = setup.validate("");

    expect(error).toEqual(new RequiredFieldError());
  });

  test("should return false if field isn't empty", () => {
    const setup = factorySetupTestHelper();
    const error = setup.validate(faker.random.word());

    expect(error).toBeFalsy();
  });
});
