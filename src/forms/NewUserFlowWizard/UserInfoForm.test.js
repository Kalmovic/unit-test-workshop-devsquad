import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import UserInfoForm from "./UserInfoForm"

describe("UserInfoForm", () => {
  it("should render all form fields", () => {
    render(<UserInfoForm />)
    expect(screen.getByLabelText("Name")).toBeInTheDocument()
    expect(screen.getByLabelText("Age")).toBeInTheDocument()
    expect(screen.getByLabelText("Last Name")).toBeInTheDocument()
    expect(screen.getByLabelText("Profession")).toBeInTheDocument()
  })

  it("should show error messages when submitting an invalid form", async () => {
    render(<UserInfoForm />)
    fireEvent.submit(screen.getByText("Continue"));
    expect(await screen.findByText("name is a required field")).toBeInTheDocument()
    expect(await screen.findByText("profession is a required field")).toBeInTheDocument()
  })

  it("should successfully submit a valid form", async () => {
    const onSubmit = jest.fn();
    const {debug} = render(<UserInfoForm onSubmit={onSubmit} />);
    // expect(screen.getByText("Continue")).toBeInTheDocument();
    const continueButton = screen.getByTestId("continue-button");
    const nameInput = screen.getByLabelText("Name")
    const lastNameInput = screen.getByLabelText("Last Name")
    fireEvent.input(nameInput, {
      target: { value: "John" }
    });
    fireEvent.input(lastNameInput, {
      target: { value: "Doe" }
    });
    fireEvent.input(screen.getByLabelText("Age"), {
      target: { value: "29" }
    })
    fireEvent.input(screen.getByLabelText("Profession"), {
      target: { value: "Dev" }
    })
    console.log(debug());
    // expect(screen.getByRole("form")).toHaveFormValues({
    //   name: "John"
    // })
    fireEvent.submit(continueButton)
    expect(
      screen.queryByText("name is a required field")
    ).not.toBeInTheDocument();
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({
        name: "John",
        last_name: "Doe",
        age: 29,
        profession: "Dev"
      })
    })
  })
})
