import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Mail, X } from 'lucide-react';

export const ContactWidget = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="absolute bottom-16 right-0 mb-4 w-72 bg-arknights-surface border border-arknights-border p-4 shadow-2xl"
          >
            <div className="flex justify-between items-center border-b border-arknights-border pb-2 mb-4">
              <span className="text-xs font-mono text-arknights-accent">[ CANAL DE COMMUNICATION ]</span>
              <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <div className="space-y-4">
              <p className="text-sm text-gray-300">
                <strong className="text-white">Tom Padovani</strong><br/>
                Développeur Freelance & Ingénieur. Disponible pour de nouvelles missions.
              </p>
              
              <a href="mailto:tom.padovani@outlook.com" className="flex items-center gap-3 p-2 border border-arknights-border hover:border-arknights-accent transition-colors group cursor-pointer text-sm text-gray-400 hover:text-white">
                <Mail className="w-4 h-4 text-arknights-accent" />
                <span>Initialiser_Contact</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Le bouton flottant (HUD) */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-12 h-12 bg-arknights-surface border border-arknights-border hover:border-arknights-accent hover:text-arknights-accent transition-all text-white relative group"
      >
        {/* Effet radar derrière le bouton */}
        <span className="absolute inset-0 bg-arknights-accent/20 animate-ping opacity-0 group-hover:opacity-100 transition-opacity"></span>
        <MessageSquare className="w-5 h-5 relative z-10" />
      </button>
    </div>
  );
};