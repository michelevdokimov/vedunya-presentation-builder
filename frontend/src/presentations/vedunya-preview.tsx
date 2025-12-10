import { CSSProperties, ReactNode } from 'react';

// Brand colors (same as in vedunya-product.tsx)
const brandColors = {
  black: '#050505',
  dark: '#121212',
  panel: '#1A1A1A',
  mint: '#00FF9D',
  forest: '#1B4D3E',
  white: '#FFFFFF',
  gray: '#B0B0B0',
};

// Noise Overlay for texture
const NoiseOverlay = () => (
  <div
    style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.03'/%3E%3C/svg%3E")`,
      pointerEvents: 'none',
      zIndex: 1,
    }}
  />
);

// Radial Glow Background
const RadialGlow = ({
  color,
  position = 'center',
  size = '60%',
  opacity = 0.15
}: {
  color: string;
  position?: string;
  size?: string;
  opacity?: number;
}) => (
  <div
    style={{
      position: 'absolute',
      inset: 0,
      background: `radial-gradient(circle at ${position}, ${color}${Math.round(opacity * 255).toString(16).padStart(2, '0')} 0%, transparent ${size})`,
      zIndex: 0,
    }}
  />
);

// Gradient Text Component
const GradientText = ({
  children,
  from = brandColors.white,
  to = brandColors.mint,
  style = {}
}: {
  children: ReactNode;
  from?: string;
  to?: string;
  style?: CSSProperties;
}) => (
  <span
    style={{
      background: `linear-gradient(135deg, ${from} 30%, ${to} 100%)`,
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      ...style,
    }}
  >
    {children}
  </span>
);

/**
 * Slide 1 Preview - standalone component without Spectacle dependencies
 * Used for presentation card preview in the list view
 * NOTE: This version fills the entire preview area without SlideFrame padding
 */
export function Slide1TitlePreview() {
  return (
    <div
      style={{
        position: 'relative',
        width: 1920,
        height: 1080,
        backgroundColor: brandColors.black,
        fontFamily: '"Inter", "Helvetica Neue", Helvetica, Arial, sans-serif',
        overflow: 'hidden',
        borderRadius: 24,
      }}
    >
      <NoiseOverlay />
      <RadialGlow color={brandColors.forest} position="0% 50%" size="50%" opacity={0.4} />
      <RadialGlow color={brandColors.mint} position="100% 100%" size="60%" opacity={0.05} />

      <div style={{
        width: '100%',
        maxWidth: 1600,
        margin: '0 auto',
        padding: '60px 80px',
        display: 'grid',
        gridTemplateColumns: '5fr 7fr',
        gap: 60,
        alignItems: 'center',
        height: '100%',
        position: 'relative',
        zIndex: 10,
        boxSizing: 'border-box',
      }}>
        {/* Left Column */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginBottom: 40 }}>
            <img
              src="/Vedunya_presentation/images/logo.png"
              alt="Vedunya Logo"
              style={{ width: 96, height: 96 }}
            />
            <span style={{ fontSize: 56, fontWeight: 'bold', color: brandColors.white }}>Ведунья</span>
          </div>

          {/* Main Title */}
          <h1 style={{
            fontSize: 48,
            fontWeight: 800,
            lineHeight: 1.15,
            color: brandColors.white,
            margin: 0,
          }}>
            <GradientText>
              единый центр<br />
              корпоративного<br />
              интеллекта
            </GradientText>
          </h1>

          {/* Subtitle */}
          <p style={{
            fontSize: 20,
            fontWeight: 300,
            lineHeight: 1.6,
            color: brandColors.white,
            margin: 0,
            marginTop: 32,
          }}>
            автоматизирует и ускоряет работу сотрудников,<br />
            работает в <span style={{ color: brandColors.mint, fontWeight: 400 }}>защищённом контуре</span><br />
            и соответствует федеральным законам
          </p>
        </div>

        {/* Right Column - Interface Screenshot */}
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: brandColors.mint,
            opacity: 0.1,
            filter: 'blur(80px)',
            borderRadius: '50%',
            transform: 'translateX(40px)',
          }} />

          <div style={{ width: '100%' }}>
            <img
              src="/Vedunya_presentation/images/slide_1_presentation.png"
              alt="Vedunya Interface"
              style={{
                width: '100%',
                borderRadius: '12px',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
