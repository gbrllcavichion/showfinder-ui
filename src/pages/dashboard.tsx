import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router'; 
import styles from './Dashboard.module.css';

interface ConcertDetails {
  event: string;
  eventDate: string;
}

const Dashboard: React.FC = () => {
  const [concerts, setConcerts] = useState<ConcertDetails[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const router = useRouter();
  const { userId } = router.query; 

  const handleSpotifyLogin = () => {
    window.location.href = "http://localhost:8080/oauth2/authorization/spotify"; 
  };

  // Busca os shows favoritos após o login
  const fetchConcerts = async () => {
    try {
      if (!userId) {
        throw new Error("User ID not found");
      }

      const response = await axios.get(`http://localhost:8080/api/shows/user-shows/${userId}`);
      setConcerts(response.data);
      setIsAuthenticated(true);
    } catch (error) {
      setError('Erro ao buscar shows');
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchConcerts();
    }
  }, [userId]);

  return (
    <div className={styles.container}>
      <h1>Shows dos Seus Artistas Favoritos</h1>

      {!isAuthenticated && (
        <div>
          <p>Você precisa fazer login no Spotify para ver seus shows favoritos.</p>
          <button onClick={handleSpotifyLogin}>Login com Spotify</button>
        </div>
      )}

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
