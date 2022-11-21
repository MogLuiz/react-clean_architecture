import { IFieldValidation } from "@/validation/protocols/field-validation";
import { RequiredFieldValidation } from "@/validation/validators/required-field/required-field-validation";

export class ValidationBuilder {
  private constructor(
    private readonly fieldName: string,
    private readonly validations: IFieldValidation[]
  ) {}

  static field(fieldName: string): ValidationBuilder {
    return new ValidationBuilder(fieldName, []);
  }

  required(): ValidationBuilder {
    this.validations.push(new RequiredFieldValidation(this.fieldName));
    return this;
  }

  build(): IFieldValidation[] {
    return this.validations;
  }
}
