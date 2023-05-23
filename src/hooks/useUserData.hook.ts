import GlobalStateManager from "../store/config";
import { checkUserSession, signIn, signUp } from "../store/user/user.actions";
import { selectCurrentUser } from "../store/user/user.selector";

export const useUserData = () => {
  const currentUser = GlobalStateManager.getState(selectCurrentUser);

  return {
    currentUser,
  };
};

export const useUserActions = () => {
  const appDispatch = GlobalStateManager.setState();
  const checkUser = () => appDispatch(checkUserSession());
  const signInUser = (email: string, password: string) =>
    appDispatch(signIn(email, password));
  const signUpUser = (formFields: any) => appDispatch(signUp(formFields));
  return {
    checkUser,
    signInUser,
    signUpUser,
  };
};
