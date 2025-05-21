
import styles from './SavedList.module.css';

export default function SavedList({ movies, onRemove }) {
  return (
    <div className={styles.saved}>
      <h3>Seçilmiş filmlər</h3>
      <div className={styles.grid}>
        {movies.map((movie) => (
          <div key={movie.imdbID} className={styles.item}>
            <img src={movie.Poster} alt={movie.Title} className={styles.poster} />
            <span className={styles.title}>{movie.Title}</span>
            {onRemove && (
              <button onClick={() => onRemove(movie.imdbID)} className={styles.removeBtn}>
                ❌
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}