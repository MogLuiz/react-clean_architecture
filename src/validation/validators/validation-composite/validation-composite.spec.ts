import { FieldValidationSpy } from "@/validation/validators/test/mock-field-validation";
import { ValidationComposite } from "@/validation/validators/validation-composite/validation-composite";

type TSetupTestHelper = {
  setup: ValidationComposite;
  fieldValidationSpy: FieldValidationSpy[];
};

const factorySetupTestHelper = (): TSetupTestHelper => {
  const fieldValidationSpy = [
    new FieldValidationSpy("any_field"),
    new FieldValidationSpy("any_field"),
  ];

  const setup = new ValidationComposite(fieldValidationSpy);

  return { setup, fieldValidationSpy };
};

describe("ValidationComposite", () => {
  test("should return error if any validation fails", () => {
    const { fieldValidationSpy, setup } = factorySetupTestHelper();

    fieldValidationSpy[0].error = new Error("first_error_message");
    fieldValidationSpy[1].error = new Error("second_error_message");

    const error = setup.validate("any_field", "any_value");

    expect(error).toBe("first_error_message");
  });

  test("should return error if any validation fails", () => {
    const { setup } = factorySetupTestHelper();

    const error = setup.validate("any_field", "any_value");

    expect(error).toBeFalsy();
  });
});
