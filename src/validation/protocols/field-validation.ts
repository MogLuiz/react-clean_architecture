export interface IFieldValidation {
  field: string;
  validate(value: string): Error;
}
