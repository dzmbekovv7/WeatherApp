import { useState } from 'react';
import type { FormEvent, ChangeEvent } from 'react';

type SearchBarProps = {
  onSearch: (city: string) => void;
};

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [input, setInput] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input.trim()) {
      onSearch(input.trim());
      setInput('');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
      <input
        type="text"
        placeholder="Введите город"
        value={input}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
        style={{
          padding: 10,
          fontSize: 18,
          borderRadius: 8,
          border: 'none',
          marginBottom: 10,
        }}
      />
      <button
        type="submit"
        style={{
          padding: 10,
          fontSize: 18,
          backgroundColor: 'rgba(255,255,255,0.3)',
          color: 'white',
          border: 'none',
          borderRadius: 8,
          cursor: 'pointer',
        }}
      >
        Найти
      </button>
    </form>
  );
}
