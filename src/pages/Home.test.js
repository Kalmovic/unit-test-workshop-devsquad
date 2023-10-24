import { act, render, screen } from "@testing-library/react"
import Home from "./Home"

let addUserCallback;
jest.mock("../components/UsersTable", () => ({
  UsersTable: (props) => {
    addUserCallback = props.addUserCallback
    return <div data-testid="users-table" />
  }
}));

let cancelAddingNewUser
jest.mock("../forms/NewUserFlowWizard/NewUserFlowWizard", () => ({
  NewUserFlowWizard: (props) => {
    cancelAddingNewUser = props.cancelAddingNewUser
    return <div data-testid="new-user-flow-wizard" />
  }
}))

describe('Home', () => {
  it('should render the users table', () => {
    render(<Home />);
    expect(screen.getByTestId('users-table')).toBeInTheDocument()
  })
  it("should show new use form when callback is called", async () => {
    render(<Home />);
    act(() => {
      addUserCallback();
    })
    expect(
      screen.getByTestId("new-user-flow-wizard")
    ).toBeInTheDocument();
  })
  it("should render and then hide new user wizard", () => {
    render(<Home />);
    act(() => {
      addUserCallback();
    })
    expect(
      screen.getByTestId("new-user-flow-wizard")
    ).toBeInTheDocument();
    act(() => {
      cancelAddingNewUser()
    })
    expect(
      screen.queryByTestId("new-user-flow-wizard")
    ).not.toBeInTheDocument();
  })
})
