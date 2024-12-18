import { auth } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification,
  updatePassword,
} from "firebase/auth";

export const useAuthHelper = () => {
  const doCreateUserWithEmailAndPassword = async (
    email: string,
    password: string
  ) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const doSignInWithEmailAndPassword = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const doSignOut = () => {
    return auth.signOut();
  };

  const doPasswordReset = (email: string) => {
    return sendPasswordResetEmail(auth, email);
  };

  const doPasswordChange = (password: string) => {
    return auth.currentUser && updatePassword(auth.currentUser, password);
  };

  const doSendEmailVerification = () => {
    return (
      auth.currentUser &&
      sendEmailVerification(auth.currentUser, {
        url: `${window.location.origin}/home`,
      })
    );
  };

  return {
    doCreateUserWithEmailAndPassword,
    doSignInWithEmailAndPassword,
    doSignOut,
    doPasswordReset,
    doPasswordChange,
    doSendEmailVerification,
  };
};
