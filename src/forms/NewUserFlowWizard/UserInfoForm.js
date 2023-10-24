import React from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, TextField } from "@mui/material";

const schema = yup.object().shape({
  name: yup.string().required(),
  last_name: yup.string().required(),
  age: yup
    .number("age is required and most be more then 18")
    .required("age is required and most be more then 18")
    .positive()
    .integer()
    .min(18)
    .max(99),
  profession: yup.string().required().min(3).max(99),
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

export function UserInfoForm({ data, onSubmit }) {
  const { control, handleSubmit, formState } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { ...data, age: data?.age ?? 0 },
  });
  const { errors } = formState;

  const onUserSubmit = (data) => {
    onSubmit(data);
  };

  return (
    <form
      name="user-info-form"
      data-testid="user-info-form"
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
        data-testid="name-input"
      >
        <Controller
          name="name"
          control={control}
          defaultValue=""
          render={({ field }) => <TextField {...field} label="Name" />}
        />
        {errors?.name && <ErrorMessage error={errors.name.message} />}
      </div>
      <div
        style={{
          width: "100%",
          display: "flex",
          gap: "1rem",
        }}
      >
        <Controller
          name="last_name"
          control={control}
          defaultValue=""
          render={({ field }) => <TextField {...field} label="Last Name" />}
        />
        {errors?.last_name && <ErrorMessage error={errors.last_name.message} />}
      </div>
      <div
        style={{
          width: "100%",
          display: "flex",
          gap: "1rem",
        }}
      >
        <Controller
          name="age"
          control={control}
          defaultValue=""
          render={({ field }) => <TextField {...field} label="Age" />}
        />
        {errors?.age && <ErrorMessage error={errors.age.message} />}
      </div>
      <div
        style={{
          width: "100%",
          display: "flex",
          gap: "1rem",
        }}
      >
        <Controller
          name="profession"
          control={control}
          defaultValue=""
          render={({ field }) => <TextField {...field} label="Profession" />}
        />
        {errors?.profession && (
          <ErrorMessage error={errors.profession.message} />
        )}
      </div>
      <Button
        style={{
          backgroundColor: "royalblue",
          padding: "0.4rem",
          color: "white",
        }}
        type="submit"
        data-testid="continue-button"
      >
        Continue
      </Button>
    </form>
  );
}

export default UserInfoForm;
