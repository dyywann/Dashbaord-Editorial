"use client"; // Wajib ada agar tombol onClick bisa berfungsi di Next.js App Router

import { Eye, MoreVertical, CheckCircle2, Globe } from "lucide-react";

interface Author {
  name: string;
  initials: string;
  affiliation: string;
  verified: boolean;
}

interface ArticleCardProps {
  status: "submitted" | "under-review" | "approved" | "published";
  category: string;
  timeAgo: string;
  title: string;
  author: Author;
  wordCount: number;
  onReviewClick?: () => void; // Prop ini yang menangkap klik dari Dashboard
  onPublishClick?: () => void;
}

const statusStyles = {
  submitted: {
    dot: "bg-blue-600",
    text: "Submitted",
    bg: "bg-blue-50",
    textColor: "text-blue-700",
  },
  "under-review": {
    dot: "bg-yellow-500",
    text: "Under Review",
    bg: "bg-yellow-50",
    textColor: "text-yellow-800",
  },
  approved: {
    dot: "bg-green-600",
    text: "Approved",
    bg: "bg-green-50",
    textColor: "text-green-700",
  },
  published: {
    dot: "bg-gray-500",
    text: "Published",
    bg: "bg-gray-50",
    textColor: "text-gray-700",
  },
};

export function ArticleCard({ status, category, timeAgo, title, author, wordCount, onReviewClick, onPublishClick }: ArticleCardProps) {
  const currentStatus = statusStyles[status];

  return (
    <div className="bg-white p-6 border border-gray-200 rounded-lg shadow-sm hover:border-blue-300 transition-colors">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className={`flex items-center gap-1.5 px-3 py-1 ${currentStatus.bg} ${currentStatus.textColor} rounded-full text-xs font-medium`}>
            <div className={`w-1.5 h-1.5 rounded-full ${currentStatus.dot}`} />
            {currentStatus.text}
          </div>
          <div className="px-3 py-1 text-gray-700 rounded-full text-xs font-semibold border border-gray-200">{category}</div>
          <div className="text-gray-500 text-xs ml-1">{timeAgo}</div>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-gray-500 text-xs">{wordCount} kata</div>

          {status === "approved" && (
            <button onClick={onPublishClick} className="flex items-center gap-2 px-4 py-2 bg-[#22c55e] hover:bg-green-600 text-white rounded-md text-sm font-medium transition-colors cursor-pointer">
              <Globe className="w-4 h-4" />
              Publish
            </button>
          )}

          {/* Tombol Review */}
          <button onClick={onReviewClick} className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-md text-sm font-medium text-gray-900 hover:bg-gray-50 transition-colors cursor-pointer">
            <Eye className="w-4 h-4 text-gray-600" />
            Review
          </button>

          <MoreVertical className="w-5 h-5 text-gray-500 hover:text-gray-700 cursor-pointer" />
        </div>
      </div>

      <h3 className="text-lg font-bold text-gray-900 mb-6 leading-snug">{title}</h3>

      <div className="flex items-center gap-4">
        <div className="w-10 h-10 flex items-center justify-center bg-blue-950 text-white rounded-full font-normal text-base">{author.initials}</div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <p className="font-semibold text-gray-900 text-sm">{author.name}</p>
            {author.verified && (
              <div className="flex items-center gap-1 px-2.5 py-0.5 bg-yellow-50 text-yellow-800 rounded-full text-xs font-medium border border-yellow-200">
                <CheckCircle2 className="w-3 h-3 text-yellow-700" />
                Verified Expert
              </div>
            )}
          </div>
          <p className="text-xs font-normal text-gray-500">{author.affiliation}</p>
        </div>
      </div>
    </div>
  );
}
