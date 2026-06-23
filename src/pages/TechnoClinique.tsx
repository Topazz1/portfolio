import { motion } from 'framer-motion';
import { BookOpen, Target, Lightbulb, BrainCircuit } from 'lucide-react';

export const TechnoClinique = () => {
  const archives = [
    {
      id: 'DOC.SHS.01',
      type: 'MÉMOIRE',
      title: 'Réfléxions sur le béton : un espoir ou un piège ?',
      why: 'Le cheminement de pensée initial qui a permis d’arriver à ce sujet. Le constat d\'origine.',
      how: 'Lecture de bibliographie spécifique, adoption d\'une démarche de conception originale mêlant ingénierie et SHS.',
      learnings: 'Ce que le projet m\'a appris sur la réflexion analytique et l\'impact de la technologie sur l\'humain.'
    },{
      id: 'DOC.SHS.02',
      type: 'MÉMOIRE',
      title: 'Le bain à travers l\'histoire : Lecture culturelle des corps et des sociétés.',
      why: 'Le cheminement de pensée initial qui a permis d’arriver à ce sujet. Le constat d\'origine.',
      how: 'Lecture de bibliographie spécifique, adoption d\'une démarche de conception originale mêlant ingénierie et SHS.',
      learnings: 'Ce que le projet m\'a appris sur la réflexion analytique et l\'impact de la technologie sur l\'humain.'
    },{
      id: 'DOC.SHS.03',
      type: 'MÉMOIRE',
      title: 'L\'impossible « chez-soi » : comment la spéculation immobilière a construit une inaccessibilité du logement en France.',
      why: 'Le cheminement de pensée initial qui a permis d’arriver à ce sujet. Le constat d\'origine.',
      how: 'Lecture de bibliographie spécifique, adoption d\'une démarche de conception originale mêlant ingénierie et SHS.',
      learnings: 'Ce que le projet m\'a appris sur la réflexion analytique et l\'impact de la technologie sur l\'humain.'
    },{
      id: 'DOC.SHS.04',
      type: 'MÉMOIRE',
      title: 'Habiter les Hauts-de-France en 2050 : un territoire bloqué.',
      why: 'Le cheminement de pensée initial qui a permis d’arriver à ce sujet. Le constat d\'origine.',
      how: 'Lecture de bibliographie spécifique, adoption d\'une démarche de conception originale mêlant ingénierie et SHS.',
      learnings: 'Ce que le projet m\'a appris sur la réflexion analytique et l\'impact de la technologie sur l\'humain.'
    },{
      id: 'DOC.SHS.05',
      type: 'CONFÉRENCE',
      title: 'La ségrégation par le flux en Hauts-de-France (2050).',
      why: 'Le cheminement de pensée initial qui a permis d’arriver à ce sujet. Le constat d\'origine.',
      how: 'Prise de parole argumentée devant le CESER en tant que représentant HuTech.',
      learnings: 'Ce que le projet m\'a appris sur la réflexion analytique et l\'impact de la technologie sur l\'humain.'
    },{
      id: 'DOC.SHS.06',
      type: 'RAPPORT TECHNIQUE',
      title: 'Pokémon Inc. : modélisation systémique et mathématique d’une économie ludique.',
      why: 'Le cheminement de pensée initial qui a permis d’arriver à ce sujet. Le constat d\'origine.',
      how: 'Lecture de bibliographie spécifique, adoption d\'une démarche de conception originale mêlant ingénierie et SHS.',
      learnings: 'Ce que le projet m\'a appris sur la réflexion analytique et l\'impact de la technologie sur l\'humain.'
    },{
      id: 'DOC.SHS.07',
      type: 'RAPPORT TECHNIQUE',
      title: 'Free will theorem : démonstration mathématique du libre-arbitre.',
      why: 'Le cheminement de pensée initial qui a permis d’arriver à ce sujet. Le constat d\'origine.',
      how: 'Lecture de bibliographie spécifique, adoption d\'une démarche de conception originale mêlant ingénierie et SHS.',
      learnings: 'Ce que le projet m\'a appris sur la réflexion analytique et l\'impact de la technologie sur l\'humain.'
    },{
      id: 'DOC.SHS.08',
      type: 'RAPPORT TECHNIQUE',
      title: 'Le repas de famille : c\'est pas du gâteau !',
      why: 'L’UNESCO inscrivait en 2010 le « repas gastronomique des Français » au patrimoine culturel immatériel de l’humanité. Cet art de vivre a notamment pour but de resserrer les liens familiaux. Pourtant, qui n’a jamais eu peur d’être confronté, lors de cette pratique sociale, aux questions fort embarrassantes de sa grand-tante, voire à un conflit qui rend ces moments indigestes ?',
      how: 'Lecture de bibliographie spécifique, adoption d\'une démarche de conception originale mêlant ingénierie et SHS.',
      learnings: 'Ce que le projet m\'a appris sur la réflexion analytique et l\'impact de la technologie sur l\'humain.'
    },{
      id: 'DOC.SHS.09',
      type: 'RAPPORT TECHNIQUE',
      title: 'Transport Management System et transformation du transport routier.',
      why: 'Le transport routier, comme toute activité humaine, n’échappe pas à la numérisation, et ce faisant, à la grammatisation, à la prolétarisation et à des questionnements sur la souveraineté et le techno-discernement. Illustration sur la base d’échanges avec une alumni HuTech.',
      how: 'Lecture de bibliographie spécifique, adoption d\'une démarche de conception originale mêlant ingénierie et SHS.',
      learnings: 'Ce que le projet m\'a appris sur la réflexion analytique et l\'impact de la technologie sur l\'humain.'
    }
  ];

  return (
    <motion.div 
      initial="hidden" animate="show" exit={{ opacity: 0, y: 20 }}
      variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } }}
      className="w-full pb-20 max-w-4xl mx-auto"
    >
      <div className="mb-12 border-b border-arknights-border pb-4">
        <h2 className="text-3xl font-bold text-white tracking-wider">ARCHIVES <span className="text-arknights-accent">/ TECHNOCLINIQUE</span></h2>
        <p className="text-arknights-textMuted font-mono text-sm mt-2">{'>'} MÉMOIRES HUTECH & SCIENCES HUMAINES ET SOCIALES</p>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-8 text-center">
        {/* Petits compteurs en haut */}
        <div className="bg-arknights-surface border border-arknights-border p-4">
          <div className="text-2xl font-bold text-white">4</div>
          <div className="text-[10px] text-arknights-textMuted font-mono">MÉMOIRES</div>
        </div>
        <div className="bg-arknights-surface border border-arknights-border p-4">
          <div className="text-2xl font-bold text-white">1</div>
          <div className="text-[10px] text-arknights-textMuted font-mono">CONFÉRENCE</div>
        </div>
        <div className="bg-arknights-surface border border-arknights-border p-4">
          <div className="text-2xl font-bold text-white">4</div>
          <div className="text-[10px] text-arknights-textMuted font-mono">RAPPORTS TECHNIQUES</div>
        </div>
        <div className="bg-arknights-surface border border-arknights-border p-4">
          <div className="text-2xl font-bold text-arknights-accent">∞</div>
          <div className="text-[10px] text-arknights-textMuted font-mono">BIBLIOGRAPHIE</div>
        </div>
      </div>

      <div className="space-y-8">
        {archives.map((doc) => (
          <motion.div 
            key={doc.id}
            variants={{ hidden: { opacity: 0, scale: 0.98 }, show: { opacity: 1, scale: 1 } }}
            className="bg-arknights-bg border border-arknights-border relative"
          >
            {/* Ligne décorative à gauche */}
            <div className="absolute top-0 left-0 w-1 h-full bg-arknights-border"></div>

            <div className="p-8 pl-12">
              <div className="flex items-center gap-3 mb-6 border-b border-arknights-border/50 pb-4">
                <BookOpen className="w-5 h-5 text-arknights-accent" />
                <div>
                  <span className="font-mono text-xs text-arknights-textMuted">[{doc.id}] - {doc.type}</span>
                  <h3 className="text-xl font-bold text-white">{doc.title}</h3>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <h4 className="flex items-center gap-2 text-xs font-mono text-white mb-2">
                    <Target className="w-4 h-4 text-arknights-textMuted" /> POURQUOI ?
                  </h4>
                  <p className="text-sm text-gray-400">{doc.why}</p>
                </div>
                <div>
                  <h4 className="flex items-center gap-2 text-xs font-mono text-white mb-2">
                    <BrainCircuit className="w-4 h-4 text-arknights-textMuted" /> COMMENT ?
                  </h4>
                  <p className="text-sm text-gray-400">{doc.how}</p>
                </div>
                <div>
                  <h4 className="flex items-center gap-2 text-xs font-mono text-arknights-accent mb-2">
                    <Lightbulb className="w-4 h-4" /> RÉSULTAT & ACQUIS
                  </h4>
                  <p className="text-sm text-gray-300">{doc.learnings}</p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};