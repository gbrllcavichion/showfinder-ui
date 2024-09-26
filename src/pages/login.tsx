import { useState } from 'react';
import { useRouter } from 'next/router';
import styles from './form.module.css';

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const form = document.createElement('form');
      form.method = 'POST';
      form.action = 'http://localhost:8080/api/users/login';

      const emailInput = document.createElement('input');
      emailInput.type = 'hidden';
      emailInput.name = 'email';
      emailInput.value = email;

      const passwordInput = document.createElement('input');
      passwordInput.type = 'hidden';
      passwordInput.name = 'password';
      passwordInput.value = password;

      form.appendChild(emailInput);
      form.appendChild(passwordInput);

      document.body.appendChild(form);
      form.submit();
    } catch (error) {
      setMessage('Erro ao fazer login.');
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Login</h1>
      <form onSubmit={handleLogin} className={styles.form}>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className={styles.input}
        />
        <label>Senha:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className={styles.input}
        />
        <button type="submit" className={styles.button}>
          Login
        </button>
      </form>
      {message && <p className={styles.message}>{message}</p>}
    </div>
  );
};

export default Login;
