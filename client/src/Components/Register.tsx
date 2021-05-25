import '../main.css';
import '../css/login.css';

function Register() {
  return (
    <div className="login-container">
      <div className="form-container">
        <h3>Create Account</h3>
        <form>
          <label htmlFor="email">Email</label>
          <input type="text" name="email" id="email-register" />
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password-register" />
          <button type="submit">Create Account</button>
        </form>
      <div className="alternate-link">
        <h4>- OR -</h4>
        <a href="/Login">Log in to your account here</a>
      </div>
      </div>
    </div>
  )
}

export default Register