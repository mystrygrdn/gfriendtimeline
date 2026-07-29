export default function Starfield({ className = "" }: { className?: string }) {
  // Generate posisi bintang secara deterministik biar konsisten tiap render
  const stars = Array.from({ length: 80 }, (_, i) => {
    const seed = i * 137.5;
    return {
      left: `${(seed % 100).toFixed(2)}%`,
      top: `${((seed * 1.618) % 100).toFixed(2)}%`,
      size: (i % 3 === 0 ? 2 : 1) + "px",
      delay: `${(i % 5) * 0.6}s`,
      duration: `${3 + (i % 4)}s`,
    };
  });

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {stars.map((star, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-cloud/60 animate-twinkle"
          style={{
            left: star.left,
            top: star.top,
            width: star.size,
            height: star.size,
            animationDelay: star.delay,
            animationDuration: star.duration,
          }}
        />
      ))}
    </div>
  );
}