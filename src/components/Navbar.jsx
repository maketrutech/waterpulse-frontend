import { Link } from 'react-router-dom';
import LanguageSwitcher from './LanguageSwitcher';

/**
 * Barre de navigation compacte — marque + sélecteur de langue.
 */
export default function Navbar() {
  return (
    <nav
      className="relative z-20 mx-auto flex w-full max-w-4xl items-center justify-between px-4 pt-4 sm:px-6"
      aria-label="WaterPulse"
    >
      <Link
        to="/"
        className="inline-flex min-h-12 items-center font-display text-lg font-extrabold tracking-tight text-white transition hover:text-aqua focus:outline-none focus-visible:ring-2 focus-visible:ring-aqua sm:text-xl"
        aria-label="WaterPulse — Accueil"
      >
        Water<span className="text-aqua">Pulse</span>
      </Link>

      <LanguageSwitcher />
    </nav>
  );
}
