import React from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
}

export const Mosque: React.FC<IconProps> = ({ size = 24, className, ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      {/* Puncak Kubah - Hilal Bulan Sabit Tipis */}
      <path d="M12 2.5c-.3 0-.6.2-.6.5s.3.5.6.5.6-.2.6-.5-.3-.5-.6-.5z" />
      <path d="M12 3.5v2" />
      
      {/* Garis Siluet Kubah Bawang Islami Geometris */}
      <path d="M12 5.5c-3.2 0-5.2 2.8-5.2 6v4h10.4v-6c0-3.2-2-6-5.2-6z" strokeWidth="2" />
      
      {/* Pondasi Pilar Luar */}
      <path d="M3 21.5h18" />
      <path d="M5.5 15.5v6" />
      <path d="M18.5 15.5v6" />
      
      {/* Gerbang Melengkung Indah (Mihrab) */}
      <path d="M9.5 21.5v-4.5c0-1.38 1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5v4.5" />
      
      {/* Aksen Garis Kubah Vertikal Minimalis */}
      <path d="M12 5.5v10" strokeWidth="1" strokeDasharray="1.5 1.5" />
    </svg>
  );
};

export default Mosque;
