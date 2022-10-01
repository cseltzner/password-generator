import React, { useEffect, useState } from "react";

interface Props {
  msg: String;
  onRemove: () => void;
}

const Alert = ({ msg, onRemove }: Props) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div
      role="alert"
      className={`${
        mounted && "-translate-y-24"
      } absolute transition-all ease-out bottom-0 bg-zinc-400 text-black text-opacity-90 px-3 py-4 w-64`}
    >
      <p>{msg}</p>
      <button
        onClick={() => onRemove()}
        className="absolute top-1 right-1 hover:bg-surface-dark hover:text-white rounded-full cursor-pointer p-1"
        aria-describedby="remove alert"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
};

export default Alert;
