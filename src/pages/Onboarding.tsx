import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FileText, ShoppingBag, Receipt, ChevronRight } from "lucide-react";

const slides = [
  {
    icon: FileText,
    title: "Lapor Keluhan Cepat",
    description: "Laporkan masalah lingkungan dengan mudah dan pantau progresnya secara real-time.",
    color: "bg-primary",
  },
  {
    icon: ShoppingBag,
    title: "Belanja Antar Tetangga",
    description: "Temukan produk dan jasa dari tetangga Anda. Dukung ekonomi lokal komunitas.",
    color: "bg-success",
  },
  {
    icon: Receipt,
    title: "Iuran Otomatis",
    description: "Bayar iuran bulanan dengan mudah dan lihat riwayat pembayaran kapan saja.",
    color: "bg-primary",
  },
];

export default function Onboarding() {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      navigate("/login");
    }
  };

  const skipToLogin = () => {
    navigate("/login");
  };

  const slide = slides[currentSlide];
  const Icon = slide.icon;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Skip Button */}
      <div className="flex justify-end p-4">
        <Button variant="ghost" onClick={skipToLogin} className="text-muted-foreground">
          Lewati
        </Button>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 animate-fade-in" key={currentSlide}>
        <div className={`w-32 h-32 rounded-3xl ${slide.color} flex items-center justify-center mb-8 shadow-lg`}>
          <Icon className="w-16 h-16 text-primary-foreground" />
        </div>
        <h2 className="text-2xl font-bold text-foreground text-center mb-4">
          {slide.title}
        </h2>
        <p className="text-muted-foreground text-center max-w-xs leading-relaxed">
          {slide.description}
        </p>
      </div>

      {/* Pagination & Button */}
      <div className="p-8 space-y-6">
        {/* Dots */}
        <div className="flex justify-center gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "w-8 bg-primary"
                  : "w-2 bg-muted-foreground/30"
              }`}
            />
          ))}
        </div>

        {/* Next Button */}
        <Button onClick={nextSlide} variant="hero" size="xl" className="w-full">
          {currentSlide < slides.length - 1 ? (
            <>
              Lanjut
              <ChevronRight className="w-5 h-5" />
            </>
          ) : (
            "Mulai Sekarang"
          )}
        </Button>
      </div>
    </div>
  );
}
