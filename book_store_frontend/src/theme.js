export const theme = {
  // Ocean Professional with amber accents
  colors: {
    primary: '#2563EB', // blue
    secondary: '#F59E0B', // amber
    success: '#10B981',
    error: '#EF4444',
    background: '#f9fafb',
    surface: '#ffffff',
    text: '#111827',
    mutedText: '#6B7280',
    border: '#E5E7EB',
    shadow: 'rgba(0,0,0,0.08)'
  },
  radii: {
    sm: '6px',
    md: '10px',
    lg: '14px',
    xl: '18px'
  },
  shadow: {
    sm: '0 1px 2px rgba(0,0,0,0.04)',
    md: '0 6px 20px rgba(17,24,39,0.08)',
    lg: '0 20px 40px rgba(17,24,39,0.12)'
  },
  spacing(px) {
    return `${px}px`;
  },
  transition: 'all 200ms ease'
};
