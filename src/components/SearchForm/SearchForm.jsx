import { useState } from 'react';
import styles from './SearchForm.module.css';

export default function SearchForm({ onSearch }) {
  const [query, setQuery] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };
  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Film adı..." />
      <button type="submit">Axtar</button>
    </form>
  );
}
