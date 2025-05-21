import MovieCard from '../MovieCard/MovieCard';
import styles from './MovieList.module.css';

export default function MovieList({ movies, onAdd, onRemove, selected }) {
  return (
    <div className={styles.list}>
      {movies.map((movie) => (
        <MovieCard
          key={movie.imdbID}
          movie={movie}
          onAdd={onAdd}
          onRemove={onRemove}
          isSelected={selected.some((m) => m.imdbID === movie.imdbID)}
        />
      ))}
    </div>
  );
}
