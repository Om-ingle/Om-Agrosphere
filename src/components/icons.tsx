import type { SVGProps } from 'react';

/**
 * Small inline icon set. Deliberately hand-rolled rather than pulling in an
 * icon package — the site needs about a dozen glyphs, and inlining them keeps
 * the client bundle free of a whole library.
 */
type IconProps = SVGProps<SVGSVGElement>;

const base: IconProps = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.7,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
  focusable: false,
};

export function PhoneIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M6.6 3.5h2.2l1.5 3.7-1.9 1.3a11.4 11.4 0 0 0 5.1 5.1l1.3-1.9 3.7 1.5v2.2c0 1.2-1 2.1-2.2 2.1A14.6 14.6 0 0 1 4.5 5.7c0-1.2 1-2.2 2.1-2.2Z" />
    </svg>
  );
}

export function WhatsAppIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden focusable="false" {...props}>
      <path d="M12.04 2.5c-5.24 0-9.5 4.24-9.5 9.47 0 1.67.44 3.3 1.27 4.74L2.5 21.5l4.94-1.28a9.53 9.53 0 0 0 4.6 1.17h.01c5.24 0 9.5-4.24 9.5-9.47 0-2.53-.99-4.9-2.79-6.69a9.42 9.42 0 0 0-6.72-2.73Zm0 17.3h-.01a7.9 7.9 0 0 1-4.02-1.1l-.29-.17-2.99.78.8-2.9-.19-.3a7.83 7.83 0 0 1-1.2-4.14c0-4.34 3.54-7.87 7.9-7.87a7.85 7.85 0 0 1 5.58 2.31 7.8 7.8 0 0 1 2.31 5.57c0 4.34-3.55 7.87-7.89 7.87Zm4.33-5.9c-.24-.12-1.47-.72-1.7-.8-.23-.09-.4-.13-.56.12-.17.24-.65.8-.8.96-.14.17-.29.19-.53.07a6.44 6.44 0 0 1-1.9-1.17 7.1 7.1 0 0 1-1.31-1.63c-.14-.24-.02-.37.1-.5.11-.11.24-.29.36-.43.12-.15.16-.25.24-.41.08-.17.04-.31-.02-.43-.06-.12-.55-1.32-.75-1.8-.2-.48-.4-.41-.55-.42h-.47c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2 0 1.18.86 2.32.98 2.48.12.17 1.7 2.6 4.12 3.64.58.25 1.03.4 1.38.51.58.19 1.11.16 1.53.1.46-.07 1.42-.58 1.62-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28Z" />
    </svg>
  );
}

export function MapPinIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 21s7-5.4 7-11a7 7 0 1 0-14 0c0 5.6 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.6" />
    </svg>
  );
}

export function MailIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3.8 6.5 8.2 6 8.2-6" />
    </svg>
  );
}

export function ClockIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 1.8" />
    </svg>
  );
}

export function QuoteIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M8 4.5h8a2 2 0 0 1 2 2v13l-6-3.2L6 19.5v-13a2 2 0 0 1 2-2Z" />
      <path d="M9.5 9h5M9.5 12h3" />
    </svg>
  );
}

export function ArrowRightIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4.5 12h14M13 6.5l5.5 5.5L13 17.5" />
    </svg>
  );
}

export function CheckIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="m5 12.5 4.5 4.5L19 7" />
    </svg>
  );
}

export function ChevronDownIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="m6 9.5 6 6 6-6" />
    </svg>
  );
}

export function MenuIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

export function GlobeIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 12h17M12 3.5c2.2 2.4 3.3 5.3 3.3 8.5S14.2 18.1 12 20.5c-2.2-2.4-3.3-5.3-3.3-8.5S9.8 5.9 12 3.5Z" />
    </svg>
  );
}

export function WheatIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 21V9" />
      <path d="M12 9c0-2.2 1.3-4 3.2-4.6C15.2 6.6 13.9 8.4 12 9Z" />
      <path d="M12 9c0-2.2-1.3-4-3.2-4.6C8.8 6.6 10.1 8.4 12 9Z" />
      <path d="M12 13.5c0-2.2 1.3-4 3.2-4.6 0 2.2-1.3 4-3.2 4.6Z" />
      <path d="M12 13.5c0-2.2-1.3-4-3.2-4.6 0 2.2 1.3 4 3.2 4.6Z" />
      <path d="M12 18c0-2.2 1.3-4 3.2-4.6 0 2.2-1.3 4-3.2 4.6Z" />
      <path d="M12 18c0-2.2-1.3-4-3.2-4.6 0 2.2 1.3 4 3.2 4.6Z" />
    </svg>
  );
}

export function FactoryIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M3.5 20V10.5l4.8 3V10.5l4.7 3V10.5l4.8 3V20Z" />
      <path d="M17.8 10.5V4.5h2.7v15.5" />
      <path d="M7 17h2.5M12 17h2.5" />
    </svg>
  );
}

export function TruckIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M3.5 7.5h10v8h-10z" />
      <path d="M13.5 11h3.6l2.9 2.9v1.6h-6.5z" />
      <circle cx="7" cy="17.5" r="1.8" />
      <circle cx="16.5" cy="17.5" r="1.8" />
    </svg>
  );
}

export function ShieldIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3.5 5.5 6v6c0 4 2.8 7.2 6.5 8.5 3.7-1.3 6.5-4.5 6.5-8.5V6Z" />
      <path d="m9.2 12 2 2 3.6-3.8" />
    </svg>
  );
}

export function SproutIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 20v-6" />
      <path d="M12 14c0-3 2.3-5.5 5.5-5.5C17.5 11.5 15.2 14 12 14Z" />
      <path d="M12 14c0-2.6-2-4.8-4.6-4.8C7.4 11.8 9.4 14 12 14Z" />
      <path d="M7 20h10" />
    </svg>
  );
}

export function LayersIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="m12 3.5 8.5 4.3-8.5 4.3-8.5-4.3Z" />
      <path d="m4.5 12.4 7.5 3.8 7.5-3.8" />
      <path d="m4.5 16.4 7.5 3.8 7.5-3.8" />
    </svg>
  );
}

export function PlayIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M8 5.5v13l10-6.5Z" />
    </svg>
  );
}
