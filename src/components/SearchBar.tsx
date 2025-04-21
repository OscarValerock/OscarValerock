import React, { useState } from 'react';
import { cn } from '../lib/utils';

interface SearchBarProps {
  onSearch: (query: string) => void;
  className?: string;
  placeholder?: string;
}

export default function SearchBar({ 
  onSearch, 
  className, 
  placeholder = "Search blog posts..." 
}: SearchBarProps) {
  const [query, setQuery] = useState("");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };
  
  return (
    <form onSubmit={handleSubmit} className={cn("relative", className)}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm 
                  ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none 
                  focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      />
      <button 
        type="submit"
        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1 hover:bg-accent"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="16" 
          height="16" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8"></circle>
          <path d="m21 21-4.35-4.35"></path>
        </svg>
        <span className="sr-only">Search</span>
      </button>
    </form>
  );
}
