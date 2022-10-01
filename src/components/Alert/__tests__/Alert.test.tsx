import { render, screen } from "@testing-library/react";
import Alert from "../Alert";

test("renders correctly", () => {
  const msg = "test message";
  render(<Alert msg={msg} onRemove={() => {}} />);

  const alertMessage = screen.getByRole("alert");
  expect(alertMessage).toBeInTheDocument();

  const removeButton = screen.getByRole("button", {});

  expect(removeButton).toBeInTheDocument();
});
