import { Button } from "@mui/material";
import React from "react";

export function NewUserResult({ onAddAnotherUser }) {
  return (
    <>
      <div data-testid="new-user-result">success! ✅</div>
      <span>
        <Button
          style={{
            backgroundColor: "limegreen",
            padding: "0.4rem",
            color: "white",
          }}
          type="button"
          onClick={onAddAnotherUser}
        >
          Add another user
        </Button>
      </span>
    </>
  );
}
