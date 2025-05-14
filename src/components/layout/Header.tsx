import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Clock, Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-stone-800 shadow-md py-2' 
          : 'bg-gradient-to-b from-stone-900 to-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-3">
            <Clock className="w-8 h-8 text-gold-500" />
            <span className="text-2xl font-display font-bold text-white">Cronos</span>
          </Link>
          
          {/* Desktop menu */}
          <nav className="hidden md:flex space-x-8">
            <NavLink to="/" label="Inicio" />
            <NavLink to="/how-to-play" label="Cómo Jugar" />
            <NavLink to="/leaderboard" label="Tabla de Clasificación" />
            <NavLink to="/about" label="Sobre Nosotros" />
          </nav>
          
          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white p-2"
            aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-stone-800 shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <MobileNavLink to="/" label="Inicio" />
            <MobileNavLink to="/how-to-play" label="Cómo Jugar" />
            <MobileNavLink to="/leaderboard" label="Tabla de Clasificación" />
            <MobileNavLink to="/about" label="Sobre Nosotros" />
          </div>
        </div>
      )}
    </header>
  );
};

interface NavLinkProps {
  to: string;
  label: string;
}

const NavLink: React.FC<NavLinkProps> = ({ to, label }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link
      to={to}
      className={`text-sm font-medium transition-colors duration-200 ${
        isActive 
          ? 'text-gold-400 border-b-2 border-gold-500' 
          : 'text-gray-300 hover:text-white'
      }`}
    >
      {label}
    </Link>
  );
};

const MobileNavLink: React.FC<NavLinkProps> = ({ to, label }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link
      to={to}
      className={`block px-3 py-2 rounded-md text-base font-medium ${
        isActive 
          ? 'text-white bg-stone-700' 
          : 'text-gray-300 hover:bg-stone-700 hover:text-white'
      }`}
    >
      {label}
    </Link>
  );
};

export default Header;