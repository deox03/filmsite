import styles from './MovieCard.module.css';

export default function MovieCard({ movie, onAdd, onRemove, isSelected }) {
  return (
    <div className={styles.card}>
      <img src={movie.Poster} alt={movie.Title} />
      <h3>{movie.Title}</h3>
      {isSelected ? (
        <button onClick={() => onRemove(movie.imdbID)}>Sil</button>
      ) : (
        <button onClick={() => onAdd(movie)}>Siyahıya əlavə et</button>
      )}
    </div>
  );
}
