import '../main.css';
import '../css/login.css';

function Login() {
  return (
    <div className="login-container">
      <div className="form-container">
        <h3>Log In</h3>
        <form>
          <label htmlFor="email">Email</label>
          <input type="text" name="email" id="email-login" />
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password-login" />
          <button type="submit">Log In</button>
        </form>
      <div className="alternate-link">
        <h4>- OR -</h4>
        <a href="/Register">Create a new account here</a>
      </div>
      </div>
    </div>
  )
}

export default Login