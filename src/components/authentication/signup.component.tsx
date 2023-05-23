import { Box, Button, TextField, Typography } from "@mui/material";
import React, {
  ChangeEvent,
  FormEvent,
  useEffect,
  useReducer,
  useState,
} from "react";
import { useUserActions } from "../../hooks/useUserData.hook";
import { defaultTheme } from "../../styles/themes/default.theme";
import PasswordField from "../passwordField/PasswordField.component";
import {
  emailReducer,
  EmailState,
  EMAIL_ACTIONS_TYPES,
  passwordReducer,
  PasswordState,
  PASSWORD_ACTIONS_TYPES,
} from "./formReducers";

type FormFieldsType = {
  displayName: string;
  address: string;
  secondAddress: string;
};

const defaultFormFields: FormFieldsType = {
  displayName: "",
  address: "",
  secondAddress: "",
};

const emailInitialState: EmailState = {
  value: "",
  isValid: null,
};

const passwordInitialState: PasswordState = {
  password: "",
  confirmPassword: "",
  isPasswordValid: null,
  passwordsMatch: null,
};

const SignUp = () => {
  const { signUpUser } = useUserActions();
  const [formIsValid, setFormIsValid] = useState(false);
  const [formFields, setFormFields] =
    useState<FormFieldsType>(defaultFormFields);
  const { displayName, address, secondAddress } = formFields;
  const [emailState, dispathEmail] = useReducer(
    emailReducer,
    emailInitialState
  );
  const [passwordState, dispathPassword] = useReducer(
    passwordReducer,
    passwordInitialState
  );

  useEffect(() => {
    const identifier = setTimeout(() => {
      if (
        emailState.isValid !== null &&
        passwordState.isPasswordValid !== null &&
        passwordState.passwordsMatch !== null
      ) {
        const isValid =
          emailState.isValid &&
          passwordState.isPasswordValid &&
          passwordState.passwordsMatch;
        setFormIsValid(isValid);
      }
    }, 500);
    return () => {
      clearTimeout(identifier);
    };
  }, [
    emailState.isValid,
    passwordState.isPasswordValid,
    passwordState.passwordsMatch,
  ]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === "email") {
      dispathEmail({
        type: EMAIL_ACTIONS_TYPES.USER_EMAIL_INPUT,
        payload: { value: event.target.value },
      });
    } else if (name === "password") {
      dispathPassword({
        type: PASSWORD_ACTIONS_TYPES.USER_PASSWORD_INPUT,
        payload: { value: event.target.value },
      });
    } else if (name === "confirmPassword") {
      dispathPassword({
        type: PASSWORD_ACTIONS_TYPES.USER_CONFIRM_INPUT,
        payload: { value: event.target.value },
      });
    } else {
      setFormFields((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      // dispatch(signUp(formFields));
      const signUpData = {
        email: emailState.value,
        password: passwordState.password,
        confirmPassword: passwordState.confirmPassword,
        ...formFields,
      };
      signUpUser(signUpData);
    } catch (e) {
      if (e instanceof Error) {
        alert(e.message);
      } else {
        console.log("algo salio mal");
      }
    }
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
        Sign Up
      </Typography>
      <Typography
        component="span"
        sx={{
          marginTop: "1rem",
        }}
      >
        Register to the ecommerce website with your email and password.
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
          label="Email"
          variant="standard"
          type="email"
          name="email"
          value={emailState.value}
          onChange={handleChange}
          required
          fullWidth
        />
        <PasswordField
          error={
            passwordState.isPasswordValid !== null &&
            !passwordState.isPasswordValid
          }
          helperText={
            passwordState.isPasswordValid !== null &&
            !passwordState.isPasswordValid
              ? "Password should have at leats 8 characters and special characters"
              : null
          }
          variant="standard"
          label="Password"
          name="password"
          value={passwordState.password}
          onChange={handleChange}
          required
          fullWidth
        />
        <PasswordField
          variant="standard"
          error={
            passwordState.passwordsMatch !== null &&
            !passwordState.passwordsMatch
          }
          helperText={
            passwordState.passwordsMatch !== null &&
            !passwordState.passwordsMatch
              ? "Passwords should be equal"
              : null
          }
          label="Confirm Password"
          name="confirmPassword"
          value={passwordState.confirmPassword}
          onChange={handleChange}
          required
          fullWidth
          disabled={passwordState.password.length === 0}
        />
        <TextField
          variant="standard"
          label="Display Name"
          type="text"
          fullWidth
          name="displayName"
          onChange={handleChange}
          value={displayName}
        />
        <TextField
          variant="standard"
          label="Address"
          type="text"
          name="address"
          value={address}
          onChange={handleChange}
          required
          fullWidth
        />
        <TextField
          variant="standard"
          label="Second address"
          type="test"
          name="secondAddress"
          onChange={handleChange}
          value={secondAddress}
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
          variant="contained"
          disabled={!formIsValid}
        >
          Sign Up
        </Button>
      </Box>
    </Box>
  );
};

export default SignUp;
