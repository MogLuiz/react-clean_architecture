import { InvalidFieldError } from "@/validation/errors";
import { IFieldValidation } from "@/validation/protocols/field-validation";

export class CompareFieldsValidation implements IFieldValidation {
  constructor(
    readonly field: string,
    private readonly fieldValueToCompare: string
  ) {}

  validate(value: string): Error {
    return value !== this.fieldValueToCompare ? new InvalidFieldError() : null;
  }
}
