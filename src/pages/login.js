import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/api/users/login', {
        email,
        password,
      });

      if (response.data.token) {
        // Armazena o token no localStorage ou cookie
        localStorage.setItem('token', response.data.token);

        // Redireciona para uma página protegida (por exemplo, "/dashboard")
        router.push('/dashboard');
      }
    } catch (error) {
      setMessage('Erro ao fazer login. Verifique suas credenciais.');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px' }}>
      <h1 style={{ textAlign: 'center' }}>Login</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ marginBottom: '10px', padding: '8px' }}
        />
        <label>Senha:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ marginBottom: '20px', padding: '8px' }}
        />
        <button type="submit" style={{ padding: '10px', backgroundColor: '#0070f3', color: '#fff', border: 'none', borderRadius: '4px' }}>
          Login
        </button>
      </form>
      {message && <p style={{ textAlign: 'center', marginTop: '20px', color: 'red' }}>{message}</p>}
    </div>
  );
}
