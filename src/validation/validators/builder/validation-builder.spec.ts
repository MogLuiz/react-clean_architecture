import faker from "faker";

import { ValidationBuilder } from "@/validation/validators/builder/validation-builder";
import {
  EmailValidation,
  RequiredFieldValidation,
  MinLengthValidation,
} from "@/validation/validators";

describe("ValidationBuilder", () => {
  const field = faker.database.column();
  const length = faker.random.number();

  test("should return RequiredFieldValidation", () => {
    const validations = ValidationBuilder.field(field).required().build();
    expect(validations).toEqual([new RequiredFieldValidation(field)]);
  });

  test("should return EmailValidation", () => {
    const validations = ValidationBuilder.field(field).email().build();
    expect(validations).toEqual([new EmailValidation(field)]);
  });

  test("should return MinLengthValidation", () => {
    const validations = ValidationBuilder.field(field).min(length).build();
    expect(validations).toEqual([new MinLengthValidation(field, length)]);
  });

  test("should return a list of validations", () => {
    const validations = ValidationBuilder.field(field)
      .required()
      .min(length)
      .email()
      .build();

    expect(validations).toEqual([
      new RequiredFieldValidation(field),
      new MinLengthValidation(field, length),
      new EmailValidation(field),
    ]);
  });
});
