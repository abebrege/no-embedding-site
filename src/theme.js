const theme = {
  color: {
    background: '#0b0f1a',
    surface: '#121826',
    surfaceAlt: '#0f141f',
    text: {
      primary: '#e6e9f0',
      secondary: '#9aa3b2',
      heading: '#f5f7fa',
    },
    border: {
      primary: '#2a3346',
      secondary: '#1c2433',
    },
    accent: {
      default: '#3b82f6',
      background: 'rgba(59, 130, 246, 0.12)',
      border: 'rgba(59, 130, 246, 0.5)',
    },
    code: {
      background: '#0f141f',
    },
    // Retained so existing components (BackButton, DetailChip, home node cards)
    // keep a valid token; removed when Home is rebuilt (Phase 8).
    social: {
      background: '#121826',
    },
    link: {
      default: '#7aa2ff',
      hover: '#a9c2ff',
    },
    shadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5), 0 4px 6px -2px rgba(0, 0, 0, 0.4)',
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
