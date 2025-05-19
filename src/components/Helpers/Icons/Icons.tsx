import React from 'react';

interface IconProps {
  type: 'next' | 'prev';
  className?: string;
}

const Icon: React.FC<IconProps> = ({ type, className }) => {
  const icons = {
    next: (
      <svg 
        width="10" 
        height="14" 
        viewBox="0 0 10 14" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <path 
          d="M1.50012 0.750001L7.75012 7L1.50012 13.25" 
          stroke="currentColor" 
          strokeWidth="2"
        />
      </svg>
    ),
    prev: (
      <svg 
        width="10" 
        height="14" 
        viewBox="0 0 10 14" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <path 
          d="M8.49988 0.750001L2.24988 7L8.49988 13.25" 
          stroke="currentColor" 
          strokeWidth="2"
        />
      </svg>
    )
  };

  return icons[type];
};

export default Icon;
