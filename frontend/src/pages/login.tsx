import { useState } from "react";
import { useLogin } from "../hooks/use-login";

export function Login() {
  const mutation = useLogin();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const loginButtonDisabled =
    !username.trim().length || !password.trim().length || mutation.isPending;

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await mutation.mutateAsync({ username, password });
  };

  return (
    <div className="auth">
      <span className="auth-title">Login to your account</span>
      <form onSubmit={onSubmit}>
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
        <button type="submit" disabled={loginButtonDisabled} className="button">
          Login {mutation.isPending && "..."}
        </button>
      </form>

      {mutation.isError ? <div>Wrong username and/or password</div> : null}
    </div>
  );
}
