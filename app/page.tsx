"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Inter } from "next/font/google";
import { StatCard } from "@/components/stat-card";
import { ArticleCard } from "@/components/article-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "../hooks/use-toast";
import { Clock, Check, Users, TrendingUp, FileText } from "lucide-react";

const inter = Inter({ subsets: ["latin"] });

export type ArticleStatus = "submitted" | "under-review" | "approved" | "published" | "rejected";

export interface ArticleData {
  id: number;
  status: ArticleStatus;
  category: string;
  timeAgo: string;
  title: string;
  author: { name: string; initials: string; role: string; affiliation: string; verified: boolean };
  wordCount: number;
}

const initialArticles: ArticleData[] = [
  {
    id: 1,
    status: "submitted",
    category: "Teknologi & Digital",
    timeAgo: "2 jam lalu",
    title: "Analisis Pertumbuhan Sektor Fintech di Indonesia Kuartal 4 2025",
    author: { name: "Dr. Rina Hartanti", initials: "RH", role: "Dosen Senior Fakultas Ekonomi dan Bisnis", affiliation: "Universitas Indonesia", verified: true },
    wordCount: 654,
  },
  {
    id: 2,
    status: "under-review",
    category: "Kebijakan Publik",
    timeAgo: "1 hari lalu",
    title: "Tantangan Implementasi Carbon Tax di Indonesia",
    author: { name: "Prof. Budi Santoso", initials: "BS", role: "Guru Besar Kebijakan Publik", affiliation: "Universitas Gadjah Mada", verified: true },
    wordCount: 720,
  },
  {
    id: 3,
    status: "submitted",
    category: "Ekonomi Makro",
    timeAgo: "3 hari lalu",
    title: "Dampak Kenaikan UMP terhadap Daya Saing Industri Manufaktur",
    author: { name: "Dr. Maya Putri, M.Econ", initials: "MP", role: "Peneliti Utama Ekonomi Makro", affiliation: "BRIN", verified: true },
    wordCount: 580,
  },
  {
    id: 4,
    status: "approved",
    category: "Ekonomi Makro",
    timeAgo: "5 hari lalu",
    title: "Proyeksi Ekonomi ASEAN 2026: Peluang dan Tantangan",
    author: { name: "Dr. Andi Wijaya", initials: "AW", role: "Peneliti Senior Pusat Studi Ekonomi", affiliation: "LIPI", verified: true },
    wordCount: 890,
  },
  {
    id: 5,
    status: "published",
    category: "Teknologi & Digital",
    timeAgo: "1 minggu lalu",
    title: "Transformasi Digital UMKM: Studi Kasus Jawa Timur",
    author: { name: "Prof. Lina Marina", initials: "LM", role: "Ketua Program Studi Bisnis Digital", affiliation: "Universitas Airlangga", verified: true },
    wordCount: 750,
  },
];

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("articles");
  const [articles, setArticles] = useState<ArticleData[]>(initialArticles);
  const [isClient, setIsClient] = useState(false);

  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
    const storedArticles = localStorage.getItem("editorArticles");
    if (storedArticles) setArticles(JSON.parse(storedArticles) as ArticleData[]);
    else localStorage.setItem("editorArticles", JSON.stringify(initialArticles));
  }, []);

  const handleReviewClick = (id: number) => {
    router.push(`/review/${id}`);
  };

  const handlePublishClick = (id: number, title: string) => {
    const updatedArticles = articles.map((a) => (a.id === id ? { ...a, status: "published" as ArticleStatus } : a));
    setArticles(updatedArticles);
    localStorage.setItem("editorArticles", JSON.stringify(updatedArticles));

    toast({
      className: "border-2 border-[#22c55e]",
      title: <span className="text-black text-base font-bold">Artikel berhasil dipublish</span>,
      description: <span className="text-black text-sm font-normal mt-1 block">Artikel "{title}" sekarang sudah mengudara.</span>,
    });
  };

  const handleTakedownClick = (id: number, title: string) => {
    const updatedArticles = articles.map((a) => (a.id === id ? { ...a, status: "approved" as ArticleStatus } : a));
    setArticles(updatedArticles);
    localStorage.setItem("editorArticles", JSON.stringify(updatedArticles));

    toast({
      className: "border-2 border-red-500",
      title: <span className="text-black text-base font-bold">Artikel di-takedown</span>,
      description: <span className="text-black text-sm font-normal mt-1 block">Artikel "{title}" telah ditarik.</span>,
    });
  };

  const handleDropdownAction = (id: number, actionName: string, title: string) => {
    if (actionName === "Approve") {
      const updatedArticles = articles.map((a) => (a.id === id ? { ...a, status: "approved" as ArticleStatus } : a));
      setArticles(updatedArticles);
      localStorage.setItem("editorArticles", JSON.stringify(updatedArticles));

      toast({
        className: "border-2 border-[#22c55e]",
        title: <span className="text-black text-base font-bold">Artikel disetujui</span>,
        description: <span className="text-black text-sm font-normal mt-1 block">Artikel "{title.substring(0, 40)}..." telah disetujui.</span>,
      });
    } else if (actionName === "Revision") {
      // LOGIKA BARU: Kirim parameter ?action=revision
      router.push(`/review/${id}?action=revision`);
    } else if (actionName === "Reject") {
      // LOGIKA BARU: Kirim parameter ?action=reject
      router.push(`/review/${id}?action=reject`);
    }
  };

  if (!isClient) return null;

  return (
    <main className={`min-h-screen bg-slate-50/50 ${inter.className}`}>
      {/* (Bagian Header & Tabs persis sama dengan kode Anda sebelumnya, saya pangkas komentarnya agar tidak terlalu panjang) */}
      <div className="">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard Editorial</h1>
          <p className="text-gray-600 mt-1">Kelola artikel dan kontributor Databooks Expert Corner</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 pb-8 pt-2">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard label="Pending Review" value="3" icon={Clock} iconColor="text-orange-500" bgColor="bg-gray-50" />
          <StatCard label="Approved Hari Ini" value="2" icon={Check} iconColor="text-green-600" bgColor="bg-green-50" />
          <StatCard label="Total Kontributor" value="128" icon={Users} iconColor="text-purple-600" bgColor="bg-purple-50" />
          <StatCard label="Artikel Bulan Ini" value="45" icon={TrendingUp} iconColor="text-orange-600" bgColor="bg-orange-50" />
        </div>
        <div className="mb-8">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="inline-flex items-center gap-1 rounded-xl bg-slate-100 p-1.5 h-auto mb-6 border border-slate-200/60">
              <TabsTrigger
                value="articles"
                className="group flex items-center gap-2 rounded-lg px-4 py-2 text-base font-medium transition-all data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm text-slate-500 hover:text-slate-700"
              >
                <FileText className="w-5 h-5" />
                <span>Artikel</span>
                <span className="ml-1 flex h-6 items-center justify-center rounded-full px-2.5 text-sm font-semibold transition-colors group-data-[state=active]:bg-slate-100 group-data-[state=active]:text-slate-900 text-slate-500">5</span>
              </TabsTrigger>
              <TabsTrigger
                value="contributors"
                className="group flex items-center gap-2 rounded-lg px-4 py-2 text-base font-medium transition-all data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm text-slate-500 hover:text-slate-700"
              >
                <Users className="w-5 h-5" />
                <span>Kontributor</span>
                <span className="ml-1 flex h-6 items-center justify-center rounded-full px-2.5 text-sm font-semibold transition-colors group-data-[state=active]:bg-slate-100 group-data-[state=active]:text-slate-900 text-slate-500">2</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="articles" className="mt-0">
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-1">Manajemen Artikel</h2>
                  <p className="text-gray-500 text-sm">Kelola artikel: review, publish, dan takedown</p>
                </div>
                <div className="space-y-4">
                  {articles.map((article: ArticleData) => (
                    <ArticleCard
                      key={article.id}
                      status={article.status}
                      category={article.category}
                      timeAgo={article.timeAgo}
                      title={article.title}
                      author={article.author}
                      wordCount={article.wordCount}
                      onReviewClick={() => handleReviewClick(article.id)}
                      onPublishClick={() => handlePublishClick(article.id, article.title)}
                      onTakedownClick={() => handleTakedownClick(article.id, article.title)}
                      onActionClick={(actionName) => handleDropdownAction(article.id, actionName, article.title)}
                    />
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="contributors" className="mt-0">
              <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-1">Manajemen Kontributor</h2>
                  <p className="text-gray-500 text-sm">Kelola data dan verifikasi kontributor</p>
                </div>
                <div className="bg-slate-50/50 rounded-lg border border-dashed border-slate-200 p-12 text-center text-slate-500">Fitur manajemen kontributor akan datang segera</div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </main>
  );
}
