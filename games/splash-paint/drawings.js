export const COLOR_PAGES = [
  {
    title: 'Sun',
    emoji: '☀️',
    regions: [
      'M 20 4 H 180 Q 196 4 196 20 V 180 Q 196 196 180 196 H 20 Q 4 196 4 180 V 20 Q 4 4 20 4 Z',
      'M 100 47 A 48 48 0 1 1 99.9 47 Z',
      'M 100 73 A 22 22 0 1 1 99.9 73 Z',
    ],
    outline: `
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <rect x="4" y="4" width="192" height="192" rx="16" fill="none" stroke="#333" stroke-width="3"/>
        <circle cx="100" cy="95" r="48" fill="none" stroke="#333" stroke-width="4"/>
        <circle cx="100" cy="95" r="22" fill="none" stroke="#333" stroke-width="3"/>
      </svg>`,
  },
  {
    title: 'Car',
    emoji: '🚗',
    regions: [
      'M 20 4 H 180 Q 196 4 196 20 V 180 Q 196 196 180 196 H 20 Q 4 196 4 180 V 20 Q 4 4 20 4 Z',
      'M 47 95 H 153 Q 167 95 167 107 V 128 Q 167 140 153 140 H 47 Q 35 140 35 128 V 107 Q 35 95 47 95 Z',
      'M 78 72 H 122 Q 130 72 130 80 V 99 Q 130 107 122 107 H 78 Q 70 107 70 99 V 80 Q 70 72 78 72 Z',
      'M 65 145 m -18 0 a 18 18 0 1 0 36 0 a 18 18 0 1 0 -36 0',
      'M 135 145 m -18 0 a 18 18 0 1 0 36 0 a 18 18 0 1 0 -36 0',
    ],
    outline: `
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <rect x="4" y="4" width="192" height="192" rx="16" fill="none" stroke="#333" stroke-width="3"/>
        <rect x="35" y="95" width="130" height="45" rx="12" fill="none" stroke="#333" stroke-width="4"/>
        <rect x="70" y="72" width="60" height="35" rx="8" fill="none" stroke="#333" stroke-width="3"/>
        <circle cx="65" cy="145" r="18" fill="none" stroke="#333" stroke-width="4"/>
        <circle cx="135" cy="145" r="18" fill="none" stroke="#333" stroke-width="4"/>
      </svg>`,
  },
  {
    title: 'Fish',
    emoji: '🐠',
    regions: [
      'M 20 4 H 180 Q 196 4 196 20 V 180 Q 196 196 180 196 H 20 Q 4 196 4 180 V 20 Q 4 4 20 4 Z',
      'M 40 100 m -55 0 a 55 38 0 1 0 110 0 a 55 38 0 1 0 -110 0',
      'M 150 100 L 185 70 L 185 130 Z',
      'M 70 90 m -10 0 a 10 10 0 1 0 20 0 a 10 10 0 1 0 -20 0',
    ],
    outline: `
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <rect x="4" y="4" width="192" height="192" rx="16" fill="none" stroke="#333" stroke-width="3"/>
        <ellipse cx="95" cy="100" rx="55" ry="38" fill="none" stroke="#333" stroke-width="4"/>
        <polygon points="150,100 185,70 185,130" fill="none" stroke="#333" stroke-width="3"/>
        <circle cx="70" cy="90" r="10" fill="none" stroke="#333" stroke-width="3"/>
      </svg>`,
  },
  {
    title: 'House',
    emoji: '🏠',
    regions: [
      'M 20 4 H 180 Q 196 4 196 20 V 180 Q 196 196 180 196 H 20 Q 4 196 4 180 V 20 Q 4 4 20 4 Z',
      'M 100 35 L 170 95 L 30 95 Z',
      'M 55 95 H 145 V 170 H 55 Z',
      'M 85 120 H 115 V 170 H 85 Z',
      'M 65 108 H 93 V 136 H 65 Z',
    ],
    outline: `
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <rect x="4" y="4" width="192" height="192" rx="16" fill="none" stroke="#333" stroke-width="3"/>
        <polygon points="100,35 170,95 30,95" fill="none" stroke="#333" stroke-width="4"/>
        <rect x="55" y="95" width="90" height="75" fill="none" stroke="#333" stroke-width="4"/>
        <rect x="85" y="120" width="30" height="50" fill="none" stroke="#333" stroke-width="3"/>
        <rect x="65" y="108" width="28" height="28" fill="none" stroke="#333" stroke-width="3"/>
      </svg>`,
  },
  {
    title: 'Flower',
    emoji: '🌸',
    regions: [
      'M 20 4 H 180 Q 196 4 196 20 V 180 Q 196 196 180 196 H 20 Q 4 196 4 180 V 20 Q 4 4 20 4 Z',
      'M 100 88 m -22 0 a 22 22 0 1 0 44 0 a 22 22 0 1 0 -44 0',
      'M 100 50 m -20 0 a 20 20 0 1 0 40 0 a 20 20 0 1 0 -40 0',
      'M 132 72 m -20 0 a 20 20 0 1 0 40 0 a 20 20 0 1 0 -40 0',
      'M 132 104 m -20 0 a 20 20 0 1 0 40 0 a 20 20 0 1 0 -40 0',
      'M 100 126 m -20 0 a 20 20 0 1 0 40 0 a 20 20 0 1 0 -40 0',
      'M 68 104 m -20 0 a 20 20 0 1 0 40 0 a 20 20 0 1 0 -40 0',
      'M 68 72 m -20 0 a 20 20 0 1 0 40 0 a 20 20 0 1 0 -40 0',
      'M 94 110 H 106 V 170 H 94 Z',
    ],
    outline: `
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <rect x="4" y="4" width="192" height="192" rx="16" fill="none" stroke="#333" stroke-width="3"/>
        <circle cx="100" cy="88" r="22" fill="none" stroke="#333" stroke-width="3"/>
        <circle cx="100" cy="50" r="20" fill="none" stroke="#333" stroke-width="3"/>
        <circle cx="132" cy="72" r="20" fill="none" stroke="#333" stroke-width="3"/>
        <circle cx="132" cy="104" r="20" fill="none" stroke="#333" stroke-width="3"/>
        <circle cx="100" cy="126" r="20" fill="none" stroke="#333" stroke-width="3"/>
        <circle cx="68" cy="104" r="20" fill="none" stroke="#333" stroke-width="3"/>
        <circle cx="68" cy="72" r="20" fill="none" stroke="#333" stroke-width="3"/>
        <rect x="94" y="110" width="12" height="60" fill="none" stroke="#333" stroke-width="3"/>
      </svg>`,
  },
  {
    title: 'Butterfly',
    emoji: '🦋',
    regions: [
      'M 20 4 H 180 Q 196 4 196 20 V 180 Q 196 196 180 196 H 20 Q 4 196 4 180 V 20 Q 4 4 20 4 Z',
      'M 70 90 m -38 0 a 38 48 0 1 0 76 0 a 38 48 0 1 0 -76 0',
      'M 130 90 m -38 0 a 38 48 0 1 0 76 0 a 38 48 0 1 0 -76 0',
      'M 62 135 m -22 0 a 22 28 0 1 0 44 0 a 22 28 0 1 0 -44 0',
      'M 138 135 m -22 0 a 22 28 0 1 0 44 0 a 22 28 0 1 0 -44 0',
      'M 96 55 H 104 V 145 H 96 Z',
    ],
    outline: `
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <rect x="4" y="4" width="192" height="192" rx="16" fill="none" stroke="#333" stroke-width="3"/>
        <ellipse cx="70" cy="90" rx="38" ry="48" fill="none" stroke="#333" stroke-width="4"/>
        <ellipse cx="130" cy="90" rx="38" ry="48" fill="none" stroke="#333" stroke-width="4"/>
        <ellipse cx="62" cy="135" rx="22" ry="28" fill="none" stroke="#333" stroke-width="3"/>
        <ellipse cx="138" cy="135" rx="22" ry="28" fill="none" stroke="#333" stroke-width="3"/>
        <rect x="96" y="55" width="8" height="90" rx="4" fill="none" stroke="#333" stroke-width="3"/>
      </svg>`,
  },
  {
    title: 'Balloon',
    emoji: '🎈',
    regions: [
      'M 20 4 H 180 Q 196 4 196 20 V 180 Q 196 196 180 196 H 20 Q 4 196 4 180 V 20 Q 4 4 20 4 Z',
      'M 75 85 m -32 0 a 32 40 0 1 0 64 0 a 32 40 0 1 0 -64 0',
      'M 125 95 m -28 0 a 28 36 0 1 0 56 0 a 28 36 0 1 0 -56 0',
    ],
    outline: `
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <rect x="4" y="4" width="192" height="192" rx="16" fill="none" stroke="#333" stroke-width="3"/>
        <ellipse cx="75" cy="85" rx="32" ry="40" fill="none" stroke="#333" stroke-width="4"/>
        <ellipse cx="125" cy="95" rx="28" ry="36" fill="none" stroke="#333" stroke-width="4"/>
        <path d="M75 125 Q80 150 85 170" fill="none" stroke="#333" stroke-width="3"/>
        <path d="M125 131 Q120 155 115 175" fill="none" stroke="#333" stroke-width="3"/>
      </svg>`,
  },
]
