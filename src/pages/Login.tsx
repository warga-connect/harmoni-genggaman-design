import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Logo } from "@/components/Logo";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login
    navigate("/home");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="gradient-hero pt-12 pb-16 px-6 rounded-b-[2rem]">
        <div className="flex flex-col items-center animate-slide-up">
          <Logo size="lg" />
          <h1 className="text-2xl font-bold text-primary-foreground mt-4">
            Selamat Datang
          </h1>
          <p className="text-primary-foreground/80 text-sm mt-1">
            Masuk ke akun Warga Connect Anda
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="flex-1 px-6 -mt-8">
        <div className="bg-card rounded-2xl shadow-card p-6 animate-scale-in">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Email atau No. Telepon
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="text"
                  placeholder="nama@email.com"
                  className="pl-10 h-12"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">
                Kata Sandi
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="pl-10 pr-10 h-12"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex justify-end">
              <button type="button" className="text-sm text-primary font-medium hover:underline">
                Lupa kata sandi?
              </button>
            </div>

            <Button type="submit" variant="hero" size="lg" className="w-full">
              Masuk
            </Button>
          </form>
        </div>

        <p className="text-center mt-6 text-muted-foreground">
          Belum punya akun?{" "}
          <Link to="/register" className="text-primary font-semibold hover:underline">
            Daftar
          </Link>
        </p>
      </div>
    </div>
  );
}
