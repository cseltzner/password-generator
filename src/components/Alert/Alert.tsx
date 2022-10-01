import React from "react";

interface Props {
  msg: String;
  timeout?: number;
}

const Alert = ({ msg, timeout }: Props) => {
  return <div>Alert</div>;
};

export default Alert;
