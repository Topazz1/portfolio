import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion'; 
import { ChevronRight, Terminal, GraduationCap, Code2 } from 'lucide-react';

interface HomeProps {
  setActiveSection: (section: 'home' | 'techno' | 'academic' | 'perso') => void;
}

export const Home = ({ setActiveSection }: HomeProps) => {
  // On ajoute ": Variants" pour rassurer TypeScript
  const containerVars: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 }
    }
  };

  const itemVars: Variants = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 100 } }
  };

  // Tes 3 catégories structurées
  const terminaux = [
    {
      id: 'techno' as const,
      sys: 'SYS.TERM_01',
      title: 'TECHNOCLINIQUE',
      desc: 'Mémoires HuTech & réflexions SHS',
      icon: Terminal
    },
    {
      id: 'academic' as const,
      sys: 'SYS.TERM_02',
      title: 'ACADÉMIQUE',
      desc: 'Projets UTC & compétences acquises',
      icon: GraduationCap
    },
    {
      id: 'perso' as const,
      sys: 'SYS.TERM_03',
      title: 'LABO PERSO',
      desc: 'Projets personnels & freelance',
      icon: Code2
    }
  ];

  return (
    <motion.div
      initial="hidden"
      animate="show"
      exit={{ opacity: 0, scale: 0.95 }}
      variants={containerVars}
      className="flex flex-col justify-center min-h-[80vh] max-w-4xl"
    >
      {/* En-tête / Titre */}
      <motion.div variants={itemVars} className="mb-16 space-y-4">
        <div className="flex items-center gap-4 text-arknights-textMuted font-mono text-sm">
          <span className="h-px w-12 bg-arknights-border block"></span>
          <span>IDENTIFICATION REQUÊTE : ACCEPTEE</span>
        </div>
        
        <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-white">
          TOM <span className="text-transparent bg-clip-text bg-gradient-to-r from-arknights-accent to-yellow-600">PADOVANI</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-400 font-light tracking-wide border-l-2 border-arknights-accent pl-4">
          Ingénieur <span className="text-white">Informatique</span> & <span className="text-white">Humanités</span>.
        </p>
      </motion.div>

      {/* Grille des terminaux (Les 3 portes) */}
      <motion.div variants={itemVars} className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {terminaux.map((term) => (
          <motion.button
            key={term.id}
            whileHover={{ scale: 1.02, y: -5 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveSection(term.id)}
            className="group relative flex flex-col text-left bg-arknights-surface border border-arknights-border p-6 overflow-hidden"
          >
            {/* Ligne d'accentuation en haut qui apparaît au survol */}
            <div className="absolute top-0 left-0 w-full h-[2px] bg-arknights-accent transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
            
            <div className="flex justify-between items-start mb-8">
              <span className="text-xs font-mono text-arknights-textMuted group-hover:text-arknights-accent transition-colors">
                [{term.sys}]
              </span>
              <term.icon className="w-5 h-5 text-gray-500 group-hover:text-arknights-accent transition-colors" />
            </div>

            <h3 className="text-lg font-bold text-white mb-2">{term.title}</h3>
            <p className="text-sm text-gray-400 mb-6 flex-grow">{term.desc}</p>

            <div className="flex items-center gap-2 mt-auto text-xs font-mono text-arknights-textMuted group-hover:text-white transition-colors">
              <span>INITIER LA CONNEXION</span>
              <ChevronRight className="w-4 h-4 transform group-hover:translate-x-2 transition-transform" />
            </div>
          </motion.button>
        ))}
      </motion.div>
    </motion.div>
  );
};