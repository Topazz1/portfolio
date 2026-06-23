import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface LoaderProps {
  onComplete: () => void;
}

export const Loader = ({ onComplete }: LoaderProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simule un faux chargement de données
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 600); // Laisse l'écran à 100% un court instant
          return 100;
        }
        return prev + Math.floor(Math.random() * 20) + 5;
      });
    }, 150);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      // Le loader disparaît vers le haut à la fin
      exit={{ y: '-100%', opacity: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-arknights-bg text-arknights-textMuted font-mono"
    >
      <div className="w-64 space-y-4">
        <div className="flex justify-between text-xs tracking-widest">
          <span>SYS.BOOT_SEQUENCE</span>
          <span className="text-arknights-accent">{progress}%</span>
        </div>
        
        {/* Barre de chargement type HUD */}
        <div className="h-[2px] w-full bg-arknights-border relative overflow-hidden">
          <motion.div 
            className="absolute top-0 left-0 h-full bg-arknights-accent"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.2 }}
          />
        </div>

        <div className="text-[10px] text-gray-600 uppercase">
          {progress < 100 ? '> Initialisation des modules...' : '> Accès autorisé'}
        </div>
      </div>
    </motion.div>
  );
};