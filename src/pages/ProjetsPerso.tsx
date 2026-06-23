import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, animate } from 'framer-motion';
import { Database, Clock, FileType, Gamepad2, X, Map as MapIcon, Crosshair, ChevronRight, CheckCircle2, GitBranch, ExternalLink } from 'lucide-react';

import mapTopo from '../assets/map-topo.jpg';
import logoTomP from '../assets/logo-tomP.svg';

// --- TYPES ---
type SequenceState = 'IDLE' | 'TRAVELING' | 'SEARCHING' | 'LOCKED' | 'SHIFTING' | 'OPEN';
type Project = { id: string; category: string; name: string; status: string; icon: any; desc: string; tech: string; link: string; x: number; y: number; connections: string[]; };

const MAP_W = 4096;
const MAP_H = 2304;

export const ProjetsPerso = () => {
  const [isRevealed, setIsRevealed] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [sequenceState, setSequenceState] = useState<SequenceState>('IDLE');
  const [dragConstraints, setDragConstraints] = useState({ top: 0, left: 0, right: 0, bottom: 0 });

  const camX = useMotionValue(-1400);
  const camY = useMotionValue(-800);
  const camScale = useMotionValue(1);

  const clamp = (val: number, min: number, max: number) => Math.max(min, Math.min(val, max));
  const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const updateConstraints = () => {
    const currentScale = camScale.get();
    setDragConstraints({
      left: window.innerWidth - (MAP_W * currentScale),
      top: window.innerHeight - (MAP_H * currentScale),
      right: 0,
      bottom: 0
    });
  };

  useEffect(() => {
    updateConstraints();
    window.addEventListener('resize', updateConstraints);
    const t1 = setTimeout(() => setIsRevealed(true), 1000);
    return () => {
      window.removeEventListener('resize', updateConstraints);
      clearTimeout(t1);
    };
  }, []);

  const runAnim = (motionVal: any, target: number, duration: number, ease: any = 'easeInOut') => {
    return new Promise<void>((resolve) => {
      animate(motionVal, target, { type: 'tween', ease, duration, onComplete: () => resolve() });
    });
  };

  const projects: Project[] = [
    { id: 'PRJ.01', category: 'WebApp Active', name: 'PROJETQUIZZ', status: 'ACTIVE', icon: Gamepad2, desc: 'Système de quizz en temps réel avec 3 interfaces distinctes (TV, Tablette Meneur, Mobile Joueur via QR Code).', tech: 'Firebase / Temps Réel', link: '#', x: 1400, y: 900, connections: ['PRJ.02', 'PRJ.04'] },
    { id: 'PRJ.02', category: 'Data Intelligence', name: 'EXTRADATA', status: 'STABLE', icon: FileType, desc: 'Parseur intelligent pour extraire les informations cruciales de factures et documents administratifs.', tech: 'Python / NLP', link: '#', x: 1000, y: 1300, connections: [] },
    { id: 'PRJ.03', category: 'Outil Dashboard', name: 'IMMO\'DASH', status: 'ACTIVE', icon: Database, desc: 'Dashboard de gestion immobilière complexe de plusieurs biens, avec calculs de rentabilités.', tech: 'React / Tailwind', link: '#', x: 2600, y: 800, connections: ['PRJ.05'] },
    { id: 'PRJ.04', category: 'Outil Productivité', name: 'WORK-HELPER', status: 'ARCHIVED', icon: Clock, desc: 'Utilitaire de chronométrage et de gestion du temps de travail.', tech: 'LocalStorage', link: '#', x: 900, y: 700, connections: [] },
    { id: 'PRJ.05', category: 'Expérience 3D', name: 'XMAS-3D-WISH', status: 'STABLE', icon: MapIcon, desc: 'Wishlist interactive de Noël plongeant l\'utilisateur dans un environnement 3D animé.', tech: 'Three.js / WebGL', link: '#', x: 3000, y: 1100, connections: [] },
  ];

  // =========================================================================
  // LA SÉQUENCE CINÉMATIQUE DE VISÉE
  // =========================================================================
  const openProjectSequence = async (project: Project) => {
    if (sequenceState !== 'IDLE') return; 
    
    setSelectedProject(project);
    setSequenceState('TRAVELING');

    const targetScale = 1.6;
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;

    // 1. TRAVEL (Centrage sur la cible)
    let tX = clamp(-(project.x * targetScale) + cx, window.innerWidth - (MAP_W * targetScale), 0);
    let tY = clamp(-(project.y * targetScale) + cy, window.innerHeight - (MAP_H * targetScale), 0);
    
    await Promise.all([
      runAnim(camScale, targetScale, 0.6),
      runAnim(camX, tX, 0.6),
      runAnim(camY, tY, 0.6)
    ]);

    // 2. SEARCHING (Le viseur fait un balayage rapide gauche/droite/haut/bas)
    setSequenceState('SEARCHING');
    await wait(800); // Temps de l'animation de balayage

    // 3. LOCKED (Le viseur grossit, devient vert, Target Confirmed)
    setSequenceState('LOCKED');
    await wait(600); 

    // 4. SHIFTING (Décalage caméra vers la gauche)
    setSequenceState('SHIFTING');
    const shiftCenterX = window.innerWidth * 0.3;
    tX = clamp(-(project.x * targetScale) + shiftCenterX, window.innerWidth - (MAP_W * targetScale), 0);
    await runAnim(camX, tX, 0.5, 'easeOut');

    // 5. OPEN (Le menu dégradé apparaît)
    setSequenceState('OPEN');
  };

  const closeProjectSequence = async () => {
    setSequenceState('SHIFTING');
    await wait(300);

    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;

    // Recentrage
    let tX = clamp(-(selectedProject!.x * camScale.get()) + cx, window.innerWidth - (MAP_W * camScale.get()), 0);
    await runAnim(camX, tX, 0.4);

    // Dézoom global
    const exploreScale = 1;
    tX = clamp(-(selectedProject!.x * exploreScale) + cx, window.innerWidth - (MAP_W * exploreScale), 0);
    let tY = clamp(-(selectedProject!.y * exploreScale) + cy, window.innerHeight - (MAP_H * exploreScale), 0);

    setSequenceState('TRAVELING');
    await Promise.all([
      runAnim(camScale, exploreScale, 0.5),
      runAnim(camX, tX, 0.5),
      runAnim(camY, tY, 0.5)
    ]);

    setSelectedProject(null);
    setSequenceState('IDLE');
  };

  return (
    <div className="fixed inset-0 w-screen h-screen overflow-hidden bg-[#1a1814] text-white font-sans selection:bg-arknights-accent selection:text-black z-40">
      {sequenceState !== 'IDLE' && sequenceState !== 'OPEN' && <div className="fixed inset-0 z-[999]" />}

      <motion.div className="w-full h-full relative" initial={{ opacity: 0 }} animate={{ opacity: isRevealed ? 1 : 0 }} transition={{ duration: 1 }}>
        <motion.div 
          drag={sequenceState === 'IDLE'} 
          dragConstraints={dragConstraints} 
          dragMomentum={false} 
          dragElastic={0}
          className={`absolute ${sequenceState === 'IDLE' ? 'cursor-grab active:cursor-grabbing' : 'cursor-default'} origin-top-left will-change-transform`}
          style={{ x: camX, y: camY, scale: camScale, width: MAP_W, height: MAP_H }}
        >
          <div className="absolute inset-0 opacity-90" style={{ backgroundImage: `url(${mapTopo})`, backgroundSize: 'cover' }} />

          {/* =========================================
              LIGNES DE CONNEXIONS UNIES ET BLANCHES (50%)
              ========================================= */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {/* Lignes vers les projets depuis le centre (S'arrêtent au bord du cercle extérieur) */}
            <line x1={2048 - 75} y1={1152 - 20} x2={1400} y2={900} stroke="#ffffff" strokeWidth="2" strokeOpacity="0.5" />
            <line x1={2048 + 75} y1={1152 - 30} x2={2600} y2={800} stroke="#ffffff" strokeWidth="2" strokeOpacity="0.5" />
            <line x1={2048 - 60} y1={1152 + 50} x2={900} y2={1300} stroke="#ffffff" strokeWidth="2" strokeOpacity="0.5" />
            
            {/* Lignes entre projets */}
            {projects.map(prj => prj.connections.map(targetId => {
                const target = projects.find(p => p.id === targetId);
                if (!target) return null;
                return <line key={`${prj.id}-${targetId}`} x1={prj.x} y1={prj.y} x2={target.x} y2={target.y} stroke="#ffffff" strokeWidth={2} strokeOpacity="0.5" />;
              })
            )}
          </svg>

          {/* =========================================
              LE NOYAU CENTRAL (0,0) - TOM P
              ========================================= */}
          <div className="absolute pointer-events-none" style={{ left: 2048, top: 1152, transform: 'translate(-50%, -50%)' }}>
            <div className="relative flex items-center justify-center w-[200px] h-[200px]">
              
              {/* Cercle Plein 100px (20% opacité) */}
              <div className="absolute w-[140px] h-[140px] bg-white/10 rounded-full" />
              
              {/* Cercle Contour 150px (5px épaisseur, 50% opacité) */}
              <div className="absolute w-[200px] h-[200px] border-[5px] border-white/50 rounded-full" />
              
              {/* Logo Glow (30% opacité, légèrement plus gros) */}
              <img src={logoTomP} alt="Glow" className="absolute w-[185px] h-[185px] opacity-30 blur-[2px]" />
              
              {/* Logo Front Blanc (Très Gros) */}
              <img src={logoTomP} alt="TomP" className="relative z-10 w-[180px] h-[180px]" />
            </div>
          </div>

          {/* =========================================
              LES NŒUDS DE PROJETS (CARRÉS BLANCS)
              ========================================= */}
          {projects.map((prj) => {
            const isSelected = selectedProject?.id === prj.id;

            return (
              <div key={prj.id} className="absolute pointer-events-auto" style={{ left: prj.x, top: prj.y, transform: 'translate(-50%, -50%)' }}>
                <div className="relative group flex items-center justify-center">
                  
                  {/* --- LE RÉTICULE D'ANIMATION DE VISÉE --- */}
                  {isSelected && (
                    <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-20">
                      
                      {/* ÉTAPE : SEARCHING (Viseur qui fait des a-coups tactiques) */}
                      <AnimatePresence>
                        {sequenceState === 'SEARCHING' && (
                          <motion.div 
                            initial={{ scale: 1.5, opacity: 0 }}
                            animate={{ 
                              scale: 1, opacity: 1,
                              x: [0, -40, 40, 0, 0, 0, 0], // Mouvements brusques (Gauche, Droite, Haut, Bas)
                              y: [0, 0, 0, 0, -40, 40, 0]
                            }}
                            transition={{ duration: 0.8, ease: "easeInOut" }}
                            className="absolute w-[100px] h-[100px]"
                          >
                            <div className="absolute top-0 left-0 w-6 h-6 border-t-[4px] border-l-[4px] border-white" />
                            <div className="absolute top-0 right-0 w-6 h-6 border-t-[4px] border-r-[4px] border-white" />
                            <div className="absolute bottom-0 left-0 w-6 h-6 border-b-[4px] border-l-[4px] border-white" />
                            <div className="absolute bottom-0 right-0 w-6 h-6 border-b-[4px] border-r-[4px] border-white" />
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* ÉTAPE : LOCKED -> SHIFTING -> OPEN (Viseur vert grossi + Target Confirmed) */}
                      <AnimatePresence>
                        {(sequenceState === 'LOCKED' || sequenceState === 'SHIFTING' || sequenceState === 'OPEN') && (
                          <motion.div initial={{ scale: 1, opacity: 1 }} animate={{ scale: 1.25, opacity: 1 }} className="absolute w-[100px] h-[100px] flex items-center justify-center">
                            <div className="absolute top-0 left-0 w-8 h-8 border-t-[6px] border-l-[6px] border-[#22c55e]" />
                            <div className="absolute top-0 right-0 w-8 h-8 border-t-[6px] border-r-[6px] border-[#22c55e]" />
                            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-[6px] border-l-[6px] border-[#22c55e]" />
                            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-[6px] border-r-[6px] border-[#22c55e]" />
                            
                            <motion.div initial={{ y: 0, opacity: 0 }} animate={{ y: -65, opacity: 1 }} className="absolute top-0 flex flex-col items-center whitespace-nowrap">
                              <span className="bg-[#22c55e] text-black font-bold text-[11px] px-3 py-1 tracking-widest uppercase flex items-center gap-2 shadow-[0_0_20px_rgba(34,197,94,0.6)]">
                                <CheckCircle2 className="w-4 h-4" /> Target Confirmed
                              </span>
                            </motion.div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )}

                  {/* --- LE BOUTON NŒUD (CARRÉ BLANC) --- */}
                  {/* Sous-carré (10% opacité) */}
                  <div className="absolute w-[86px] h-[86px] bg-white/10 rounded-[1.25rem] transition-transform group-hover:scale-105" />
                  
                  {/* Bouton principal (Carré blanc pur) */}
                  <button 
                    disabled={sequenceState !== 'IDLE'} 
                    onClick={() => openProjectSequence(prj)} 
                    className={`relative z-10 flex items-center justify-center w-[74px] h-[74px] rounded-xl bg-white shadow-[0_0_25px_rgba(255,255,255,0.3)] transition-transform ${isSelected ? 'scale-110' : 'hover:scale-105'}`}
                  >
                    <prj.icon className="w-10 h-10 text-black" />
                  </button>

                  {/* L'étiquette */}
                  <div className={`absolute left-[130%] bg-black/80 backdrop-blur-sm px-4 py-2 border-l-[3px] border-white min-w-[180px] transition-opacity duration-300 ${isSelected ? 'opacity-0' : 'opacity-100'}`}>
                    <span className="block text-[9px] text-gray-400 font-mono tracking-wider">{prj.category}</span>
                    <span className="block text-sm font-bold text-white tracking-wide">{prj.name}</span>
                  </div>

                </div>
              </div>
            );
          })}
        </motion.div>
      </motion.div>

      {/* =========================================
          LE PANNEAU LATÉRAL (DÉGRADÉ FONDU NOIR)
          ========================================= */}
      <AnimatePresence>
        {sequenceState === 'OPEN' && selectedProject && (
          <motion.div 
            initial={{ opacity: 0, x: '100px' }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: '100px' }} transition={{ type: 'tween', ease: 'easeOut', duration: 0.4 }} 
            className="absolute right-0 top-0 h-full w-[500px] bg-gradient-to-l from-[#050505] via-[#050505]/95 to-transparent p-12 pr-16 z-50 flex flex-col justify-center pointer-events-auto"
          >
            {/* Bouton Fermer */}
            <button onClick={closeProjectSequence} className="absolute top-10 right-10 text-gray-500 hover:text-white transition-colors">
              <X className="w-8 h-8" />
            </button>

            {/* Contenu Décoré */}
            <div className="pl-10 border-l-2 border-arknights-accent/40 relative">
              <div className="absolute -left-[5px] top-0 w-2 h-2 bg-arknights-accent rounded-full animate-ping" />
              
              <div className="mb-8">
                <span className="font-mono text-[10px] text-arknights-accent tracking-[0.2em]">[ SYSTEM.OVERRIDE // {selectedProject.id} ]</span>
                <h2 className="text-5xl font-bold text-white mt-2 uppercase tracking-tighter drop-shadow-md">{selectedProject.name}</h2>
              </div>

              <div className="space-y-8">
                <div>
                  <h3 className="text-xs font-mono text-gray-500 mb-2 flex items-center gap-2">
                    <Crosshair className="w-4 h-4 text-arknights-accent" /> SYNOPTIQUE DE MISSION
                  </h3>
                  <p className="text-base text-gray-300 leading-relaxed font-light">
                    {selectedProject.desc}
                  </p>
                </div>

                <div>
                  <h3 className="text-xs font-mono text-gray-500 mb-3 flex items-center gap-2">
                    <Database className="w-4 h-4 text-arknights-accent" /> PILES TECHNOLOGIQUES
                  </h3>
                  <span className="inline-flex items-center gap-2 border border-arknights-accent/50 bg-arknights-accent/10 text-arknights-accent px-4 py-2 text-sm font-mono shadow-[0_0_10px_rgba(255,179,0,0.1)]">
                    <div className="w-1 h-4 bg-arknights-accent animate-pulse" />
                    {selectedProject.tech}
                  </span>
                </div>
              </div>

              <div className="flex gap-4 mt-12">
                <a href={selectedProject.link} className="flex-1 flex justify-center items-center gap-3 p-4 border border-white/20 text-white hover:bg-white hover:text-black transition-colors text-xs font-bold tracking-widest uppercase">
                  <GitBranch className="w-4 h-4" /> Source
                </a>
                <a href={selectedProject.link} className="flex-1 flex justify-center items-center gap-3 p-4 bg-arknights-accent text-black hover:bg-yellow-400 transition-colors text-xs font-bold tracking-widest uppercase shadow-[0_0_20px_rgba(255,179,0,0.3)]">
                  <ExternalLink className="w-4 h-4" /> Déploiement
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};