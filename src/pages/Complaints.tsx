import { useState } from "react";
import { Link } from "react-router-dom";
import { MobileLayout } from "@/components/layout/MobileLayout";
import { Button } from "@/components/ui/button";
import {
  Plus,
  AlertCircle,
  Clock,
  CheckCircle,
  ChevronRight,
  Lightbulb,
  Trash2,
  Droplets,
  Shield,
} from "lucide-react";

const complaints = [
  {
    id: 1,
    title: "Lampu jalan mati di Blok A",
    category: "Listrik",
    status: "pending",
    time: "2 jam lalu",
    icon: Lightbulb,
  },
  {
    id: 2,
    title: "Sampah menumpuk dekat taman",
    category: "Kebersihan",
    status: "processing",
    time: "1 hari lalu",
    icon: Trash2,
  },
  {
    id: 3,
    title: "Pipa air bocor",
    category: "Air",
    status: "done",
    time: "3 hari lalu",
    icon: Droplets,
  },
  {
    id: 4,
    title: "Pos satpam kosong malam hari",
    category: "Keamanan",
    status: "processing",
    time: "5 hari lalu",
    icon: Shield,
  },
];

const statusConfig = {
  pending: {
    label: "Pending",
    bgColor: "bg-warning-light",
    textColor: "text-warning-foreground",
    icon: AlertCircle,
    iconColor: "text-warning",
  },
  processing: {
    label: "Diproses",
    bgColor: "bg-primary-light",
    textColor: "text-primary",
    icon: Clock,
    iconColor: "text-primary",
  },
  done: {
    label: "Selesai",
    bgColor: "bg-success-light",
    textColor: "text-success",
    icon: CheckCircle,
    iconColor: "text-success",
  },
};

type StatusType = keyof typeof statusConfig;

export default function Complaints() {
  const [filter, setFilter] = useState<StatusType | "all">("all");

  const filteredComplaints =
    filter === "all" ? complaints : complaints.filter((c) => c.status === filter);

  return (
    <MobileLayout>
      <div className="animate-fade-in">
        {/* Header */}
        <div className="bg-card px-5 pt-6 pb-4 border-b border-border sticky top-0 z-10">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-bold text-foreground">Laporan Keluhan</h1>
            <Link to="/complaints/new">
              <Button size="sm" className="gap-1">
                <Plus className="w-4 h-4" />
                Baru
              </Button>
            </Link>
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
            {[
              { key: "all", label: "Semua" },
              { key: "pending", label: "Pending" },
              { key: "processing", label: "Diproses" },
              { key: "done", label: "Selesai" },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setFilter(tab.key as StatusType | "all")}
                className={`px-4 py-2 rounded-full text-xs font-medium transition-all whitespace-nowrap ${
                  filter === tab.key
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Complaints List */}
        <div className="px-5 py-4 space-y-3">
          {filteredComplaints.map((complaint) => {
            const status = statusConfig[complaint.status as StatusType];
            const CategoryIcon = complaint.icon;
            const StatusIcon = status.icon;

            return (
              <Link
                key={complaint.id}
                to={`/complaints/${complaint.id}`}
                className="flex items-center gap-3 p-4 bg-card rounded-xl shadow-card hover:shadow-lg transition-all"
              >
                <div className={`w-12 h-12 rounded-xl ${status.bgColor} flex items-center justify-center`}>
                  <CategoryIcon className={`w-6 h-6 ${status.iconColor}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    {complaint.title}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                      {complaint.category}
                    </span>
                    <span className="text-[10px] text-muted-foreground">{complaint.time}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`flex items-center gap-1 text-[10px] font-medium px-2 py-1 rounded-full ${status.bgColor} ${status.textColor}`}>
                    <StatusIcon className="w-3 h-3" />
                    {status.label}
                  </span>
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </div>
              </Link>
            );
          })}

          {filteredComplaints.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
                <AlertCircle className="w-8 h-8 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground">Tidak ada keluhan</p>
            </div>
          )}
        </div>
      </div>
    </MobileLayout>
  );
}
