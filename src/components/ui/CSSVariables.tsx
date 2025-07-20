'use client';

import { useEffect } from 'react';

// CSS Variables moved from globals.css
const cssVariables = `
:root {
    /* Primary Brand Colors */
    --primary: 221 83% 53%;         /* Professional Blue #3b82f6 */
    --primary-foreground: 0 0% 100%;
    --primary-light: 221 91% 91%;   /* Light blue tint */
    --primary-dark: 221 83% 43%;    /* Darker blue */

    /* Background System */
    --background: 0 0% 100%;         /* Pure white */
    --background-alt: 220 14% 96%;   /* Subtle gray #f9fafb */
    --background-subtle: 220 13% 91%; /* Light gray sections */
    --foreground: 222 47% 11%;       /* Near black text */

    /* Content Colors */
    --muted: 220 14% 96%;           /* Light backgrounds */
    --muted-foreground: 220 9% 46%; /* Subtle text #6b7280 */
    --accent: 221 83% 53%;          /* Same as primary */
    --accent-foreground: 0 0% 100%;

    /* Semantic Colors */
    --success: 142 71% 45%;         /* Green #10b981 */
    --success-foreground: 0 0% 100%;
    --warning: 32 95% 44%;          /* Amber #f59e0b */
    --warning-foreground: 0 0% 100%;
    --destructive: 0 84% 60%;       /* Red #ef4444 */
    --destructive-foreground: 0 0% 100%;

    /* UI Elements */
    --card: 0 0% 100%;
    --card-foreground: 222 47% 11%;
    --border: 220 13% 91%;          /* Subtle borders */
    --input: 220 13% 91%;
    --ring: 221 83% 53%;            /* Focus rings */

    /* Content Hierarchy */
    --content-primary: 222 47% 11%;    /* Main headings */
    --content-secondary: 215 25% 27%;  /* Subheadings #374151 */
    --content-body: 220 9% 46%;        /* Body text #6b7280 */
    --content-caption: 220 9% 60%;     /* Meta text, captions */

    /* Gradients */
    --gradient-hero: linear-gradient(135deg, hsl(221 91% 91%) 0%, hsl(226 100% 94%) 100%);
    --gradient-card: linear-gradient(145deg, hsl(0 0% 100%) 0%, hsl(220 14% 98%) 100%);
    --gradient-cta: linear-gradient(135deg, hsl(221 83% 53%) 0%, hsl(221 83% 48%) 100%);

    /* Shadows */
    --shadow-sm: 0 1px 2px 0 hsl(220 13% 91% / 0.05);
    --shadow-md: 0 4px 6px -1px hsl(220 13% 91% / 0.1), 0 2px 4px -1px hsl(220 13% 91% / 0.06);
    --shadow-lg: 0 10px 15px -3px hsl(220 13% 91% / 0.1), 0 4px 6px -2px hsl(220 13% 91% / 0.05);
    --shadow-xl: 0 20px 25px -5px hsl(220 13% 91% / 0.1), 0 10px 10px -5px hsl(220 13% 91% / 0.04);
    --shadow-card: 0 4px 20px -2px hsl(221 83% 53% / 0.08);
    --shadow-button: 0 4px 14px 0 hsl(221 83% 53% / 0.25);

    /* Spacing Scale */
    --space-xs: 0.25rem;    /* 4px */
    --space-sm: 0.5rem;     /* 8px */
    --space-md: 1rem;       /* 16px */
    --space-lg: 1.5rem;     /* 24px */
    --space-xl: 2rem;       /* 32px */
    --space-2xl: 3rem;      /* 48px */
    --space-3xl: 4rem;      /* 64px */

    /* Typography Scale */
    --text-xs: 0.75rem;     /* 12px */
    --text-sm: 0.875rem;    /* 14px */
    --text-base: 1rem;      /* 16px */
    --text-lg: 1.125rem;    /* 18px */
    --text-xl: 1.25rem;     /* 20px */
    --text-2xl: 1.5rem;     /* 24px */
    --text-3xl: 1.875rem;   /* 30px */
    --text-4xl: 2.25rem;    /* 36px */
    --text-5xl: 3rem;       /* 48px */
    --text-6xl: 3.75rem;    /* 60px */

    /* Animation Timing */
    --transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1);
    --transition-normal: 300ms cubic-bezier(0.4, 0, 0.2, 1);
    --transition-slow: 500ms cubic-bezier(0.4, 0, 0.2, 1);

    --radius: 0.75rem;
    --radius-sm: 0.5rem;
    --radius-lg: 1rem;
    --radius-xl: 1.5rem;

    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;

    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;

    --primary: 222.2 47.4% 11.2%;
    --primary-foreground: 210 40% 98%;

    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222.2 47.4% 11.2%;

    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;

    --accent: 210 40% 96.1%;
    --accent-foreground: 222.2 47.4% 11.2%;

    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;

    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 222.2 84% 4.9%;

    --radius: 0.5rem;

    --sidebar-background: 0 0% 98%;
    --sidebar-foreground: 240 5.3% 26.1%;
    --sidebar-primary: 240 5.9% 10%;
    --sidebar-primary-foreground: 0 0% 98%;
    --sidebar-accent: 240 4.8% 95.9%;
    --sidebar-accent-foreground: 240 5.9% 10%;
    --sidebar-border: 220 13% 91%;
    --sidebar-ring: 217.2 91.2% 59.8%;
}

.dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;

    --card: 222.2 84% 4.9%;
    --card-foreground: 210 40% 98%;

    --popover: 222.2 84% 4.9%;
    --popover-foreground: 210 40% 98%;

    --primary: 210 40% 98%;
    --primary-foreground: 222.2 47.4% 11.2%;

    --secondary: 217.2 32.6% 17.5%;
    --secondary-foreground: 210 40% 98%;

    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 215 20.2% 65.1%;

    --accent: 217.2 32.6% 17.5%;
    --accent-foreground: 210 40% 98%;

    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 40% 98%;

    --border: 217.2 32.6% 17.5%;
    --input: 217.2 32.6% 17.5%;
    --ring: 212.7 26.8% 83.9%;
    --sidebar-background: 240 5.9% 10%;
    --sidebar-foreground: 240 4.8% 95.9%;
    --sidebar-primary: 224.3 76.3% 48%;
    --sidebar-primary-foreground: 0 0% 100%;
    --sidebar-accent: 240 3.7% 15.9%;
    --sidebar-accent-foreground: 240 4.8% 95.9%;
    --sidebar-border: 240 3.7% 15.9%;
    --sidebar-ring: 217.2 91.2% 59.8%;
}
`;

const CSSVariables: React.FC = () => {
  useEffect(() => {
    const styleId = 'css-variables';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = cssVariables;
      document.head.appendChild(style);
    }
  }, []);

  return null; // This component doesn't render anything
};

export default CSSVariables;
