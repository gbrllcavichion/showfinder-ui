import { useState } from 'react';
import axios from 'axios';
import styles from './form.module.css';

const Register: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/users/register', {
        email,
        username,
        password,
      });
      setMessage('Usuário cadastrado com sucesso!');
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setMessage('Email já cadastrado.');
      } else {
        setMessage('Erro ao cadastrar usuário.');
      }
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Cadastro de Usuário</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className={styles.input}
        />
        <label>Usuário:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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
          Cadastrar
        </button>
      </form>
      {message && <p className={styles.message}>{message}</p>}
    </div>
  );
};

export default Register;
