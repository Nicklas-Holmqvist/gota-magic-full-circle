import "../main.css";
import "../css/login.css";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuthContext } from "../Context/AuthContext";

function Login() {
  const history = useHistory();
  const authContext = useAuthContext();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [logInSuccessMsg, setLogInSuccessMsg] = useState("");

  const handleEmailChange = (e: any) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setEmailError("");
    setPasswordError("");

    const formData = { email, password };

    // Email validation
    if (!email.includes("@" && ".")) {
      setEmailError("Skriv in en giltig email-adress");
      return;
    }

    const options = {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    };

    try {
      const response = await fetch("/api/user/login", options);
      const data: any = await response.json();

      if (data.errors) {
        if (data.errors.email !== "") {
          setEmailError(data.errors.email);
        }
        if (data.errors.password !== "") {
          setPasswordError(data.errors.password);
        }
      }

      if (data.user) {
        authContext.fetchAuth(data.user);
        setLogInSuccessMsg("Inloggning lyckades. Du skickas nu vidare...");

        setTimeout(() => {
          history.push("/ProductList");
        }, 2000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="login-container">
      <div className="form-container">
        <h3>Logga In</h3>
        <form>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            id="email-login"
            onChange={handleEmailChange}
            required
          />
          <span className="email-error">{emailError}</span>
          <label htmlFor="password">Lösenord</label>
          <input
            type="password"
            name="password"
            id="password-login"
            onChange={handlePasswordChange}
            required
          />
          <span className="password-error">{passwordError}</span>
          <button type="submit" onClick={handleSubmit}>
            Logga In
          </button>
          <span className="login-successful-text">{logInSuccessMsg}</span>
        </form>
        <div className="alternate-link">
          <h4>- ELLER -</h4>
          <a href="/Register">Skapa ett nytt konto här</a>
        </div>
      </div>
    </div>
  );
}

export default Login;
