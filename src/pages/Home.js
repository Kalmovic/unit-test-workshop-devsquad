import React from "react";
import { NewUserFlowWizard } from "../forms/NewUserFlowWizard/NewUserFlowWizard";
import { UsersTable } from "../components/UsersTable";

export default function Home() {
  const [isAddingUser, setIsAddingUser] = React.useState(false);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1rem",
      }}
    >
      <h1>Dashboard</h1>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-start",
          justifyItems: "flex-start",
          gap: "1rem",
        }}
      >
        <UsersTable addUserCallback={() => setIsAddingUser(true)} />
        {!isAddingUser ? null : (
          <NewUserFlowWizard
            cancelAddingNewUser={() => setIsAddingUser(false)}
          />
        )}
      </div>
    </div>
  );
}
