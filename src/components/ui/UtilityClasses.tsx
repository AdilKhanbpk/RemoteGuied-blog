'use client';

import { useEffect } from 'react';

// Utility classes moved from globals.css
const utilityClasses = `
/* Background utilities */
.bg-background { background-color: hsl(var(--background)); }
.bg-background-alt { background-color: hsl(var(--background-alt)); }
.bg-background-subtle { background-color: hsl(var(--background-subtle)); }
.bg-foreground { background-color: hsl(var(--foreground)); }
.bg-muted { background-color: hsl(var(--muted)); }
.bg-accent { background-color: hsl(var(--accent)); }
.bg-primary { background-color: hsl(var(--primary)); }
.bg-secondary { background-color: hsl(var(--secondary)); }
.bg-card { background-color: hsl(var(--card)); }
.bg-popover { background-color: hsl(var(--popover)); }
.bg-destructive { background-color: hsl(var(--destructive)); }

/* Text utilities */
.text-foreground { color: hsl(var(--foreground)); }
.text-background { color: hsl(var(--background)); }
.text-muted-foreground { color: hsl(var(--muted-foreground)); }
.text-accent-foreground { color: hsl(var(--accent-foreground)); }
.text-primary { color: hsl(var(--primary)); }
.text-primary-foreground { color: hsl(var(--primary-foreground)); }
.text-secondary-foreground { color: hsl(var(--secondary-foreground)); }
.text-card-foreground { color: hsl(var(--card-foreground)); }
.text-popover-foreground { color: hsl(var(--popover-foreground)); }
.text-destructive { color: hsl(var(--destructive)); }
.text-destructive-foreground { color: hsl(var(--destructive-foreground)); }
.text-content-primary { color: hsl(var(--content-primary)); }
.text-content-secondary { color: hsl(var(--content-secondary)); }
.text-content-body { color: hsl(var(--content-body)); }
.text-content-caption { color: hsl(var(--content-caption)); }

/* Border utilities */
.border-border { border-color: hsl(var(--border)); }
.border-input { border-color: hsl(var(--input)); }
.border-ring { border-color: hsl(var(--ring)); }
.border-primary { border-color: hsl(var(--primary)); }
.border-secondary { border-color: hsl(var(--secondary)); }
.border-muted { border-color: hsl(var(--muted)); }
.border-accent { border-color: hsl(var(--accent)); }
.border-destructive { border-color: hsl(var(--destructive)); }

/* Ring utilities */
.ring-ring { --tw-ring-color: hsl(var(--ring)); }
.ring-offset-background { --tw-ring-offset-color: hsl(var(--background)); }

/* Legacy Card Styles for Compatibility */
.card {
  background: hsl(var(--card));
  border: 1px solid hsl(var(--border));
  border-radius: 0.75rem;
  padding: 1.5rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;
}

.card:hover {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

/* Gradient Classes */
.gradient-hero {
  background: var(--gradient-hero);
}

.gradient-cta {
  background: var(--gradient-cta);
}

.gradient-card {
  background: var(--gradient-card);
}

/* Layout Classes */
.section-padding {
  padding-top: 1.125rem;  /* 18px (was 48px - 30px = 18px) */
  padding-bottom: 1.125rem;
}

@media (min-width: 768px) {
  .section-padding {
    padding-top: 2.125rem;  /* 34px (was 64px - 30px = 34px) */
    padding-bottom: 2.125rem;
  }
}

@media (min-width: 1024px) {
  .section-padding {
    padding-top: 4.125rem;  /* 66px (was 96px - 30px = 66px) */
    padding-bottom: 4.125rem;
  }
}

.container-content {
  margin-left: auto;
  margin-right: auto;
  max-width: 82rem;
  padding-left: 1.5rem;  /* 24px - Better padding for mobile */
  padding-right: 1.5rem;
}

@media (min-width: 640px) {
  .container-content {
    padding-left: 2rem;  /* 32px - Better padding for small screens */
    padding-right: 2rem;
  }
}

@media (min-width: 1024px) {
  .container-content {
    padding-left: 2.5rem;  /* 40px - Better padding for large screens */
    padding-right: 2.5rem;
  }
}
`;

const UtilityClasses: React.FC = () => {
  useEffect(() => {
    const styleId = 'utility-classes';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = utilityClasses;
      document.head.appendChild(style);
    }
  }, []);

  return null; // This component doesn't render anything
};

export default UtilityClasses;
