"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Inter, Libre_Baskerville } from "next/font/google";
import { useToast } from "../../../hooks/use-toast";
import { ArrowLeft, FileText, Clock, BookOpenText, CheckCircle2, AlertCircle, XCircle, Check, Send, MessageSquare } from "lucide-react";

// Inisialisasi font
const inter = Inter({ subsets: ["latin"] });
const libreBaskerville = Libre_Baskerville({
  weight: ["400", "700"],
  subsets: ["latin"],
  style: ["normal", "italic"],
});

// Daftar alasan revisi
const REVISION_REASONS = [
  "Data atau statistik perlu diperbarui",
  "Narasi kurang objektif / terlalu opini",
  "Referensi/sumber belum lengkap",
  "Visualisasi data tidak sesuai standar",
  "Struktur artikel perlu diperbaiki",
  "Judul kurang mencerminkan isi",
  "Kesalahan fakta atau interpretasi data",
];

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
    editorNote: {
      reasons: ["Data atau statistik perlu diperbarui"],
      text: "Tolong perbarui data angka penyaluran pinjaman Q4 dengan laporan resmi terbaru dari OJK agar lebih valid.",
    },
  },
  {
    id: 2,
    status: "under-review" as const, // Status awal
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
    editorNote: {
      reasons: ["Referensi/sumber belum lengkap", "Struktur artikel perlu diperbaiki"],
      text: "Pastikan penulis sudah menyertakan perbandingan UMP spesifik untuk wilayah Jawa Tengah dan Jawa Timur seperti yang diminta pada rapat redaksi kemarin.",
    },
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

// Menambahkan styling untuk status 'rejected'
const statusStyles = {
  submitted: { dot: "bg-blue-600", text: "Submitted", bg: "bg-blue-50", textColor: "text-blue-700" },
  "under-review": { dot: "bg-yellow-500", text: "Under Review", bg: "bg-yellow-50", textColor: "text-yellow-800" },
  approved: { dot: "bg-green-600", text: "Approved", bg: "bg-green-50", textColor: "text-green-700" },
  published: { dot: "bg-gray-500", text: "Published", bg: "bg-gray-50", textColor: "text-gray-700" },
  rejected: { dot: "bg-red-600", text: "Rejected", bg: "bg-red-50", textColor: "text-red-700" },
};

export default function ArticleReviewPage() {
  const params = useParams();
  const articleId = params?.articleId as string;
  const { toast } = useToast();
  const [article, setArticle] = useState<any>(null);

  // State untuk form Panel (ditambah "reject")
  const [activePanel, setActivePanel] = useState<"default" | "revision" | "reject">("default");

  // State isi form
  const [selectedReasons, setSelectedReasons] = useState<string[]>([]);
  const [revisionNotes, setRevisionNotes] = useState("");
  const [rejectReason, setRejectReason] = useState("");

  useEffect(() => {
    if (articleId) {
      const foundArticle = mockArticles.find((a) => a.id.toString() === articleId);
      if (foundArticle) setArticle(foundArticle);
    }
  }, [articleId]);

  const handleReviewAction = (action: string) => {
    if (action === "Revision") {
      setActivePanel("revision");
      return;
    }

    // Logika jika klik Tolak
    if (action === "Reject") {
      setActivePanel("reject");
      return;
    }

    if (action === "Approve") {
      setArticle((prev: any) => ({ ...prev, status: "approved" }));
      toast({
        title: "Artikel Disetujui",
        description: "Artikel berhasil di-approve dan siap dipublish.",
      });
      return;
    }
  };

  const handleToggleReason = (reason: string) => {
    setSelectedReasons((prev) => (prev.includes(reason) ? prev.filter((r) => r !== reason) : [...prev, reason]));
  };

  // Submit untuk Minta Revisi
  const handleSubmitRevision = () => {
    if (selectedReasons.length === 0 && revisionNotes.trim() === "") {
      toast({ title: "Gagal Mengirim", description: "Pilih minimal satu alasan atau isi catatan tambahan." });
      return;
    }

    setArticle((prev: any) => ({
      ...prev,
      status: "submitted",
      editorNote: { reasons: selectedReasons, text: revisionNotes },
    }));

    toast({ title: "Revisi Terkirim", description: "Permintaan revisi telah dikirim ke penulis." });
    setActivePanel("default");
    setSelectedReasons([]);
    setRevisionNotes("");
  };

  // Submit untuk Tolak Artikel
  const handleSubmitReject = () => {
    if (rejectReason.trim() === "") {
      toast({ title: "Gagal Mengirim", description: "Alasan penolakan wajib diisi." });
      return;
    }

    // Ubah status menjadi rejected dan simpan alasannya
    setArticle((prev: any) => ({
      ...prev,
      status: "rejected",
      editorNote: { reasons: [], text: rejectReason },
    }));

    toast({ title: "Artikel Ditolak", description: "Pemberitahuan penolakan telah dikirim ke penulis." });
    setActivePanel("default");
    setRejectReason("");
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
        <div className={`flex items-center gap-1.5 px-3 py-1 ${currentStatus.bg} ${currentStatus.textColor} rounded-full text-xs font-semibold transition-colors duration-500`}>
          <div className={`w-1.5 h-1.5 rounded-full ${currentStatus.dot}`} />
          {currentStatus.text}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Kolom Kiri: Konten Artikel */}
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

        {/* Kolom Kanan: Panel Review */}
        <div className="w-105 border-l border-[#E5E7EB] bg-white overflow-y-auto px-8 py-10 relative">
          <h2 className={"text-xl font-bold text-slate-900 mb-1 " + libreBaskerville.className}>Panel Review</h2>
          <p className="text-sm text-slate-500 mb-8">Ambil keputusan editorial untuk artikel ini</p>

          <div className="bg-white p-5 border border-slate-200 rounded-md mb-10">
            <div className="flex items-center gap-2 mb-4">
              <div className={`flex items-center gap-1.5 px-3 py-1 ${currentStatus.bg} ${currentStatus.textColor} rounded-full text-xs font-medium transition-colors duration-500`}>
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

          {/* LOGIKA KONDISI: Render berdasarkan status artikel */}

          {article.status === "under-review" &&
            (activePanel === "default" ? (
              /* KONDISI 1A: TAMPILAN DEFAULT (3 TOMBOL) */
              <div className="space-y-3 animate-in fade-in slide-in-from-right-4 duration-300">
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
            ) : activePanel === "revision" ? (
              /* KONDISI 1B: FORM MINTA REVISI */
              <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-semibold text-slate-900 text-base">Minta Revisi</h3>
                  <button
                    onClick={() => {
                      setActivePanel("default");
                      setSelectedReasons([]);
                      setRevisionNotes("");
                    }}
                    className="text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
                  >
                    Batal
                  </button>
                </div>

                <div className="space-y-3.5 mb-8">
                  {REVISION_REASONS.map((reason) => (
                    <label key={reason} className="flex items-start gap-3 cursor-pointer group">
                      <input type="checkbox" className="sr-only" checked={selectedReasons.includes(reason)} onChange={() => handleToggleReason(reason)} />
                      <div className="mt-0.5 flex items-center justify-center w-4 h-4 rounded border border-gray-200 bg-white transition-all flex-shrink-0 group-hover:border-gray-300 group-has-[:checked]:bg-[#f97316] group-has-[:checked]:border-[#f97316] group-focus-within:ring-2 group-focus-within:ring-orange-500/20">
                        <Check className="w-3 h-3 text-white opacity-0 transition-opacity group-has-[:checked]:opacity-100" strokeWidth={4} />
                      </div>
                      <span className="text-sm font-medium text-slate-600 group-hover:text-slate-900 leading-snug">{reason}</span>
                    </label>
                  ))}
                </div>

                <div className="mb-8">
                  <h3 className="font-semibold text-slate-900 text-sm mb-3">Catatan Tambahan</h3>
                  <textarea
                    className="w-full border border-gray-200 rounded-md p-4 text-sm bg-gray-50 focus:bg-white focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all resize-none placeholder:text-gray-400"
                    rows={4}
                    placeholder="Tulis catatan detail..."
                    value={revisionNotes}
                    onChange={(e) => setRevisionNotes(e.target.value)}
                  />
                </div>

                <button
                  onClick={handleSubmitRevision}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-[#f97316] hover:bg-orange-600 text-white rounded-md text-sm font-medium transition-all shadow-md shadow-orange-100 cursor-pointer"
                >
                  <Send className="w-4 h-4" /> Kirim Permintaan Revisi
                </button>
              </div>
            ) : (
              /* KONDISI 1C: FORM TOLAK ARTIKEL */
              <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-semibold text-slate-900 text-base">Tolak Artikel</h3>
                  <button
                    onClick={() => {
                      setActivePanel("default");
                      setRejectReason("");
                    }}
                    className="text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
                  >
                    Batal
                  </button>
                </div>

                <div className="mb-8">
                  <h3 className="font-semibold text-slate-900 text-sm mb-3">
                    Alasan Penolakan<span className="text-red-500">*</span>
                  </h3>
                  <textarea
                    className="w-full border border-gray-200 rounded-md p-4 text-sm bg-gray-50 focus:bg-white focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all resize-none placeholder:text-gray-400"
                    rows={6}
                    placeholder="Jelaskan alasan penolakan..."
                    value={rejectReason}
                    onChange={(e) => setRejectReason(e.target.value)}
                  />
                </div>

                <button
                  onClick={handleSubmitReject}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-red-500 hover:bg-red-600 text-white rounded-md text-sm font-medium transition-all shadow-md shadow-red-100 cursor-pointer"
                >
                  <XCircle className="w-4 h-4" /> Tolak Artikel
                </button>
              </div>
            ))}

          {article.status === "submitted" && (
            /* KONDISI 2: TAMPILAN JIKA MENUNGGU JURNALIS (SUBMITTED) */
            <div className="bg-[#FFF7ED] border border-[#FFEDD5] rounded-xl p-6 animate-in fade-in duration-500">
              <div className="flex items-center gap-2 mb-4">
                <Clock className="w-5 h-5 text-orange-500" />
                <h4 className="font-bold text-slate-900 text-base">Menunggu Revisi Jurnalis</h4>
              </div>
              <p className="text-sm text-slate-600 mb-5 leading-relaxed">Anda telah mengirimkan artikel ini kembali kepada jurnalis. Berikut adalah catatan editorial yang sedang mereka kerjakan:</p>

              {article.editorNote?.reasons && article.editorNote.reasons.length > 0 && (
                <div className="mb-4">
                  <p className="text-xs font-bold text-slate-900 mb-2 uppercase tracking-wider">Poin Revisi:</p>
                  <ul className="list-disc list-outside ml-4 text-sm text-slate-600 space-y-1.5">
                    {article.editorNote.reasons.map((r: string, i: number) => (
                      <li key={i}>{r}</li>
                    ))}
                  </ul>
                </div>
              )}

              {article.editorNote?.text && (
                <div>
                  <p className="text-xs font-bold text-slate-900 mb-2 uppercase tracking-wider">Catatan Tambahan:</p>
                  <div className="bg-white border border-orange-100/60 rounded-lg p-4 text-sm text-slate-600 italic">"{article.editorNote.text}"</div>
                </div>
              )}
            </div>
          )}

          {article.status === "rejected" && (
            /* KONDISI 3: TAMPILAN JIKA DITOLAK (REJECTED) */
            <div className="bg-red-50 border border-red-200 rounded-xl p-6 animate-in fade-in duration-500">
              <div className="flex items-center gap-2 mb-4">
                <XCircle className="w-5 h-5 text-red-500" />
                <h4 className="font-bold text-slate-900 text-base">Artikel Ditolak</h4>
              </div>
              <p className="text-sm text-slate-600 mb-5 leading-relaxed">Artikel ini telah dikembalikan secara permanen kepada penulis dengan alasan penolakan berikut:</p>

              {article.editorNote?.text && <div className="bg-white border border-red-100/60 rounded-lg p-4 text-sm text-slate-600 italic">"{article.editorNote.text}"</div>}
            </div>
          )}

          {(article.status === "approved" || article.status === "published") && (
            /* KONDISI 4: TAMPILAN JIKA APPROVED/PUBLISHED */
            <div className="bg-green-50 border border-green-200 rounded-md p-6 text-center animate-in fade-in duration-300">
              <CheckCircle2 className="w-10 h-10 text-green-500 mx-auto mb-3" />
              <h4 className="font-bold text-green-900 text-sm mb-2">Selesai Diproses</h4>
              <p className="text-xs text-green-700 leading-relaxed">Artikel ini telah selesai direview dan disetujui. Tidak ada tindakan lebih lanjut yang diperlukan di panel ini.</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
