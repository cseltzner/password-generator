import React, { useState } from "react";
import { generatePassword } from "../../pw-generator/generatePassword";
import Alert from "../Alert/Alert";
import PasswordInput from "./PasswordInput";
import PasswordOutput from "./PasswordOutput";

const PasswordGenerator = () => {
  const [alert, setAlert] = useState<null | JSX.Element>(null);
  // Set password with default options...
  const [password, setPassword] = useState(
    generatePassword({
      uppercase: true,
      numbers: true,
    })
  );

  const createAlert = (msg: string, timeout: number) => {
    const newAlert = <Alert msg={msg} onRemove={() => setAlert(null)} />;
    setAlert(newAlert);

    setTimeout(() => {
      setAlert(null);
    }, timeout);
  };

  return (
    <div className=" w-[30rem] flex items-center justify-center flex-col gap-6">
      <h1 className="opacity-80 text-xl">Password Generator</h1>
      <PasswordOutput password={password} setAlert={createAlert} />
      <PasswordInput setPassword={setPassword} />
      {alert}
    </div>
  );
};

export default PasswordGenerator;
