// Color tokens resolve to CSS variables defined in theme.css, so flipping
// <html data-theme="dark"> live re-themes every component. See useColorMode.js.
const theme = {
  color: {
    background: 'var(--color-background)',
    surface: 'var(--color-surface)',
    surfaceAlt: 'var(--color-surface-alt)',
    text: {
      primary: 'var(--color-text-primary)',
      secondary: 'var(--color-text-secondary)',
      heading: 'var(--color-text-heading)',
    },
    border: {
      primary: 'var(--color-border-primary)',
      secondary: 'var(--color-border-secondary)',
    },
    accent: {
      default: 'var(--color-accent)',
      background: 'var(--color-accent-bg)',
      border: 'var(--color-accent-border)',
    },
    code: {
      background: 'var(--color-code-bg)',
    },
    // Retained so existing components (BackButton, DetailChip, home node cards)
    // keep a valid token; removed when Home is rebuilt (Phase 8).
    social: {
      background: 'var(--color-social-bg)',
    },
    link: {
      default: 'var(--color-link)',
      hover: 'var(--color-link-hover)',
    },
    shadow: 'var(--shadow)',
  },

  font: {
    family: {
      body: "'Open Sans', 'Roboto', sans-serif",
      heading: "'Roboto', 'Open Sans', sans-serif",
      ui: "'Lato', 'Open Sans', sans-serif",
      mono: 'ui-monospace, Consolas, monospace',
    },
    size: {
      xs: '12px',
      sm: '14px',
      body: '16px',
      md: '18px',
      lg: '24px',
      xl: '36px',
      xxl: '56px',
      logo: '1.1rem',
    },
    weight: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    lineHeight: {
      tight: '118%',
      body: '145%',
      code: '135%',
    },
  },

  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px',
  },

  layout: {
    headerHeight: '56px',
    sidebarWidth: '220px',
    borderWidth: '2px',
    borderRadius: {
      sm: '4px',
      md: '6px',
      lg: '8px',
    },
  },
}

export default theme
