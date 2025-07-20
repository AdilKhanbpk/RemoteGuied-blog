'use client';

import { useEffect } from 'react';

// Animation classes moved from globals.css
const animationClasses = `
/* Animation Classes */
@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

.animate-fade-in-up {
  animation: fade-in-up 0.6s ease-out;
}

.animate-fade-in {
  animation: fade-in 0.6s ease-out;
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}
`;

const AnimationClasses: React.FC = () => {
  useEffect(() => {
    const styleId = 'animation-classes';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = animationClasses;
      document.head.appendChild(style);
    }
  }, []);

  return null; // This component doesn't render anything
};

export default AnimationClasses;
