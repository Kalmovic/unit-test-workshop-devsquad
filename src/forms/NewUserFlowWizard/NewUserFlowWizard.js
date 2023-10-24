import React from "react";
import { UserInfoForm } from "./UserInfoForm";
import { UserAddressForm } from "./UserAddressForm";
import { UserPaymentForm } from "./UserPaymentForm";
import { UserConfirmationForm } from "./UserConfirmationForm";
import { NewUserResult } from "./NewUserResult";
import { Button } from "@mui/material";

const WizardKind = {
  UserInfoForm: "userInfoForm",
  UserAddressForm: "userAddressForm",
  UserPaymentForm: "userPaymentForm",
  UserConfirmationForm: "userConfirmationForm",
  NewUserResult: "newUserResultForm",
};

const Wrapper = ({
  children,
  cancelAddingNewUser,
  userFlowStatus = "ongoing",
}) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "300px",
        margin: "auto",
        border: "1px solid black",
        borderRadius: "5px",
        padding: "1rem",
      }}
    >
      {children}
      
      <Button
        onClick={cancelAddingNewUser}
        style={{
          marginTop: "20px",
          marginLeft: "auto",
          backgroundColor:
            userFlowStatus === "ongoing" ? "lightsalmon" : "white",
          border: "1px solid black",
          padding: "0.4rem",
          color: "black",
        }}
      >
        {userFlowStatus === "ongoing" ? "Cancel" : "Close"}
      </Button>
    </div>
  );
};

export function NewUserFlowWizard({ cancelAddingNewUser }) {
  const [wizardState, setWizardState] = React.useState({
    kind: "userInfoForm",
    data: {},
  });

  const changeWizardState = (kind, data) => {
    setWizardState({
      kind,
      data: {
        ...wizardState.data,
        ...data,
      },
    });
  };

  const resetWizardState = () => {
    setWizardState({
      kind: "userInfoForm",
      data: {},
    });
  };

  const onUserInfoFormSubmit = (userInfo) => {
    changeWizardState(WizardKind.UserAddressForm, userInfo);
  };

  const onAddressFormSubmit = (addressInfo) => {
    changeWizardState(WizardKind.UserPaymentForm, addressInfo);
  };

  const onPaymentFormSubmit = (paymentInfo) => {
    changeWizardState(WizardKind.UserConfirmationForm, paymentInfo);
  };

  const onConfirmationFormSubmit = (confirmationInfo) => {
    changeWizardState(WizardKind.NewUserResult, {});
  };

  const onEditFormSubmit = () => {
    changeWizardState(WizardKind.UserInfoForm, wizardState.data);
  };

  switch (wizardState.kind) {
    case WizardKind.UserInfoForm:
      return (
        <Wrapper cancelAddingNewUser={cancelAddingNewUser}>
          <UserInfoForm
            data={wizardState.data}
            onSubmit={onUserInfoFormSubmit}
          />
        </Wrapper>
      );
    case WizardKind.UserAddressForm:
      return (
        <Wrapper cancelAddingNewUser={cancelAddingNewUser}>
          <UserAddressForm
            data={wizardState.data}
            onSubmit={onAddressFormSubmit}
          />
        </Wrapper>
      );
    case WizardKind.UserPaymentForm:
      return (
        <Wrapper cancelAddingNewUser={cancelAddingNewUser}>
          <UserPaymentForm
            data={wizardState.data}
            onSubmit={onPaymentFormSubmit}
          />
        </Wrapper>
      );
    case WizardKind.UserConfirmationForm:
      return (
        <Wrapper cancelAddingNewUser={cancelAddingNewUser}>
          <UserConfirmationForm
            data={wizardState.data}
            onEdit={onEditFormSubmit}
            onConfirm={onConfirmationFormSubmit}
          />
        </Wrapper>
      );
    case WizardKind.NewUserResult:
      return (
        <Wrapper
          cancelAddingNewUser={cancelAddingNewUser}
          userFlowStatus="success"
        >
          <NewUserResult onAddAnotherUser={resetWizardState} />
        </Wrapper>
      );
    // exhaustive check protects us from forgetting to handle a case
    default:
      return (
        <Wrapper cancelAddingNewUser={cancelAddingNewUser}>
          <h1>Something went wrong</h1>
        </Wrapper>
      );
  }
}
