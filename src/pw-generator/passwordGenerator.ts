export const DEFAULT_PW_LENGTH = 10;

export interface PwOptions {
  length?: number;
  uppercase?: boolean;
  numbers?: boolean;
  symbols?: boolean;
}

export const generatePassword = (options?: PwOptions) => {
  return "";
};
