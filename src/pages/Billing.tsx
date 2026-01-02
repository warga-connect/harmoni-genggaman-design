import { useState } from "react";
import { MobileLayout } from "@/components/layout/MobileLayout";
import { Button } from "@/components/ui/button";
import {
  CheckCircle,
  Clock,
  Receipt,
  CreditCard,
  QrCode,
  Building2,
  ChevronRight,
  Download,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";

const billingHistory = [
  { id: 1, month: "Januari 2026", amount: 350000, status: "paid", paidDate: "2 Jan 2026" },
  { id: 2, month: "Desember 2025", amount: 350000, status: "paid", paidDate: "1 Des 2025" },
  { id: 3, month: "November 2025", amount: 350000, status: "paid", paidDate: "3 Nov 2025" },
  { id: 4, month: "Oktober 2025", amount: 350000, status: "paid", paidDate: "1 Okt 2025" },
];

const paymentMethods = [
  { id: "qris", name: "QRIS", icon: QrCode, description: "Scan & bayar" },
  { id: "va", name: "Virtual Account", icon: Building2, description: "Transfer bank" },
  { id: "card", name: "Kartu Debit/Kredit", icon: CreditCard, description: "Visa, Mastercard" },
];

export default function Billing() {
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);

  const currentBill = {
    month: "Februari 2026",
    amount: 350000,
    dueDate: "10 Februari 2026",
    details: [
      { name: "Iuran Keamanan", amount: 150000 },
      { name: "Iuran Kebersihan", amount: 100000 },
      { name: "Iuran Sosial", amount: 50000 },
      { name: "Pemeliharaan", amount: 50000 },
    ],
  };

  const handlePayment = () => {
    toast.success("Pembayaran berhasil!", {
      description: "Terima kasih telah membayar iuran tepat waktu.",
    });
    setShowPaymentDialog(false);
  };

  return (
    <MobileLayout>
      <div className="animate-fade-in">
        {/* Header */}
        <div className="gradient-hero px-5 pt-6 pb-8 rounded-b-[1.5rem]">
          <h1 className="text-xl font-bold text-primary-foreground mb-4">Iuran & Pembayaran</h1>

          {/* Current Bill Card */}
          <div className="bg-card rounded-xl p-4 shadow-lg">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-muted-foreground">Tagihan {currentBill.month}</span>
              <span className="text-[10px] font-medium text-warning bg-warning-light px-2 py-0.5 rounded-full">
                Belum Lunas
              </span>
            </div>
            <p className="text-2xl font-bold text-foreground">
              Rp {currentBill.amount.toLocaleString("id-ID")}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Jatuh tempo: {currentBill.dueDate}
            </p>
            <Button
              onClick={() => setShowPaymentDialog(true)}
              variant="hero"
              size="lg"
              className="w-full mt-4"
            >
              Bayar Sekarang
            </Button>
          </div>
        </div>

        <div className="px-5 -mt-4 space-y-5">
          {/* Bill Details */}
          <div className="bg-card rounded-xl p-4 shadow-card">
            <h2 className="text-sm font-semibold text-foreground mb-3">Rincian Tagihan</h2>
            <div className="space-y-2">
              {currentBill.details.map((item, index) => (
                <div key={index} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                  <span className="text-sm text-muted-foreground">{item.name}</span>
                  <span className="text-sm font-medium text-foreground">
                    Rp {item.amount.toLocaleString("id-ID")}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Payment History */}
          <div>
            <h2 className="text-sm font-semibold text-foreground mb-3">Riwayat Pembayaran</h2>
            <div className="space-y-2">
              {billingHistory.map((bill) => (
                <div
                  key={bill.id}
                  className="flex items-center gap-3 p-4 bg-card rounded-xl shadow-card"
                >
                  <div className="w-10 h-10 rounded-xl bg-success-light flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-success" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{bill.month}</p>
                    <p className="text-[10px] text-muted-foreground">Dibayar {bill.paidDate}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-foreground">
                      Rp {bill.amount.toLocaleString("id-ID")}
                    </p>
                    <span className="text-[10px] font-medium text-success">Lunas</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Payment Dialog */}
        <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
          <DialogContent className="max-w-sm mx-auto">
            <DialogHeader>
              <DialogTitle>Pilih Metode Pembayaran</DialogTitle>
            </DialogHeader>
            <div className="space-y-3 mt-4">
              {paymentMethods.map((method) => (
                <button
                  key={method.id}
                  onClick={() => setSelectedMethod(method.id)}
                  className={`w-full flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${
                    selectedMethod === method.id
                      ? "border-primary bg-primary-light"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                    <method.icon className="w-5 h-5 text-foreground" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-sm font-medium text-foreground">{method.name}</p>
                    <p className="text-[10px] text-muted-foreground">{method.description}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </button>
              ))}
            </div>

            {selectedMethod && (
              <div className="mt-4 p-4 bg-muted rounded-xl text-center">
                {selectedMethod === "qris" && (
                  <>
                    <div className="w-40 h-40 bg-card rounded-lg mx-auto mb-3 flex items-center justify-center border">
                      <QrCode className="w-24 h-24 text-foreground" />
                    </div>
                    <p className="text-xs text-muted-foreground">Scan QR code untuk membayar</p>
                  </>
                )}
                {selectedMethod === "va" && (
                  <>
                    <p className="text-xs text-muted-foreground mb-2">Virtual Account BCA</p>
                    <p className="text-lg font-bold font-mono text-foreground">8800 1234 5678 9012</p>
                  </>
                )}
              </div>
            )}

            <Button
              onClick={handlePayment}
              variant="hero"
              size="lg"
              className="w-full mt-4"
              disabled={!selectedMethod}
            >
              Konfirmasi Pembayaran
            </Button>
          </DialogContent>
        </Dialog>
      </div>
    </MobileLayout>
  );
}
