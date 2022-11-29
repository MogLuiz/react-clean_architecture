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
  test("should return error if compare is invalid", () => {
    const setup = factorySetupTestHelper(faker.random.word());
    const error = setup.validate(faker.random.word());

    expect(error).toEqual(new InvalidFieldError());
  });
});
