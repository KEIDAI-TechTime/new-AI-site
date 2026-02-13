
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Calendar, FileText, Package } from 'lucide-react';
import { Client } from '../types';
import Badge from './Badge';

interface ClientCardProps {
  client: Client;
  index: number;
}

const ClientCard: React.FC<ClientCardProps> = ({ client, index }) => {
  const navigate = useNavigate();
  const isClosingThisMonth = client.closingMonth === 2; // Demo: current month is Feb

  return (
    <div
      onClick={() => navigate(`/client/${client.id}`)}
      className="bg-white rounded-[12px] shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden border border-gray-100 group animate-fadeInUp"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="p-4 md:p-5 lg:p-6">
        <div className="flex justify-between items-start mb-3 md:mb-4 gap-2">
          <div className="min-w-0 flex-1">
            <span className="text-xs text-gray-500 font-medium tracking-widest uppercase mb-1 block">
              {client.industry}
            </span>
            <h3 className="text-lg md:text-xl font-serif font-bold text-[#0a1628] group-hover:text-[#c9a962] transition-colors break-words">
              {client.name}
            </h3>
          </div>
          <Badge variant={isClosingThisMonth ? 'gold' : 'navy'}>
            {client.closingMonth}月決算
          </Badge>
        </div>

        <div className="grid grid-cols-3 gap-2 md:gap-4 mb-4 md:mb-6 py-3 md:py-4 border-y border-gray-50">
          <div className="text-center">
            <p className="text-[10px] md:text-xs text-gray-400 mb-0.5 md:mb-1">登録年度</p>
            <p className="font-serif font-bold text-base md:text-lg text-[#1e3a5f]">{client.yearsEnrolled}年度</p>
          </div>
          <div className="text-center">
            <p className="text-[10px] md:text-xs text-gray-400 mb-0.5 md:mb-1">書類数</p>
            <p className="font-serif font-bold text-base md:text-lg text-[#1e3a5f]">{client.documentCount}</p>
          </div>
          <div className="text-center">
            <p className="text-[10px] md:text-xs text-gray-400 mb-0.5 md:mb-1">預かり中</p>
            <div className="flex items-center justify-center gap-1">
              <p className="font-serif font-bold text-base md:text-lg text-[#1e3a5f]">{client.pendingDocuments}</p>
              {client.pendingDocuments > 0 && <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[#d97706]" />}
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs md:text-sm text-gray-500">
          <div className="flex items-center gap-1.5">
            <User size={12} className="text-gray-400 md:w-[14px] md:h-[14px]" />
            <span>担当: {client.manager}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Calendar size={12} className="text-gray-400 md:w-[14px] md:h-[14px]" />
            <span>最終更新: {client.lastUpdated}</span>
          </div>
        </div>
      </div>

      <div className="h-1 w-0 bg-[#c9a962] group-hover:w-full transition-all duration-500" />
    </div>
  );
};

export default ClientCard;
