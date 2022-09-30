import { shuffle } from "../utils/shuffleArray";

export const DEFAULT_PW_LENGTH = 10;

export interface PwOptions {
  length?: number;
  uppercase?: boolean;
  numbers?: boolean;
  symbols?: boolean;
}

/**
 * Generate a random password based on options specified. Password must be at least 4 letters long
 * @param options - Object containing length of password, and whether to include uppercase letters, numbers, or symbols
 */
export const generatePassword = (options?: PwOptions) => {
  let length =
    options?.length === undefined ? DEFAULT_PW_LENGTH : options.length;
  const includesUpper = options?.uppercase || false;
  const includesNumbers = options?.numbers || false;
  const includesSymbols = options?.symbols || false;

  if (length < 4) {
    throw new Error("Password must be of length 4 or longer");
  }

  const passwordArray: Array<string> = [generateLowercaseChar()];
  const functionsToCallArray: Array<Function> = [generateLowercaseChar];

  if (includesUpper) {
    passwordArray.push(generateUppercaseChar());
    functionsToCallArray.push(generateUppercaseChar);
  }

  if (includesNumbers) {
    passwordArray.push(generateNumber());
    functionsToCallArray.push(generateNumber);
  }

  if (includesSymbols) {
    passwordArray.push(generateSymbol());
    functionsToCallArray.push(generateSymbol);
  }

  while (passwordArray.length < length) {
    const randomIndex = Math.floor(Math.random() * functionsToCallArray.length);
    passwordArray.push(functionsToCallArray[randomIndex]());
  }

  shuffle(passwordArray);

  let passwordString = "";
  passwordArray.forEach((char) => {
    passwordString += char;
  });

  return passwordString;
};

const generateLowercaseChar = () => {
  const randomAscii = Math.floor(Math.random() * (123 - 97) + 97);
  return String.fromCharCode(randomAscii);
};

const generateUppercaseChar = () => {
  const randomAscii = Math.floor(Math.random() * (91 - 65) + 65);
  return String.fromCharCode(randomAscii);
};

const generateNumber = () => {
  return Math.floor(Math.random() * 10).toString();
};

const generateSymbol = () => {
  const randomAscii = Math.floor(Math.random() * (44 - 33) + 33);
  return String.fromCharCode(randomAscii);
};
