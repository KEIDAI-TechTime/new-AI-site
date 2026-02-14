
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
    <div className="space-y-8 pb-12 animate-fadeInUp">
      {/* Breadcrumb & Header */}
      <div className="space-y-4">
        <nav className="flex items-center gap-2 text-sm text-gray-500 font-medium">
          <Link to="/" className="hover:text-[#c9a962] transition-colors">顧問先一覧</Link>
          <ChevronRight size={14} />
          <span className="text-[#0a1628]">{client.name}</span>
        </nav>

        <div className="bg-white rounded-[16px] shadow-sm border border-gray-100 p-4 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex gap-4 md:gap-8 items-center">
            <div className="w-12 h-12 md:w-16 md:h-16 bg-[#0a1628] rounded-xl flex items-center justify-center text-[#c9a962] shrink-0">
              <Building2 size={24} className="md:hidden" /><Building2 size={32} className="hidden md:block" />
            </div>
            <div className="space-y-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 md:gap-3">
                <h1 className="text-xl md:text-3xl font-serif font-bold text-[#0a1628]">{client.name}</h1>
                <Badge variant="navy" pill>{client.industry}</Badge>
              </div>
              <div className="flex flex-wrap gap-3 md:gap-6 text-xs md:text-sm text-gray-500 font-medium">
                <div className="flex items-center gap-1.5"><Calendar size={14} /> {client.closingMonth}月決算</div>
                <div className="flex items-center gap-1.5"><Briefcase size={14} /> <span className="hidden sm:inline">契約開始:</span> {client.contractStartDate}</div>
                <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-[#059669]" /> 担当: {client.manager}</div>
              </div>
            </div>
          </div>
          <div className="flex gap-2 md:gap-3 shrink-0 w-full md:w-auto">
            <Button variant="secondary" icon={<StickyNote size={18} />}><span className="hidden sm:inline">メモを追加</span></Button>
            <Button icon={<Plus size={18} />} onClick={() => setIsUploadModalOpen(true)}>書類を追加</Button>
          </div>
        </div>
      </div>

      {/* Success Notification */}
      {isSuccessMessageVisible && (
        <div className="bg-[#059669] text-white p-4 rounded-lg shadow-lg flex items-center justify-between animate-fadeInUp">
          <p className="font-bold flex items-center gap-2"><Eye size={20} /> 書類を登録しました</p>
          <button onClick={() => setIsSuccessMessageVisible(false)} className="opacity-70 hover:opacity-100">×</button>
        </div>
      )}

      {/* Year Tabs */}
      <div className="flex border-b border-gray-200 overflow-x-auto">
        {years.map(year => (
          <button
            key={year}
            onClick={() => setActiveYear(year)}
            className={`px-4 md:px-8 py-3 md:py-4 font-bold text-base md:text-lg transition-all relative shrink-0 ${
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8">
        {/* Documents Grid */}
        <div className="lg:col-span-2 space-y-8">
          {sections.map(section => (
            <div key={section.type} className="space-y-4">
              <h2 className="text-xl font-serif font-bold text-[#132238] flex items-center gap-2">
                <div className="w-1 h-6 bg-[#c9a962]" />
                {section.title}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {documents
                  .filter(doc => doc.type === section.type)
                  .map(doc => (
                    <div 
                      key={doc.id} 
                      className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all flex items-center justify-between group"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-[#f8f6f1] rounded-lg flex items-center justify-center text-[#0a1628] group-hover:bg-[#0a1628] group-hover:text-white transition-colors">
                          <FileText size={20} />
                        </div>
                        <div>
                          <p className="font-bold text-[#0a1628]">{doc.name}</p>
                          <p className="text-xs text-gray-400 mt-0.5">最終更新: {doc.updatedAt}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge variant={doc.status === '預かり中' ? 'warning' : 'success'}>
                          {doc.status}
                        </Badge>
                        <button className="p-2 text-gray-300 hover:text-[#c9a962] transition-colors"><Eye size={18} /></button>
                        <button className="p-2 text-gray-300 hover:text-[#c9a962] transition-colors"><Download size={18} /></button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>

        {/* Timeline / Memos */}
        <div className="space-y-6">
          <h2 className="text-xl font-serif font-bold text-[#132238] flex items-center gap-2">
            <History size={20} className="text-[#c9a962]" />
            対応メモ
          </h2>
          <div className="bg-white rounded-[16px] border border-gray-100 p-6 space-y-8 relative overflow-hidden">
            <div className="absolute left-[31px] top-10 bottom-10 w-px bg-gray-100" />
            
            {memos.map(memo => (
              <div key={memo.id} className="relative pl-10">
                <div className="absolute left-0 top-1.5 w-3 h-3 rounded-full bg-[#c9a962] border-2 border-white ring-4 ring-gold/10" />
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-gray-400">{memo.date}</span>
                    <Badge variant="navy">{memo.manager}</Badge>
                  </div>
                  <p className="text-sm text-[#1e3a5f] leading-relaxed bg-[#f8f6f1]/50 p-3 rounded-lg border border-transparent hover:border-[#c9a962]/20 transition-all">
                    {memo.content}
                  </p>
                </div>
              </div>
            ))}
            
            <button className="w-full py-3 text-sm font-bold text-[#c9a962] hover:text-[#0a1628] transition-colors border border-dashed border-gray-200 rounded-lg hover:border-[#c9a962] hover:bg-[#c9a962]/5">
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
