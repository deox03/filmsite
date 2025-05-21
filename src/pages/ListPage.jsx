import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './ListPage.module.css';

export default function ListPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [list, setList] = useState(null);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch(`https://acb-api.algoritmika.org/api/movies/list/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setList(data);
        const uniqueIDs = [...new Set(data.movies)];
        Promise.all(
          uniqueIDs.map((imdbID) =>
            fetch(`https://www.omdbapi.com/?i=${imdbID}&apikey=b19a9964`).then((res) => res.json())
          )
        ).then((movies) => setMovies(movies));
      });
  }, [id]);

  const handleReset = () => {
    navigate('/');
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{list?.title || 'Film Siyahısı'}</h2>
      <ul className={styles.movieList}>
        {movies.map((movie) => (
          <li key={movie.imdbID} className={styles.movieItem}>
            <a
              href={`https://www.imdb.com/title/${movie.imdbID}/`}
              target="_blank"
              rel="noreferrer"
            >
              <img src={movie.Poster} alt={movie.Title} />
              <div>{movie.Title}</div>
            </a>
          </li>
        ))}
      </ul>
      <button onClick={handleReset} className={styles.resetBtn}>
        Ana səhifəyə qayıt
      </button>
    </div>
  );
}