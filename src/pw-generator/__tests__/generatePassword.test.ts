import {
  DEFAULT_PW_LENGTH,
  generatePassword,
  PwOptions,
} from "../generatePassword";

describe("passwordGenerator()", () => {
  test("throws error if length is 0", () => {
    const options: PwOptions = {
      length: 0,
    };

    expect(() => {
      generatePassword(options);
    }).toThrow();
  });

  test("throws error if length is less than 4", () => {
    const options: PwOptions = {
      length: 3,
    };

    expect(() => {
      generatePassword(options);
    }).toThrow();
  });

  test("throws error if length is negative", () => {
    const options: PwOptions = {
      length: -1,
    };

    expect(() => {
      generatePassword(options);
    }).toThrow();
  });

  test("returns a string of default length if no options are passed", () => {
    const password = generatePassword();

    expect(typeof password).toBe("string");
    expect(password).toHaveLength(DEFAULT_PW_LENGTH);
  });

  test("returns a string with only lowercase letters if no options are passed", () => {
    const password = generatePassword();

    const lowercaseOnlyRegex = new RegExp("^[a-z]{" + DEFAULT_PW_LENGTH + "}$");

    expect(password).toMatch(lowercaseOnlyRegex);
  });

  test("returns a string of correct length when length option is passed", () => {
    const options: PwOptions = { length: 15 };

    const password = generatePassword(options);

    expect(password).toHaveLength(options.length!);
  });

  test("returns string with lower and uppercase letters if uppercase option is true", () => {
    const options: PwOptions = { uppercase: true };

    const password = generatePassword(options);

    const lowerAndUpperRegex = new RegExp(
      "^[a-zA-Z]{" + DEFAULT_PW_LENGTH + "}$"
    );

    expect(password).toMatch(lowerAndUpperRegex);
  });

  test("returns string with lowercase letters and numbers if numbers option is true", () => {
    const options: PwOptions = { numbers: true };

    const password = generatePassword(options);

    const lowerAndNumbersRegex = new RegExp(
      "^[a-z0-9]{" + DEFAULT_PW_LENGTH + "}$"
    );

    expect(password).toMatch(lowerAndNumbersRegex);
  });

  test("returns string with lowercase letters and symbols if symbols option is true", () => {
    const options: PwOptions = { symbols: true };

    const password = generatePassword(options);

    const lowerAndSymbolsRegex = new RegExp(
      "^[^A-Z0-9\\s]{" + DEFAULT_PW_LENGTH + "}$"
    );

    expect(password).toMatch(lowerAndSymbolsRegex);
  });

  test("contains at least one lowercase, uppercase, number, and symbol if all options are true", () => {
    const options: PwOptions = {
      uppercase: true,
      numbers: true,
      symbols: true,
    };

    const password = generatePassword(options);

    const allOptionRegex = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()\\+-])\\S{" +
        DEFAULT_PW_LENGTH +
        "}$"
    );

    expect(password).toMatch(allOptionRegex);
  });
});
