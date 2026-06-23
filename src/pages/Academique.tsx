import { motion } from 'framer-motion';
import { ShieldAlert, ShieldCheck } from 'lucide-react';

export const Academique = () => {
  const missions = [

    {
      id: 'UTC.TM.01',
      title: 'Architecture BDD Auto-école',
      constraint: 'Modéliser et implémenter le système d\'information complet d\'une auto-école (élèves, moniteurs, plannings, véhicules).',
      solution: 'Conception d\'un schéma entité-association robuste, implémentation SQL avec triggers pour la gestion des conflits d\'agenda.',
      techs: ['SQL', 'HTML/CSS', 'Modélisation UML']
    },{
      id: 'UTC.CS.02',
      title: 'Système Expert LISP',
      constraint: 'Développer une IHM de manipulation de listes chaînées/parcours de graphes.',
      solution: 'Gestion de mémoire complexe et mises en place d\'algorithmes de parcours.',
      techs: ['C', 'Interface HM']
    },{
      id: 'UTC.CS.03',
      title: 'Gestion de données & algorithmie',
      constraint: 'Développer un système expert d\'aide à la décision en utilisant la programmation fonctionnelle.',
      solution: 'Création d\'un moteur d\'inférence avec base de règles et base de faits dynamiques. Interface CLI optimisée.',
      techs: ['LISP', 'Programmation Fonctionnelle', 'IA Symbolique']
    },{
      id: 'UTC.TM.04',
      title: 'Application Python/BDD',
      constraint: 'Développer une IHM Python reliée à une BDD pour la gestion d\'une communauté.',
      solution: 'Requêtes SQL complexes, etc..',
      techs: ['Python', 'PostgreSQL', 'SQL']
    },{
      id: 'UTC.TM.05',
      title: 'Interface graphique C++',
      constraint: 'Développer une interface graphique permettant de jouer au jeu de société Harmonies.',
      solution: 'Modélisation logique et analyse du jeu ; conception de l\'interface graphique',
      techs: ['C++', 'QT', 'Modélisation logique']
    },{
      id: 'UTC.CS.06',
      title: 'IA logique de résolution',
      constraint: 'Développer une IA de résolution du jeu ChessFC, Morpion, Mastermind, Sudoku.',
      solution: 'Requpetes SQL complexes, etc..',
      techs: ['Python', 'Prolog', 'Gophersat']
    }

  ];

  return (
    <motion.div 
      initial="hidden" animate="show" exit={{ opacity: 0, y: 20 }}
      variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.15 } } }}
      className="w-full pb-20 max-w-5xl mx-auto"
    >
      <div className="mb-12 border-b border-arknights-border pb-4 flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold text-white tracking-wider">ARCHIVE <span className="text-arknights-accent">/ ACADÉMIQUE</span></h2>
          <p className="text-arknights-textMuted font-mono text-sm mt-2">{'>'} PROJETS D'INGÉNIERIE ENCADRÉS & ÉVALUATIONS</p>
        </div>
      </div>

      <div className="space-y-8">
        {missions.map((mission) => (
          <motion.div 
            key={mission.id}
            variants={{ hidden: { opacity: 0, x: -20 }, show: { opacity: 1, x: 0 } }}
            className="flex flex-col md:flex-row bg-arknights-surface border border-arknights-border"
          >
            {/* Colonne Statut & ID */}
            <div className="bg-arknights-bg/50 p-6 flex flex-col justify-center items-center border-b md:border-b-0 md:border-r border-arknights-border min-w-[160px] group-hover:bg-arknights-bg transition-colors">
            <span className="font-mono text-xs text-arknights-textMuted mb-4">[{mission.id}]</span>
            <ShieldCheck className="w-10 h-10 text-arknights-accent mb-3 opacity-80" />
            <div className="flex flex-col items-center">
                <span className="text-[10px] text-arknights-accent tracking-widest uppercase">STATUT MISSION</span>
                <span className="text-xs font-bold text-white mt-1">ACCOMPLIE</span>
            </div>
            </div>

            {/* Contenu de la mission */}
            <div className="p-6 flex-grow flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-bold text-white mb-4">{mission.title}</h3>
                
                <div className="mb-4">
                  <span className="flex items-center gap-2 text-xs font-mono text-red-400 mb-1">
                    <ShieldAlert className="w-3 h-3" /> PARAMÈTRES / CONTRAINTES
                  </span>
                  <p className="text-sm text-gray-400">{mission.constraint}</p>
                </div>

                <div className="mb-6">
                  <span className="flex items-center gap-2 text-xs font-mono text-arknights-accent mb-1">
                    {'>'} SOLUTION DÉPLOYÉE
                  </span>
                  <p className="text-sm text-gray-300">{mission.solution}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {mission.techs.map(tech => (
                  <span key={tech} className="text-xs font-mono border border-arknights-border px-2 py-1 text-arknights-textMuted bg-arknights-bg">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};