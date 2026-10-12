import { useEffect, useId, useMemo, useRef, useState } from 'react';
import { ChevronDown, Search } from 'lucide-react';
import { normalizeSearch } from '../data/locations';

/**
 * Liste déroulante avec recherche textuelle (combobox accessible).
 * @param {{
 *   id?: string,
 *   label: string,
 *   options: { value: string, label: string }[],
 *   value: string,
 *   onChange: (value: string) => void,
 *   placeholder?: string,
 *   searchPlaceholder?: string,
 *   emptyLabel?: string,
 *   noResultsLabel?: string,
 *   disabled?: boolean,
 *   allowEmpty?: boolean,
 * }} props
 */
export default function SearchableSelect({
  id,
  label,
  options,
  value,
  onChange,
  placeholder = '',
  searchPlaceholder = '',
  emptyLabel = '',
  noResultsLabel = '—',
  disabled = false,
  allowEmpty = false,
}) {
  const autoId = useId();
  const listboxId = `${autoId}-listbox`;
  const inputId = id || `${autoId}-input`;

  const rootRef = useRef(null);
  const inputRef = useRef(null);

  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [highlight, setHighlight] = useState(0);

  const selected = options.find((option) => option.value === value) ?? null;
  const displayLabel = selected?.label || (allowEmpty && !value ? emptyLabel : placeholder);

  const filtered = useMemo(() => {
    const q = normalizeSearch(query);
    const base = allowEmpty
      ? [{ value: '', label: emptyLabel }, ...options]
      : options;

    if (!q) return base;
    return base.filter((option) => normalizeSearch(option.label).includes(q));
  }, [allowEmpty, emptyLabel, options, query]);

  useEffect(() => {
    if (!open) return undefined;

    const onPointerDown = (event) => {
      if (!rootRef.current?.contains(event.target)) {
        setOpen(false);
        setQuery('');
      }
    };

    document.addEventListener('mousedown', onPointerDown);
    return () => document.removeEventListener('mousedown', onPointerDown);
  }, [open]);

  useEffect(() => {
    setHighlight(0);
  }, [query, open]);

  const selectOption = (nextValue) => {
    onChange(nextValue);
    setOpen(false);
    setQuery('');
  };

  const openList = () => {
    if (disabled) return;
    setOpen(true);
    setQuery('');
    requestAnimationFrame(() => inputRef.current?.focus());
  };

  const onKeyDown = (event) => {
    if (disabled) return;

    if (!open && (event.key === 'ArrowDown' || event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      openList();
      return;
    }

    if (!open) return;

    if (event.key === 'Escape') {
      event.preventDefault();
      setOpen(false);
      setQuery('');
      return;
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setHighlight((index) => Math.min(index + 1, Math.max(filtered.length - 1, 0)));
      return;
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      setHighlight((index) => Math.max(index - 1, 0));
      return;
    }

    if (event.key === 'Enter') {
      event.preventDefault();
      const option = filtered[highlight];
      if (option) selectOption(option.value);
    }
  };

  return (
    <div ref={rootRef} className="relative">
      <label htmlFor={inputId} className="label-field">
        {label}
      </label>

      <button
        type="button"
        id={inputId}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listboxId}
        onClick={() => (open ? (setOpen(false), setQuery('')) : openList())}
        onKeyDown={onKeyDown}
        className="input-field touch-target flex w-full items-center justify-between gap-2 text-left"
      >
        <span className={`truncate ${selected || (allowEmpty && !value) ? 'text-ink' : 'text-sky-deep/55'}`}>
          {displayLabel}
        </span>
        <ChevronDown
          size={18}
          aria-hidden="true"
          className={`shrink-0 text-sky-deep/70 transition ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <div className="absolute z-30 mt-1 w-full overflow-hidden rounded-xl border border-sky-mid/20 bg-white shadow-panel">
          <div className="relative border-b border-sky-mid/10 p-2">
            <Search
              size={16}
              aria-hidden="true"
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sky-deep/50"
            />
            <input
              ref={inputRef}
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              onKeyDown={onKeyDown}
              placeholder={searchPlaceholder}
              className="w-full rounded-lg border border-sky-mid/15 bg-mist/60 py-2.5 pl-9 pr-3 text-sm text-ink outline-none focus:border-sky-mid focus:ring-2 focus:ring-sky-mid/20"
              aria-autocomplete="list"
              aria-controls={listboxId}
              autoComplete="off"
            />
          </div>

          <ul
            id={listboxId}
            role="listbox"
            aria-label={label}
            className="max-h-56 overflow-y-auto py-1"
          >
            {filtered.length === 0 && (
              <li className="px-3 py-2.5 text-sm text-sky-deep/70">{noResultsLabel}</li>
            )}

            {filtered.map((option, index) => {
              const active = option.value === value;
              const highlighted = index === highlight;

              return (
                <li key={`${option.value || 'empty'}-${option.label}`} role="option" aria-selected={active}>
                  <button
                    type="button"
                    onMouseEnter={() => setHighlight(index)}
                    onClick={() => selectOption(option.value)}
                    className={`flex min-h-11 w-full items-center px-3 py-2.5 text-left text-sm transition
                      ${highlighted ? 'bg-sky-mid/10 text-sky-deep' : 'text-sky-deep'}
                      ${active ? 'font-semibold' : 'font-medium'}`}
                  >
                    {option.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
