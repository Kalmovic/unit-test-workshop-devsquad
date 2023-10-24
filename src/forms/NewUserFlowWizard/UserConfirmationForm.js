import React from "react";
import { createUser } from "../../services/UsersAPI";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@mui/material";

export function UserConfirmationForm({ data, onEdit, onConfirm }) {
  const [isLoading, setIsLoading] = React.useState(false);
  const { control } = useForm();
  const handleOnConfirm = async () => {
    setIsLoading(true);
    try {
      await createUser(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      onConfirm();
    }
  };

  return (
    <>
      <div data-testid="user-confirmation-form">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
            gap: "1rem",
          }}
        >
          <span
            style={{
              fontSize: "1.5rem",
              fontWeight: "bold",
            }}
          >
            Confirm your information
          </span>
          <span>
            <strong>Name:</strong> {data.name}
          </span>
          <span>
            <strong>Last Name:</strong> {data.last_name}
          </span>
          <span>
            <strong>Credit Card:</strong> {data.credit_card}
          </span>
        </div>
        <div
          style={{
            display: "flex",
            gap: "1rem",
            marginTop: "1rem",
          }}
        >
          <Controller
            name="confirm"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Button
                {...field}
                onClick={handleOnConfirm}
                style={{
                  backgroundColor: "royalblue",
                  padding: "0.4rem",
                  color: "white",
                }}
              >
                {isLoading ? "Loading..." : "Confirm"}
              </Button>
            )}
          />
          <Controller
            name="edit"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Button
                type="button"
                {...field}
                onClick={onEdit}
                style={{
                  backgroundColor: "white",
                  padding: "0.4rem",
                }}
              >
                Edit
              </Button>
            )}
          />
        </div>
      </div>
    </>
  );
}

export default UserConfirmationForm;
