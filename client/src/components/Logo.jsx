export default function Logo({ size = 26 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M4 15.5L16 5L28 15.5"
        stroke="var(--color-accent)"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7 13.5V27H25V13.5"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect x="13.5" y="18" width="5" height="9" rx="0.5" stroke="currentColor" strokeWidth="2.2" />
      <circle cx="16" cy="9.4" r="1.6" fill="var(--color-accent)" />
    </svg>
  );
}
