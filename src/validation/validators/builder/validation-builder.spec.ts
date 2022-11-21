import { ValidationBuilder } from "@/validation/validators/builder/validation-builder";
import { RequiredFieldValidation } from "@/validation/validators/required-field/required-field-validation";

describe("ValidationBuilder", () => {
  test("should return RequiredFieldValidation", () => {
    const validations = ValidationBuilder.field("any_field").required().build();

    expect(validations).toEqual([new RequiredFieldValidation("any_field")]);
  });
});
