import { useState, useEffect, useCallback } from 'react';

export default function useSidebar() {
  const [isOpen, setIsOpen] = useState(false); // mobile drawer
  const [collapsed, setCollapsed] = useState(false); // tablet collapsed

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen(v => !v), []);
  const toggleCollapsed = useCallback(() => setCollapsed(v => !v), []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') close();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [close]);

  // auto-collapse on tablet widths
  useEffect(() => {
    const mq = window.matchMedia('(min-width:768px) and (max-width:1023px)');
    const handler = (e) => setCollapsed(e.matches);
    handler(mq);
    mq.addEventListener?.('change', handler);
    return () => mq.removeEventListener?.('change', handler);
  }, []);

  return { isOpen, open, close, toggle, collapsed, toggleCollapsed };
}
