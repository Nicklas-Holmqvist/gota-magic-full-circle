import '../main.css';
import '../css/login.css';
import { useState } from 'react';
import { useHistory } from 'react-router-dom'

function Register() {

  const history = useHistory()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [emailError, setEmailError] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [registerSuccessMsg, setRegisterSuccessMsg] = useState("")

  const handleEmailChange = (e:any) => {
    setEmail(e.target.value)
  }
  
  const handlePasswordChange = (e:any) => {
    setPassword(e.target.value)
  }

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    setEmailError('')
    setPasswordError('')

    const formData = { email, password }

    // Email validation
    if (!email.includes('@' && '.')) {
      setEmailError('Skriv in en giltig email-adress')
      return
    }

    // Password length validation
    if (password.length < 6) {
      setPasswordError('Lösenordet måste innehålla minst 6 tecken')
      return
    }

    const options = {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    }

    try {
      const response = await fetch('/api/user/register', options)
      const data: any = await response.json()

      if (data.errors) {
        setEmailError(data.errors.email)
        return
      } else {
        setRegisterSuccessMsg('Account created! Redirecting to Login page...')

        setTimeout(() => {
          history.push('/Login')
        }, 1500)
      }
      
    } catch (err) {
      console.error(err)
    }
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
          <span className="register-successful-text">{registerSuccessMsg}</span>
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