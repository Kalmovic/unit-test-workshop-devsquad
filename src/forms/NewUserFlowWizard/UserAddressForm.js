import React from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, TextField } from "@mui/material";

const schema = yup.object().shape({
  address: yup.string().required(),
  city: yup.string().required(),
  state: yup.string().required(),
  zip: yup.string().required(),
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

export function UserAddressForm({ data, onSubmit }) {
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
      data-testid="user-address-form"
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
        <label htmlFor="address">Street</label>
        <Controller
          name="address"
          control={control}
          defaultValue=""
          render={({ field }) => <TextField type="text" {...field} label="Address" />}
        />
        {errors?.address && <ErrorMessage error={errors.address.message} />}
      </div>
      <div
        style={{
          width: "100%",
          display: "flex",
          gap: "1rem",
        }}
      >
        <label htmlFor="city">City</label>
        <Controller
          name="city"
          control={control}
          defaultValue=""
          render={({ field }) => <TextField type="text" {...field} label="City" />}
        />
        {errors?.city && <ErrorMessage error={errors.city.message} />}
      </div>
      <div
        style={{
          width: "100%",
          display: "flex",
          gap: "1rem",
        }}
      >
        <label htmlFor="state">State</label>
        <Controller
          name="state"
          control={control}
          defaultValue=""
          render={({ field }) => <TextField type="text" {...field} label="State" />}
        />
        {errors?.state && <ErrorMessage error={errors.state.message} />}
      </div>
      <div
        style={{
          width: "100%",
          display: "flex",
          gap: "1rem",
        }}
      >
        <label htmlFor="zip">Zip</label>
        <Controller
          name="zip"
          control={control}
          defaultValue=""
          render={({ field }) => <TextField type="text" {...field} label="Zip" />}
        />
        {errors?.zip && <ErrorMessage error={errors.zip.message} />}
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

export default UserAddressForm;
