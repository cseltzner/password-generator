import { screen, render, fireEvent, waitFor } from "@testing-library/react";
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
    render(<PasswordGenerator />);
    const checkboxes = screen.getAllByRole("checkbox");
    expect(checkboxes[0]).toBeChecked();
    expect(checkboxes[1]).toBeChecked();
    expect(checkboxes[2]).not.toBeChecked();
  });

  test("generating default password generates a password", async () => {
    const user = userEvent.setup();
    render(<PasswordGenerator />);

    const generatePwBtn = screen.getByRole("button", { name: /Generate/i });
    // Check that password is rendered initially
    const defaultPwRegex = new RegExp(
      "^[^!@#$%^&*()-+\\s]{" + DEFAULT_PW_LENGTH + "}$"
    );
    const password1El = screen.getByText(defaultPwRegex);
    expect(password1El).toBeInTheDocument();

    const password1 = password1El.textContent;

    await user.click(generatePwBtn);

    // Check that password is still correct, and is different than original password
    // Technically there is a really small amount of flakyness due to the small chance PWs can randomly be the same
    const password2El = await screen.findByText(defaultPwRegex);
    expect(password2El).toBeInTheDocument();

    const password2 = password2El.textContent;
    expect(password2).not.toEqual(password1);
  });

  test("checking all buttons, sliding slider, and generating password generates a correct password", async () => {
    render(<PasswordGenerator />);

    const newPwLength = 15;
    const slider = screen.getByLabelText(/Character Length/);
    const checkboxes = screen.getAllByRole("checkbox");
    const generatePwBtn = screen.getByRole("button", { name: /Generate/i });

    const defaultPwRegex = new RegExp(
      "^[^!@#$%^&*()-+\\s]{" + DEFAULT_PW_LENGTH + "}$"
    );
    const password1El = screen.getByText(defaultPwRegex);
    expect(password1El).toBeInTheDocument();
    const password1 = password1El.textContent;

    fireEvent.change(slider, { target: { value: newPwLength } });
    await userEvent.click(checkboxes[checkboxes.length - 1]); // Check last checkbox on
    await userEvent.click(generatePwBtn);

    const newPwRegex = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()+-])\\S{" +
        newPwLength +
        "}$"
    );

    const password2El = await screen.findByText(newPwRegex);
    expect(password2El).toBeInTheDocument();
    const password2 = password2El.textContent;
    expect(password2).not.toEqual(password1);
  });

  test("can generate two passwords in a row", async () => {
    render(<PasswordGenerator />);

    const generatePwBtn = screen.getByRole("button", { name: /Generate/i });

    const defaultPwRegex = new RegExp(
      "^[^!@#$%^&*()-+\\s]{" + DEFAULT_PW_LENGTH + "}$"
    );
    const password1El = screen.getByText(defaultPwRegex);
    expect(password1El).toBeInTheDocument();
    const password1 = password1El.textContent;

    await userEvent.click(generatePwBtn);
    await userEvent.click(generatePwBtn);

    const password2El = await screen.findByText(defaultPwRegex);
    expect(password2El).toBeInTheDocument();
    const password2 = password2El.textContent;
    expect(password2).not.toEqual(password1);
  });

  test("copies password to clipboard when copy button is clicked", async () => {
    render(<PasswordGenerator />);

    jest.spyOn(navigator.clipboard, "writeText");

    const copyBtn = screen.getByRole("button", {
      description: /copy to clipboard/i,
    });

    userEvent.click(copyBtn);

    await waitFor(() => {
      expect(navigator.clipboard.writeText).toHaveBeenCalled();
    });
  });

  test("copies password to clipboard when password is clicked", async () => {
    render(<PasswordGenerator />);

    jest.spyOn(navigator.clipboard, "writeText");

    const defaultPwRegex = new RegExp(
      "^[^!@#$%^&*()-+\\s]{" + DEFAULT_PW_LENGTH + "}$"
    );
    const password = screen.getByText(defaultPwRegex);

    await userEvent.click(password);

    await waitFor(() => {
      expect(navigator.clipboard.writeText).toHaveBeenCalled();
    });
  });
});
