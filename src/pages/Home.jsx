import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchForm from '../components/SearchForm/SearchForm';
import SavedList from '../components/SavedList/SavedList';
import Header from '../components/Header/Header';
import styles from './Home.module.css';

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [selected, setSelected] = useState([]);
  const [listId, setListId] = useState(null);
  const [listTitle, setListTitle] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://www.omdbapi.com/?s=book&apikey=b19a9964')
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.Search?.slice(0, 20) || []); // Limit to 20 movies
      });
  }, []);

  const searchMovies = async (query) => {
    const res = await fetch(`https://www.omdbapi.com/?s=${query}&apikey=b19a9964`);
    const data = await res.json();
    setMovies(data.Search?.slice(0, 20) || []); // Limit search results to 20
  };

  const addMovie = (movie) => {
    if (!listId && !selected.find((m) => m.imdbID === movie.imdbID)) {
      setSelected([...selected, movie]);
    }
  };

  const saveList = async () => {
    if (selected.length === 0) return;
    const res = await fetch('https://acb-api.algoritmika.org/api/movies/list', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: listTitle || 'Mənim Film Siyahım',
        movies: selected.map((m) => m.imdbID),
      }),
    });
    const data = await res.json();
    setListId(data.id);
  };

  const clearList = () => {
    if (!listId) {
      setSelected([]);
      setListTitle('');
    }
  };

  const viewList = () => {
    if (listId) {
      navigate(`/list/${listId}`);
    }
  };

  const removeMovie = (id) => {
    if (!listId) {
      setSelected(selected.filter((m) => m.imdbID !== id));
    }
  };

  return (
    <div className={styles.wrapper}>
      <Header />
      <SearchForm onSearch={searchMovies} />
      <div className={styles.container}>
        <div className={styles.left}>
          {movies.map((movie) => (
            <div key={movie.imdbID} className={styles.movieCard}>
              <img src={movie.Poster} alt={movie.Title} />
              <h4>{movie.Title}</h4>
              {!listId && (
                <button onClick={() => addMovie(movie)} className={styles.addBtn}>
                  Əlavə et
                </button>
              )}
            </div>
          ))}
        </div>
        <div className={styles.right}>
          <h3>Seçilmiş filmlər</h3>
          <input
            type="text"
            value={listTitle}
            onChange={(e) => setListTitle(e.target.value)}
            placeholder="Siyahıya ad verin"
            className={styles.titleInput}
            disabled={listId}
          />
          <div className={styles.savedListWrapper}>
            <SavedList
              movies={selected}
              onRemove={listId ? undefined : removeMovie}
            />
          </div>
          {!listId ? (
            <button onClick={saveList} className={styles.saveBtn}>
              Siyahını yadda saxla
            </button>
          ) : (
            <button onClick={viewList} className={styles.viewBtn}>
              Siyahıya nəzər keçir
            </button>
          )}
          {selected.length > 0 && !listId && (
            <button onClick={clearList} className={styles.clearBtn}>
              Siyahını sıfırla
            </button>
          )}
        </div>
      </div>
    </div>
  );
}