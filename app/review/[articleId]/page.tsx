"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Inter, Libre_Baskerville } from "next/font/google";
import { useToast } from "../../../hooks/use-toast";
import { ArrowLeft, FileText, Clock, BookOpenText, CheckCircle2, AlertCircle, XCircle, Check } from "lucide-react";

// Inisialisasi font
const inter = Inter({ subsets: ["latin"] });
const libreBaskerville = Libre_Baskerville({
  weight: ["400", "700"],
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const mockArticles = [
  {
    id: 1,
    status: "submitted" as const,
    category: "Teknologi & Digital",
    timeAgo: "2 jam lalu",
    title: "Analisis Pertumbuhan Sektor Fintech di Indonesia Kuartal 4 2025",
    author: {
      name: "Dr. Rina Hartanti",
      initials: "RH",
      affiliation: "Universitas Indonesia",
      verified: true,
    },
    wordCount: 654,
  },
  {
    id: 2,
    status: "under-review" as const,
    category: "Kebijakan Publik",
    timeAgo: "1 hari lalu",
    title: "Tantangan Implementasi Carbon Tax di Indonesia",
    author: {
      name: "Prof. Budi Santoso",
      initials: "BS",
      affiliation: "Universitas Gadjah Mada",
      verified: true,
    },
    wordCount: 720,
  },
  {
    id: 3,
    status: "submitted" as const,
    category: "Ekonomi Makro",
    timeAgo: "3 hari lalu",
    title: "Dampak Kenaikan UMP terhadap Daya Saing Industri Manufaktur",
    author: {
      name: "Dr. Maya Putri, M.Econ",
      initials: "MP",
      affiliation: "BRIN",
      verified: true,
    },
    wordCount: 580,
  },
  {
    id: 4,
    status: "approved" as const,
    category: "Ekonomi Makro",
    timeAgo: "5 hari lalu",
    title: "Proyeksi Ekonomi ASEAN 2026: Peluang dan Tantangan",
    author: {
      name: "Dr. Andi Wijaya",
      initials: "AW",
      affiliation: "LIPI",
      verified: true,
    },
    wordCount: 890,
  },
  {
    id: 5,
    status: "published" as const,
    category: "Teknologi & Digital",
    timeAgo: "1 minggu lalu",
    title: "Transformasi Digital UMKM: Studi Kasus Jawa Timur",
    author: {
      name: "Prof. Lina Marina",
      initials: "LM",
      affiliation: "Universitas Airlangga",
      verified: true,
    },
    wordCount: 750,
  },
];

const statusStyles = {
  submitted: { dot: "bg-blue-600", text: "Submitted", bg: "bg-blue-50", textColor: "text-blue-700" },
  "under-review": { dot: "bg-yellow-500", text: "Under Review", bg: "bg-yellow-50", textColor: "text-yellow-800" },
  approved: { dot: "bg-green-600", text: "Approved", bg: "bg-green-50", textColor: "text-green-700" },
  published: { dot: "bg-gray-500", text: "Published", bg: "bg-gray-50", textColor: "text-gray-700" },
};

export default function ArticleReviewPage() {
  const params = useParams();
  const articleId = params?.articleId as string;
  const { toast } = useToast();
  const [article, setArticle] = useState<any>(null);

  useEffect(() => {
    if (articleId) {
      const foundArticle = mockArticles.find((a) => a.id.toString() === articleId);
      if (foundArticle) setArticle(foundArticle);
    }
  }, [articleId]);

  const handleReviewAction = (action: string) => {
    toast({
      title: `Action: ${action}`,
      description: `Memproses artikel: ${article?.title.substring(0, 50)}...`,
    });
  };

  if (!article) return <div className={`p-8 text-center text-gray-600 ${inter.className}`}>Loading...</div>;

  const currentStatus = statusStyles[article.status as keyof typeof statusStyles];

  return (
    <main className={`min-h-screen flex flex-col bg-white ${inter.className}`}>
      {/* Navbar Atas */}
      <div className="sticky top-0 z-10 bg-white border-b border-[#E5E7EB] px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2 px-3 py-1.5 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all">
            <ArrowLeft className="w-4 h-4" />
            Kembali ke Dashboard
          </Link>
          <div className="h-4 bg-gray-200" />
          <div className="flex items-center gap-2 text-sm font-medium text-gray-500">
            <FileText className="w-4 h-4" />
            Preview Artikel
          </div>
        </div>
        <div className={`flex items-center gap-1.5 px-3 py-1 ${currentStatus.bg} ${currentStatus.textColor} rounded-full text-xs font-semibold`}>
          <div className={`w-1.5 h-1.5 rounded-full ${currentStatus.dot}`} />
          {currentStatus.text}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Kolom Kiri: Konten Artikel (Scrollable, Warna Latar Baru #F5F5F5) */}
        <div className="flex-1 overflow-y-auto bg-[#F5F5F5]">
          <div className="max-w-4xl mx-auto px-12 py-12">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-[#0F1729] text-xs font-semibold">{article.category}</span>
              <div className="flex items-center gap-1.5 text-gray-400 text-sm">
                <Clock className="w-4 h-4" />
                {article.timeAgo}
              </div>
              <div className="flex items-center gap-1.5 text-gray-400 text-sm">
                <BookOpenText className="w-4 h-4" />
                {article.wordCount} kata
              </div>
            </div>

            <h1 className="text-4xl font-extrabold text-[#0F1729] mb-8 leading-[1.2]">{article.title}</h1>

            <div className="flex items-center gap-4 mb-10 pb-10 border-b border-[#E5E7EB]">
              <div className="w-12 h-12 flex items-center justify-center bg-slate-900 text-white rounded-full font-normal text-lg">{article.author.initials}</div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-semibold text-slate-900 text-base">{article.author.name}</p>
                  {article.author.verified && (
                    <div className="flex items-center gap-1 px-2.5 py-0.5 bg-[#FEF5E1] text-[#122349] rounded-full text-xs font-medium ">
                      <CheckCircle2 className="w-3 h-3 text-[#122349]" />
                      Verified Expert
                    </div>
                  )}
                </div>
                <p className="text-sm text-slate-500 font-medium">{article.author.affiliation}</p>
              </div>
            </div>

            <article className="prose prose-slate prose-lg max-w-none text-slate-700 leading-relaxed space-y-6">
              <p>
                Industri financial technology (fintech) di Indonesia terus menunjukkan pertumbuhan yang signifikan pada kuartal keempat tahun 2025. Data dari Otoritas Jasa Keuangan (OJK) menunjukkan bahwa total penyaluran pinjaman fintech
                lending mencapai Rp 85,4 triliun, meningkat 22,3% dibandingkan periode yang sama tahun sebelumnya.{" "}
              </p>
              <h2 className="text-xl font-bold text-slate-900 mb-4">Pertumbuhan Segmen Payment</h2>
              <p>
                Segmen pembayaran digital menjadi pendorong utama pertumbuhan sektor fintech. Nilai transaksi pembayaran digital mencapai Rp 120 triliun pada Q4 2025, didorong oleh meningkatnya adopsi QRIS di kalangan UMKM dan pedagang
                ritel. Penetrasi QRIS kini telah mencapai 45 juta merchant, meningkat dari 30 juta di akhir 2024.
              </p>
              <h2 className="text-xl font-bold text-slate-900 mb-4">Tantangan Regulasi</h2>
              <p>
                Di sisi regulasi, OJK telah menerbitkan beberapa kebijakan baru yang bertujuan untuk meningkatkan perlindungan konsumen dan stabilitas industri. Penerapan regulatory sandbox yang lebih ketat telah mendorong konsolidasi di
                industri, dengan jumlah platform fintech lending terdaftar menurun dari 102 menjadi 85 perusahaan.
              </p>
              <p>
                Namun demikian, konsolidasi ini justru meningkatkan kualitas industri secara keseluruhan. Tingkat kredit bermasalah (TWP90) menurun dari 3,2% menjadi 2,8%, menunjukkan perbaikan dalam manajemen risiko di kalangan pemain
                industri.
              </p>
              <h2 className="text-xl font-bold text-slate-900 mb-4">Outlook 2026</h2>
              <p>
                Memasuki tahun 2026, industri fintech Indonesia diproyeksikan akan terus tumbuh dengan didorong oleh beberapa faktor: pertumbuhan ekonomi digital yang kuat, peningkatan literasi keuangan digital, dan dukungan regulasi yang
                lebih kondusif. Kolaborasi antara fintech dan perbankan konvensional juga diprediksi akan semakin intensif melalui model open banking.
              </p>
            </article>

            <div className="mt-16 pt-10 border-t border-[#E5E7EB]">
              <p className="text-sm font-semibold text-slate-400 mb-4 uppercase tracking-[0.7px]">Sumber Data</p>
              <div className="flex gap-2">
                {["OJK", "Bank Indonesia", "AFTECH"].map((s) => (
                  <span key={s} className="px-3 py-1.5 text-slate-600 text-xs font-bold border rounded-full border-[#E5E7EB]">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Kolom Kanan: Panel Review (Sidebar Full Height, Latar Belakang Putih) */}
        <div className="w-95 border-l border-[#E5E7EB] bg-white overflow-y-auto px-8 py-10">
          <div className="sticky top-0">
            <h2 className={"text-xl font-bold text-slate-900 mb-1 " + libreBaskerville.className}>Panel Review</h2>
            <p className="text-sm text-slate-500 mb-8">Ambil keputusan editorial untuk artikel ini</p>

            <div className="bg-white p-5 border border-slate-200 rounded-md mb-10">
              <div className="flex items-center gap-2 mb-4">
                <div className={`flex items-center gap-1.5 px-3 py-1 ${currentStatus.bg} ${currentStatus.textColor} rounded-full text-xs font-medium`}>
                  <div className={`w-1.5 h-1.5 rounded-full ${currentStatus.dot}`} />
                  {currentStatus.text}
                </div>
                <div className="px-3 py-1 text-gray-700 rounded-full text-xs font-semibold border border-gray-200">{article.category}</div>
              </div>
              <h3 className="text-sm font-medium text-slate-900 mb-4 leading-relaxed">{article.title}</h3>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 flex items-center justify-center bg-slate-900 text-white rounded-full font-base text-[10px]">{article.author.initials}</div>
                <p className="font-base text-[#6B7280] text-xs">{article.author.name}</p>
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => handleReviewAction("Approve")}
                className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-[#22c55e] hover:bg-green-600 text-white rounded-md text-sm font-medium transition-all shadow-lg shadow-green-100 cursor-pointer"
              >
                <Check className="w-4 h-4" /> Approve Artikel
              </button>
              <button
                onClick={() => handleReviewAction("Revision")}
                className="w-full flex items-center justify-center gap-2 px-6 py-3.5 border border-amber-200 bg-white hover:bg-amber-50 text-amber-700 rounded-md text-sm font-medium transition-all cursor-pointer"
              >
                <AlertCircle className="w-4 h-4" /> Minta Revisi
              </button>
              <button
                onClick={() => handleReviewAction("Reject")}
                className="w-full flex items-center justify-center gap-2 px-6 py-3.5 border border-red-200 bg-white hover:bg-red-50 text-red-600 rounded-md text-sm font-medium transition-all cursor-pointer"
              >
                <XCircle className="w-4 h-4" /> Tolak Artikel
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
