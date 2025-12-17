// Epic Games Style - Simple dark background
const CommonBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 bg-[#121212]">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#121212] via-[#1a1a1a] to-[#121212]" />
    </div>
  );
};

export default CommonBackground;
