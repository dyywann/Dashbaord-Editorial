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
    <Card className="p-5 border border-gray-200 bg-white hover:shadow-md transition-shadow">
      <div className="flex items-center gap-4">
        {/* Class flex-shrink-0 sudah diubah menjadi shrink-0 di bawah ini */}
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
