import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Logo } from "@/components/Logo";

export default function SplashScreen() {
  const navigate = useNavigate();
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => navigate("/onboarding"), 500);
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div
      className={`min-h-screen gradient-hero flex flex-col items-center justify-center transition-opacity duration-500 ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="flex flex-col items-center gap-6 animate-scale-in">
        <Logo size="xl" className="animate-float" />
        <div className="text-center">
          <h1 className="text-3xl font-bold text-primary-foreground tracking-tight">
            Warga Connect
          </h1>
          <p className="text-primary-foreground/80 text-sm mt-2 font-medium">
            Harmoni dalam Satu Genggaman
          </p>
        </div>
      </div>

      <div className="absolute bottom-12 flex gap-1">
        <div className="w-2 h-2 rounded-full bg-primary-foreground/60 animate-pulse-gentle" />
        <div className="w-2 h-2 rounded-full bg-primary-foreground/40 animate-pulse-gentle [animation-delay:0.2s]" />
        <div className="w-2 h-2 rounded-full bg-primary-foreground/20 animate-pulse-gentle [animation-delay:0.4s]" />
      </div>
    </div>
  );
}
