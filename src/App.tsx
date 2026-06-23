import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { BackgroundGrid } from './components/layout/BackgroundGrid';
import { Loader } from './components/ui/Loader';
import { Home } from './pages/Home';
import { TechnoClinique } from './pages/TechnoClinique';
import { Academique } from './pages/Academique';
import { ProjetsPerso } from './pages/ProjetsPerso';
import { ContactWidget } from './components/ui/ContactWidget';

type Section = 'home' | 'techno' | 'academic' | 'perso';

function App() {
  const [isBooting, setIsBooting] = useState(true);
  const [activeSection, setActiveSection] = useState<Section>('home');

  const renderSection = () => {
    switch (activeSection) {
      case 'home': return <Home key="home" setActiveSection={setActiveSection} />;
      case 'techno': return <TechnoClinique key="techno" />;
      case 'academic': return <Academique key="academic" />;
      case 'perso': return <ProjetsPerso key="perso" />;
      default: return <Home key="home" setActiveSection={setActiveSection} />;
    }
  };

  return (
    <div className="relative min-h-screen text-gray-200 selection:bg-arknights-accent selection:text-black">
      <BackgroundGrid />

      <AnimatePresence>
        {isBooting && <Loader key="loader" onComplete={() => setIsBooting(false)} />}
      </AnimatePresence>

      {!isBooting && (
        <>
          {/* DYNAMIC ISLAND : Flottante, arrondie, et z-index absolu */}
          {activeSection !== 'home' && (
            <div className="fixed top-6 left-0 w-full flex justify-center z-[100] pointer-events-none">
              <nav className="pointer-events-auto px-8 py-3 bg-black/60 backdrop-blur-xl border border-white/10 rounded-full shadow-[0_10px_40px_rgba(0,0,0,0.5)] flex gap-8 items-center font-mono text-xs uppercase tracking-widest transition-all hover:bg-black/80">
                <button onClick={() => setActiveSection('home')} className="hover:text-white transition-colors text-arknights-textMuted">{'< Base'}</button>
                <div className="w-px h-4 bg-white/20"></div>
                <button onClick={() => setActiveSection('techno')} className={`hover:text-arknights-accent transition-colors ${activeSection === 'techno' ? 'text-arknights-accent font-bold' : 'text-gray-400'}`}>Technoclinique</button>
                <button onClick={() => setActiveSection('academic')} className={`hover:text-arknights-accent transition-colors ${activeSection === 'academic' ? 'text-arknights-accent font-bold' : 'text-gray-400'}`}>Académique</button>
                <button onClick={() => setActiveSection('perso')} className={`hover:text-arknights-accent transition-colors ${activeSection === 'perso' ? 'text-arknights-accent font-bold' : 'text-gray-400'}`}>Labo Perso</button>
              </nav>
            </div>
          )}

          {/* Wrapper global : plus de contraintes si on est sur la map ! */}
          <main className={`w-full h-full ${activeSection !== 'home' && activeSection !== 'perso' ? 'px-8 max-w-7xl mx-auto pt-32' : ''}`}>
            <AnimatePresence mode="wait">
              {renderSection()}
            </AnimatePresence>
          </main>
        </>
      )}
      <ContactWidget/>
    </div>
  );
}

export default App;