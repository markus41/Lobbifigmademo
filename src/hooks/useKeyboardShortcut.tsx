import { useEffect, useCallback } from 'react';

export interface ShortcutConfig {
  key: string;
  ctrl?: boolean;
  meta?: boolean;
  shift?: boolean;
  alt?: boolean;
  handler: () => void;
  enabled?: boolean;
}

/**
 * Generic keyboard shortcut hook.
 * Handles both Ctrl (Windows/Linux) and Meta/Cmd (Mac) for cross-platform support.
 * Prevents default browser behavior for matched shortcuts.
 */
export function useKeyboardShortcut(shortcuts: ShortcutConfig[]): void {
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      // Skip if user is typing in an input/textarea/contenteditable
      const target = event.target as HTMLElement;
      if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable
      ) {
        // Still allow shortcuts that explicitly require Ctrl/Meta
        const hasModifier = shortcuts.some(
          (s) => (s.ctrl || s.meta) && s.key.toLowerCase() === event.key.toLowerCase()
        );
        if (!hasModifier) return;
      }

      for (const shortcut of shortcuts) {
        if (shortcut.enabled === false) continue;

        const keyMatch = event.key.toLowerCase() === shortcut.key.toLowerCase();
        if (!keyMatch) continue;

        // For ctrl/meta shortcuts, accept either Ctrl or Meta (cross-platform)
        const wantsCtrlOrMeta = shortcut.ctrl || shortcut.meta;
        const hasCtrlOrMeta = event.ctrlKey || event.metaKey;

        if (wantsCtrlOrMeta && !hasCtrlOrMeta) continue;
        if (!wantsCtrlOrMeta && (event.ctrlKey || event.metaKey)) continue;

        if (shortcut.shift && !event.shiftKey) continue;
        if (!shortcut.shift && event.shiftKey) continue;

        if (shortcut.alt && !event.altKey) continue;
        if (!shortcut.alt && event.altKey) continue;

        event.preventDefault();
        event.stopPropagation();
        shortcut.handler();
        return;
      }
    },
    [shortcuts]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);
}
