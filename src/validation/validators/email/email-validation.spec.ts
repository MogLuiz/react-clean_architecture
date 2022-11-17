import faker from 'faker'

import { InvalidFieldError } from "@/validation/errors";
import { EmailValidation } from "@/validation/validators/email/email-validation";

const factorySetupTestHelper = ():EmailValidation => {
    return new EmailValidation(faker.database.column())
}

describe("EmailValidation", () => {
  test("should return error if email is invalid", () => {
    const setup = factorySetupTestHelper();
    const error = setup.validate(faker.random.word());

    expect(error).toEqual(new InvalidFieldError());
  });

  test("should return false if email is valid", () => {
    const setup = factorySetupTestHelper();
    const error = setup.validate(faker.internet.email());

    expect(error).toBeFalsy()
  });
});
