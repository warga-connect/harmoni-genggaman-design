import { cn } from "@/lib/utils";

interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

export function Logo({ size = "md", className }: LogoProps) {
  const sizes = {
    sm: "w-10 h-10",
    md: "w-16 h-16",
    lg: "w-24 h-24",
    xl: "w-32 h-32",
  };

  return (
    <div className={cn("relative", sizes[size], className)}>
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* Background Circle */}
        <circle cx="50" cy="50" r="48" fill="hsl(204, 60%, 45%)" />
        
        {/* W Letter with Arrow */}
        <path
          d="M22 30 L32 70 L45 45 L50 55 L55 45 L68 70 L78 30"
          fill="none"
          stroke="white"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        
        {/* Upward Arrow on right leg */}
        <path
          d="M73 35 L73 25 M68 30 L73 25 L78 30"
          fill="none"
          stroke="hsl(145, 63%, 42%)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
