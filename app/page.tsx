"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Inter } from "next/font/google";
import { StatCard } from "@/components/stat-card"; // Sesuaikan path jika berbeda
import { ArticleCard } from "@/components/article-card"; // Sesuaikan path jika berbeda
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "../hooks/use-toast";
import { Clock, Check, Users, TrendingUp, FileText } from "lucide-react";

const inter = Inter({ subsets: ["latin"] });

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

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("articles");
  const { toast } = useToast();
  const router = useRouter();

  // Fungsi navigasi ke halaman review
  const handleReviewClick = (id: number) => {
    router.push(`/review/${id}`);
  };

  // Fungsi untuk tombol Publish
  const handlePublishClick = (title: string) => {
    toast({
      title: "Publish initiated",
      description: `Mempublikasikan: ${title.substring(0, 50)}...`,
    });
  };

  return (
    <main className={`min-h-screen bg-slate-50/50 ${inter.className}`}>
      {/* Header */}
      <div className="">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard Editorial</h1>
          <p className="text-gray-600 mt-1">Kelola artikel dan kontributor Databooks Expert Corner</p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-6 pb-8 pt-2">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard label="Pending Review" value="3" icon={Clock} iconColor="text-orange-500" bgColor="bg-gray-50" />
          <StatCard label="Approved Hari Ini" value="2" icon={Check} iconColor="text-green-600" bgColor="bg-green-50" />
          <StatCard label="Total Kontributor" value="128" icon={Users} iconColor="text-purple-600" bgColor="bg-purple-50" />
          <StatCard label="Artikel Bulan Ini" value="45" icon={TrendingUp} iconColor="text-orange-600" bgColor="bg-orange-50" />
        </div>

        {/* Tabs Section */}
        <div className="mb-8">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            {/* TabsList */}
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
              {/* White card */}
              <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-1">Manajemen Artikel</h2>
                  <p className="text-gray-500 text-sm">Kelola artikel: review, publish, dan takedown</p>
                </div>

                <div className="space-y-4">
                  {mockArticles.map((article) => (
                    <ArticleCard
                      key={article.id}
                      status={article.status}
                      category={article.category}
                      timeAgo={article.timeAgo}
                      title={article.title}
                      author={article.author}
                      wordCount={article.wordCount}
                      onReviewClick={() => handleReviewClick(article.id)} // Memanggil fungsi navigasi
                      onPublishClick={() => handlePublishClick(article.title)}
                    />
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="contributors" className="mt-0">
              {/* White card for contributors tab */}
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
