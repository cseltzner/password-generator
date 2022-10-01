import React, { useEffect, useState } from "react";
import { generatePassword } from "../../pw-generator/generatePassword";

interface Props {
  setPassword: React.Dispatch<React.SetStateAction<string>>;
}

const PasswordInput = ({ setPassword }: Props) => {
  const [length, setLength] = useState(10);
  const [uppercase, setUppercase] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(false);
  const [strength, setStrength] = useState(0);
  const [strengthString, setStrengthString] = useState("");

  // Estimate password strength
  useEffect(() => {
    let curStrength = 0;

    if (length >= 8) curStrength++;
    if (length >= 12) curStrength++;
    if (uppercase) curStrength++;
    if (numbers) curStrength++;
    if (symbols) curStrength++;

    if (curStrength > 4) curStrength = 4;
    setStrength(curStrength);

    if (curStrength === 0) setStrengthString("Poor");
    if (curStrength === 1) setStrengthString("Weak");
    if (curStrength === 2) setStrengthString("Medium");
    if (curStrength === 3) setStrengthString("Strong");
    if (curStrength === 4) setStrengthString("Unstoppable");
  }, [length, uppercase, numbers, symbols]);

  const onSliderChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setLength(Number(e.target.value));
    } catch (err) {
      console.log("Something went wrong");
      // Throw alert
    }
  };

  const onGeneratePasswordHandler = () => {
    const newPassword = generatePassword({
      length: length,
      uppercase: uppercase,
      numbers: numbers,
      symbols: symbols,
    });

    setPassword(newPassword);
  };

  return (
    <div className="flex flex-col bg-surface-light justify-between items-center w-full px-6 py-4">
      {/* Length section */}
      <div className="flex justify-between items-center w-full">
        <label htmlFor="password-length-slider">Character Length</label>
        <p className="text-primary-mint text-2xl font-bold">{length}</p>
      </div>
      <input
        type="range"
        name="password-length-slider"
        id="password-length-slider"
        min={5}
        max={15}
        value={length}
        onChange={(e) => onSliderChangeHandler(e)}
        className="w-full accent-white mt-6 my-10 h-1  cursor-grab active:cursor-grabbing text-white bg-primary-mint rounded-full appearance-none"
      />

      {/* Checkbox section */}
      <fieldset className="flex flex-col gap-4 w-full">
        <div className="flex gap-4 justify-start items-baseline">
          <input
            type="checkbox"
            name="uppercase"
            id="uppercase"
            checked={uppercase}
            onChange={(e) => setUppercase(e.target.checked)}
            className="accent-primary-mint scale-125 border-none rounded-none"
          />
          <label htmlFor="uppercase" className="tracking-tight select-none">
            Include Uppercase Letters
          </label>
        </div>
        <div className="flex gap-4 justify-start items-baseline">
          <input
            type="checkbox"
            name="numbers"
            id="numbers"
            checked={numbers}
            onChange={(e) => setNumbers(e.target.checked)}
            className="accent-primary-mint scale-125 border-none rounded-none"
          />
          <label htmlFor="numbers" className="tracking-tight select-none">
            Include Numbers
          </label>
        </div>
        <div className="flex gap-4 justify-start items-baseline">
          <input
            type="checkbox"
            name="symbols"
            id="symbols"
            checked={symbols}
            onChange={(e) => setSymbols(e.target.checked)}
            className="accent-primary-mint scale-125 border-none rounded-none"
          />
          <label htmlFor="symbols" className="tracking-tight select-none">
            Include Symbols
          </label>
        </div>
      </fieldset>

      {/* Strength box */}
      <div className="justify-between flex mt-8 items-center px-4 py-4 bg-surface-dark w-full">
        <p className="opacity-60 tracking-wide font-bold">STRENGTH</p>
        <div className="flex h-full gap-4">
          <p className="uppercase tracking-tight font-bold opacity-90">
            {strengthString}
          </p>
          <div className="flex h-full gap-1">
            <div
              className={`${
                strength >= 1
                  ? "bg-secondary-yellow"
                  : "border-2 border-text-light"
              } h-full w-2.5 rounded-sm`}
            ></div>
            <div
              className={`${
                strength >= 2
                  ? "bg-secondary-yellow"
                  : "border-2 border-text-light"
              } h-full w-2.5 rounded-sm`}
            ></div>
            <div
              className={`${
                strength >= 3
                  ? "bg-secondary-yellow"
                  : "border-2 border-text-light"
              } h-full w-2.5 rounded-sm`}
            ></div>
            <div
              className={`${
                strength >= 4
                  ? "bg-secondary-yellow"
                  : "border-2 border-text-light"
              } h-full w-2.5 rounded-sm`}
            ></div>
          </div>
        </div>
      </div>

      {/* Generate button */}
      <button
        className="shadow hover:shadow-sm active:shadow-lg hover:scale-[100.5%] active:scale-[99.7%] flex gap-6 mt-8 bg-primary-mint w-full text-zinc-900 rounded-sm items-center justify-center py-4 font-bold uppercase"
        onClick={() => onGeneratePasswordHandler()}
      >
        <p>Generate</p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z"
          />
        </svg>
      </button>
    </div>
  );
};

export default PasswordInput;
