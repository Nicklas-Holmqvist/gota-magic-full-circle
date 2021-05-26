import '../main.css';
import '../css/login.css';

function Register() {
  return (
    <div className="login-container">
      <div className="form-container">
        <h3>Skapa Konto</h3>
        <form>
          <label htmlFor="email">Email</label>
          <input type="text" name="email" id="email-register" required />
          <label htmlFor="password">Lösenord</label>
          <input type="password" name="password" id="password-register" required />
          <button type="submit">Registrera</button>
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