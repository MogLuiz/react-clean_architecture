import faker from 'faker'

import { RequiredFieldError } from "@/validation/errors";
import { RequiredFieldValidation } from "@/validation/required-field/required-field-validation";

describe("RequiredFieldValidation", () => {
  test("should return error if field is empty", () => {
    const sut = new RequiredFieldValidation("email");
    const error = sut.validate("");

    expect(error).toEqual(new RequiredFieldError());
  });

  test("should return false if field isn't empty", () => {
    const sut = new RequiredFieldValidation("email");
    const error = sut.validate(faker.random.word());

    expect(error).toBeFalsy()
  });
});
