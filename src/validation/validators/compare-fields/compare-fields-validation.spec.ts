import faker from "faker";

import { InvalidFieldError } from "@/validation/errors";
import { CompareFieldsValidation } from "@/validation/validators/compare-fields/compare-fields-validation";

const factorySetupTestHelper = (
  fieldValueToCompare: string
): CompareFieldsValidation => {
  return new CompareFieldsValidation(
    faker.database.column(),
    fieldValueToCompare
  );
};

describe("CompareFieldsValidation", () => {
  const fieldValueToCompare = faker.random.word();

  test("should return error if compare is invalid", () => {
    const setup = factorySetupTestHelper(fieldValueToCompare);
    const error = setup.validate(faker.random.word());

    expect(error).toEqual(new InvalidFieldError());
  });

  test("should return falsy if compare is valid", () => {
    const setup = factorySetupTestHelper(fieldValueToCompare);
    const error = setup.validate(fieldValueToCompare);

    expect(error).toBeFalsy();
  });
});
