import '../main.css';
import '../css/login.css';
import { useState } from 'react';
import { useHistory } from 'react-router-dom'

function Login() {

  const history = useHistory()

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

    const formData = { email, password }

    // Email validation
    if (!email.includes('@' && '.')) {
      displayErrorMsg('Skriv in en giltig email-adress')
      return
    }

    const options = {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    }

    fetch('/api/user/login', options)
      .then((response) => {
        console.log(response)
        if (response.status === 400) {
          displayErrorMsg('Ett konto med denna email existerar ej')
        } else {
          history.push('/ProductList')
        }
      })
      .catch((error) => {
        console.error(error)
      })
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