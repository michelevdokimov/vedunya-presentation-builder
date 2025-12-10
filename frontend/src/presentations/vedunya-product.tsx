import { Deck, Slide } from 'spectacle';
import { useState, useEffect, CSSProperties, ReactNode } from 'react';

// Presentation metadata
export const metadata = {
  id: 'vedunya-product',
  title: 'Ведунья — Корпоративный ИИ',
  description: 'Презентация продукта Ведунья: единый центр корпоративного интеллекта',
  slideCount: 7,
  createdAt: '2025-12-10',
  updatedAt: '2025-12-10',
};

// ===== THEME CONFIGURATION =====
const brandColors = {
  black: '#050505',
  dark: '#121212',
  panel: '#1A1A1A',
  mint: '#00FF9D',
  forest: '#1B4D3E',
  danger: '#FF4D4D',
  warning: '#FFBD2E',
  sky: '#38BDF8',
  cyan: '#22D3EE',
  purple: '#8B5CF6',
  amber: '#F59E0B',
  gray: '#B0B0B0',
  white: '#FFFFFF',
};

const theme = {
  size: {
    width: 1920,
    height: 1080,
  },
  colors: {
    primary: brandColors.mint,
    secondary: brandColors.forest,
    tertiary: brandColors.sky,
    background: brandColors.black,
    text: brandColors.white,
  },
  fonts: {
    header: '"Inter", "Helvetica Neue", Helvetica, Arial, sans-serif',
    text: '"Inter", "Helvetica Neue", Helvetica, Arial, sans-serif',
    mono: '"JetBrains Mono", monospace',
  },
  fontSizes: {
    h1: '72px',
    h2: '48px',
    h3: '36px',
    text: '24px',
  },
};

// ===== REUSABLE COMPONENTS =====

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

// Slide Frame with rounded corners and 16:9 aspect ratio
// Отступ 50px сверху и снизу, центрирован, скруглённые углы
const SlideFrame = ({ children }: { children: ReactNode }) => {
  // Высота = 100% - 100px (50px сверху + 50px снизу)
  // Ширина рассчитывается по соотношению 16:9
  return (
    <div
      style={{
        position: 'absolute',
        top: 50,
        bottom: 50,
        left: '50%',
        transform: 'translateX(-50%)',
        aspectRatio: '16 / 9',
        height: 'calc(100% - 100px)',
        maxWidth: 'calc((100% - 100px) * 16 / 9)', // Ограничиваем ширину при узком экране
        borderRadius: 24,
        overflow: 'hidden',
        backgroundColor: brandColors.black,
        border: `1px solid rgba(255, 255, 255, 0.1)`,
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
      }}
    >
      {/* Внутренний контейнер с относительным позиционированием для контента */}
      <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
        {children}
      </div>
    </div>
  );
};

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

// Glass Panel Card
const GlassCard = ({
  children,
  borderColor = 'rgba(255,255,255,0.1)',
  hoverBorderColor,
  style = {},
  highlighted = false,
}: {
  children: ReactNode;
  borderColor?: string;
  hoverBorderColor?: string;
  style?: CSSProperties;
  highlighted?: boolean;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        background: highlighted ? 'rgba(0, 255, 157, 0.03)' : 'rgba(255, 255, 255, 0.03)',
        backdropFilter: 'blur(10px)',
        border: `1px solid ${isHovered && hoverBorderColor ? hoverBorderColor : borderColor}`,
        borderRadius: '12px',
        padding: '24px',
        transition: 'all 0.3s ease',
        transform: isHovered ? 'translateY(-2px)' : 'none',
        ...style,
      }}
    >
      {children}
    </div>
  );
};

// Browser Mockup Window
const BrowserMockup = ({ children, url = 'chat.vedunya.ai/secure-session' }: { children: ReactNode; url?: string }) => (
  <div
    style={{
      width: '100%',
      borderRadius: '12px',
      backgroundColor: '#0f0f0f',
      border: `1px solid ${brandColors.forest}80`,
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
      overflow: 'hidden',
    }}
  >
    {/* Browser Header */}
    <div
      style={{
        height: '40px',
        backgroundColor: brandColors.panel,
        borderBottom: '1px solid #333',
        display: 'flex',
        alignItems: 'center',
        padding: '0 16px',
        gap: '8px',
      }}
    >
      <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#FF5F56' }} />
      <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#FFBD2E' }} />
      <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#27C93F' }} />
      {/* Address Bar */}
      <div
        style={{
          marginLeft: '16px',
          flex: 1,
          height: '24px',
          backgroundColor: '#000',
          borderRadius: '4px',
          border: '1px solid #333',
          display: 'flex',
          alignItems: 'center',
          padding: '0 12px',
        }}
      >
        <svg width={12} height={12} fill="none" viewBox="0 0 24 24" stroke={brandColors.mint} style={{ marginRight: 8 }}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
        <span style={{ fontSize: '10px', color: '#666', fontFamily: 'monospace' }}>{url}</span>
      </div>
    </div>
    {/* Content */}
    <div style={{ aspectRatio: '16/10', backgroundColor: brandColors.dark }}>
      {children}
    </div>
  </div>
);

// Circular Progress Chart
const CircularChart = ({
  percentage,
  color = brandColors.mint,
  label,
  sublabel,
}: {
  percentage: number;
  color?: string;
  label: string;
  sublabel: string;
}) => {
  const radius = 120;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div style={{ position: 'relative', width: 256, height: 256, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg width={256} height={256} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={128} cy={128} r={radius} stroke="#1A1A1A" strokeWidth={12} fill="none" />
        <circle
          cx={128}
          cy={128}
          r={radius}
          stroke={color}
          strokeWidth={12}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ filter: `drop-shadow(0 0 15px ${color}80)` }}
        />
      </svg>
      <div style={{ position: 'absolute', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ fontSize: '56px', fontWeight: 'bold', color: brandColors.white }}>{label}</span>
        <span style={{ fontSize: '12px', color: brandColors.gray, textTransform: 'uppercase', letterSpacing: '0.1em', textAlign: 'center', marginTop: 8 }}>
          {sublabel}
        </span>
      </div>
    </div>
  );
};

// Feature Card with Icon
const FeatureCard = ({
  icon,
  title,
  description,
  highlighted = false,
  iconColor = brandColors.gray,
}: {
  icon: ReactNode;
  title: string;
  description: string;
  highlighted?: boolean;
  iconColor?: string;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: '20px',
        padding: '24px',
        borderRadius: '12px',
        background: highlighted
          ? `rgba(${highlighted ? '0, 255, 157' : '255, 77, 77'}, 0.03)`
          : isHovered ? 'rgba(255, 255, 255, 0.05)' : 'transparent',
        border: highlighted
          ? `1px solid ${brandColors.mint}33`
          : '1px solid rgba(255, 255, 255, 0.05)',
        transition: 'all 0.3s ease',
        cursor: 'default',
      }}
    >
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: 8,
          backgroundColor: highlighted ? `${brandColors.mint}1A` : 'rgba(255, 255, 255, 0.1)',
          border: `1px solid ${highlighted ? `${brandColors.mint}33` : 'rgba(255, 255, 255, 0.1)'}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: isHovered ? iconColor : brandColors.gray,
          transition: 'all 0.3s ease',
          flexShrink: 0,
        }}
      >
        {icon}
      </div>
      <div>
        <h3 style={{
          color: isHovered ? iconColor : brandColors.white,
          fontWeight: 'bold',
          fontSize: '18px',
          marginBottom: 8,
          transition: 'color 0.3s ease',
        }}>
          {title}
        </h3>
        <p style={{ color: brandColors.gray, fontSize: '14px', lineHeight: 1.6 }}>
          {description}
        </p>
      </div>
    </div>
  );
};

// Problem Card (with danger styling)
const ProblemCard = ({
  icon,
  title,
  description,
  isDanger = false,
}: {
  icon: ReactNode;
  title: string;
  description: string;
  isDanger?: boolean;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: '20px',
        padding: '24px',
        borderRadius: '12px',
        background: isDanger
          ? `rgba(255, 77, 77, 0.03)`
          : 'rgba(255, 255, 255, 0.05)',
        border: isDanger
          ? `1px solid rgba(255, 77, 77, 0.2)`
          : '1px solid rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(5px)',
        transition: 'all 0.3s ease',
        transform: isHovered ? 'translateY(-2px)' : 'none',
        cursor: 'default',
      }}
    >
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: 8,
          backgroundColor: isDanger ? `${brandColors.danger}1A` : 'rgba(255, 255, 255, 0.1)',
          border: `1px solid ${isDanger ? `${brandColors.danger}33` : 'rgba(255, 255, 255, 0.1)'}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: isDanger ? brandColors.danger : brandColors.gray,
          flexShrink: 0,
        }}
      >
        {icon}
      </div>
      <div>
        <h3 style={{ color: brandColors.white, fontWeight: 'bold', fontSize: '18px', marginBottom: 8 }}>
          {title}
        </h3>
        <p style={{ color: brandColors.gray, fontSize: '14px', lineHeight: 1.6 }}>
          {description}
        </p>
      </div>
    </div>
  );
};

// Compact Feature Item (for slide 2)
const CompactFeature = ({
  icon,
  title,
  description
}: {
  icon: ReactNode;
  title: string;
  description: string;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: '16px',
        padding: '12px 16px',
        borderRadius: '0 12px 12px 0',
        borderLeft: isHovered ? `3px solid ${brandColors.mint}` : '1px solid rgba(255, 255, 255, 0.1)',
        background: isHovered ? `linear-gradient(90deg, ${brandColors.forest}33 0%, transparent 100%)` : 'transparent',
        transition: 'all 0.3s ease',
        cursor: 'default',
      }}
    >
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: 8,
          backgroundColor: isHovered ? `${brandColors.mint}1A` : 'rgba(255, 255, 255, 0.05)',
          border: `1px solid ${isHovered ? `${brandColors.mint}66` : 'rgba(255, 255, 255, 0.1)'}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: isHovered ? brandColors.mint : brandColors.gray,
          transition: 'all 0.3s ease',
          flexShrink: 0,
        }}
      >
        {icon}
      </div>
      <div>
        <h3 style={{
          color: isHovered ? brandColors.mint : brandColors.white,
          fontWeight: 'bold',
          fontSize: '18px',
          marginBottom: 4,
          transition: 'color 0.3s ease',
        }}>
          {title}
        </h3>
        <p style={{ color: brandColors.gray, fontSize: '14px', lineHeight: 1.5 }}>
          {description}
        </p>
      </div>
    </div>
  );
};

// SVG Icons
const LockIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  </svg>
);

const ChartIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

const BoltIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

const ShieldCheckIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

const EyeOffIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
  </svg>
);

const TrendingUpIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  </svg>
);

const CloudIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
  </svg>
);

const ServerIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
  </svg>
);

const UserIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const DocumentIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const PieChartIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
  </svg>
);

const BookIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
  </svg>
);

const GlobeIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
  </svg>
);

const LinkIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
  </svg>
);

// Animated Bar Chart
const AnimatedBarChart = ({ data }: { data: number[] }) => (
  <div style={{
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    gap: 8,
    height: '100%',
    padding: 16,
  }}>
    {data.map((value, index) => (
      <div
        key={index}
        style={{
          flex: 1,
          height: `${value}%`,
          backgroundColor: brandColors.mint,
          borderRadius: '4px 4px 0 0',
          transition: 'height 0.5s ease',
          transitionDelay: `${index * 0.1}s`,
        }}
      />
    ))}
  </div>
);

// ===== SLIDES =====

// Slide 1: Title
const Slide1Title = () => (
  <Slide backgroundColor={brandColors.dark}>
    <SlideFrame>
      <NoiseOverlay />
      <RadialGlow color={brandColors.forest} position="0% 50%" size="50%" opacity={0.4} />
      <RadialGlow color={brandColors.mint} position="100% 100%" size="60%" opacity={0.05} />

      <div style={{
      width: '100%',
      maxWidth: 1400,
      margin: '0 auto',
      padding: '0 24px',
      display: 'grid',
      gridTemplateColumns: '5fr 7fr',
      gap: 48,
      alignItems: 'center',
      height: '100%',
      position: 'relative',
      zIndex: 10,
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
          marginBottom: 32,
          color: brandColors.white,
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
        }}>
          автоматизирует и ускоряет работу сотрудников,<br />
          работает в <span style={{ color: brandColors.mint, fontWeight: 400 }}>защищённом контуре</span><br />
          и соответствует федеральным законам
        </p>
      </div>

      {/* Right Column - Browser Mockup */}
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

        <div style={{
          width: '100%',
        }}>
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
    </SlideFrame>
  </Slide>
);

// Slide 2: Concept
const Slide2Concept = () => (
  <Slide backgroundColor={brandColors.dark}>
    <SlideFrame>
      <NoiseOverlay />
      <RadialGlow color={brandColors.forest} position="0% 50%" size="60%" opacity={0.3} />

      <div style={{
        width: '100%',
      maxWidth: 1200,
      margin: '0 auto',
      padding: '20px 24px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      height: '100%',
      position: 'relative',
      zIndex: 10,
    }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: 40 }}>
        <h2 style={{ fontSize: 48, fontWeight: 'bold', marginBottom: 12, color: brandColors.white }}>
          Ведунья — это <GradientText>корпоративный ChatGPT</GradientText>
        </h2>
        <p style={{ color: brandColors.gray, fontWeight: 300, fontSize: 18 }}>
          Знакомый интерфейс, адаптированный под <span style={{ color: brandColors.white, fontWeight: 400 }}>Enterprise-стандарты</span> безопасности и контроля.
        </p>
      </div>

      {/* Content Row */}
      <div style={{ display: 'grid', gridTemplateColumns: '5fr 7fr', gap: 40, alignItems: 'center' }}>
        {/* Left Column - Features */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <CompactFeature
            icon={<LockIcon size={20} />}
            title="Безопасность данных"
            description="Защита от утечек (DLP), локальные модели внутри контура и полное соответствие ФЗ-152."
          />
          <CompactFeature
            icon={<ChartIcon size={20} />}
            title="AI Governance"
            description="Логирование 100% запросов, прозрачная аналитика использования и поиск точек роста."
          />
          <CompactFeature
            icon={<BoltIcon size={20} />}
            title="Рост эффективности"
            description="Готовые бизнес-сценарии (рецепты) и автоматизация рутины вместо простого чата."
          />
        </div>

        {/* Right Column - Interface Screenshot */}
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: brandColors.forest,
            opacity: 0.2,
            filter: 'blur(80px)',
            borderRadius: '50%',
          }} />

          <BrowserMockup>
            <div style={{ display: 'flex', height: '100%' }}>
              {/* Sidebar */}
              <div style={{
                width: 192,
                backgroundColor: '#0A0A0A',
                borderRight: '1px solid #222',
                padding: 12,
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
              }}>
                <div style={{ height: 24, width: '75%', backgroundColor: `${brandColors.forest}33`, borderRadius: 4, marginBottom: 8 }} />
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, opacity: 0.5 }}>
                  <div style={{ height: 8, backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 4 }} />
                  <div style={{ height: 8, width: '85%', backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 4 }} />
                  <div style={{ height: 8, width: '80%', backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 4 }} />
                </div>
              </div>

              {/* Main Chat */}
              <div style={{ flex: 1, padding: 24, display: 'flex', flexDirection: 'column' }}>
                <div style={{
                  alignSelf: 'flex-end',
                  backgroundColor: '#222',
                  color: brandColors.white,
                  padding: '8px 16px',
                  borderRadius: '16px 16px 4px 16px',
                  fontSize: 12,
                  border: '1px solid #333',
                  marginBottom: 16,
                }}>
                  Составь план внедрения OKR...
                </div>
                <div style={{ display: 'flex', gap: 12 }}>
                  <div style={{
                    width: 24,
                    height: 24,
                    borderRadius: '50%',
                    backgroundColor: brandColors.mint,
                    color: brandColors.black,
                    fontSize: 10,
                    fontWeight: 'bold',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    V
                  </div>
                  <div style={{ fontSize: 12, color: '#E5E5E5' }}>
                    <p style={{ marginBottom: 8 }}>Готово. Вот проект плана:</p>
                    <div style={{
                      backgroundColor: brandColors.panel,
                      border: `1px solid ${brandColors.forest}4D`,
                      borderRadius: 8,
                      padding: 12,
                      boxShadow: '0 0 20px rgba(0, 255, 157, 0.1)',
                    }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                        marginBottom: 8,
                        color: brandColors.mint,
                        fontSize: 10,
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em',
                      }}>
                        <svg width={12} height={12} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                        Рецепт: Планирование
                      </div>
                      <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: 12 }}>
                        <li style={{ display: 'flex', gap: 6, marginBottom: 4 }}>
                          <span style={{ color: brandColors.mint }}>•</span>
                          <span><strong style={{ color: brandColors.white }}>Objective:</strong> <span style={{ color: brandColors.gray }}>Увеличить конверсию на 15%.</span></span>
                        </li>
                        <li style={{ display: 'flex', gap: 6 }}>
                          <span style={{ color: brandColors.mint }}>•</span>
                          <span><strong style={{ color: brandColors.white }}>KR1:</strong> <span style={{ color: brandColors.gray }}>Внедрить скрипт.</span></span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </BrowserMockup>
        </div>
      </div>
    </div>
    </SlideFrame>
  </Slide>
);

// Slide 3: Problem
const Slide3Problem = () => (
  <Slide backgroundColor={brandColors.dark}>
    <SlideFrame>
      <NoiseOverlay />
      <RadialGlow color={brandColors.danger} position="50% 50%" size="70%" opacity={0.15} />

      {/* Floating Chaos Icons */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', opacity: 0.3, pointerEvents: 'none' }}>
      {/* ChatGPT Icon */}
      <div style={{
        position: 'absolute',
        top: '15%',
        left: '10%',
        width: 64,
        height: 64,
        borderRadius: '50%',
        border: '1px solid #333',
        backgroundColor: 'rgba(17, 17, 17, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#666',
        animation: 'float 8s ease-in-out infinite',
      }}>
        <svg width={32} height={32} fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"/>
        </svg>
      </div>

      {/* Warning Sign */}
      <div style={{
        position: 'absolute',
        bottom: '10%',
        left: '30%',
        color: brandColors.warning,
        opacity: 0.2,
        animation: 'pulse 4s ease-in-out infinite',
      }}>
        <svg width={96} height={96} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>
    </div>

    <div style={{
      width: '100%',
      maxWidth: 1200,
      margin: '0 auto',
      padding: '20px 24px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      height: '100%',
      position: 'relative',
      zIndex: 10,
    }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: 64 }}>
        <h2 style={{ fontSize: 48, fontWeight: 'bold', marginBottom: 16, color: brandColors.white }}>
          Сегодня: <GradientText from={brandColors.white} to={brandColors.danger}>«Теневой ИИ»</GradientText> и риски
        </h2>
        <p style={{ color: brandColors.gray, fontWeight: 300, fontSize: 20 }}>
          Без единого портала сотрудники используют ИИ хаотично,<br />
          подвергая компанию серьезным угрозам.
        </p>
      </div>

      {/* Content Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '5fr 7fr', gap: 40, alignItems: 'stretch' }}>
        {/* Left - Big Stats */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <CircularChart
            percentage={5}
            color={brandColors.danger}
            label="5%"
            sublabel="Сотрудников используют ИИ"
          />
          <div style={{ marginTop: 32, textAlign: 'center', maxWidth: 280 }}>
            <p style={{ color: brandColors.gray, fontSize: 14, lineHeight: 1.6 }}>
              Это энтузиасты-одиночки, использующие ИИ для <span style={{ color: brandColors.white }}>«интересных задач»</span>, часто без реальной пользы для бизнеса.
            </p>
          </div>
        </div>

        {/* Right - Problems List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, justifyContent: 'center' }}>
          <ProblemCard
            isDanger
            icon={<LockIcon size={24} />}
            title="Утечка данных и нарушение NDA"
            description="Сотрудники копируют в публичные чаты (ChatGPT, DeepL) коммерческую тайну, код и персональные данные клиентов. Эта информация уходит на внешние серверы."
          />
          <ProblemCard
            icon={<BoltIcon size={24} />}
            title="Отсутствие реальной эффективности"
            description="ИИ используется как игрушка. Нет системного подхода, нет готовых промптов («рецептов»), результат зависит от умения конкретного человека «общаться с ботом»."
          />
          <ProblemCard
            icon={<EyeOffIcon size={24} />}
            title="Слепая зона для руководства"
            description="Компания не знает, кто и для чего использует нейросети. Невозможно масштабировать успешные кейсы или предотвратить ошибки."
          />
        </div>
      </div>
    </div>

    <style>{`
      @keyframes float {
        0%, 100% { transform: translateY(0) rotate(0deg); }
        50% { transform: translateY(-20px) rotate(2deg); }
      }
      @keyframes pulse {
        0%, 100% { opacity: 0.2; }
        50% { opacity: 0.4; }
      }
    `}</style>
    </SlideFrame>
  </Slide>
);

// Slide 4: Solution
const Slide4Solution = () => (
  <Slide backgroundColor={brandColors.dark}>
    <SlideFrame>
      <NoiseOverlay />
      <RadialGlow color={brandColors.mint} position="50% 50%" size="70%" opacity={0.15} />

      {/* Floating Icons */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', opacity: 0.3, pointerEvents: 'none' }}>
      <div style={{
        position: 'absolute',
        top: '15%',
        left: '10%',
        width: 64,
        height: 64,
        borderRadius: 16,
        border: `1px solid ${brandColors.mint}33`,
        backgroundColor: `${brandColors.mint}0D`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: brandColors.mint,
        animation: 'float 8s ease-in-out infinite',
      }}>
        <ShieldCheckIcon size={32} />
      </div>
      <div style={{
        position: 'absolute',
        bottom: '20%',
        right: '15%',
        width: 80,
        height: 80,
        borderRadius: '50%',
        border: `1px solid ${brandColors.mint}33`,
        backgroundColor: `${brandColors.mint}0D`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: brandColors.mint,
        animation: 'float 6s ease-in-out infinite',
      }}>
        <BoltIcon size={40} />
      </div>
    </div>

    <div style={{
      width: '100%',
      maxWidth: 1200,
      margin: '0 auto',
      padding: '20px 24px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      height: '100%',
      position: 'relative',
      zIndex: 10,
    }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: 64 }}>
        <h2 style={{ fontSize: 48, fontWeight: 'bold', marginBottom: 16, color: brandColors.white }}>
          Завтра: <GradientText>Безопасный рост</GradientText> эффективности
        </h2>
        <p style={{ color: brandColors.gray, fontWeight: 300, fontSize: 20 }}>
          С единым порталом сотрудники решают бизнес-задачи,<br />
          а компания получает полный контроль и аналитику.
        </p>
      </div>

      {/* Content Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '5fr 7fr', gap: 40, alignItems: 'stretch' }}>
        {/* Left - Big Stats */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <CircularChart
            percentage={75}
            color={brandColors.mint}
            label="75%"
            sublabel="Сотрудников используют ИИ"
          />
          <div style={{ marginTop: 32, textAlign: 'center', maxWidth: 280 }}>
            <p style={{ color: brandColors.gray, fontSize: 14, lineHeight: 1.6 }}>
              ИИ становится <span style={{ color: brandColors.white }}>ежедневным ассистентом</span>: от Deep Research до планирования сложных проектов.
            </p>
          </div>
        </div>

        {/* Right - Solutions List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, justifyContent: 'center' }}>
          <FeatureCard
            highlighted
            icon={<ShieldCheckIcon size={24} />}
            title="Абсолютная безопасность"
            description="Периметр закрыт. Smart Proxy фильтрует облачные запросы, а локальные модели обрабатывают sensitive-данные внутри компании."
            iconColor={brandColors.mint}
          />
          <FeatureCard
            icon={<ChartIcon size={24} />}
            title="Умный мониторинг и развитие"
            description="ИИ-супервайзер анализирует, какие задачи решают сотрудники, и предлагает точки автоматизации бизнес-процессов."
            iconColor={brandColors.mint}
          />
          <FeatureCard
            icon={<TrendingUpIcon size={24} />}
            title="Рост эффективности +15%"
            description="Сотрудники используют проверенные «рецепты» для рутины, освобождая время для стратегических задач."
            iconColor={brandColors.mint}
          />
        </div>
      </div>
    </div>

    <style>{`
      @keyframes float {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-15px); }
      }
    `}</style>
    </SlideFrame>
  </Slide>
);

// Slide 5: Security Architecture
const Slide5Security = () => (
  <Slide backgroundColor={brandColors.dark}>
    <SlideFrame>
      <NoiseOverlay />
      <RadialGlow color={brandColors.forest} position="70% 50%" size="60%" opacity={0.4} />

      <div style={{
        width: '100%',
        maxWidth: 1200,
        margin: '0 auto',
        padding: '20px 24px',
        display: 'flex',
        flexDirection: 'column',
      justifyContent: 'center',
      height: '100%',
      position: 'relative',
      zIndex: 10,
    }}>
      {/* Header */}
      <div style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 36, fontWeight: 'bold', marginBottom: 12, color: brandColors.white }}>
          Бескомпромиссная<br />
          <GradientText>защита данных</GradientText>
        </h2>
        <p style={{ color: brandColors.gray, fontWeight: 300, fontSize: 18, maxWidth: 480 }}>
          Многоуровневая архитектура безопасности, которая адаптируется под чувствительность информации.
        </p>
      </div>

      {/* Content Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '5fr 7fr', gap: 32, alignItems: 'center' }}>
        {/* Left - Layers */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Layer 1 */}
          <GlassCard borderColor={brandColors.mint} style={{ borderLeft: `4px solid ${brandColors.mint}`, padding: '16px' }}>
            <h3 style={{
              fontSize: 18,
              fontWeight: 'bold',
              color: brandColors.white,
              marginBottom: 4,
              display: 'flex',
              alignItems: 'center',
              gap: 12,
            }}>
              <span style={{
                width: 28,
                height: 28,
                borderRadius: 8,
                backgroundColor: `${brandColors.mint}1A`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: brandColors.mint,
                fontSize: 10,
                fontFamily: 'monospace',
                border: `1px solid ${brandColors.mint}33`,
              }}>01</span>
              Smart AI Proxy
            </h3>
            <p style={{ color: brandColors.gray, fontSize: 14, lineHeight: 1.5 }}>
              ИИ просматривает каждый диалог. Выявляет и блокирует угрозы.
            </p>
          </GlassCard>

          {/* Layer 2 */}
          <GlassCard borderColor={brandColors.forest} style={{ borderLeft: `4px solid ${brandColors.forest}`, padding: '16px' }}>
            <h3 style={{
              fontSize: 18,
              fontWeight: 'bold',
              color: brandColors.white,
              marginBottom: 4,
              display: 'flex',
              alignItems: 'center',
              gap: 12,
            }}>
              <span style={{
                width: 28,
                height: 28,
                borderRadius: 8,
                backgroundColor: `${brandColors.forest}4D`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#CCC',
                fontSize: 10,
                fontFamily: 'monospace',
                border: `1px solid ${brandColors.forest}80`,
              }}>02</span>
              Local Core
            </h3>
            <p style={{ color: brandColors.gray, fontSize: 14, lineHeight: 1.5 }}>
              Для критически важных данных (Top Secret) используются локальные LLM, развернутые внутри вашего контура (On-premise). Данные физически не покидают сервер.
            </p>
          </GlassCard>

          {/* Layer 3 */}
          <GlassCard borderColor="#444" style={{ borderLeft: '4px solid #444', padding: '16px' }}>
            <h3 style={{
              fontSize: 18,
              fontWeight: 'bold',
              color: brandColors.white,
              marginBottom: 4,
              display: 'flex',
              alignItems: 'center',
              gap: 12,
            }}>
              <span style={{
                width: 28,
                height: 28,
                borderRadius: 8,
                backgroundColor: '#1A1A1A',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#666',
                fontSize: 10,
                fontFamily: 'monospace',
                border: '1px solid #333',
              }}>03</span>
              Compliance
            </h3>
            <p style={{ color: brandColors.gray, fontSize: 14, lineHeight: 1.5 }}>
              Журналирование действий для аудита безопасности.
            </p>
            <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
              <span style={{ fontSize: 10, color: '#666', display: 'flex', alignItems: 'center', gap: 4 }}>
                <div style={{ width: 4, height: 4, borderRadius: '50%', backgroundColor: '#666' }} />
                ФЗ-152
              </span>
              <span style={{ fontSize: 10, color: '#666', display: 'flex', alignItems: 'center', gap: 4 }}>
                <div style={{ width: 4, height: 4, borderRadius: '50%', backgroundColor: '#666' }} />
                GDPR
              </span>
            </div>
          </GlassCard>
        </div>

        {/* Right - Diagram */}
        <div style={{ position: 'relative', height: 400, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {/* SVG Lines */}
          <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }}>
            {/* Employee to Proxy */}
            <line x1="23%" y1="50%" x2="40%" y2="50%" stroke={brandColors.sky} strokeWidth={2} strokeOpacity={0.6} />
            {/* Proxy to Cloud */}
            <line x1="60%" y1="50%" x2="82%" y2="30%" stroke={brandColors.sky} strokeWidth={2} strokeOpacity={0.6} />
            {/* Proxy to Local */}
            <line x1="60%" y1="50%" x2="82%" y2="70%" stroke={brandColors.mint} strokeWidth={2} strokeOpacity={0.6} />
            {/* Proxy to Analysis */}
            <line x1="50%" y1="66%" x2="50%" y2="78%" stroke={brandColors.mint} strokeWidth={2} strokeOpacity={0.4} />
          </svg>

          {/* Employee */}
          <div style={{
            position: 'absolute',
            left: '5%',
            top: '50%',
            transform: 'translateY(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
            <div style={{
              width: 80,
              height: 80,
              borderRadius: '50%',
              border: `2px solid ${brandColors.sky}`,
              backgroundColor: `${brandColors.sky}1A`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: `0 0 15px ${brandColors.sky}4D`,
            }}>
              <UserIcon size={40} />
            </div>
            <span style={{ marginTop: 12, fontSize: 10, fontWeight: 'bold', color: brandColors.gray, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              Сотрудник
            </span>
          </div>

          {/* AI Proxy (Center) */}
          <div style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
            <div style={{
              width: 128,
              height: 128,
              borderRadius: 24,
              background: `linear-gradient(135deg, ${brandColors.cyan} 0%, ${brandColors.mint} 100%)`,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: `0 0 30px ${brandColors.mint}40`,
            }}>
              <ShieldCheckIcon size={48} />
              <span style={{ fontSize: 14, fontWeight: 'bold', color: brandColors.black, marginTop: 8 }}>AI PROXY</span>
            </div>
          </div>

          {/* Cloud LLM (Top Right) */}
          <div style={{
            position: 'absolute',
            right: '5%',
            top: '15%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
            <div style={{
              width: 80,
              height: 80,
              borderRadius: 16,
              border: `1px solid ${brandColors.sky}`,
              backgroundColor: `${brandColors.sky}0D`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: `0 0 15px ${brandColors.sky}4D`,
              color: brandColors.sky,
            }}>
              <CloudIcon size={40} />
            </div>
            <span style={{ marginTop: 12, fontSize: 10, fontWeight: 'bold', color: brandColors.sky, textTransform: 'uppercase', textAlign: 'center', lineHeight: 1.3 }}>
              Cloud LLM<br />Models
            </span>
          </div>

          {/* Local LLM (Bottom Right) */}
          <div style={{
            position: 'absolute',
            right: '5%',
            bottom: '15%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
            <div style={{
              width: 80,
              height: 80,
              borderRadius: 16,
              border: `1px solid ${brandColors.mint}`,
              backgroundColor: `${brandColors.mint}0D`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: `0 0 15px ${brandColors.mint}4D`,
              color: brandColors.mint,
            }}>
              <ServerIcon size={40} />
            </div>
            <span style={{ marginTop: 12, fontSize: 10, fontWeight: 'bold', color: brandColors.mint, textTransform: 'uppercase', textAlign: 'center', lineHeight: 1.3 }}>
              Local LLM<br />(Private Data)
            </span>
          </div>

          {/* Analysis (Bottom Center) */}
          <div style={{
            position: 'absolute',
            left: '50%',
            bottom: '10%',
            transform: 'translateX(-50%)',
          }}>
            <div style={{
              backgroundColor: '#052e1f',
              border: `1px solid ${brandColors.mint}4D`,
              borderRadius: 8,
              padding: '12px 24px',
              boxShadow: '0 10px 20px rgba(0,0,0,0.3)',
            }}>
              <span style={{ fontSize: 12, fontWeight: 'bold', color: brandColors.mint, textTransform: 'uppercase', letterSpacing: '0.1em', textAlign: 'center', display: 'block' }}>
                Анализ<br />данных
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    </SlideFrame>
  </Slide>
);

// Slide 6: AI Governance
const Slide6Governance = () => (
  <Slide backgroundColor={brandColors.dark}>
    <SlideFrame>
      <NoiseOverlay />
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23333' fill-opacity='0.2' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='1'/%3E%3C/g%3E%3C/svg%3E")`,
        opacity: 0.3,
      }} />
      <RadialGlow color={brandColors.purple} position="80% 20%" size="60%" opacity={0.15} />

      <div style={{
        width: '100%',
        maxWidth: 1200,
        margin: '0 auto',
        padding: '20px 24px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        height: '100%',
        position: 'relative',
        zIndex: 10,
      }}>
        {/* Header */}
      <div style={{ marginBottom: 48 }}>
        <h2 style={{ fontSize: 48, fontWeight: 'bold', marginBottom: 16, color: brandColors.white, lineHeight: 1.1 }}>
          Полная прозрачность<br />
          и <span style={{ color: brandColors.white }}>контроль</span>
        </h2>
        <p style={{ color: brandColors.gray, fontWeight: 300, fontSize: 20, maxWidth: 480 }}>
          ИИ анализирует ИИ: отслеживайте эффективность использования и находите точки роста бизнеса.
        </p>
      </div>

      {/* Content Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '5fr 7fr', gap: 48, alignItems: 'flex-start' }}>
        {/* Left - Features */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, paddingTop: 16 }}>
          <FeatureCard
            icon={<DocumentIcon size={24} />}
            title="Логирование 100%"
            description="Полная история всех диалогов и промптов. Вы всегда знаете, кто, когда и для чего использовал нейросеть."
            iconColor={brandColors.mint}
          />
          <FeatureCard
            icon={<PieChartIcon size={24} />}
            title="Аналитика использования"
            description="Дашборды по отделам и сотрудникам. Выявление самых популярных сценариев и моделей (GPT-4 vs Local)."
            iconColor={brandColors.purple}
          />
          <FeatureCard
            icon={<TrendingUpIcon size={24} />}
            title="Поиск точек роста"
            description="Система анализирует паттерны и подсказывает: «Отдел маркетинга тратит 40 часов на отчеты. Внедрите рецепт для автоматизации»."
            iconColor={brandColors.mint}
          />
        </div>

        {/* Right - Dashboard Visual */}
        <div style={{ position: 'relative', height: 450 }}>
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: '#0f0f0f',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 12,
            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
          }}>
            {/* Dashboard Header */}
            <div style={{
              height: 48,
              borderBottom: '1px solid rgba(255,255,255,0.05)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0 24px',
              backgroundColor: brandColors.panel,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: brandColors.forest }} />
                <span style={{ fontSize: 10, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.1em', color: brandColors.gray }}>
                  Vedunya Analytics
                </span>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <div style={{ height: 8, width: 64, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 4 }} />
                <div style={{ height: 8, width: 32, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 4 }} />
              </div>
            </div>

            {/* Dashboard Body */}
            <div style={{ padding: 24, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, flex: 1 }}>
              {/* Left Column */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {/* Metric Cards */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <div style={{ backgroundColor: 'rgba(255,255,255,0.05)', padding: 12, borderRadius: 8, border: '1px solid rgba(255,255,255,0.05)' }}>
                    <div style={{ fontSize: 10, color: '#666', textTransform: 'uppercase' }}>Active Users</div>
                    <div style={{ fontSize: 20, fontWeight: 'bold', color: brandColors.white }}>1,248</div>
                    <div style={{ fontSize: 10, color: brandColors.mint }}>+12% this week</div>
                  </div>
                  <div style={{ backgroundColor: 'rgba(255,255,255,0.05)', padding: 12, borderRadius: 8, border: '1px solid rgba(255,255,255,0.05)' }}>
                    <div style={{ fontSize: 10, color: '#666', textTransform: 'uppercase' }}>Requests</div>
                    <div style={{ fontSize: 20, fontWeight: 'bold', color: brandColors.white }}>45k</div>
                    <div style={{ fontSize: 10, color: brandColors.mint }}>+5% today</div>
                  </div>
                </div>

                {/* Bar Chart */}
                <div style={{ flex: 1, backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 8, border: '1px solid rgba(255,255,255,0.05)' }}>
                  <AnimatedBarChart data={[40, 65, 50, 85, 60]} />
                </div>
              </div>

              {/* Right Column */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {/* AI Insight Card */}
                <div style={{
                  background: `linear-gradient(135deg, ${brandColors.mint}1A 0%, transparent 100%)`,
                  border: `1px solid ${brandColors.mint}4D`,
                  borderRadius: 8,
                  padding: 16,
                  boxShadow: `0 0 10px ${brandColors.mint}33`,
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                    <BoltIcon size={16} />
                    <span style={{ fontSize: 10, fontWeight: 'bold', color: brandColors.mint, textTransform: 'uppercase' }}>AI Insight</span>
                  </div>
                  <p style={{ fontSize: 12, color: '#E5E5E5', lineHeight: 1.5 }}>
                    Высокая активность в отделе HR.<br />
                    <span style={{ color: brandColors.white }}>Рекомендация:</span> Внедрить рецепт "Скрининг резюме" для экономии 15 часов/неделю.
                  </p>
                </div>

                {/* Log List */}
                <div style={{ flex: 1, backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 8, border: '1px solid rgba(255,255,255,0.05)', padding: 12, overflow: 'hidden' }}>
                  <div style={{ fontSize: 10, color: '#666', textTransform: 'uppercase', marginBottom: 8 }}>Recent Prompts</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {[
                      { name: 'Analysis_Q3.pdf', team: 'Marketing', color: brandColors.purple },
                      { name: 'Java Code Review', team: 'Dev Team', color: brandColors.mint },
                      { name: 'Contract_Draft_v2', team: 'Legal', color: brandColors.gray },
                      { name: 'Competitor Research', team: 'Sales', color: brandColors.purple },
                    ].map((item, i) => (
                      <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: 4 }}>
                        <span style={{ color: '#E5E5E5' }}>{item.name}</span>
                        <span style={{ color: item.color }}>{item.team}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Decorative Glows */}
          <div style={{ position: 'absolute', right: -40, bottom: -40, width: 160, height: 160, backgroundColor: brandColors.purple, borderRadius: '50%', filter: 'blur(100px)', opacity: 0.2, zIndex: -1 }} />
          <div style={{ position: 'absolute', left: -40, top: -40, width: 160, height: 160, backgroundColor: brandColors.mint, borderRadius: '50%', filter: 'blur(100px)', opacity: 0.1, zIndex: -1 }} />
        </div>
      </div>
    </div>
    </SlideFrame>
  </Slide>
);

// Slide 7: Efficiency
const Slide7Efficiency = () => {
  const [animationFrame, setAnimationFrame] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationFrame(prev => (prev + 1) % 100);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <Slide backgroundColor={brandColors.dark}>
      <SlideFrame>
        <NoiseOverlay />
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23333' fill-opacity='0.2' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='1'/%3E%3C/g%3E%3C/svg%3E")`,
          opacity: 0.3,
        }} />
        <RadialGlow color={brandColors.mint} position="30% 80%" size="60%" opacity={0.15} />

        <div style={{
          width: '100%',
          maxWidth: 1200,
          margin: '0 auto',
          padding: '20px 24px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          height: '100%',
          position: 'relative',
          zIndex: 10,
        }}>
        {/* Header */}
        <div style={{ marginBottom: 48 }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '4px 12px',
            borderRadius: 9999,
            border: `1px solid ${brandColors.mint}4D`,
            backgroundColor: `${brandColors.mint}0D`,
            marginBottom: 16,
          }}>
            <BoltIcon size={12} />
            <span style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.1em', color: brandColors.mint, fontWeight: 'bold' }}>
              Deep Dive: Эффективность
            </span>
          </div>
          <h2 style={{ fontSize: 48, fontWeight: 'bold', marginBottom: 16, color: brandColors.white, lineHeight: 1.1 }}>
            Инструмент работы,<br />
            а не <span style={{ textDecoration: 'underline', textDecorationColor: `${brandColors.mint}80`, textUnderlineOffset: 4 }}>игрушка</span>
          </h2>
          <p style={{ color: brandColors.gray, fontWeight: 300, fontSize: 20, maxWidth: 480 }}>
            Превращаем чат в мощный бизнес-инструмент с помощью готовых сценариев и агентов.
          </p>
        </div>

        {/* Content Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '5fr 7fr', gap: 48, alignItems: 'center' }}>
          {/* Left - Features */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <FeatureCard
              icon={<BookIcon size={24} />}
              title="Библиотека рецептов"
              description="Готовые, проверенные промпты для ролей (HR, Sales, Dev). Сотрудник выбирает задачу, а не придумывает промпт."
              iconColor={brandColors.mint}
            />
            <FeatureCard
              icon={<GlobeIcon size={24} />}
              title="AI Агенты"
              description={`Deep Research для поиска в интернете с фактчекингом и Doc Analyst для работы с документами.`}
              iconColor={brandColors.sky}
            />
            <FeatureCard
              icon={<LinkIcon size={24} />}
              title="Интеграции"
              description="Подключение к корпоративным базам знаний (Confluence, Jira, Notion) для контекстного поиска."
              iconColor={brandColors.amber}
            />
          </div>

          {/* Right - Bento Grid */}
          <div style={{ position: 'relative', height: 450 }}>
            <div style={{
              position: 'absolute',
              inset: 0,
              backgroundColor: `${brandColors.mint}0D`,
              filter: 'blur(60px)',
              borderRadius: '50%',
            }} />

            <div style={{
              position: 'relative',
              width: '100%',
              height: '100%',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gridTemplateRows: 'repeat(6, 1fr)',
              gap: 16,
            }}>
              {/* Recipe Card - Spans 2 cols, 3 rows */}
              <div style={{
                gridColumn: 'span 2',
                gridRow: 'span 3',
                backgroundColor: '#0f0f0f',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 16,
                overflow: 'hidden',
                position: 'relative',
                boxShadow: '0 10px 30px -10px rgba(0,0,0,0.5)',
              }}>
                {/* Header */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  padding: 16,
                  backgroundColor: 'rgba(15,15,15,0.95)',
                  backdropFilter: 'blur(10px)',
                  zIndex: 20,
                  borderBottom: '1px solid rgba(255,255,255,0.05)',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{
                      padding: '4px 8px',
                      borderRadius: 4,
                      backgroundColor: `${brandColors.mint}1A`,
                      border: `1px solid ${brandColors.mint}33`,
                      fontSize: 10,
                      fontWeight: 'bold',
                      color: brandColors.mint,
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                    }}>
                      Рецепт: Общий
                    </span>
                    <svg width={16} height={16} fill="none" viewBox="0 0 24 24" stroke="#666">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h4 style={{ fontSize: 18, fontWeight: 'bold', color: brandColors.white, marginTop: 8 }}>
                    План дня с перерывами
                  </h4>
                </div>

                {/* Chat Content */}
                <div style={{
                  position: 'absolute',
                  top: 80,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  padding: 16,
                  overflow: 'hidden',
                }}>
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 16,
                    transform: `translateY(-${(animationFrame / 100) * 20}%)`,
                    transition: 'transform 0.1s linear',
                  }}>
                    {/* User Message */}
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <div style={{
                        backgroundColor: '#222',
                        color: '#E5E5E5',
                        padding: '8px 12px',
                        borderRadius: '12px 12px 2px 12px',
                        fontSize: 10,
                        maxWidth: '80%',
                        border: '1px solid rgba(255,255,255,0.05)',
                        lineHeight: 1.5,
                      }}>
                        У меня есть 4 встречи по часу и задача на 2 часа сделать презентацию. Как уместить в рабочий день?
                      </div>
                    </div>

                    {/* AI Response */}
                    <div style={{ display: 'flex', gap: 8 }}>
                      <div style={{
                        width: 24,
                        height: 24,
                        borderRadius: '50%',
                        backgroundColor: `${brandColors.mint}1A`,
                        border: `1px solid ${brandColors.mint}4D`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: brandColors.mint,
                        fontSize: 8,
                        fontWeight: 'bold',
                        flexShrink: 0,
                      }}>
                        V
                      </div>
                      <div style={{
                        backgroundColor: `${brandColors.mint}0D`,
                        color: '#E5E5E5',
                        padding: 12,
                        borderRadius: '12px 12px 12px 2px',
                        fontSize: 10,
                        width: '55%',
                        border: `1px solid ${brandColors.mint}33`,
                        boxShadow: `0 0 20px ${brandColors.mint}1A`,
                        lineHeight: 1.5,
                      }}>
                        <p style={{ marginBottom: 8, fontWeight: 600, color: brandColors.mint }}>Расклад (Pomodoro):</p>
                        <div style={{ fontFamily: 'monospace', fontSize: 9, color: brandColors.gray }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)', padding: '4px 0' }}>
                            <span>09:00 — 09:25</span>
                            <span style={{ color: brandColors.white }}>Встреча A (ч.1)</span>
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)', padding: '4px 0' }}>
                            <span>09:30 — 09:55</span>
                            <span style={{ color: brandColors.white }}>Встреча A (ч.2)</span>
                          </div>
                          <div style={{ padding: '4px 0', textAlign: 'center', color: `${brandColors.mint}B3`, backgroundColor: `${brandColors.mint}0D`, borderRadius: 4 }}>
                            ☕️ Перерыв 30 мин
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Gradient */}
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: 48,
                  background: 'linear-gradient(to top, #0f0f0f 0%, transparent 100%)',
                  zIndex: 20,
                  pointerEvents: 'none',
                }} />
              </div>

              {/* Deep Research Card */}
              <div style={{
                gridColumn: 'span 1',
                gridRow: 'span 3',
                backgroundColor: '#081018',
                border: `1px solid ${brandColors.sky}33`,
                borderRadius: 16,
                overflow: 'hidden',
                position: 'relative',
                boxShadow: '0 10px 30px -10px rgba(0,0,0,0.5)',
              }}>
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 4,
                  backgroundColor: brandColors.sky,
                }} />
                <div style={{
                  padding: 16,
                  backgroundColor: 'rgba(8,16,24,0.95)',
                  backdropFilter: 'blur(10px)',
                  borderBottom: `1px solid ${brandColors.sky}1A`,
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <GlobeIcon size={16} />
                    <span style={{ fontSize: 10, fontWeight: 'bold', color: brandColors.sky, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      Deep Research
                    </span>
                  </div>
                </div>
                <div style={{ padding: 16, fontFamily: 'monospace', fontSize: 9, color: brandColors.gray }}>
                  <div style={{ marginBottom: 12 }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 4 }}>
                      <svg width={12} height={12} fill="none" viewBox="0 0 24 24" stroke={brandColors.sky} style={{ marginTop: 2 }}>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                      <span style={{ color: brandColors.white, fontWeight: 'bold' }}>Мысль:</span>
                    </div>
                    <p style={{ paddingLeft: 20, borderLeft: '1px solid rgba(255,255,255,0.1)', lineHeight: 1.4 }}>
                      Анализ трендов финтеха 2025. Фокус: итоги года.
                    </p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: brandColors.sky, marginBottom: 8 }}>
                    <svg width={12} height={12} viewBox="0 0 24 24" style={{ animation: 'spin 1s linear infinite' }}>
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" opacity={0.25} />
                      <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>Поиск на 54 сайтах...</span>
                  </div>
                  <div style={{ marginTop: 16, display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                    <span style={{ color: brandColors.mint }}>✔</span>
                    <span style={{ color: brandColors.white, fontWeight: 'bold' }}>Сборка отчета завершена.</span>
                  </div>
                </div>
              </div>

              {/* Corporate Data Card */}
              <div style={{
                gridColumn: 'span 1',
                gridRow: 'span 3',
                backgroundColor: '#1a150a',
                border: `1px solid ${brandColors.amber}33`,
                borderRadius: 16,
                overflow: 'hidden',
                position: 'relative',
                boxShadow: '0 10px 30px -10px rgba(0,0,0,0.5)',
              }}>
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 4,
                  backgroundColor: brandColors.amber,
                }} />
                <div style={{
                  padding: 16,
                  backgroundColor: 'rgba(26,21,10,0.95)',
                  backdropFilter: 'blur(10px)',
                  borderBottom: `1px solid ${brandColors.amber}1A`,
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <svg width={16} height={16} fill="none" viewBox="0 0 24 24" stroke={brandColors.amber}>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                      <span style={{ fontSize: 10, fontWeight: 'bold', color: brandColors.amber, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        Корпоративные данные
                      </span>
                    </div>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 4,
                      backgroundColor: `${brandColors.mint}1A`,
                      padding: '2px 8px',
                      borderRadius: 4,
                      border: `1px solid ${brandColors.mint}33`,
                    }}>
                      <LockIcon size={10} />
                      <span style={{ fontSize: 8, fontWeight: 'bold', color: brandColors.mint, textTransform: 'uppercase' }}>Security Zone</span>
                    </div>
                  </div>

                  {/* Document Icons */}
                  <div style={{ display: 'flex', gap: 8 }}>
                    {['PDF', 'DOC', 'J'].map((type, i) => (
                      <div key={i} style={{
                        width: 32,
                        height: 40,
                        backgroundColor: 'rgba(255,255,255,0.05)',
                        borderRadius: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '1px solid rgba(255,255,255,0.1)',
                      }}>
                        <div style={{
                          width: 16,
                          height: 20,
                          backgroundColor: i === 0 ? 'rgba(239,68,68,0.2)' : i === 1 ? 'rgba(59,130,246,0.2)' : `${brandColors.amber}33`,
                          borderRadius: 2,
                          marginBottom: 4,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: 6,
                          color: brandColors.amber,
                          fontWeight: 'bold',
                        }}>
                          {type === 'J' ? 'J' : ''}
                        </div>
                        <div style={{ height: 2, width: 16, backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 1 }} />
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ padding: 16, fontSize: 9 }}>
                  {/* User Question */}
                  <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 12 }}>
                    <div style={{
                      backgroundColor: '#222',
                      color: '#E5E5E5',
                      padding: '8px 12px',
                      borderRadius: '12px 12px 2px 12px',
                      maxWidth: '90%',
                      border: '1px solid rgba(255,255,255,0.05)',
                      lineHeight: 1.4,
                    }}>
                      Какой руководитель отвечает за логистический центр?
                    </div>
                  </div>

                  {/* AI Response with Contact */}
                  <div style={{ display: 'flex', gap: 8 }}>
                    <div style={{
                      width: 24,
                      height: 24,
                      borderRadius: '50%',
                      backgroundColor: `${brandColors.mint}1A`,
                      border: `1px solid ${brandColors.mint}4D`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: brandColors.mint,
                      fontSize: 8,
                      fontWeight: 'bold',
                      flexShrink: 0,
                    }}>
                      V
                    </div>
                    <div style={{
                      backgroundColor: `${brandColors.mint}0D`,
                      padding: 12,
                      borderRadius: '12px 12px 12px 2px',
                      maxWidth: '95%',
                      border: `1px solid ${brandColors.mint}33`,
                      boxShadow: `0 0 20px ${brandColors.mint}1A`,
                    }}>
                      <div style={{
                        backgroundColor: '#0f0f0f',
                        padding: 8,
                        borderRadius: 8,
                        border: '1px solid rgba(255,255,255,0.1)',
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                          <div style={{
                            width: 24,
                            height: 24,
                            borderRadius: '50%',
                            backgroundColor: '#444',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: 8,
                            color: brandColors.white,
                            fontWeight: 'bold',
                          }}>
                            AS
                          </div>
                          <div>
                            <div style={{ color: brandColors.white, fontWeight: 'bold' }}>Алексей Смирнов</div>
                            <div style={{ color: '#666', fontSize: 8 }}>Head of Logistics</div>
                          </div>
                        </div>
                        <div style={{ paddingLeft: 4, borderLeft: `2px solid ${brandColors.mint}4D`, color: brandColors.gray }}>
                          <div>📧 a.smirnov@vedunya.ai</div>
                          <div>📞 вн. 4502</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
      </SlideFrame>
    </Slide>
  );
};

// ===== MAIN PRESENTATION COMPONENT =====
function VedunyaProductPresentation() {
  return (
    <Deck theme={theme}>
      <Slide1Title />
      <Slide2Concept />
      <Slide3Problem />
      <Slide4Solution />
      <Slide5Security />
      <Slide6Governance />
      <Slide7Efficiency />
    </Deck>
  );
}

export default VedunyaProductPresentation;
