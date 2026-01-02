import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MobileLayout } from "@/components/layout/MobileLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Camera, MapPin, Upload, X } from "lucide-react";
import { toast } from "sonner";

const categories = [
  { value: "electricity", label: "Listrik", emoji: "💡" },
  { value: "cleanliness", label: "Kebersihan", emoji: "🧹" },
  { value: "water", label: "Air", emoji: "💧" },
  { value: "security", label: "Keamanan", emoji: "🛡️" },
  { value: "road", label: "Jalan", emoji: "🛣️" },
  { value: "other", label: "Lainnya", emoji: "📝" },
];

export default function NewComplaint() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    location: "",
  });
  const [photos, setPhotos] = useState<string[]>([]);

  const handlePhotoUpload = () => {
    // Simulate photo upload
    const dummyPhoto = `https://picsum.photos/200/200?random=${Math.random()}`;
    setPhotos([...photos, dummyPhoto]);
  };

  const removePhoto = (index: number) => {
    setPhotos(photos.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Keluhan berhasil dilaporkan!", {
      description: "Kami akan segera menindaklanjuti laporan Anda.",
    });
    navigate("/complaints");
  };

  return (
    <MobileLayout hideNav>
      <div className="animate-fade-in">
        {/* Header */}
        <div className="bg-card px-5 pt-6 pb-4 border-b border-border sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-lg font-bold text-foreground">Lapor Keluhan Baru</h1>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-5 py-4 space-y-5">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-sm font-medium">
              Judul Keluhan
            </Label>
            <Input
              id="title"
              placeholder="Contoh: Lampu jalan mati"
              className="h-11"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium">Kategori</Label>
            <Select
              value={formData.category}
              onValueChange={(value) => setFormData({ ...formData, category: value })}
            >
              <SelectTrigger className="h-11">
                <SelectValue placeholder="Pilih kategori" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.value} value={cat.value}>
                    <span className="flex items-center gap-2">
                      <span>{cat.emoji}</span>
                      <span>{cat.label}</span>
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-medium">
              Deskripsi
            </Label>
            <Textarea
              id="description"
              placeholder="Jelaskan detail keluhan Anda..."
              className="min-h-[120px] resize-none"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
            />
          </div>

          {/* Photo Upload */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Foto (Opsional)</Label>
            <div className="flex gap-2 flex-wrap">
              {photos.map((photo, index) => (
                <div key={index} className="relative w-20 h-20 rounded-lg overflow-hidden">
                  <img src={photo} alt="" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => removePhoto(index)}
                    className="absolute top-1 right-1 w-5 h-5 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
              {photos.length < 4 && (
                <button
                  type="button"
                  onClick={handlePhotoUpload}
                  className="w-20 h-20 rounded-lg border-2 border-dashed border-border flex flex-col items-center justify-center gap-1 hover:border-primary hover:bg-primary-light transition-colors"
                >
                  <Camera className="w-5 h-5 text-muted-foreground" />
                  <span className="text-[10px] text-muted-foreground">Tambah</span>
                </button>
              )}
            </div>
          </div>

          {/* Location */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Lokasi</Label>
            <Button
              type="button"
              variant="outline"
              className="w-full justify-start gap-2 h-11"
              onClick={() => setFormData({ ...formData, location: "Blok A1, Depan Rumah No. 10" })}
            >
              <MapPin className="w-4 h-4 text-primary" />
              {formData.location || "Set lokasi kejadian"}
            </Button>
          </div>

          {/* Submit */}
          <div className="pt-4">
            <Button type="submit" variant="hero" size="lg" className="w-full">
              <Upload className="w-5 h-5" />
              Kirim Laporan
            </Button>
          </div>
        </form>
      </div>
    </MobileLayout>
  );
}
