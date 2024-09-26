import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './Dashboard.module.css';

interface ConcertDetails {
  event: string;
  eventDate: string;
}

const Dashboard: React.FC = () => {
  const [concerts, setConcerts] = useState<ConcertDetails[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchConcerts = async () => {
      try {
        const userId = localStorage.getItem('userId'); // Buscando o ID do usuário do localStorage
        if (!userId) {
          throw new Error("User ID not found");
        }
  
        const response = await axios.get(`http://localhost:8080/api/shows/user-shows/${userId}`);
        setConcerts(response.data);
      } catch (error) {
        setError('Erro ao buscar shows');
      }
    };
  
    fetchConcerts();
  }, []);
  

  return (
    <div className={styles.container}>
      <h1>Shows dos Seus Artistas Favoritos</h1>
      {error && <p className={styles.error}>{error}</p>}
      <ul className={styles.concertList}>
        {concerts.length > 0 ? (
          concerts.map((concert, index) => (
            <li key={index} className={styles.concertItem}>
              <p><strong>Artista e Cidade:</strong> {concert.event}</p>
              <p><strong>Data do Evento:</strong> {concert.eventDate}</p>
            </li>
          ))
        ) : (
          <p>Nenhum show encontrado para os seus artistas favoritos.</p>
        )}
      </ul>
    </div>
  );
};

export default Dashboard;
