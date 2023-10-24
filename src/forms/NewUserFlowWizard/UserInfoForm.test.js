import { fireEvent, render, screen } from "@testing-library/react"
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

  it("should successfully submit a valid form", async () => {})
})
