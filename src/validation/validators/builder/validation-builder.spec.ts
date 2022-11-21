import { ValidationBuilder } from "@/validation/validators/builder/validation-builder";

import {
  EmailValidation,
  RequiredFieldValidation,
} from "@/validation/validators";

describe("ValidationBuilder", () => {
  test("should return RequiredFieldValidation", () => {
    const validations = ValidationBuilder.field("any_field").required().build();
    expect(validations).toEqual([new RequiredFieldValidation("any_field")]);
  });

  test("should return EmailValidation", () => {
    const validations = ValidationBuilder.field("any_field").email().build();
    expect(validations).toEqual([new EmailValidation("any_field")]);
  });
});
