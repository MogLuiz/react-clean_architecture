import faker from "faker";

import { FieldValidationSpy } from "@/validation/validators/test/mock-field-validation";
import { ValidationComposite } from "@/validation/validators/validation-composite/validation-composite";

type TSetupTestHelper = {
  setup: ValidationComposite;
  fieldValidationSpy: FieldValidationSpy[];
};

const factorySetupTestHelper = (fieldName: string): TSetupTestHelper => {
  const fieldValidationSpy = [
    new FieldValidationSpy(fieldName),
    new FieldValidationSpy(fieldName),
  ];

  const setup = new ValidationComposite(fieldValidationSpy);

  return { setup, fieldValidationSpy };
};

describe("ValidationComposite", () => {
  const fieldName = faker.database.column();

  test("should return error if any validation fails", () => {
    const errorMessage = faker.random.words();
    const { fieldValidationSpy, setup } = factorySetupTestHelper(fieldName);

    fieldValidationSpy[0].error = new Error(errorMessage);
    fieldValidationSpy[1].error = new Error(faker.random.words());

    const error = setup.validate(fieldName, faker.random.words());

    expect(error).toBe(errorMessage);
  });

  test("should return error if any validation fails", () => {
    const { setup } = factorySetupTestHelper(fieldName);

    const error = setup.validate(fieldName, faker.random.words());

    expect(error).toBeFalsy();
  });
});
