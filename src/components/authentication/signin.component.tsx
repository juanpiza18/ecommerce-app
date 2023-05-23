import { Box, Button, TextField, Typography } from "@mui/material";
import React, { ChangeEvent, FormEvent, useReducer, useState } from "react";
import { useEffect } from "react";
import { useUserActions } from "../../hooks/useUserData.hook";
import { defaultTheme } from "../../styles/themes/default.theme";
import PasswordField from "../passwordField/PasswordField.component";
import { emailReducer, EMAIL_ACTIONS_TYPES } from "./formReducers";

type SignInFormFieldsType = {
  password: string;
};

const defaultFormFields: SignInFormFieldsType = {
  password: "",
};

const SignIn = () => {
  const [formIsValid, setFormIsValid] = useState(false);
  const [signInFields, setSignInFields] = useState(defaultFormFields);
  const [emailState, dispathEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });
  const { signInUser } = useUserActions();
  useEffect(() => {
    const identifier = setTimeout(() => {
      if (emailState.isValid !== null) {
        setFormIsValid(emailState.isValid);
      }
    }, 500);
    return () => {
      clearTimeout(identifier);
    };
  }, [emailState.isValid]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setSignInFields((prev) => ({ ...prev, [name]: value }));
  };

  const handleEmailInput = (event: ChangeEvent<HTMLInputElement>) => {
    dispathEmail({
      type: EMAIL_ACTIONS_TYPES.USER_EMAIL_INPUT,
      payload: { value: event.target.value },
    });
  };

  const handleSubmitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { password } = signInFields;
    signInUser(emailState.value, password);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "380px",
      }}
    >
      <Typography
        component="h1"
        sx={{
          textTransform: "uppercase",
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: "1rem",
          fontSize: "2rem",
          color: defaultTheme.palette.primary.main,
        }}
      >
        Sign In
      </Typography>
      <Typography
        component="span"
        sx={{
          marginTop: "1rem",
        }}
      >
        Sign in with your email and password
      </Typography>
      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          "& > .MuiFormControl-root": {
            marginTop: "1rem",
          },
        }}
        noValidate={formIsValid}
        onSubmit={handleSubmitForm}
      >
        <TextField
          error={emailState.isValid !== null && !emailState.isValid}
          helperText={
            emailState.isValid !== null && !emailState.isValid
              ? "Invalid email please review"
              : null
          }
          label="Email"
          variant="standard"
          type="email"
          name="email"
          value={emailState.value}
          onChange={handleEmailInput}
          required
          fullWidth
        />
        <PasswordField
          variant="standard"
          label="Password"
          name="password"
          onChange={handleChange}
          value={signInFields.password}
          required
          fullWidth
        />
        <Button
          type="submit"
          sx={{
            marginTop: "1rem",
            width: "150px",
            alignSelf: "center",
            padding: "1rem",
          }}
          disabled={!formIsValid}
          variant="contained"
        >
          Sign In
        </Button>
      </Box>
    </Box>
  );
};

export default SignIn;
