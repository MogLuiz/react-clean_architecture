import { IValidation } from "@/presentation/protocols/validation";

import { IFieldValidation } from "@/validation/protocols/field-validation";

export class ValidationComposite implements IValidation {
  constructor(private readonly validators: IFieldValidation[]) {}

  validate(fieldName: string, fieldValue: string): string {
    const validators = this.validators.filter(
      ({ field }) => field === fieldName
    );
    for (const validator of validators) {
      const error = validator.validate(fieldValue);
      if (error) return error.message;
    }
  }
}
