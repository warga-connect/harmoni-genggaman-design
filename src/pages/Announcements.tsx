import { useNavigate } from "react-router-dom";
import { MobileLayout } from "@/components/layout/MobileLayout";
import { ArrowLeft, Bell, Calendar, Pin } from "lucide-react";

const announcements = [
  {
    id: 1,
    title: "Jadwal Pemadaman Listrik",
    content: "Akan ada pemadaman listrik untuk pemeliharaan rutin pada hari Sabtu, 10 Januari 2026 pukul 08:00 - 12:00 WIB.",
    date: "3 Jan 2026",
    isPinned: true,
    category: "Penting",
  },
  {
    id: 2,
    title: "Kerja Bakti Bulanan",
    content: "Mengundang seluruh warga untuk mengikuti kerja bakti bulanan pada hari Minggu, 11 Januari 2026 pukul 07:00 WIB di area taman.",
    date: "2 Jan 2026",
    isPinned: true,
    category: "Kegiatan",
  },
  {
    id: 3,
    title: "Pembayaran Iuran Februari",
    content: "Iuran bulan Februari sudah dapat dibayarkan. Batas waktu pembayaran adalah tanggal 10 Februari 2026.",
    date: "1 Jan 2026",
    isPinned: false,
    category: "Iuran",
  },
  {
    id: 4,
    title: "Selamat Tahun Baru 2026",
    content: "Pengurus RT/RW mengucapkan Selamat Tahun Baru 2026. Semoga tahun ini membawa kebaikan untuk kita semua.",
    date: "1 Jan 2026",
    isPinned: false,
    category: "Umum",
  },
];

export default function Announcements() {
  const navigate = useNavigate();

  return (
    <MobileLayout hideNav>
      <div className="animate-fade-in">
        {/* Header */}
        <div className="bg-card px-5 pt-6 pb-4 border-b border-border sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/home")}
              className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-lg font-bold text-foreground">Pengumuman</h1>
          </div>
        </div>

        {/* Content */}
        <div className="px-5 py-4 space-y-3">
          {announcements.map((announcement) => (
            <div
              key={announcement.id}
              className="bg-card rounded-xl p-4 shadow-card"
            >
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  announcement.isPinned ? "bg-warning-light" : "bg-primary-light"
                }`}>
                  {announcement.isPinned ? (
                    <Pin className="w-5 h-5 text-warning" />
                  ) : (
                    <Bell className="w-5 h-5 text-primary" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
                      announcement.category === "Penting"
                        ? "bg-destructive/10 text-destructive"
                        : announcement.category === "Kegiatan"
                        ? "bg-success-light text-success"
                        : "bg-muted text-muted-foreground"
                    }`}>
                      {announcement.category}
                    </span>
                  </div>
                  <h3 className="text-sm font-semibold text-foreground">
                    {announcement.title}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                    {announcement.content}
                  </p>
                  <div className="flex items-center gap-1 mt-2 text-[10px] text-muted-foreground">
                    <Calendar className="w-3 h-3" />
                    {announcement.date}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MobileLayout>
  );
}
