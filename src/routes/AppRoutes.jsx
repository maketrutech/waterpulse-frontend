import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LanguageUrlSync from '../components/LanguageUrlSync';
import About from '../pages/About';
import HomePage from '../pages/HomePage';
import PrivacyPolicy from '../pages/PrivacyPolicy';
import TermsOfService from '../pages/TermsOfService';

/**
 * Arbre de routes partagé par le routeur navigateur et le prerender.
 */
export function AppContent() {
  return (
    <>
      <LanguageUrlSync />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </>
  );
}

/**
 * Routes de l'application : accueil + pages légales.
 */
export default function AppRoutes() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
