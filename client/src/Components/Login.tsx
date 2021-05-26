import '../main.css';
import '../css/login.css';
import { useState } from 'react';

function Login() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [emailError, displayErrorMsg] = useState("")

  const handleEmailChange = (e:any) => {
    setEmail(e.target.value)
  }
  
  const handlePasswordChange = (e:any) => {
    setPassword(e.target.value)
  }

  const handleSubmit = (e:any) => {
    e.preventDefault();
    displayErrorMsg('')

    // Email validation
    if (!email.includes('@' && '.')) {
      displayErrorMsg('Skriv in en giltig email-adress')
    }
  }

  return (
    <div className="login-container">
      <div className="form-container">
        <h3>Logga In</h3>
        <form>
          <label htmlFor="email">Email</label>
          <input type="text" name="email" id="email-login" onChange={handleEmailChange} required />
          <span className="email-error">{emailError}</span>
          <label htmlFor="password">Lösenord</label>
          <input type="password" name="password" id="password-login" onChange={handlePasswordChange} required />
          <button type="submit" onClick={handleSubmit}>Logga In</button>
        </form>
        <div className="alternate-link">
          <h4>- ELLER -</h4>
          <a href="/Register">Skapa ett nytt konto här</a>
        </div>
      </div>
    </div>
  )
}

export default Login