import { InvalidFieldError } from "@/validation/errors";
import { MinLengthValidation } from "@/validation/validators/min-length/min-length-validation";

describe("MinLengthValidation", () => {
  test("should return error if value is invalid", () => {
    const setup = new MinLengthValidation("field", 5);
    const error = setup.validate("123");

    expect(error).toEqual(new InvalidFieldError());
  });

  test("should return falsy if value is valid", () => {
    const setup = new MinLengthValidation("field", 5);
    const error = setup.validate("12345");

    expect(error).toBeFalsy()
  });
});
