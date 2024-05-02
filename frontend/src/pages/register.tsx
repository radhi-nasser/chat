import { useState } from "react";
import { useLogin } from "../hooks/use-login";

export function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const mutation = useLogin();

  const loginButtonDisabled =
    !username.trim().length || !password.trim().length || mutation.isPending;

  return (
    <div className="auth">
      <span className="auth-title">Create a new account</span>
      <input
        className="input"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        className="input"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        disabled={loginButtonDisabled}
        className="button"
        onClick={() => {
          mutation.mutate({ username, password });
        }}
      >
        Signup {mutation.isPending && "..."}
      </button>

      {mutation.isError ? <div>Wrong username and/or password</div> : null}
    </div>
  );
}
