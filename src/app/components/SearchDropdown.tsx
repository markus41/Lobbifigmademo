import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect, useRef } from 'react';

interface SearchResult {
  id: string;
  type: 'member' | 'event' | 'document' | 'page';
  title: string;
  subtitle: string;
}

interface SearchDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  query: string;
  primaryColor: string;
  primaryRgb: string;
}

const recentSearches = [
  'Annual Gala 2025',
  'Sarah Chen',
  'Q1 Financial Report',
  'Board Meeting',
];

const quickLinks = [
  { label: 'Members', icon: 'users', path: '/members' },
  { label: 'Events', icon: 'calendar', path: '/events' },
  { label: 'The Vault', icon: 'folder', path: '/vault' },
  { label: 'Settings', icon: 'settings', path: '/settings' },
];

const sampleResults: SearchResult[] = [
  {
    id: '1',
    type: 'member',
    title: 'Sarah Chen',
    subtitle: 'Premium Member • Joined Jan 2024',
  },
  {
    id: '2',
    type: 'member',
    title: 'James Wilson',
    subtitle: 'Professional Member • Joined Feb 2025',
  },
  {
    id: '3',
    type: 'event',
    title: 'Annual Gala 2025',
    subtitle: 'February 15, 2025 • 124 registered',
  },
  {
    id: '4',
    type: 'event',
    title: 'Board Meeting',
    subtitle: 'February 20, 2025 • Private',
  },
  {
    id: '5',
    type: 'document',
    title: 'Q1 Financial Report',
    subtitle: 'Uploaded 3 hours ago • PDF',
  },
  {
    id: '6',
    type: 'document',
    title: 'Member Handbook 2025',
    subtitle: 'Updated Jan 15, 2025 • PDF',
  },
  {
    id: '7',
    type: 'page',
    title: 'Dashboard',
    subtitle: 'Overview and analytics',
  },
  {
    id: '8',
    type: 'page',
    title: 'Registry',
    subtitle: 'Member directory',
  },
];

const typeIcons: Record<string, React.ReactNode> = {
  member: (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
  event: (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  ),
  document: (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
    </svg>
  ),
  page: (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <line x1="3" y1="9" x2="21" y2="9" />
      <line x1="9" y1="21" x2="9" y2="9" />
    </svg>
  ),
  users: (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  calendar: (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  ),
  folder: (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
    </svg>
  ),
  settings: (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  ),
};

export function SearchDropdown({ isOpen, onClose, query, primaryColor, primaryRgb }: SearchDropdownProps) {
  const [filteredResults, setFilteredResults] = useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  useEffect(() => {
    if (query.trim()) {
      const lowercaseQuery = query.toLowerCase();
      const results = sampleResults.filter(
        (result) =>
          result.title.toLowerCase().includes(lowercaseQuery) ||
          result.subtitle.toLowerCase().includes(lowercaseQuery)
      );
      setFilteredResults(results);
      setSelectedIndex(-1);
    } else {
      setFilteredResults([]);
    }
  }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => Math.min(prev + 1, filteredResults.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => Math.max(prev - 1, -1));
    } else if (e.key === 'Enter' && selectedIndex >= 0) {
      e.preventDefault();
      // Handle selection
      onClose();
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 z-[90]" onClick={onClose} />

          {/* Dropdown */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-0 top-full mt-2 w-full min-w-[400px] bg-white rounded-xl shadow-xl border border-gray-100 z-[100] overflow-hidden"
            onKeyDown={handleKeyDown}
          >
            {query.trim() ? (
              // Search Results
              <>
                {filteredResults.length > 0 ? (
                  <div className="py-2 max-h-[400px] overflow-y-auto">
                    {filteredResults.map((result, index) => (
                      <button
                        key={result.id}
                        className={`w-full px-4 py-3 flex items-center gap-3 transition-colors ${
                          index === selectedIndex ? 'bg-gray-50' : 'hover:bg-gray-50'
                        }`}
                        onClick={onClose}
                      >
                        <div
                          className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                          style={{
                            background: `rgba(${primaryRgb}, 0.1)`,
                            color: primaryColor,
                          }}
                        >
                          {typeIcons[result.type]}
                        </div>
                        <div className="flex-1 min-w-0 text-left">
                          <p className="text-sm font-medium truncate" style={{ color: '#1A1815' }}>
                            {result.title}
                          </p>
                          <p className="text-xs truncate" style={{ color: '#8A8578' }}>
                            {result.subtitle}
                          </p>
                        </div>
                        <span
                          className="text-[10px] px-2 py-1 rounded-full capitalize"
                          style={{
                            background: `rgba(${primaryRgb}, 0.1)`,
                            color: primaryColor,
                          }}
                        >
                          {result.type}
                        </span>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 text-center">
                    <div
                      className="w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center"
                      style={{ background: '#F7F4EE' }}
                    >
                      <svg
                        className="w-6 h-6"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#B8B0A0"
                        strokeWidth="2"
                      >
                        <circle cx="11" cy="11" r="8" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                      </svg>
                    </div>
                    <p className="text-sm font-medium" style={{ color: '#3D3832' }}>
                      No results found
                    </p>
                    <p className="text-xs mt-1" style={{ color: '#8A8578' }}>
                      Try searching for something else
                    </p>
                  </div>
                )}
              </>
            ) : (
              // Empty State - Recent & Quick Links
              <>
                {/* Recent Searches */}
                <div className="p-4 border-b border-gray-100">
                  <p className="text-xs font-medium uppercase tracking-wide mb-3" style={{ color: '#8A8578' }}>
                    Recent Searches
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {recentSearches.map((search) => (
                      <button
                        key={search}
                        className="px-3 py-1.5 text-xs rounded-full border transition-colors hover:bg-gray-50"
                        style={{
                          borderColor: '#E5E0D5',
                          color: '#5A5247',
                        }}
                      >
                        {search}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quick Links */}
                <div className="p-4">
                  <p className="text-xs font-medium uppercase tracking-wide mb-3" style={{ color: '#8A8578' }}>
                    Quick Links
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {quickLinks.map((link) => (
                      <button
                        key={link.label}
                        className="flex items-center gap-3 p-3 rounded-lg transition-colors hover:bg-gray-50"
                      >
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center"
                          style={{
                            background: `rgba(${primaryRgb}, 0.1)`,
                            color: primaryColor,
                          }}
                        >
                          {typeIcons[link.icon]}
                        </div>
                        <span className="text-sm font-medium" style={{ color: '#3D3832' }}>
                          {link.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Keyboard Hints */}
                <div className="px-4 py-3 border-t border-gray-100 bg-[#FAFAF8] flex items-center justify-between">
                  <div className="flex items-center gap-4 text-[10px]" style={{ color: '#B8B0A0' }}>
                    <span className="flex items-center gap-1">
                      <kbd className="px-1.5 py-0.5 bg-white border border-gray-200 rounded text-[10px]">↑↓</kbd>
                      Navigate
                    </span>
                    <span className="flex items-center gap-1">
                      <kbd className="px-1.5 py-0.5 bg-white border border-gray-200 rounded text-[10px]">↵</kbd>
                      Select
                    </span>
                    <span className="flex items-center gap-1">
                      <kbd className="px-1.5 py-0.5 bg-white border border-gray-200 rounded text-[10px]">esc</kbd>
                      Close
                    </span>
                  </div>
                  <span className="text-[10px]" style={{ color: '#B8B0A0' }}>
                    Powered by AI
                  </span>
                </div>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
