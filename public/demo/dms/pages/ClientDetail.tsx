
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ChevronRight, 
  FileText, 
  Plus, 
  StickyNote, 
  History, 
  Download, 
  Eye,
  Building2,
  Calendar,
  Briefcase
} from 'lucide-react';
import { clients, getDocuments, getMemos } from '../mockData';
import Badge from '../components/Badge';
import Button from '../components/Button';
import UploadModal from '../components/UploadModal';

const ClientDetail: React.FC = () => {
  const { id } = useParams();
  const client = clients.find(c => c.id === id);
  const [activeYear, setActiveYear] = useState('R5');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isSuccessMessageVisible, setIsSuccessMessageVisible] = useState(false);

  if (!client) return <div>Client not found</div>;

  const documents = getDocuments(client.id);
  const memos = getMemos(client.id);
  const years = ['R6', 'R5', 'R4', 'R3', 'R2', 'R1'];

  const sections = [
    { title: '決算書類', type: '決算書類' },
    { title: '申告書', type: '申告書' },
    { title: '届出書', type: '届出書' },
    { title: '預かり書類', type: '預かり書類' },
  ];

  const handleUploadSuccess = () => {
    setIsUploadModalOpen(false);
    setIsSuccessMessageVisible(true);
    setTimeout(() => setIsSuccessMessageVisible(false), 3000);
  };

  return (
    <div className="space-y-6 md:space-y-8 pb-12 animate-fadeInUp">
      {/* Breadcrumb & Header */}
      <div className="space-y-3 md:space-y-4">
        <nav className="flex items-center gap-2 text-xs md:text-sm text-gray-500 font-medium overflow-x-auto">
          <Link to="/" className="hover:text-[#c9a962] transition-colors whitespace-nowrap">顧問先一覧</Link>
          <ChevronRight size={14} className="flex-shrink-0" />
          <span className="text-[#0a1628] truncate">{client.name}</span>
        </nav>

        <div className="bg-white rounded-[16px] shadow-sm border border-gray-100 p-4 md:p-6 lg:p-8">
          <div className="flex flex-col lg:flex-row lg:justify-between gap-4 lg:gap-8">
            <div className="flex gap-4 md:gap-6 lg:gap-8 items-start lg:items-center">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-[#0a1628] rounded-xl flex items-center justify-center text-[#c9a962] flex-shrink-0">
                <Building2 size={24} className="md:w-8 md:h-8" />
              </div>
              <div className="space-y-1 md:space-y-2 min-w-0 flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                  <h1 className="text-xl md:text-2xl lg:text-3xl font-serif font-bold text-[#0a1628] break-words">{client.name}</h1>
                  <Badge variant="navy" pill>{client.industry}</Badge>
                </div>
                <div className="flex flex-col sm:flex-row sm:gap-4 md:gap-6 text-xs md:text-sm text-gray-500 font-medium space-y-1 sm:space-y-0">
                  <div className="flex items-center gap-1.5"><Calendar size={12} className="md:w-[14px] md:h-[14px]" /> {client.closingMonth}月決算</div>
                  <div className="flex items-center gap-1.5"><Briefcase size={12} className="md:w-[14px] md:h-[14px]" /> 契約開始: {client.contractStartDate}</div>
                  <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-[#059669]" /> 担当: {client.manager}</div>
                </div>
              </div>
            </div>
            <div className="flex gap-2 md:gap-3 flex-shrink-0">
              <Button variant="secondary" icon={<StickyNote size={16} className="md:w-[18px] md:h-[18px]" />}>
                <span className="hidden sm:inline">メモを追加</span><span className="sm:hidden">メモ</span>
              </Button>
              <Button icon={<Plus size={16} className="md:w-[18px] md:h-[18px]" />} onClick={() => setIsUploadModalOpen(true)}>
                <span className="hidden sm:inline">書類を追加</span><span className="sm:hidden">追加</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Success Notification */}
      {isSuccessMessageVisible && (
        <div className="bg-[#059669] text-white p-3 md:p-4 rounded-lg shadow-lg flex items-center justify-between animate-fadeInUp">
          <p className="text-sm md:text-base font-bold flex items-center gap-2"><Eye size={18} className="md:w-5 md:h-5" /> 書類を登録しました</p>
          <button onClick={() => setIsSuccessMessageVisible(false)} className="opacity-70 hover:opacity-100 text-xl">×</button>
        </div>
      )}

      {/* Year Tabs */}
      <div className="flex border-b border-gray-200 overflow-x-auto">
        {years.map(year => (
          <button
            key={year}
            onClick={() => setActiveYear(year)}
            className={`px-4 md:px-6 lg:px-8 py-3 md:py-4 font-bold text-base md:text-lg transition-all relative flex-shrink-0 ${
              activeYear === year
                ? 'text-[#0a1628]'
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            {year}
            {activeYear === year && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#0a1628] flex justify-center">
                <div className="w-1/2 h-full bg-[#c9a962]" />
              </div>
            )}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        {/* Documents Grid */}
        <div className="lg:col-span-2 space-y-6 md:space-y-8">
          {sections.map(section => (
            <div key={section.type} className="space-y-3 md:space-y-4">
              <h2 className="text-lg md:text-xl font-serif font-bold text-[#132238] flex items-center gap-2">
                <div className="w-1 h-5 md:h-6 bg-[#c9a962]" />
                {section.title}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                {documents
                  .filter(doc => doc.type === section.type)
                  .map(doc => (
                    <div
                      key={doc.id}
                      className="bg-white p-4 md:p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all group"
                    >
                      <div className="flex items-start md:items-center justify-between gap-3">
                        <div className="flex items-center gap-3 md:gap-4 flex-1 min-w-0">
                          <div className="w-8 h-8 md:w-10 md:h-10 bg-[#f8f6f1] rounded-lg flex items-center justify-center text-[#0a1628] group-hover:bg-[#0a1628] group-hover:text-white transition-colors flex-shrink-0">
                            <FileText size={16} className="md:w-5 md:h-5" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="font-bold text-sm md:text-base text-[#0a1628] truncate">{doc.name}</p>
                            <p className="text-xs text-gray-400 mt-0.5">最終更新: {doc.updatedAt}</p>
                          </div>
                        </div>
                        <div className="flex flex-col md:flex-row items-end md:items-center gap-2 md:gap-3 flex-shrink-0">
                          <Badge variant={doc.status === '預かり中' ? 'warning' : 'success'}>
                            {doc.status}
                          </Badge>
                          <div className="flex gap-1">
                            <button className="p-1.5 md:p-2 text-gray-300 hover:text-[#c9a962] transition-colors"><Eye size={16} className="md:w-[18px] md:h-[18px]" /></button>
                            <button className="p-1.5 md:p-2 text-gray-300 hover:text-[#c9a962] transition-colors"><Download size={16} className="md:w-[18px] md:h-[18px]" /></button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>

        {/* Timeline / Memos */}
        <div className="space-y-4 md:space-y-6">
          <h2 className="text-lg md:text-xl font-serif font-bold text-[#132238] flex items-center gap-2">
            <History size={18} className="text-[#c9a962] md:w-5 md:h-5" />
            対応メモ
          </h2>
          <div className="bg-white rounded-[16px] border border-gray-100 p-4 md:p-6 space-y-6 md:space-y-8 relative overflow-hidden">
            <div className="absolute left-[27px] md:left-[31px] top-8 md:top-10 bottom-8 md:bottom-10 w-px bg-gray-100" />

            {memos.map(memo => (
              <div key={memo.id} className="relative pl-8 md:pl-10">
                <div className="absolute left-0 top-1.5 w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#c9a962] border-2 border-white ring-4 ring-gold/10" />
                <div className="space-y-1">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-2">
                    <span className="text-xs font-bold text-gray-400">{memo.date}</span>
                    <Badge variant="navy">{memo.manager}</Badge>
                  </div>
                  <p className="text-xs md:text-sm text-[#1e3a5f] leading-relaxed bg-[#f8f6f1]/50 p-2.5 md:p-3 rounded-lg border border-transparent hover:border-[#c9a962]/20 transition-all">
                    {memo.content}
                  </p>
                </div>
              </div>
            ))}

            <button className="w-full py-2.5 md:py-3 text-xs md:text-sm font-bold text-[#c9a962] hover:text-[#0a1628] transition-colors border border-dashed border-gray-200 rounded-lg hover:border-[#c9a962] hover:bg-[#c9a962]/5">
              過去のメモをすべて見る
            </button>
          </div>
        </div>
      </div>

      <UploadModal 
        isOpen={isUploadModalOpen} 
        onClose={() => setIsUploadModalOpen(false)}
        onSuccess={handleUploadSuccess}
        clientName={client.name}
      />
    </div>
  );
};

export default ClientDetail;
