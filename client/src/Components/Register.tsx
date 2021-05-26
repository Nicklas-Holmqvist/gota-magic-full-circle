import '../main.css';
import '../css/login.css';
import { useState } from 'react';

function Register() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [emailError, displayEmailErrorMsg] = useState("")
  const [passwordError, displayPasswordErrorMsg] = useState("")

  const handleEmailChange = (e:any) => {
    setEmail(e.target.value)
  }
  
  const handlePasswordChange = (e:any) => {
    setPassword(e.target.value)
  }

  const handleSubmit = (e:any) => {
    e.preventDefault();
    displayEmailErrorMsg('')

    const formData = { email, password }

    // Email validation
    if (!email.includes('@' && '.')) {
      displayEmailErrorMsg('Skriv in en giltig email-adress')
      return
    }

    // Password length validation
    if (password.length < 6) {
      displayPasswordErrorMsg('Lösenordet måste innehålla minst 6 tecken')
      return
    }

    const options = {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    }

    fetch('/api/user/register', options)
      .then((response) => {
        console.log(response)
      })
  }

  return (
    <div className="login-container">
      <div className="form-container">
        <h3>Skapa Konto</h3>
        <form>
          <label htmlFor="email">Email</label>
          <input type="text" name="email" id="email-register" onChange={handleEmailChange} required />
          <span className="email-error">{emailError}</span>
          <label htmlFor="password">Lösenord</label>
          <input type="password" name="password" id="password-register" onChange={handlePasswordChange} required />
          <span className="password-error">{passwordError}</span>
          <button type="submit" onClick={handleSubmit}>Registrera</button>
        </form>
        <div className="alternate-link">
          <h4>- ELLER -</h4>
          <a href="/Login">Logga in till ett befintligt konto här</a>
        </div>
      </div>
    </div>
  )
}

export default Register