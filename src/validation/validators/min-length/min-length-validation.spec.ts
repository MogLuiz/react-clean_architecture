import faker from "faker";

import { InvalidFieldError } from "@/validation/errors";
import { MinLengthValidation } from "@/validation/validators/min-length/min-length-validation";

const factorySetupTestHelper = (): MinLengthValidation => {
  return new MinLengthValidation(faker.database.column(), 5);
};

describe("MinLengthValidation", () => {
  test("should return error if value is invalid", () => {
    const setup = factorySetupTestHelper();
    const error = setup.validate(faker.random.alphaNumeric(4));

    expect(error).toEqual(new InvalidFieldError());
  });

  test("should return falsy if value is valid", () => {
    const setup = factorySetupTestHelper();
    const error = setup.validate(faker.random.alphaNumeric(5));

    expect(error).toBeFalsy();
  });
});
