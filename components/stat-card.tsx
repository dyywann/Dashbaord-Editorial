import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  iconColor: string;
  bgColor: string;
}

export function StatCard({ label, value, icon: Icon, iconColor, bgColor }: StatCardProps) {
  return (
    // TAMBAHKAN class rounded di sini (contoh: rounded-2xl)
    <Card className="p-5 border border-gray-200 bg-white shadow-none rounded-lg">
      <div className="flex items-center gap-4">
        {/* Opsional: Anda juga bisa menyesuaikan rounded icon di sini agar serasi */}
        <div className={`shrink-0 w-14 h-14 flex items-center justify-center rounded-xl ${bgColor}`}>
          <Icon className={`w-6 h-6 ${iconColor}`} strokeWidth={2} />
        </div>

        <div className="flex flex-col">
          <h3 className="text-3xl font-bold text-gray-900 leading-none mb-1.5">{value}</h3>
          <p className="text-gray-500 text-sm font-medium leading-none">{label}</p>
        </div>
      </div>
    </Card>
  );
}
