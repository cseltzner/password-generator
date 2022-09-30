import React, { useState } from "react";
import { generatePassword } from "../../pw-generator/generatePassword";
import PasswordInput from "./PasswordInput";
import PasswordOutput from "./PasswordOutput";

const PasswordGenerator = () => {
  // Set password with default options...
  const [password, setPassword] = useState(generatePassword());

  return (
    <div className=" w-[30rem] flex items-center justify-center flex-col gap-6">
      <h1 className="opacity-80 text-lg">Password Generator</h1>
      <PasswordOutput password={password} />
      <PasswordInput />
    </div>
  );
};

export default PasswordGenerator;
