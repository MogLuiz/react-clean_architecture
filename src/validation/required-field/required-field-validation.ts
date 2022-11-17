import { RequiredFieldError } from "@/validation/errors";
import { IFieldValidation } from "@/validation/protocols/field-validation";

export class RequiredFieldValidation implements IFieldValidation {
  constructor(readonly field: string) {}

  validate(value: string): Error {
    return value ? null : new RequiredFieldError();
  }
}
