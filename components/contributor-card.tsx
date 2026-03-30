"use client";

import { useState, useEffect } from "react";
import { CircleCheckBig, X, CheckCircle2, Mail, Building2, GraduationCap, ExternalLink, XCircle, BadgeCheck } from "lucide-react";

interface ContributorCardProps {
  name: string;
  initials: string;
  affiliation: string;
  category: string;
  timeAgo: string;
  role?: string; // LOGIKA BARU: Tambahkan properti role (opsional)
  onApprove?: () => void;
  onReject?: () => void;
  onViewProfile?: () => void;
}

export function ContributorCard({ name, initials, affiliation, category, timeAgo, role, onApprove, onReject }: ContributorCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Mengunci scroll latar belakang saat modal terbuka
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isModalOpen]);

  const handleApprove = () => {
    if (onApprove) onApprove();
    setIsModalOpen(false);
  };

  const handleReject = () => {
    if (onReject) onReject();
    setIsModalOpen(false);
  };

  return (
    <>
      {/* 1. TAMPILAN KARTU UTAMA */}
      <div className="bg-white p-5 border border-gray-200 rounded-lg flex items-center justify-between hover:border-blue-300 transition-colors">
        <div className="flex items-center gap-5">
          <div className="w-14 h-14 flex items-center justify-center bg-[#122349] text-white rounded-full font-semibold text-lg">{initials}</div>
          <div>
            <h3 className="font-bold text-gray-900 text-base mb-0.5">{name}</h3>
            <p className="text-sm text-gray-500 mb-2">{affiliation}</p>
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 border border-gray-200 rounded-full text-xs font-medium text-gray-600">{category}</span>
              <span className="text-xs text-gray-400 font-base">Diajukan {timeAgo}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button onClick={() => setIsModalOpen(true)} className="px-4 py-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-sm text-sm font-medium transition-colors cursor-pointer">
            Lihat Profile
          </button>
          <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-1.5 px-4 py-2 bg-[#22c55e] hover:bg-green-600 text-white rounded-sm text-sm font-medium transition-colors shadow-sm shadow-green-100 cursor-pointer">
            <CircleCheckBig className="w-4 h-4" strokeWidth={2.5} /> Approve
          </button>
        </div>
      </div>

      {/* 2. TAMPILAN POP-UP MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200 p-4 w-screen h-screen overflow-hidden left-0 top-0 m-0">
          <div className="bg-white w-full max-w-xl rounded-2xl shadow-2xl flex flex-col max-h-[90vh] relative z-[101]">
            {/* Modal Header */}
            <div className="px-8 py-5 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h2 className="text-base font-semibold text-gray-900">Profile Kontributor</h2>
                <p className="text-sm font-normal text-gray-500 mt-0.5">Detail Informasi dan kredensial kontributor</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-full text-gray-500 transition-colors cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-8 overflow-y-auto flex flex-col gap-6">
              <div className="flex gap-5 items-center">
                <div className="w-16 h-16 flex shrink-0 items-center justify-center bg-[#122349] text-white rounded-full font-bold text-xl">{initials}</div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-gray-900 text-base">{name}</h3>
                    <div className="flex items-center gap-1 px-2.5 py-0.5 bg-[#FEF5E1] text-[#122349] rounded-full text-[12px] font-medium">
                      <BadgeCheck className="w-3 h-3 text-[#122349]" /> Verified Expert
                    </div>
                  </div>

                  {/* LOGIKA BARU: Teks jabatan kini dinamis membaca dari prop 'role' */}
                  <p className="text-sm text-gray-600 mb-2.5">{role || "Pakar & Peneliti Independen"}</p>

                  <span className="inline-block px-3 py-1 border border-gray-200 rounded-full text-xs font-semibold text-gray-700">{category}</span>
                </div>
              </div>

              {/* Pemisah 1 */}
              <div className="h-px border border-gray-100 w-full" />

              <div className="flex flex-col gap-3.5">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span className="font-normal text-gray-500 w-20">Email:</span>
                  <span className="text-gray-900">siti.rahayu@its.ac.id</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Building2 className="w-4 h-4 text-gray-400" />
                  <span className="font-normal text-gray-500 w-20">Institusi:</span>
                  <span className="text-gray-900">{affiliation}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <GraduationCap className="w-4 h-4 text-gray-400" />
                  <span className="font-normal text-gray-500 w-20">Keahlian:</span>
                  <span className="text-gray-900">{category}</span>
                </div>
              </div>

              {/* PEMISAH 2 */}
              <div className="h-px border border-gray-100 w-full" />

              <div>
                <h4 className="font-semibold text-gray-900 mb-2 text-base">Biografi Singkat</h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Peneliti senior di bidang ekonomi digital dengan fokus pada transformasi UMKM dan ekosistem e-commerce Indonesia. Aktif mempublikasi riset di jurnal internasional sejak 2018
                </p>
              </div>

              {/* Pemisah 3 */}
              <div className="h-px border border-gray-100 w-full" />

              <div>
                <h4 className="font-semibold text-gray-900 mb-3 text-base">Profile Akademik</h4>
                <div className="flex items-center gap-3">
                  <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-full text-xs font-semibold text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer">
                    <ExternalLink className="w-3.5 h-3.5 text-gray-500" /> Google Scholar
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-full text-xs font-semibold text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer">
                    <ExternalLink className="w-3.5 h-3.5 text-gray-500" /> ORCID
                  </button>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-8 py-5 border-t border-gray-100 bg-gray-50/50 flex items-center justify-between rounded-b-2xl">
              <span className="text-xs font-medium text-gray-400">Diajukan {timeAgo}</span>
              <div className="flex items-center gap-3">
                <button onClick={handleReject} className="flex items-center gap-2 px-5 py-2.5 bg-[#ef4444] hover:bg-red-600 text-white rounded-sm text-sm font-medium transition-colors cursor-pointer">
                  <XCircle className="w-4 h-4" /> Tolak
                </button>
                <button onClick={handleApprove} className="flex items-center gap-2 px-5 py-2.5 bg-[#22c55e] hover:bg-green-600 text-white rounded-sm text-sm font-medium transition-colors cursor-pointer">
                  <CircleCheckBig className="w-4 h-4" /> Approve Kontributor
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
