import { MobileLayout } from "@/components/layout/MobileLayout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  FileText,
  Receipt,
  Users,
  Bell,
  ChevronRight,
  Cloud,
  Sun,
  AlertCircle,
  CheckCircle,
  Clock,
} from "lucide-react";

const quickActions = [
  { icon: FileText, label: "Lapor Keluhan", path: "/complaints/new", color: "bg-primary" },
  { icon: Receipt, label: "Bayar Iuran", path: "/billing", color: "bg-success" },
  { icon: Users, label: "Undang Tamu", path: "/guests", color: "bg-primary" },
  { icon: Bell, label: "Pengumuman", path: "/announcements", color: "bg-warning" },
];

const neighborProducts = [
  { id: 1, name: "Kue Nastar Homemade", price: 75000, seller: "Blok A1/10", image: "🥧" },
  { id: 2, name: "Jasa Cuci Motor", price: 25000, seller: "Blok B2/05", image: "🏍️" },
  { id: 3, name: "Tanaman Hias", price: 35000, seller: "Blok C3/15", image: "🌱" },
  { id: 4, name: "Snack Box", price: 50000, seller: "Blok A2/08", image: "🍱" },
];

const recentComplaints = [
  { id: 1, title: "Lampu jalan mati", status: "pending", time: "2 jam lalu" },
  { id: 2, title: "Sampah menumpuk", status: "processing", time: "1 hari lalu" },
];

export default function Home() {
  const currentDate = new Date().toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <MobileLayout>
      <div className="animate-fade-in">
        {/* Header */}
        <div className="gradient-hero px-5 pt-6 pb-8 rounded-b-[1.5rem]">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-primary-foreground/80 text-sm">Selamat Pagi,</p>
              <h1 className="text-xl font-bold text-primary-foreground">Budi Santoso</h1>
              <p className="text-primary-foreground/60 text-xs mt-1">{currentDate}</p>
            </div>
            <div className="flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm rounded-full px-3 py-1.5">
              <Sun className="w-4 h-4 text-warning" />
              <span className="text-primary-foreground text-sm font-medium">32°C</span>
            </div>
          </div>
        </div>

        <div className="px-5 -mt-4 space-y-5">
          {/* Status Cards */}
          <div className="grid grid-cols-2 gap-3">
            {/* Dues Status */}
            <Link to="/billing" className="bg-card rounded-xl p-4 shadow-card hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg bg-success-light flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-success" />
                </div>
              </div>
              <p className="text-xs text-muted-foreground">Status Iuran</p>
              <p className="text-sm font-semibold text-success">Lunas</p>
              <p className="text-[10px] text-muted-foreground mt-1">Januari 2026</p>
            </Link>

            {/* Complaints Status */}
            <Link to="/complaints" className="bg-card rounded-xl p-4 shadow-card hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg bg-warning-light flex items-center justify-center">
                  <Clock className="w-4 h-4 text-warning" />
                </div>
              </div>
              <p className="text-xs text-muted-foreground">Keluhan Aktif</p>
              <p className="text-sm font-semibold text-foreground">2 Laporan</p>
              <p className="text-[10px] text-muted-foreground mt-1">1 dalam proses</p>
            </Link>
          </div>

          {/* Quick Actions */}
          <div>
            <h2 className="text-sm font-semibold text-foreground mb-3">Aksi Cepat</h2>
            <div className="grid grid-cols-4 gap-2">
              {quickActions.map((action) => (
                <Link
                  key={action.label}
                  to={action.path}
                  className="flex flex-col items-center gap-2 p-3 rounded-xl bg-card shadow-card hover:shadow-lg transition-all hover:-translate-y-0.5"
                >
                  <div className={`w-10 h-10 rounded-xl ${action.color} flex items-center justify-center`}>
                    <action.icon className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <span className="text-[10px] font-medium text-foreground text-center leading-tight">
                    {action.label}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Neighbor Products */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold text-foreground">Produk & Jasa Tetangga</h2>
              <Link to="/marketplace" className="text-xs text-primary font-medium flex items-center gap-1">
                Lihat Semua
                <ChevronRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="flex gap-3 overflow-x-auto pb-2 -mx-5 px-5 scrollbar-hide">
              {neighborProducts.map((product) => (
                <Link
                  key={product.id}
                  to={`/marketplace/${product.id}`}
                  className="flex-shrink-0 w-32 bg-card rounded-xl p-3 shadow-card hover:shadow-lg transition-shadow"
                >
                  <div className="w-full h-20 bg-muted rounded-lg flex items-center justify-center text-3xl mb-2">
                    {product.image}
                  </div>
                  <p className="text-xs font-medium text-foreground truncate">{product.name}</p>
                  <p className="text-xs font-bold text-primary mt-1">
                    Rp {product.price.toLocaleString("id-ID")}
                  </p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">{product.seller}</p>
                </Link>
              ))}
            </div>
          </div>

          {/* Recent Complaints */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold text-foreground">Keluhan Terbaru</h2>
              <Link to="/complaints" className="text-xs text-primary font-medium flex items-center gap-1">
                Lihat Semua
                <ChevronRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="space-y-2">
              {recentComplaints.map((complaint) => (
                <Link
                  key={complaint.id}
                  to={`/complaints/${complaint.id}`}
                  className="flex items-center gap-3 p-3 bg-card rounded-xl shadow-card hover:shadow-lg transition-shadow"
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    complaint.status === "pending" ? "bg-warning-light" : "bg-primary-light"
                  }`}>
                    {complaint.status === "pending" ? (
                      <AlertCircle className="w-5 h-5 text-warning" />
                    ) : (
                      <Clock className="w-5 h-5 text-primary" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{complaint.title}</p>
                    <p className="text-[10px] text-muted-foreground">{complaint.time}</p>
                  </div>
                  <span className={`text-[10px] font-medium px-2 py-1 rounded-full ${
                    complaint.status === "pending"
                      ? "bg-warning-light text-warning-foreground"
                      : "bg-primary-light text-primary"
                  }`}>
                    {complaint.status === "pending" ? "Pending" : "Diproses"}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </MobileLayout>
  );
}
