"use client"
import { useState } from "react";
import styles from "../page.module.css";
import { useAuthHelper } from "@/app/_lib/firebase/auth";
import { emailValidator, passwordsMatchChecker, passwordValidator } from "../signup-validation";
import Link from "next/link";
import { Input } from "@/app/_components/text-input/text-input";
import { useRouter } from "next/navigation";

const Signup = () => {
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordConfirmError, setPasswordConfirmError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [showError, setShowError] = useState(false);
  const router = useRouter();
  const { doCreateUserWithEmailAndPassword } = useAuthHelper();

  const onSubmit = () => {
    const { isValid: isPasswordValid, message: passwordMessage } =
      passwordValidator(password);
    const { isValid: isEmailValid, message: emailMessage } =
      emailValidator(email);
    const doPasswordsMatch = passwordsMatchChecker(password, passwordConfirm);

    setPasswordError(passwordMessage);
    setEmailError(emailMessage);
    setPasswordConfirmError(doPasswordsMatch ? "" : "Passwords do not match!");

    if (isPasswordValid && isEmailValid && doPasswordsMatch) {
      doCreateUserWithEmailAndPassword(email, password).then(
        () => {
          router.push("/");
        }
      ).catch(() => {
        handleErrorMessage();
      });
    }
  };

  const handleErrorMessage = () => {
    setShowError(true);
    const errorTimeout = setTimeout(() => {
      setShowError(false);
    }, 3000);
    return () => {
      clearTimeout(errorTimeout);
    };
  };

  return (
      <div className={styles.portal}>
        <div className={styles.titleGroup}>
          <div className={styles.title} style={{ fontWeight: "250" }}>
            Welcome.
          </div>
          <div className={styles.title}>Create Account.</div>
        </div>
        <div className={styles.emailInput}>
          <Input
            id="email"
            locked={false}
            active={false}
            label="Email Address"
            errorMessage={emailError}
            value={email}
            setValue={setEmail}
          />
        </div>
        <div className={styles.passwordInput}>
          <Input
            id="password"
            locked={false}
            active={false}
            label="Password"
            isPassword={true}
            errorMessage={passwordError}
            value={password}
            setValue={setPassword}
          />
        </div>
        <div className={styles.passwordInput}>
          <Input
            id="passwordconfirm"
            locked={false}
            active={false}
            label="Confirm Password"
            isPassword={true}
            errorMessage={passwordConfirmError}
            value={passwordConfirm}
            setValue={setPasswordConfirm}
          />
        </div>
        <button className={styles.submitButton} onClick={onSubmit}>
          Sign Up
        </button>
        <label
          className={
            showError ? styles.errorMessageActive : styles.errorMessageInactive
          }
        >
          Invalid email address or password. Please try again!
        </label>
        <label className={styles.signup}>
          <Link href="/login">Already have an account? Login here.</Link>
        </label>
      </div>
  );
};

export default Signup;
