import React from 'react';
import { MdSearch } from 'react-icons/md';
// import { Container } from './styles';

export default function SearchInput() {
  return (
    <label htmlFor="search">
      <MdSearch size={20} color="#999" />
      <input
        id="search"
        placeholder="Buscar por encomendas"
        onChange={e => {
          setSearch(e.target.value);
        }}
      />
    </label>
  );
}
