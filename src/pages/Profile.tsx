import { useNavigate } from "react-router-dom";
import { MobileLayout } from "@/components/layout/MobileLayout";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";
import {
  User,
  Home,
  Phone,
  Mail,
  Edit3,
  Bell,
  HelpCircle,
  Shield,
  LogOut,
  ChevronRight,
  Moon,
} from "lucide-react";
import { toast } from "sonner";

const menuItems = [
  { icon: Edit3, label: "Edit Profil", path: "/profile/edit" },
  { icon: Bell, label: "Notifikasi", path: "/settings/notifications" },
  { icon: Shield, label: "Keamanan", path: "/settings/security" },
  { icon: HelpCircle, label: "Bantuan & Dukungan", path: "/help" },
];

export default function Profile() {
  const navigate = useNavigate();

  const handleLogout = () => {
    toast.success("Berhasil keluar dari akun");
    navigate("/login");
  };

  const user = {
    name: "Budi Santoso",
    email: "budi.santoso@email.com",
    phone: "081234567890",
    block: "A1",
    houseNumber: "10",
  };

  return (
    <MobileLayout>
      <div className="animate-fade-in">
        {/* Header */}
        <div className="gradient-hero px-5 pt-8 pb-12 rounded-b-[1.5rem]">
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 rounded-full bg-primary-foreground/20 flex items-center justify-center mb-3 ring-4 ring-primary-foreground/30">
              <User className="w-10 h-10 text-primary-foreground" />
            </div>
            <h1 className="text-xl font-bold text-primary-foreground">{user.name}</h1>
            <p className="text-primary-foreground/80 text-sm mt-1">
              Blok {user.block} / No. {user.houseNumber}
            </p>
          </div>
        </div>

        <div className="px-5 -mt-6 space-y-5">
          {/* Info Card */}
          <div className="bg-card rounded-xl p-4 shadow-card">
            <h2 className="text-sm font-semibold text-foreground mb-3">Informasi Kontak</h2>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground">Email</p>
                  <p className="text-sm text-foreground">{user.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground">Telepon</p>
                  <p className="text-sm text-foreground">{user.phone}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center">
                  <Home className="w-4 h-4 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground">Alamat</p>
                  <p className="text-sm text-foreground">
                    Blok {user.block}, No. {user.houseNumber}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Menu */}
          <div className="bg-card rounded-xl shadow-card overflow-hidden">
            {menuItems.map((item, index) => (
              <button
                key={item.label}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-3 p-4 hover:bg-muted/50 transition-colors ${
                  index !== menuItems.length - 1 ? "border-b border-border" : ""
                }`}
              >
                <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center">
                  <item.icon className="w-4 h-4 text-muted-foreground" />
                </div>
                <span className="flex-1 text-sm font-medium text-foreground text-left">
                  {item.label}
                </span>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </button>
            ))}
          </div>

          {/* Logout */}
          <Button
            variant="outline"
            className="w-full border-destructive text-destructive hover:bg-destructive/10"
            onClick={handleLogout}
          >
            <LogOut className="w-4 h-4" />
            Keluar dari Akun
          </Button>

          {/* App Info */}
          <div className="flex flex-col items-center py-6 opacity-60">
            <Logo size="sm" />
            <p className="text-xs text-muted-foreground mt-2">Warga Connect v1.0.0</p>
            <p className="text-[10px] text-muted-foreground">Harmoni dalam Satu Genggaman</p>
          </div>
        </div>
      </div>
    </MobileLayout>
  );
}
