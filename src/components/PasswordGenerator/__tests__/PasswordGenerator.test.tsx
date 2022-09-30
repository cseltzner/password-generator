import { screen, render, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PasswordGenerator from "../PasswordGenerator";
import { DEFAULT_PW_LENGTH } from "../../../pw-generator/generatePassword";

describe("Password Generator", () => {
  test("renders correctly", () => {
    render(<PasswordGenerator />);

    const header = screen.getByRole("heading", { name: /Password Generator/ });
    expect(header).toBeInTheDocument();

    const defaultPwRegex = new RegExp(
      "^[^!@#$%^&*()-+\\s]{" + DEFAULT_PW_LENGTH + "}$"
    );
    const password = screen.getByText(defaultPwRegex);
    expect(password).toBeInTheDocument();

    const pwCopyBtn = screen.getByRole("button", {
      description: /copy to clipboard/i,
    });
    expect(pwCopyBtn).toBeInTheDocument();

    const slider = screen.getByLabelText(/Character Length/);
    expect(slider).toBeInTheDocument();

    const checkboxes = screen.getAllByRole("checkbox");
    expect(checkboxes.length).toBe(3);

    const generatePwBtn = screen.getByRole("button", { name: /Generate/i });
    expect(generatePwBtn).toBeInTheDocument();
  });

  test("first two checkboxes are checked", () => {
    const checkboxes = screen.getAllByRole("checkbox");
    expect(checkboxes[0]).toBeChecked();
    expect(checkboxes[1]).toBeChecked();
    expect(checkboxes[2]).not.toBeChecked();
  });

  test("generating default password generates a password", () => {
    const generatePwBtn = screen.getByRole("button", { name: /Generate/i });
    // Check that password is rendered initially
    const defaultPwRegex = new RegExp(
      "^[^!@#$%^&*()-+\\s]{" + DEFAULT_PW_LENGTH + "}$"
    );
    const password1 = screen.getByText(defaultPwRegex);
    expect(password1).toBeInTheDocument();

    userEvent.click(generatePwBtn);

    // Check that password is still correct, and is different than original password
    // Technically there is a really small amount of flakyness due to the small chance PWs can randomly be the same
    const password2 = screen.getByText(defaultPwRegex);
    expect(password2).toBeInTheDocument();
    expect(password2).not.toEqual(password1);
  });

  test("checking all buttons, sliding slider, and generating password generates a correct password", () => {
    const newPwLength = 15;
    const slider = screen.getByLabelText(/Character Length/);
    const checkboxes = screen.getAllByRole("checkbox");
    const generatePwBtn = screen.getByRole("button", { name: /Generate/i });

    const defaultPwRegex = new RegExp(
      "^[^!@#$%^&*()-+\\s]{" + DEFAULT_PW_LENGTH + "}$"
    );
    const password1 = screen.getByText(defaultPwRegex);
    expect(password1).toBeInTheDocument();

    fireEvent.change(slider, { target: { value: newPwLength } });
    userEvent.click(checkboxes[checkboxes.length - 1]); // Check last checkbox on
    userEvent.click(generatePwBtn);

    const newPwRegex = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()+-])\\S{" +
        newPwLength +
        "}$"
    );

    const password2 = screen.getByText(newPwRegex);
    expect(password2).toBeInTheDocument();
    expect(password2).not.toEqual(password1);
  });

  test("can generate two passwords in a row", () => {
    const generatePwBtn = screen.getByRole("button", { name: /Generate/i });

    const defaultPwRegex = new RegExp(
      "^[^!@#$%^&*()-+\\s]{" + DEFAULT_PW_LENGTH + "}$"
    );
    const password1 = screen.getByText(defaultPwRegex);
    expect(password1).toBeInTheDocument();

    userEvent.click(generatePwBtn);
    userEvent.click(generatePwBtn);

    const password2 = screen.getByText(defaultPwRegex);
    expect(password2).toBeInTheDocument();
    expect(password2).not.toEqual(password1);
  });

  test("copies password to clipboard when copy button is clicked", () => {
    jest.spyOn(navigator.clipboard, "writeText");

    const copyBtn = screen.getByRole("button", {
      description: /copy to clipboard/i,
    });

    userEvent.click(copyBtn);

    expect(navigator.clipboard.writeText).toHaveBeenCalled();
  });

  test("copies password to clipboard when password is clicked", () => {
    jest.spyOn(navigator.clipboard, "writeText");

    const defaultPwRegex = new RegExp(
      "^[^!@#$%^&*()-+\\s]{" + DEFAULT_PW_LENGTH + "}$"
    );
    const password = screen.getByText(defaultPwRegex);

    userEvent.click(password);

    expect(navigator.clipboard.writeText).toHaveBeenCalled();
  });
});
