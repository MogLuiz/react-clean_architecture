import { ValidationComposite } from "@/validation/validators";
import { ValidationBuilder } from "@/validation/validators/builder/validation-builder";
import { MakeLoginValidationFactory } from "./login-validation-factory";

describe("LoginValidationFactory", () => {
  test("should make ValidationComposite with correct validations", () => {
    const composite = MakeLoginValidationFactory();
    expect(composite).toEqual(
      ValidationComposite.build([
        ...ValidationBuilder.field("email").required().email().build(),
        ...ValidationBuilder.field("password").required().min(5).build(),
      ])
    );
  });
});
