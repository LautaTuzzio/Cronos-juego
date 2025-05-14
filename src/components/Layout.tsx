import React, { ReactNode } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { History, HelpCircle, Award, Home, BookOpen, Menu, X } from 'lucide-react';
import { useState } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const isGamePage = location.pathname.includes('/play/');

  // Hide navigation on game pages to maximize play area
  if (isGamePage) {
    return <main className="min-h-screen bg-stone-100">{children}</main>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-stone-100">
      <header className="bg-gradient-to-r from-amber-800/90 to-amber-700/90 text-amber-50 shadow-md relative z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link 
            to="/" 
            className="flex items-center space-x-2 text-2xl font-serif font-bold tracking-wide"
          >
            <History className="h-8 w-8" />
            <span>CRONOS</span>
          </Link>

          {/* Mobile menu button */}
          <button 
            className="md:hidden p-2 rounded-full hover:bg-amber-600/20 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <NavLink to="/" icon={<Home className="h-5 w-5" />}>
              Inicio
            </NavLink>
            <NavLink to="/wiki" icon={<BookOpen className="h-5 w-5" />}>
              Cómo Jugar
            </NavLink>
            <NavLink to="/leaderboard" icon={<Award className="h-5 w-5" />}>
              Clasificación
            </NavLink>
            <NavLink to="/wiki" icon={<HelpCircle className="h-5 w-5" />}>
              Sobre Nosotros
            </NavLink>
          </nav>
        </div>

        {/* Mobile navigation */}
        {menuOpen && (
          <nav className="md:hidden absolute w-full bg-amber-800 shadow-lg">
            <div className="flex flex-col py-2">
              <MobileNavLink to="/" onClick={() => setMenuOpen(false)}>
                <Home className="h-5 w-5 mr-3" /> Inicio
              </MobileNavLink>
              <MobileNavLink to="/wiki" onClick={() => setMenuOpen(false)}>
                <BookOpen className="h-5 w-5 mr-3" /> Cómo Jugar
              </MobileNavLink>
              <MobileNavLink to="/leaderboard" onClick={() => setMenuOpen(false)}>
                <Award className="h-5 w-5 mr-3" /> Clasificación
              </MobileNavLink>
              <MobileNavLink to="/wiki" onClick={() => setMenuOpen(false)}>
                <HelpCircle className="h-5 w-5 mr-3" /> Sobre Nosotros
              </MobileNavLink>
            </div>
          </nav>
        )}
      </header>

      <main className="flex-grow">{children}</main>

      <footer className="bg-stone-800 text-stone-300 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <History className="h-6 w-6 mr-2" />
              <span className="font-serif text-xl">CRONOS</span>
            </div>
            <div className="text-center md:text-right">
              <p>&copy; 2025 Cronos - Videojuego Educativo</p>
              <p className="text-sm text-stone-400 mt-1">Aprendiendo historia de forma interactiva</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

interface NavLinkProps {
  to: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

const NavLink = ({ to, icon, children }: NavLinkProps) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link
      to={to}
      className={`flex items-center text-sm font-medium transition-colors ${
        isActive 
          ? 'text-white' 
          : 'text-amber-100/90 hover:text-white'
      }`}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </Link>
  );
};

interface MobileNavLinkProps {
  to: string;
  onClick: () => void;
  children: React.ReactNode;
}

const MobileNavLink = ({ to, onClick, children }: MobileNavLinkProps) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link
      to={to}
      onClick={onClick}
      className={`flex items-center py-3 px-6 ${
        isActive 
          ? 'bg-amber-700 text-white' 
          : 'text-amber-100/90 hover:bg-amber-700/50 hover:text-white'
      }`}
    >
      {children}
    </Link>
  );
};

export default Layout;