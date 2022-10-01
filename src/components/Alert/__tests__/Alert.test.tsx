import { render, screen } from "@testing-library/react";
import Alert from "../Alert";

test("renders correctly", () => {
  const msg = "test message";
  render(<Alert msg={msg} />);

  const alertMessage = screen.getByRole("alert", { name: msg });
  expect(alertMessage).toBeInTheDocument();

  const removeButton = screen.getByRole("button", {
    description: /remove alert/i,
  });
  expect(removeButton).toBeInTheDocument();
});
