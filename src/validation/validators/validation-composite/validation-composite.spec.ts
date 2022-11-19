import { FieldValidationSpy } from "@/validation/validators/test/mock-field-validation";
import { ValidationComposite } from "@/validation/validators/validation-composite/validation-composite";

describe("ValidationComposite", () => {
  test("should return error if any validation fails", () => {
    const fieldValidationSpy = new FieldValidationSpy("any_field");
    const fieldValidationSpy2 = new FieldValidationSpy("any_field");

    fieldValidationSpy.error = new Error("first_error_message");
    fieldValidationSpy2.error = new Error("second_error_message");

    const setup = new ValidationComposite([
      fieldValidationSpy,
      fieldValidationSpy2,
    ]);

    const error = setup.validate("any_field", "any_value");

    expect(error).toBe("first_error_message");
  });
});
