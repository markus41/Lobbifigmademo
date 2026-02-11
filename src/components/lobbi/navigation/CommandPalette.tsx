import { useState, useEffect, useRef, useMemo, useCallback, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';

interface CommandPage {
  id: string;
  label: string;
  icon?: ReactNode;
  group?: string;
}

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (page: string) => void;
  pages: CommandPage[];
}

const RECENT_STORAGE_KEY = 'lobbi_cmd_palette_recent';
const MAX_RECENT = 5;

function getRecentSearches(): string[] {
  try {
    const stored = localStorage.getItem(RECENT_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function addRecentSearch(pageId: string): void {
  try {
    const recent = getRecentSearches().filter((id) => id !== pageId);
    recent.unshift(pageId);
    localStorage.setItem(RECENT_STORAGE_KEY, JSON.stringify(recent.slice(0, MAX_RECENT)));
  } catch {
    // localStorage may be unavailable
  }
}

/**
 * Fuzzy search: match if all query characters appear in order within the target.
 * Returns a score (lower is better match); -1 means no match.
 */
function fuzzyMatch(target: string, query: string): number {
  const tLower = target.toLowerCase();
  const qLower = query.toLowerCase();

  // Exact substring match is best
  const substringIdx = tLower.indexOf(qLower);
  if (substringIdx !== -1) return substringIdx;

  // Character-order fuzzy match
  let qIdx = 0;
  let score = 0;
  for (let i = 0; i < tLower.length && qIdx < qLower.length; i++) {
    if (tLower[i] === qLower[qIdx]) {
      qIdx++;
    } else {
      score++;
    }
  }

  return qIdx === qLower.length ? score + 100 : -1;
}

/**
 * Command Palette overlay (Ctrl+K / Cmd+K).
 * Centered modal with search input, fuzzy filtering, keyboard navigation,
 * grouped results, and recent searches.
 * Themed via CSS custom properties.
 */
export function CommandPalette({ isOpen, onClose, onNavigate, pages }: CommandPaletteProps) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const recentIds = useMemo(() => (isOpen ? getRecentSearches() : []), [isOpen]);

  // Filtered and scored results
  const filteredResults = useMemo(() => {
    if (!query.trim()) return pages;

    const scored = pages
      .map((page) => {
        const labelScore = fuzzyMatch(page.label, query);
        const groupScore = page.group ? fuzzyMatch(page.group, query) : -1;
        const bestScore = labelScore === -1
          ? groupScore
          : groupScore === -1
            ? labelScore
            : Math.min(labelScore, groupScore);
        return { page, score: bestScore };
      })
      .filter(({ score }) => score !== -1)
      .sort((a, b) => a.score - b.score);

    return scored.map(({ page }) => page);
  }, [query, pages]);

  // Group filtered results
  const groupedResults = useMemo(() => {
    const groups: Map<string, CommandPage[]> = new Map();
    for (const page of filteredResults) {
      const group = page.group || 'Pages';
      if (!groups.has(group)) groups.set(group, []);
      groups.get(group)!.push(page);
    }
    return groups;
  }, [filteredResults]);

  // Flat list for keyboard navigation
  const flatResults = useMemo(() => {
    const flat: CommandPage[] = [];
    for (const items of groupedResults.values()) {
      flat.push(...items);
    }
    return flat;
  }, [groupedResults]);

  // Recent pages (only those that exist in pages list)
  const recentPages = useMemo(() => {
    if (query.trim()) return [];
    return recentIds
      .map((id) => pages.find((p) => p.id === id))
      .filter((p): p is CommandPage => !!p);
  }, [recentIds, pages, query]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      // Small delay to ensure the modal is rendered
      requestAnimationFrame(() => {
        inputRef.current?.focus();
      });
    }
  }, [isOpen]);

  // Lock body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Reset selected index when results change
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Scroll selected item into view
  useEffect(() => {
    if (!listRef.current) return;
    const items = listRef.current.querySelectorAll('[data-cmd-item]');
    const selected = items[selectedIndex] as HTMLElement | undefined;
    selected?.scrollIntoView({ block: 'nearest' });
  }, [selectedIndex]);

  const handleSelect = useCallback(
    (page: CommandPage) => {
      addRecentSearch(page.id);
      onNavigate(page.id);
      onClose();
    },
    [onNavigate, onClose]
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex((prev) => Math.min(prev + 1, flatResults.length - 1));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex((prev) => Math.max(prev - 1, 0));
        break;
      case 'Enter':
        e.preventDefault();
        if (flatResults[selectedIndex]) {
          handleSelect(flatResults[selectedIndex]);
        }
        break;
      case 'Escape':
        e.preventDefault();
        onClose();
        break;
    }
  };

  const isMac = typeof navigator !== 'undefined' && /Mac|iPod|iPhone|iPad/.test(navigator.userAgent);
  const modKey = isMac ? 'Cmd' : 'Ctrl';

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[300] flex items-start justify-center pt-[15vh]">
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0"
            style={{
              background: 'rgba(0, 0, 0, 0.5)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={onClose}
          />

          {/* Palette container */}
          <motion.div
            className={cn(
              'relative w-full max-w-[560px] mx-4 rounded-2xl overflow-hidden flex flex-col'
            )}
            style={{
              background: 'var(--theme-bg-card, #FFFFFF)',
              boxShadow:
                '0 0 0 1px var(--theme-border-light, rgba(0,0,0,0.06)), var(--theme-shadow-xl, 0 24px 48px -12px rgba(0,0,0,0.25))',
              maxHeight: '480px',
            }}
            initial={{ opacity: 0, scale: 0.95, filter: 'blur(4px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 0.95, filter: 'blur(4px)' }}
            transition={{
              duration: 0.2,
              ease: [0.22, 1, 0.36, 1],
            }}
            onKeyDown={handleKeyDown}
          >
            {/* Search input */}
            <div
              className="flex items-center gap-3 px-5 h-14"
              style={{
                borderBottom: '1px solid var(--theme-border-light, #E4E4E7)',
              }}
            >
              <svg
                className="w-5 h-5 flex-shrink-0"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ color: 'var(--theme-text-muted, #A1A1AA)' }}
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                ref={inputRef}
                type="text"
                placeholder="Search pages, actions..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 bg-transparent text-sm outline-none"
                style={{
                  color: 'var(--theme-text-primary, #09090B)',
                  fontFamily: 'var(--theme-font-body, inherit)',
                }}
              />
              <kbd
                className="hidden sm:inline-flex items-center gap-1 px-2 py-1 rounded text-[11px] font-medium"
                style={{
                  background: 'var(--theme-bg-secondary, #F4F4F5)',
                  color: 'var(--theme-text-muted, #A1A1AA)',
                  border: '1px solid var(--theme-border-light, #E4E4E7)',
                }}
              >
                esc
              </kbd>
            </div>

            {/* Results list */}
            <div ref={listRef} className="flex-1 overflow-y-auto py-2">
              {/* Recent searches (when no query) */}
              {!query.trim() && recentPages.length > 0 && (
                <div className="mb-1">
                  <p
                    className="px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.08em]"
                    style={{ color: 'var(--theme-text-muted, #A1A1AA)' }}
                  >
                    Recent
                  </p>
                  {recentPages.map((page) => {
                    const flatIdx = flatResults.findIndex((r) => r.id === page.id);
                    return (
                      <ResultItem
                        key={`recent-${page.id}`}
                        page={page}
                        isSelected={flatIdx === selectedIndex}
                        onSelect={() => handleSelect(page)}
                        onHover={() => {
                          if (flatIdx >= 0) setSelectedIndex(flatIdx);
                        }}
                      />
                    );
                  })}
                  <div
                    className="mx-5 my-1 h-px"
                    style={{ background: 'var(--theme-border-light, #E4E4E7)' }}
                  />
                </div>
              )}

              {/* Grouped results */}
              {flatResults.length > 0 ? (
                Array.from(groupedResults.entries()).map(([group, items]) => (
                  <div key={group} className="mb-1">
                    <p
                      className="px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.08em]"
                      style={{ color: 'var(--theme-text-muted, #A1A1AA)' }}
                    >
                      {group}
                    </p>
                    {items.map((page) => {
                      const flatIdx = flatResults.findIndex((r) => r.id === page.id);
                      return (
                        <ResultItem
                          key={page.id}
                          page={page}
                          isSelected={flatIdx === selectedIndex}
                          onSelect={() => handleSelect(page)}
                          onHover={() => setSelectedIndex(flatIdx)}
                        />
                      );
                    })}
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center py-12 px-4">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center mb-3"
                    style={{ background: 'var(--theme-bg-muted, #F7F4EE)' }}
                  >
                    <svg
                      className="w-6 h-6"
                      viewBox="0 0 24 24"
                      fill="none"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{ stroke: 'var(--theme-text-muted, #B8B0A0)' }}
                    >
                      <circle cx="11" cy="11" r="8" />
                      <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                  </div>
                  <p
                    className="text-sm font-medium"
                    style={{ color: 'var(--theme-text-primary, #3D3832)' }}
                  >
                    No results found
                  </p>
                  <p
                    className="text-xs mt-1"
                    style={{ color: 'var(--theme-text-muted, #8A8578)' }}
                  >
                    Try a different search term
                  </p>
                </div>
              )}
            </div>

            {/* Footer with keyboard hints */}
            <div
              className="flex items-center justify-between px-5 py-2.5"
              style={{
                borderTop: '1px solid var(--theme-border-light, #E4E4E7)',
                background: 'var(--theme-bg-muted, #FAFAF8)',
              }}
            >
              <div
                className="flex items-center gap-4 text-[10px]"
                style={{ color: 'var(--theme-text-muted, #B8B0A0)' }}
              >
                <span className="flex items-center gap-1">
                  <Kbd>&#8593;&#8595;</Kbd>
                  Navigate
                </span>
                <span className="flex items-center gap-1">
                  <Kbd>&#8629;</Kbd>
                  Select
                </span>
                <span className="flex items-center gap-1">
                  <Kbd>esc</Kbd>
                  Close
                </span>
              </div>
              <span
                className="text-[10px]"
                style={{ color: 'var(--theme-text-muted, #B8B0A0)' }}
              >
                {modKey}+K to toggle
              </span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

// -- Sub-components --

function Kbd({ children }: { children: ReactNode }) {
  return (
    <kbd
      className="px-1.5 py-0.5 rounded text-[10px] font-medium"
      style={{
        background: 'var(--theme-bg-card, #FFFFFF)',
        border: '1px solid var(--theme-border-light, #E4E4E7)',
        color: 'var(--theme-text-muted, #A1A1AA)',
      }}
    >
      {children}
    </kbd>
  );
}

function ResultItem({
  page,
  isSelected,
  onSelect,
  onHover,
}: {
  page: CommandPage;
  isSelected: boolean;
  onSelect: () => void;
  onHover: () => void;
}) {
  return (
    <button
      data-cmd-item
      className="w-full flex items-center gap-3 px-5 py-2.5 text-left transition-colors"
      style={{
        background: isSelected
          ? 'rgba(var(--theme-primary-rgb, 212,175,55), 0.08)'
          : 'transparent',
      }}
      onClick={onSelect}
      onMouseEnter={(e) => {
        onHover();
        if (!isSelected) {
          e.currentTarget.style.background = 'var(--theme-bg-secondary, #F4F4F5)';
        }
      }}
      onMouseLeave={(e) => {
        if (!isSelected) {
          e.currentTarget.style.background = 'transparent';
        }
      }}
    >
      {/* Icon */}
      {page.icon && (
        <span
          className="flex items-center justify-center w-8 h-8 rounded-lg flex-shrink-0"
          style={{
            background: isSelected
              ? 'rgba(var(--theme-primary-rgb, 212,175,55), 0.15)'
              : 'var(--theme-bg-secondary, #F4F4F5)',
            color: isSelected
              ? 'var(--theme-primary, #D4AF37)'
              : 'var(--theme-text-secondary, #71717A)',
          }}
        >
          {page.icon}
        </span>
      )}

      {/* Label */}
      <span
        className="flex-1 text-sm font-medium truncate"
        style={{
          color: isSelected
            ? 'var(--theme-text-primary, #09090B)'
            : 'var(--theme-text-secondary, #71717A)',
        }}
      >
        {page.label}
      </span>

      {/* Active indicator */}
      {isSelected && (
        <svg
          className="w-4 h-4 flex-shrink-0"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ color: 'var(--theme-primary, #D4AF37)' }}
        >
          <polyline points="9 18 15 12 9 6" />
        </svg>
      )}
    </button>
  );
}
