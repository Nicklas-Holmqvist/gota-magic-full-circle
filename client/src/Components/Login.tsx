import '../main.css';
import '../css/login.css';

function Login() {
  return (
    <div className="login-container">
      <div className="form-container">
        <h3>Logga In</h3>
        <form>
          <label htmlFor="email">Email</label>
          <input type="text" name="email" id="email-login" required />
          <label htmlFor="password">Lösenord</label>
          <input type="password" name="password" id="password-login" required />
          <button type="submit">Logga In</button>
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