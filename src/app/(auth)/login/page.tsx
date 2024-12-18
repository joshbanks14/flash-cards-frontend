"use client"
import { useState } from "react";
import styles from "../page.module.css";
import { useAuthHelper } from "@/app/_lib/firebase/auth";
import Link from "next/link";
import { Input } from "@/app/_components/text-input/text-input";
import { useRouter } from "next/navigation";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);
  const { doSignInWithEmailAndPassword, doPasswordReset } = useAuthHelper();
  const router = useRouter();

  const onSubmit = () => {
    doSignInWithEmailAndPassword(email, password)
      .then(() => {
        router.push("/");
      })
      .catch(() => {
        handleErrorMessage();
      });
  };

  const onPasswordReset = () => {
    if (email) {
      doPasswordReset(email)
        .then(() => {
          alert("Password reset email sent!");
        })
        .catch(() => {
          alert("An error occurred. Please try again!");
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
            Welcome Back.
          </div>
          <div className={styles.title}>Login Here.</div>
        </div>
        <div className={styles.emailInput}>
          <Input
            id="email"
            locked={false}
            active={false}
            label="Email Address"
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
            value={password}
            setValue={setPassword}
          />
        </div>
        <div className={styles.forgotPassword}>
          <label className="text-white cursor-pointer" onClick={onPasswordReset}>
            Forgotten password?
          </label>
        </div>
        <button className={styles.submitButton} onClick={onSubmit}>
          Login
        </button>
        <label
          className={
            showError ? styles.errorMessageActive : styles.errorMessageInactive
          }
        >
          The email and password provided do not match. Please try again!
        </label>
        <label className={styles.signup}>
          <Link href="/signup">Need an account? Sign up here.</Link>
        </label>
      </div>
  );
};

export default Login;
