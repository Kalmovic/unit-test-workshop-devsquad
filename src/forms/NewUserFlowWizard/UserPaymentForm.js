import React from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { TextField, Button } from "@mui/material";

const schema = yup.object().shape({
  credit_card: yup.string().required(),
});

const ErrorMessage = ({ error }) => {
  return (
    <span
      style={{
        color: "red",
        fontSize: "12px",
      }}
    >
      {error}
    </span>
  );
};

export function UserPaymentForm({ data, onSubmit }) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: data,
  });

  const onUserSubmit = (data) => {
    onSubmit(data);
  };

  return (
    <form
      data-testid="user-payment-form"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "start",
        gap: "1rem",
      }}
      onSubmit={handleSubmit(onUserSubmit)}
    >
      <div
        style={{
          width: "100%",
          display: "flex",
          gap: "1rem",
        }}
      >
        <label htmlFor="credit_card">Credit Card</label>
        <Controller
          name="credit_card"
          control={control}
          defaultValue=""
          render={({ field }) => <TextField type="text" {...field} label="Credit Card" />}
        />
        {errors?.credit_card && (
          <ErrorMessage error={errors.credit_card.message} />
        )}
      </div>
      <Button
        style={{
          backgroundColor: "royalblue",
          padding: "0.4rem",
          color: "white",
        }}
        type="submit"
      >
        Continue
      </Button>
    </form>
  );
}
