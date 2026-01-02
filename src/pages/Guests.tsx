import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MobileLayout } from "@/components/layout/MobileLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ArrowLeft, Plus, QrCode, User, Phone, Calendar, Clock, Copy, Share2 } from "lucide-react";
import { toast } from "sonner";

const activeInvitations = [
  {
    id: 1,
    guestName: "Ahmad Rizki",
    phone: "081234567890",
    arrivalDate: "5 Jan 2026",
    arrivalTime: "14:00",
    status: "active",
  },
  {
    id: 2,
    guestName: "Siti Nurhaliza",
    phone: "082345678901",
    arrivalDate: "6 Jan 2026",
    arrivalTime: "10:00",
    status: "active",
  },
];

export default function Guests() {
  const navigate = useNavigate();
  const [showNewInvitation, setShowNewInvitation] = useState(false);
  const [showQRCode, setShowQRCode] = useState(false);
  const [selectedGuest, setSelectedGuest] = useState<typeof activeInvitations[0] | null>(null);
  const [formData, setFormData] = useState({
    guestName: "",
    phone: "",
    arrivalDate: "",
    arrivalTime: "",
  });

  const handleCreateInvitation = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Undangan berhasil dibuat!", {
      description: "QR Code sudah siap untuk dibagikan ke tamu.",
    });
    setShowNewInvitation(false);
    setFormData({ guestName: "", phone: "", arrivalDate: "", arrivalTime: "" });
  };

  const openQRCode = (guest: typeof activeInvitations[0]) => {
    setSelectedGuest(guest);
    setShowQRCode(true);
  };

  const copyInviteLink = () => {
    navigator.clipboard.writeText("https://warga.connect/invite/abc123");
    toast.success("Link undangan disalin!");
  };

  return (
    <MobileLayout hideNav>
      <div className="animate-fade-in">
        {/* Header */}
        <div className="bg-card px-5 pt-6 pb-4 border-b border-border sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate("/home")}
                className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <h1 className="text-lg font-bold text-foreground">Undang Tamu</h1>
            </div>
            <Button size="sm" className="gap-1" onClick={() => setShowNewInvitation(true)}>
              <Plus className="w-4 h-4" />
              Baru
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="px-5 py-4">
          <h2 className="text-sm font-semibold text-foreground mb-3">Undangan Aktif</h2>

          {activeInvitations.length > 0 ? (
            <div className="space-y-3">
              {activeInvitations.map((invitation) => (
                <div
                  key={invitation.id}
                  className="bg-card rounded-xl p-4 shadow-card"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-primary-light flex items-center justify-center">
                        <User className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{invitation.guestName}</p>
                        <p className="text-[10px] text-muted-foreground">{invitation.phone}</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-medium text-success bg-success-light px-2 py-0.5 rounded-full">
                      Aktif
                    </span>
                  </div>

                  <div className="flex items-center gap-4 mt-3 text-[10px] text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {invitation.arrivalDate}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {invitation.arrivalTime}
                    </span>
                  </div>

                  <div className="flex gap-2 mt-4">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 text-xs"
                      onClick={() => openQRCode(invitation)}
                    >
                      <QrCode className="w-3 h-3" />
                      Lihat QR
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 text-xs"
                      onClick={copyInviteLink}
                    >
                      <Share2 className="w-3 h-3" />
                      Bagikan
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
                <User className="w-8 h-8 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground">Belum ada undangan aktif</p>
            </div>
          )}
        </div>

        {/* New Invitation Dialog */}
        <Dialog open={showNewInvitation} onOpenChange={setShowNewInvitation}>
          <DialogContent className="max-w-sm mx-auto">
            <DialogHeader>
              <DialogTitle>Buat Undangan Baru</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreateInvitation} className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Nama Tamu</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Nama lengkap tamu"
                    className="pl-10 h-11"
                    value={formData.guestName}
                    onChange={(e) => setFormData({ ...formData, guestName: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">No. Telepon Tamu</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="08xxxxxxxxxx"
                    className="pl-10 h-11"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Tanggal</Label>
                  <Input
                    type="date"
                    className="h-11"
                    value={formData.arrivalDate}
                    onChange={(e) => setFormData({ ...formData, arrivalDate: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Jam</Label>
                  <Input
                    type="time"
                    className="h-11"
                    value={formData.arrivalTime}
                    onChange={(e) => setFormData({ ...formData, arrivalTime: e.target.value })}
                    required
                  />
                </div>
              </div>

              <Button type="submit" variant="hero" size="lg" className="w-full">
                Buat Undangan
              </Button>
            </form>
          </DialogContent>
        </Dialog>

        {/* QR Code Dialog */}
        <Dialog open={showQRCode} onOpenChange={setShowQRCode}>
          <DialogContent className="max-w-sm mx-auto">
            <DialogHeader>
              <DialogTitle className="text-center">QR Code Undangan</DialogTitle>
            </DialogHeader>
            {selectedGuest && (
              <div className="text-center mt-4">
                <div className="w-48 h-48 bg-card rounded-xl mx-auto mb-4 flex items-center justify-center border-2 border-border">
                  <QrCode className="w-32 h-32 text-foreground" />
                </div>
                <p className="text-sm font-medium text-foreground">{selectedGuest.guestName}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {selectedGuest.arrivalDate} • {selectedGuest.arrivalTime}
                </p>

                <div className="flex gap-2 mt-6">
                  <Button variant="outline" className="flex-1" onClick={copyInviteLink}>
                    <Copy className="w-4 h-4" />
                    Salin Link
                  </Button>
                  <Button variant="default" className="flex-1">
                    <Share2 className="w-4 h-4" />
                    Bagikan
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </MobileLayout>
  );
}
