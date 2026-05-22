import React, { useState } from 'react';
import { Search } from 'lucide-react';

const SearchBar = ({ onSearch }) => {
  const [city, setCity] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-md mx-auto mb-8">
      <input
        type="text"
        className="w-full bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-2xl py-4 px-6 pr-14 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all placeholder:text-white/50 shadow-xl"
        placeholder="Search for a city..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button
        type="submit"
        className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-purple-600 hover:bg-purple-500 text-white rounded-xl transition-colors"
      >
        <Search size={20} />
      </button>
    </form>
  );
};

export default SearchBar;
