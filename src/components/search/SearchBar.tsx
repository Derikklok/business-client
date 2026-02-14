import { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, FileText, Users, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useSearch, type SearchResult } from '@/hooks/useSearch';
import type { DocumentResponse } from '@/types/document.types';
import type { Customer } from '@/types/customer.types';

interface SearchBarProps {
  className?: string;
}

const SearchBar = ({ className }: SearchBarProps) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const navigate = useNavigate();
  const searchRef = useRef<HTMLDivElement>(null);
  
  const { searchResults, isSearching, hasQuery } = useSearch(query);

  const handleResultClick = useCallback((result: SearchResult) => {
    if (result.type === 'document') {
      const doc = result.data as DocumentResponse;
      navigate(`/pdf?documentId=${doc.id}`);
    } else if (result.type === 'customer') {
      const customer = result.data as Customer;
      navigate(`/dashboard/customers?highlight=${customer.id}`);
    }
    
    setQuery('');
    setIsOpen(false);
    setSelectedIndex(-1);
  }, [navigate]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSelectedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isOpen || !hasQuery || searchResults.length === 0) return;

      switch (event.key) {
        case 'ArrowDown':
          event.preventDefault();
          setSelectedIndex(prev => 
            prev < searchResults.length - 1 ? prev + 1 : prev
          );
          break;
        case 'ArrowUp':
          event.preventDefault();
          setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
          break;
        case 'Enter':
          event.preventDefault();
          if (selectedIndex >= 0 && selectedIndex < searchResults.length) {
            handleResultClick(searchResults[selectedIndex]);
          }
          break;
        case 'Escape':
          event.preventDefault();
          setIsOpen(false);
          setSelectedIndex(-1);
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, hasQuery, searchResults, selectedIndex, handleResultClick]);


  const getResultIcon = (type: string) => {
    return type === 'document' ? 
      <FileText className="w-4 h-4 text-blue-500" /> : 
      <Users className="w-4 h-4 text-green-500" />;
  };

  const getResultBadgeColor = (type: string) => {
    return type === 'document' ? 
      'bg-blue-100 text-blue-700' : 
      'bg-green-100 text-green-700';
  };

  return (
    <div ref={searchRef} className={cn('relative flex-1 max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-xl mx-2 sm:mx-4', className)}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/60" />
        <input 
          type="text" 
          placeholder="Search documents, customers..." 
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setSelectedIndex(-1);
            setIsOpen(true);
          }}
          onFocus={() => hasQuery && setIsOpen(true)}
          onKeyDown={(e) => {
            if (e.key === 'Escape') {
              setIsOpen(false);
              setSelectedIndex(-1);
            }
          }}
          className="w-full pl-10 pr-4 py-2.5 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent backdrop-blur-sm transition-all text-sm"
        />
      </div>

      {/* Search Results Dropdown */}
      {isOpen && hasQuery && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 z-50 max-h-[70vh] sm:max-h-96 overflow-y-auto">
          {isSearching ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
              <span className="ml-2 text-gray-500">Searching...</span>
            </div>
          ) : searchResults.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 px-4">
              <Search className="w-8 h-8 text-gray-300 mb-2" />
              <p className="text-gray-500 text-sm font-medium">No results found for "{query}"</p>
              <p className="text-gray-400 text-xs mt-1">
                Try searching for document titles, customer names, or registration numbers
              </p>
              <div className="flex items-center gap-1 mt-2 text-gray-400">
                <kbd className="px-1.5 py-0.5 text-xs bg-gray-100 rounded">ESC</kbd>
                <span className="text-xs">to close</span>
              </div>
            </div>
          ) : (
            <div className="py-2">
              <div className="px-3 sm:px-4 py-2 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <p className="text-xs sm:text-sm text-gray-600">
                    {searchResults.length} result{searchResults.length !== 1 ? 's' : ''} for "{query}"
                  </p>
                  <div className="flex items-center gap-1 text-gray-400">
                    <kbd className="px-1.5 py-0.5 text-xs bg-gray-100 rounded">↑↓</kbd>
                    <span className="text-xs">navigate</span>
                    <kbd className="px-1.5 py-0.5 text-xs bg-gray-100 rounded">↵</kbd>
                    <span className="text-xs">select</span>
                  </div>
                </div>
              </div>
              {searchResults.map((result, index) => (
                <button
                  key={result.id}
                  onClick={() => handleResultClick(result)}
                  className={cn(
                    "w-full px-3 sm:px-4 py-2 sm:py-3 text-left transition-colors focus:outline-none border-b border-gray-100 last:border-b-0",
                    selectedIndex === index 
                      ? "bg-primary/5 border-primary/20" 
                      : "hover:bg-gray-50"
                  )}
                >
                  <div className="flex items-center gap-3">
                    {getResultIcon(result.type)}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium text-gray-900 truncate">
                          {result.title}
                        </h4>
                        <span className={cn(
                          'px-2 py-0.5 text-xs font-medium rounded-full',
                          getResultBadgeColor(result.type)
                        )}>
                          {result.type === 'document' ? 'Document' : 'Customer'}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-gray-500 truncate">
                        {result.subtitle}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;