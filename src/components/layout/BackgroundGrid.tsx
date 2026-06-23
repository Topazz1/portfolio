export const BackgroundGrid = () => {
  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none">
      {/* Grille principale */}
      <div className="absolute inset-0 bg-grid opacity-50 mask-image-linear-gradient"></div>
      
      {/* Vignetage (assombrit légèrement les bords pour centrer l'attention) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#0d0f12_100%)] opacity-80"></div>
    </div>
  );
};