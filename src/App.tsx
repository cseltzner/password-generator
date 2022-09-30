import React from "react";
import PasswordGenerator from "./components/PasswordGenerator/PasswordGenerator";

function App() {
  return (
    <div className="w-screen flex flex-col justify-center items-center h-screen bg-gradient-to-t from-black to-zinc-900 text-text-light">
      <PasswordGenerator />
    </div>
  );
}

export default App;
