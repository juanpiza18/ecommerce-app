import { Reducer } from "react";

export type EmailState = {
  value: string;
  isValid: boolean | null;
};

export enum EMAIL_ACTIONS_TYPES {
  USER_EMAIL_INPUT = "USER_EMAIL_INPUT",
}

export type EmailActions = {
  type: EMAIL_ACTIONS_TYPES;
  payload: {
    value: string;
  };
};

export const emailReducer = (state: EmailState, action: EmailActions) => {
  const emailRegex = "^\\w+([.-]?\\w+)*@\\w+([.-]?\\w+)*(\\.\\w{2,3})+$";
  const regex = new RegExp(emailRegex);
  switch (action.type) {
    case EMAIL_ACTIONS_TYPES.USER_EMAIL_INPUT:
      return {
        value: action.payload.value,
        isValid: regex.test(action.payload.value),
      };
    default:
      return {
        value: "",
        isValid: null,
      };
  }
};

export type PasswordState = {
  password: string;
  confirmPassword: string;
  isPasswordValid: boolean | null;
  passwordsMatch: boolean | null;
};

export enum PASSWORD_ACTIONS_TYPES {
  USER_PASSWORD_INPUT = "USER_PASSWORD_INPUT",
  USER_CONFIRM_INPUT = "USER_CONFIRM_INPUT",
}

export type PasswordActions = {
  type: PASSWORD_ACTIONS_TYPES;
  payload: {
    value: string;
  };
};

const validatePasswords = (password: string, confirmPassword: string) => {
  return password === confirmPassword;
};

export const passwordReducer: Reducer<PasswordState, PasswordActions> = (
  state: PasswordState,
  action: PasswordActions
) => {
  switch (action.type) {
    case PASSWORD_ACTIONS_TYPES.USER_PASSWORD_INPUT:
      return {
        ...state,
        password: action.payload.value,
        isPasswordValid:
          /^(?=.*[0-9])(?=.*[!@#$%^&*_:;])[a-zA-Z0-9!@#$%^&*]{8,20}$/.test(
            action.payload.value
          ),
      };
    case PASSWORD_ACTIONS_TYPES.USER_CONFIRM_INPUT:
      return {
        ...state,
        confirmPassword: action.payload.value,
        passwordsMatch: validatePasswords(state.password, action.payload.value),
      };
    default:
      return state;
  }
};
