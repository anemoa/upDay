import React from 'react';

function SpeechBubble({ text, position }) {
  return (
    <div className={`relative max-w-[30rem] h-auto p-4 sm:p-6 rounded-3xl bg-white shadow-lg ${position === 'right' ? 'ml-auto' : ''}`}>
      <p className="text-sm sm:text-lg font-bold text-neutral-800 text-center leading-snug whitespace-nowrap overflow-hidden text-ellipsis">
        {text}
      </p>
    </div>
  );
}

export default SpeechBubble;



