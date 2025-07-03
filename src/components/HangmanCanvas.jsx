import React from 'react';

const HangmanCanvas = ({ wrongGuessCount }) => {
  // Her parça için görünürlük kontrolü
  const isVisible = (index) => wrongGuessCount > index ? 'opacity-100' : 'opacity-0';

  return (
    <svg height="250" width="200" className="stroke-black stroke-[4px] fill-none">
      {/* Direk ve ip - sabit */}
      <line x1="10" y1="240" x2="150" y2="240" className="transition-all" /> {/* Zemin */}
      <line x1="40" y1="20" x2="40" y2="240" className="transition-all" />   {/* Dikey direk */}
      <line x1="40" y1="20" x2="120" y2="20" className="transition-all" />    {/* Üst çizgi */}
      <line x1="120" y1="20" x2="120" y2="50" className="transition-all" />   {/* İp */}

      {/* Kafa */}
      <circle cx="120" cy="70" r="20"
        className={`transition-all duration-500 ${isVisible(0)}`} />

      {/* Gövde */}
      <line x1="120" y1="90" x2="120" y2="150"
        className={`transition-all duration-500 ${isVisible(1)}`} />

      {/* Sol Kol */}
      <line x1="120" y1="100" x2="90" y2="130"
        className={`transition-all duration-500 ${isVisible(2)}`} />

      {/* Sağ Kol */}
      <line x1="120" y1="100" x2="150" y2="130"
        className={`transition-all duration-500 ${isVisible(3)}`} />

      {/* Sol Bacak */}
      <line x1="120" y1="150" x2="90" y2="180"
        className={`transition-all duration-500 ${isVisible(4)}`} />

      {/* Sağ Bacak */}
      <line x1="120" y1="150" x2="150" y2="180"
        className={`transition-all duration-500 ${isVisible(5)}`} />
    </svg>
  );
};

export default HangmanCanvas;
