import {
  animate,
  AnimatePresence,
  motion,
  useMotionValue,
} from "framer-motion";
import {
  CheckCircle2,
  Clock,
  Database,
  ExternalLink,
  FileType,
  Gamepad2,
  GitBranch,
  Map as MapIcon,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";

import logoTomP from "../assets/logo-tomP.png";
import mapTopo from "../assets/map-topo.png";

type SequenceState =
  | "IDLE"
  | "TRAVELING"
  | "SEARCHING"
  | "LOCKED"
  | "SHIFTING"
  | "OPEN";

type Project = {
  id: string;
  category: string;
  name: string;
  status: string;
  icon: any;
  desc: string;
  tech: string;
  link: string;
  x: number;
  y: number;
  connections: string[];
};

const MAP_W = 4784;
const MAP_H = 3584;

export const ProjetsPerso = () => {
  // =========================================================================
  // 🛠️ ZONE DE CONFIGURATION MANUELLE
  // =========================================================================

  const MAP_SPAWN = { x: -1370, y: -900 };
  const CENTER_SPAWN = { x: MAP_W / 2 - 70, y: MAP_H / 2 - 250 };

  const CUSTOM_WHITE_DOTS = [
    { id: "dot-1", x: MAP_W / 2 - 60, y: MAP_H / 2 - 220 },
    { id: "dot-2", x: MAP_W / 2 - 50, y: MAP_H / 2 - 15 },
    { id: "dot-3", x: MAP_W / 2 + 165, y: MAP_H / 2 - 20 },
  ];
  const CUSTOM_BLACK_DOTS = [
    { id: "dot-1", x: MAP_W / 2 - 60, y: MAP_H / 2 - 220 },
    { id: "dot-2", x: MAP_W / 2 - 50, y: MAP_H / 2 - 15 },
    { id: "dot-3", x: MAP_W / 2 + 165, y: MAP_H / 2 - 20 },
  ];

  const TILT_ANGLE = "35deg";

  // =========================================================================

  const [dragConstraints, setDragConstraints] = useState({
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  });

  const camScale = useMotionValue(0.9);
  const camX = useMotionValue(0);
  const camY = useMotionValue(0);

  const updateConstraints = () => {
    const scale = camScale.get();
    setDragConstraints({
      left: window.innerWidth - MAP_W * scale,
      top: window.innerHeight - MAP_H * scale,
      right: 0,
      bottom: 0,
    });
  };

  useEffect(() => {
    updateConstraints();
    window.addEventListener("resize", updateConstraints);

    camX.set(MAP_SPAWN.x);
    camY.set(MAP_SPAWN.y);

    return () => window.removeEventListener("resize", updateConstraints);
  }, []);

  const projects: Project[] = [
    {
      id: "PRJ.01",
      category: "Écosystème Temps Réel",
      name: "PROJETQUIZZ",
      status: "ACTIVE",
      icon: Gamepad2,
      desc: "Plateforme de quizz interactive à haute vélocité. Architecture distribuée sur 3 interfaces synchronisées : Écran de diffusion TV, Tablette de pilotage animateur, et buzzers Web mobiles joueurs connectés instantanément via QR Code.",
      tech: "React / Node.js / WebSockets / Firebase",
      link: "#",
      x: 2150,
      y: 1920,
      connections: ["dot-2", "WORK-HELPER"],
    },
    {
      id: "PRJ.02",
      category: "Intelligence Artificielle",
      name: "EXTRADATA",
      status: "STABLE",
      icon: FileType,
      desc: "Moteur de parsing sémantique et d'extraction documentaire automatisé. Algorithme d'analyse par NLP capable d'isoler les métadonnées critiques sur des lots de factures et documents administratifs non structurés.",
      tech: "Python / NLP / RegEx / OCR",
      link: "#",
      x: 2750,
      y: 1920,
      connections: ["dot-3"],
    },
    {
      id: "PRJ.03",
      category: "Ingénierie Financière",
      name: "IMMO'DASH",
      status: "ACTIVE",
      icon: Database,
      desc: "Tableau de bord de gestion d'actifs immobiliers à variables multiples. Moteur de calcul algorithmique intégrant la fiscalité, l'amortissement bancaire, le cash-flow net et la projection de rentabilité (TRI).",
      tech: "React / Tailwind CSS / Recharts",
      link: "#",
      x: 2200,
      y: 1350,
      connections: ["dot-1", "XMAS-3D-WISH"],
    },
    {
      id: "PRJ.04",
      category: "Outil de Productivité",
      name: "WORK-HELPER",
      status: "ARCHIVED",
      icon: Clock,
      desc: "Utilitaire de bureau de tracking d'imputation et de gestion du temps de travail. Interface minimaliste axée sur la rapidité de saisie, avec génération d'exports d'activité et persistance locale chiffrée.",
      tech: "TypeScript / React / LocalStorage API",
      link: "#",
      x: 2000,
      y: 2400,
      connections: ["PROJETQUIZZ"],
    },
    {
      id: "PRJ.05",
      category: "Expérience WebGL",
      name: "XMAS-3D-WISH",
      status: "STABLE",
      icon: MapIcon,
      desc: "Wishlist de fin d'année immersive en 3D temps réel. Génération d'une scène d'hiver procédurale interactive permettant la composition, la customisation et l'envoi de listes de vœux animées.",
      tech: "Three.js / WebGL / GSAP",
      link: "#",
      x: 2600,
      y: 850,
      connections: ["IMMO'DASH"],
    },
  ];

  // =========================================================================
  // ⚡ LE MOTEUR DE PROPAGATION & SÉQUENCE CINÉMATIQUE
  // =========================================================================

  const [activeNodes, setActiveNodes] = useState<string[]>([]);
  const [revealedProjects, setRevealedProjects] = useState<string[]>([]);

  const [hoveredPrj, setHoveredPrj] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [sequenceState, setSequenceState] = useState<SequenceState>("IDLE");

  useEffect(() => {
    const timer = setTimeout(() => {
      const spawnerIds = CUSTOM_WHITE_DOTS.map((d) => d.id);
      setActiveNodes(spawnerIds);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const resolveObj = (query: string) => {
    const p = projects.find((prj) => prj.id === query || prj.name === query);
    if (p) return { id: p.id, type: "project", x: p.x, y: p.y };

    const d = CUSTOM_WHITE_DOTS.find((dot) => dot.id === query);
    if (d) return { id: d.id, type: "dot", x: d.x, y: d.y };

    return null;
  };

  const getDirectedEdges = () => {
    const edgeList: Array<{ source: any; target: any; key: string }> = [];
    const seen = new Set<string>();

    projects.forEach((prj) => {
      const sourceObj = { id: prj.id, type: "project", x: prj.x, y: prj.y };

      prj.connections.forEach((targetQuery) => {
        const targetObj = resolveObj(targetQuery);
        if (!targetObj) return;

        let from = sourceObj;
        let to = targetObj;

        if (targetObj.type === "dot") {
          from = targetObj;
          to = sourceObj;
        }

        const uniqueKey = `${from.id}➔${to.id}`;

        if (!seen.has(uniqueKey)) {
          seen.add(uniqueKey);
          edgeList.push({ source: from, target: to, key: uniqueKey });
        }
      });
    });

    return edgeList;
  };

  const edges = getDirectedEdges();
  const getTargetCoord = (targetId: string) => resolveObj(targetId);

  const clamp = (val: number, min: number, max: number) =>
    Math.max(min, Math.min(val, max));
  const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

  const runAnim = (
    motionVal: any,
    target: number,
    duration: number,
    ease: any = "easeInOut",
  ) => {
    return new Promise<void>((resolve) => {
      animate(motionVal, target, {
        type: "tween",
        ease,
        duration,
        onComplete: () => resolve(),
      });
    });
  };

  // --- PROTOCOLE DE VISÉE SÉQUENCÉ (LE VRAI) ---
  const openProjectSequence = async (prj: Project) => {
    if (sequenceState !== "IDLE") return;

    setSelectedProject(prj);
    setHoveredPrj(null);
    setSequenceState("TRAVELING");

    const targetScale = 1.35;
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;

    // 1. TRAVEL (Centrage absolu)
    let tX = clamp(
      -(prj.x * targetScale) + cx,
      window.innerWidth - MAP_W * targetScale,
      0,
    );
    const visualY =
      (prj.y - MAP_H / 2) * Math.cos((35 * Math.PI) / 180) + MAP_H / 2;
    const tY = clamp(
      -(visualY * targetScale) + cy,
      window.innerHeight - MAP_H * targetScale,
      0,
    );

    await Promise.all([
      runAnim(camScale, targetScale, 0.6),
      runAnim(camX, tX, 0.6),
      runAnim(camY, tY, 0.6),
    ]);

    // 2. SEARCHING (Viseur qui fait des balayages rapides pendant 0.5s)
    setSequenceState("SEARCHING");
    await wait(500);

    // 3. LOCKED (Viseur vert #a0bf2e + Target Confirmed pendant 0.5s)
    setSequenceState("LOCKED");
    await wait(500);

    // 4. SHIFTING (Décalage caméra vers la gauche à 28% de l'écran)
    setSequenceState("SHIFTING");
    const shiftCenterX = window.innerWidth * 0.28;
    tX = clamp(
      -(prj.x * targetScale) + shiftCenterX,
      window.innerWidth - MAP_W * targetScale,
      0,
    );
    await runAnim(camX, tX, 0.5, "easeOut");

    // 5. OPEN (Affichage de ton dégradé)
    setSequenceState("OPEN");
  };

  const closeProjectSequence = async () => {
    setSequenceState("SHIFTING");
    await wait(250);

    const exploreScale = 0.9;
    const targetX = clamp(
      -(selectedProject!.x * exploreScale) + window.innerWidth / 2,
      window.innerWidth - MAP_W * exploreScale,
      0,
    );
    const targetY = clamp(
      -(selectedProject!.y * exploreScale) + window.innerHeight / 2,
      window.innerHeight - MAP_H * exploreScale,
      0,
    );

    setSequenceState("TRAVELING");
    await Promise.all([
      runAnim(camScale, exploreScale, 0.6, "easeOut"),
      runAnim(camX, targetX, 0.6, "easeOut"),
      runAnim(camY, targetY, 0.6, "easeOut"),
    ]);

    setSelectedProject(null);
    setSequenceState("IDLE");
  };

  // ⚡ CALCUL DE PROJECTION 3D -> 2D PLAT (Pour les bulles)
  const getCrisp2D_Y = (y: number) => {
    const rad = (35 * Math.PI) / 180;
    return (y - MAP_H / 2) * Math.cos(rad) + MAP_H / 2;
  };

  return (
    <div className="fixed inset-0 w-screen h-screen overflow-hidden bg-black text-white font-sans selection:bg-[#a0bf2e] selection:text-black z-40 [perspective:1200px]">
      {sequenceState !== "IDLE" && sequenceState !== "OPEN" && (
        <div className="fixed inset-0 z-[999]" />
      )}

      <motion.div
        className="w-full h-full relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <motion.div
          drag={sequenceState === "IDLE"}
          dragConstraints={dragConstraints}
          dragMomentum={false}
          dragElastic={0}
          className={`absolute origin-top-left will-change-transform ${sequenceState === "IDLE" ? "cursor-grab active:cursor-grabbing" : "cursor-default"}`}
          style={{
            x: camX,
            y: camY,
            scale: camScale,
            width: MAP_W,
            height: MAP_H,
          }}
        >
          {/* L'image de fond */}
          <div
            className="absolute inset-0 bg-cover pointer-events-none"
            style={{ backgroundImage: `url(${mapTopo})` }}
          />

          {/* ⚡ DIRECTIVE 2 : Fond rayé AVANT la rotation 3D, purgé de son z-index */}
          <div
            className="absolute inset-0 pointer-events-none opacity-35"
            style={{
              background: `repeating-linear-gradient(-45deg, rgba(0,0,0,0.15), rgba(0,0,0,0.15) 6px, rgba(0,0,0,0.3) 6px, rgba(0,0,0,0.3) 15px)`,
            }}
          />

          <div
            className="w-full h-full absolute inset-0 origin-center"
            style={{
              transform: `rotateX(${TILT_ANGLE})`,
              transformStyle: "preserve-3d",
            }}
          >
            {/* LES LIGNES LASER */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              {edges.map((edge) => {
                const isEnergized = activeNodes.includes(edge.source.id);
                return (
                  <motion.line
                    key={edge.key}
                    x1={edge.source.x}
                    y1={edge.source.y}
                    x2={edge.target.x}
                    y2={edge.target.y}
                    stroke="#ffffff"
                    strokeWidth="4"
                    strokeOpacity="0.45"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: isEnergized ? 1 : 0 }}
                    transition={{ duration: 0.55, ease: "easeInOut" }}
                    onAnimationComplete={() => {
                      if (isEnergized) {
                        setActiveNodes((prev) =>
                          Array.from(new Set([...prev, edge.target.id])),
                        );
                        if (edge.target.type === "project") {
                          setRevealedProjects((prev) =>
                            Array.from(new Set([...prev, edge.target.id])),
                          );
                        }
                      }
                    }}
                  />
                );
              })}
            </svg>

            {/* LE POINT CENTRAL OASIS */}
            <div
              className="absolute pointer-events-none flex items-center justify-center"
              style={{ left: CENTER_SPAWN.x, top: CENTER_SPAWN.y }}
            >
              <motion.div
                className="absolute flex items-center justify-center"
                initial={{ scale: 1, opacity: 0 }}
                animate={{ opacity: [0, 0.8, 0.9, 0.9], scale: [1, 1, 3] }}
                transition={{
                  opacity: {
                    delay: 1.3,
                    duration: 0.3,
                    times: [0, 0.25, 0.8, 1],
                  },
                  scale: { delay: 1, duration: 1.1, ease: "easeOut" },
                }}
              >
                <svg className="w-[312px] h-[312px] overflow-visible">
                  <defs>
                    <mask id="donut-cut">
                      <circle cx="156" cy="156" r="140" fill="white" />
                      <circle cx="156" cy="156" r="120" fill="black" />
                    </mask>
                    <pattern
                      id="square-map"
                      width="5.5"
                      height="5.5"
                      patternUnits="userSpaceOnUse"
                    >
                      <rect
                        x="1"
                        y="1"
                        width="1.5"
                        height="1.5"
                        fill="rgba(255, 255, 255, 0.6)"
                      />
                    </pattern>
                  </defs>
                  <circle
                    cx="156"
                    cy="156"
                    r="156"
                    fill="url(#square-map)"
                    mask="url(#donut-cut)"
                  />
                </svg>
              </motion.div>
              <motion.div
                className="absolute w-[275px] h-[275px] rounded-full border-[6px] opacity-15 border-black/80"
                initial={{ y: 30, scale: 1.1, opacity: 0 }}
                animate={{ y: 30, scale: 1, opacity: 0.1 }}
                transition={{ delay: 1.2, duration: 0.5, ease: "easeOut" }}
              />
              <motion.div
                className="absolute w-[275px] h-[275px] rounded-full border-[6px] border-white/80"
                initial={{ y: -50, scale: 1.1, opacity: 0 }}
                animate={{ y: 0, scale: 1, opacity: 0.3 }}
                transition={{ delay: 1.1, duration: 0.5, ease: "easeOut" }}
              />
              <motion.div
                className="absolute w-[175px] h-[175px] rounded-full bg-white"
                initial={{ scale: 1, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.2 }}
                transition={{ delay: 1.1, duration: 0.5, ease: "easeOut" }}
              />
              <motion.img
                src={logoTomP}
                alt="Shadow"
                className="absolute w-[250px] h-[250px] brightness-0 opacity-15 -translate-x-1/2 -translate-y-1/2"
                style={{ filter: "blur(100%)" }}
                initial={{ y: 40, scale: 1.2 }}
                animate={{ y: 30, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.75, ease: "easeOut" }}
              />
              <motion.img
                src={logoTomP}
                alt="Ghost"
                className="absolute w-[250px] h-[250px] -translate-x-1/2 -translate-y-1/2"
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 10, opacity: 0.4 }}
                transition={{ delay: 1, duration: 0.75, ease: "easeOut" }}
              />
              <motion.img
                src={logoTomP}
                alt="TomP"
                className="absolute w-[250px] h-[250px] relative z-10 -translate-x-1/2 -translate-y-1/2"
                initial={{ y: -50, scale: 1.1 }}
                animate={{ y: 0, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.75, ease: "easeOut" }}
              />
            </div>

            {CUSTOM_BLACK_DOTS.map((dot) => (
              <motion.div
                key={dot.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.2 }}
                transition={{ delay: 1.4, duration: 0.3 }}
                className="absolute w-6 h-6 bg-black rounded-full pointer-events-none"
                style={{
                  left: dot.x,
                  top: dot.y,
                  transform: "translate(-50%, -50%)",
                }}
              />
            ))}
            {CUSTOM_WHITE_DOTS.map((dot) => (
              <motion.div
                key={dot.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4, duration: 0.3 }}
                className="absolute w-3 h-3 bg-white rounded-full pointer-events-none"
                style={{
                  left: dot.x,
                  top: dot.y,
                  transform: "translate(-50%, -50%)",
                }}
              />
            ))}

            {/* =========================================================
                LES PROJETS (AVEC LA HITBOX FILM TRANSPARENT SUPRÊME)
                ========================================================= */}
            {projects.map((prj) => {
              const isWokenUp = revealedProjects.includes(prj.id);
              const isHovered = hoveredPrj === prj.id;
              const isSelected = selectedProject?.id === prj.id;

              return (
                <div
                  key={prj.id}
                  className="absolute pointer-events-auto"
                  style={{
                    left: prj.x,
                    top: prj.y,
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    animate={
                      isWokenUp ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }
                    }
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    className="relative flex items-center justify-center"
                  >
                    {/* --- LE RÉTICULE SCAN (Séquencé Snippet 2) --- */}
                    {isSelected && (
                      <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-30">
                        <AnimatePresence>
                          {sequenceState === "SEARCHING" && (
                            <motion.div
                              initial={{ scale: 1.5, opacity: 0 }}
                              animate={{
                                scale: 1,
                                opacity: 1,
                                x: [0, -25, 25, 0, 0, 0, 0],
                                y: [0, 0, 0, 0, -25, 25, 0],
                              }}
                              transition={{ duration: 0.5, ease: "easeInOut" }}
                              className="absolute w-[100px] h-[100px]"
                            >
                              <div className="absolute top-0 left-0 w-5 h-5 border-t-[4px] border-l-[4px] border-white" />
                              <div className="absolute top-0 right-0 w-5 h-5 border-t-[4px] border-r-[4px] border-white" />
                              <div className="absolute bottom-0 left-0 w-5 h-5 border-b-[4px] border-l-[4px] border-white" />
                              <div className="absolute bottom-0 right-0 w-5 h-5 border-b-[4px] border-r-[4px] border-white" />
                            </motion.div>
                          )}
                        </AnimatePresence>

                        <AnimatePresence>
                          {(sequenceState === "LOCKED" ||
                            sequenceState === "SHIFTING" ||
                            sequenceState === "OPEN") && (
                            <motion.div
                              initial={{ scale: 1, opacity: 1 }}
                              animate={{ scale: 1.2, opacity: 1 }}
                              className="absolute w-[100px] h-[100px] flex items-center justify-center"
                            >
                              <div className="absolute top-0 left-0 w-6 h-6 border-t-[5px] border-l-[5px] border-[#a0bf2e]" />
                              <div className="absolute top-0 right-0 w-6 h-6 border-t-[5px] border-r-[5px] border-[#a0bf2e]" />
                              <div className="absolute bottom-0 left-0 w-6 h-6 border-b-[5px] border-l-[5px] border-[#a0bf2e]" />
                              <div className="absolute bottom-0 right-0 w-6 h-6 border-b-[5px] border-r-[5px] border-[#a0bf2e]" />

                              <motion.div
                                initial={{ y: 0, opacity: 0 }}
                                animate={{ y: -65, opacity: 1 }}
                                className="absolute top-0 flex flex-col items-center whitespace-nowrap"
                              >
                                <span className="bg-[#a0bf2e] text-black font-bold text-[11px] px-3 py-1 tracking-widest uppercase flex items-center gap-1.5 shadow-[0_0_20px_rgba(160,191,46,0.6)]">
                                  <CheckCircle2 className="w-3.5 h-3.5" />{" "}
                                  Target Confirmed
                                </span>
                              </motion.div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    )}

                    {/* ⚡ DIRECTIVE 1 : LE FILM TRANSPARENT INTERCEPTEUR DE SOURIS
                        Posé au-dessus de tout. C'est lui la seule et unique hitbox. */}
                    <div
                      onClick={() => openProjectSequence(prj)}
                      onMouseEnter={() => setHoveredPrj(prj.id)}
                      onMouseLeave={() => setHoveredPrj(null)}
                      className="absolute inset-0 w-[100px] h-[100px] z-50 cursor-pointer m-auto rounded-xl"
                    />

                    {/* Ombre au sol */}
                    <div className="absolute w-[96px] h-[96px] bg-black/75 rounded-2xl opacity-40 blur-[2px] translate-y-[30px] pointer-events-none" />

                    {/* Le hover animé en CSS pur */}
                    <div
                      className={`absolute w-[124px] h-[124px] rounded-2xl border-2 border-dashed border-[#a0bf2e] transition-all duration-300 pointer-events-none ${isHovered && !isSelected ? "scale-100 opacity-100 rotate-90" : "scale-75 opacity-0"}`}
                    />
                    <div
                      className={`absolute w-[106px] h-[106px] rounded-2xl bg-[#a0bf2e]/20 transition-all duration-200 pointer-events-none ${isHovered && !isSelected ? "scale-100 opacity-100" : "scale-75 opacity-0"}`}
                    />

                    <div className="absolute w-[120px] h-[120px] bg-white/10 rounded-2xl pointer-events-none" />

                    {/* ⚡ LE CUBE BLANC (Désactivé en pointer-events-none, pur objet passif) */}
                    <div
                      className={`relative z-10 flex items-center justify-center w-[100px] h-[100px] bg-white rounded-xl shadow-[0_0_30px_rgba(255,255,255,0.2)] pointer-events-none ${isSelected ? "ring-4 ring-[#a0bf2e]" : ""}`}
                    >
                      <prj.icon className="w-[75px] h-[75px]" color="#2f2f2f" />
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>

          {/* =========================================================
              ⚡ DIRECTIVE 3 : LE CALQUE 2D (Les bulles vectorielles nettes infaillibles !)
              ========================================================= */}
          <div className="absolute inset-0 pointer-events-none z-30 font-sans">
            {projects.map((prj) => {
              const isWokenUp = revealedProjects.includes(prj.id);
              if (!isWokenUp) return null;

              const crispY = getCrisp2D_Y(prj.y);

              return (
                <motion.div
                  key={`bubble-${prj.id}`}
                  initial={{ opacity: 0, y: -30 }} // Chute arrimée sur la physique du cube
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                  className="absolute flex items-center gap-2 pointer-events-none"
                  // ⚡ CSS ABSOLU STANDARD : Impossible de finir à Y=0 dans n'importe quel navigateur !
                  style={{
                    left: `${prj.x + 65}px`,
                    top: `${crispY - 55}px`,
                  }}
                >
                  <div className="bg-[#0a0a0c]/90 backdrop-blur-md border border-white/10 px-3.5 py-1.5 rounded-lg shadow-2xl flex flex-col pointer-events-none">
                    <span className="text-xs font-extrabold tracking-wider text-white uppercase">
                      {prj.name}
                    </span>
                    <span className="text-[9.5px] font-mono text-[#a0bf2e] font-semibold mt-0.5">
                      {prj.tech.split("/")[0]}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </motion.div>

      {/* =========================================================
          ⚡ DIRECTIVE 4 : LE PANNEAU DE DROITE (Ton enveloppe exacte restaurée)
          ========================================================= */}
      <AnimatePresence>
        {sequenceState === "OPEN" && selectedProject && (
          <motion.div
            initial={{ opacity: 0, x: "100px" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100px" }}
            transition={{ type: "tween", ease: "easeOut", duration: 0.4 }}
            className="absolute right-0 top-0 h-full w-[650px] bg-gradient-to-l from-[#050505] via-[#050505]/75 to-transparent p-12 pr-16 z-50 flex flex-col justify-center pointer-events-auto"
          >
            <button
              onClick={closeProjectSequence}
              className="absolute top-10 right-10 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-8 h-8" />
            </button>

            <div className="pl-10 border-l-2 border-[#a0bf2e] relative">
              <div className="absolute -left-[5px] top-0 w-2 h-2 bg-[#a0bf2e] rounded-full animate-ping" />

              <div className="mb-8">
                <span className="font-mono text-[10px] text-[#a0bf2e] tracking-[0.2em]">
                  [ ARCHIVE // {selectedProject.id} ]
                </span>
                <h2 className="text-4xl font-bold text-white mt-1 uppercase tracking-wider">
                  {selectedProject.name}
                </h2>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-[10px] font-mono text-[#e3e3e3] mb-2 uppercase tracking-widest font-semibold">
                    Résumé d'Opération
                  </h3>
                  <p className="text-sm text-gray-300 leading-relaxed font-light">
                    {selectedProject.desc}
                  </p>
                </div>

                <div>
                  <h3 className="text-[10px] font-mono text-[#e3e3e3] mb-2 uppercase tracking-widest font-semibold">
                    Stack Déployée
                  </h3>
                  <div className="flex flex-wrap gap-2 font-mono text-xs">
                    {selectedProject.tech.split("/").map((item, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 bg-[#a0bf2e]/50 border border-[#a0bf2e]/30 text-[#bde03f] rounded"
                      >
                        {item.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex gap-4 mt-12 pt-6 border-t border-white/10 font-mono text-xs uppercase tracking-wider">
                <a
                  href={selectedProject.link}
                  className="flex-1 flex justify-center items-center gap-2 p-3.5 bg-white/10 hover:bg-white/20 text-white transition-colors font-bold rounded"
                >
                  <GitBranch className="w-4 h-4" /> Code
                </a>
                <a
                  href={selectedProject.link}
                  className="flex-1 flex justify-center items-center gap-2 p-3.5 bg-[#a0bf2e] text-black hover:brightness-110 transition-all font-bold rounded shadow-[0_0_20px_rgba(160,191,46,0.3)]"
                >
                  <ExternalLink className="w-4 h-4" /> Inspecter
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
