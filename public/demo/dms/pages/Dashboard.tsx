
import React from 'react';
import { 
  AlertCircle, 
  Calendar, 
  Clock, 
  UserCheck, 
  ChevronRight,
  TrendingUp,
  FileSearch
} from 'lucide-react';
import Badge from '../components/Badge';

const Dashboard: React.FC = () => {
  const currentMonthClients = [
    { name: '株式会社山本製作所', type: '2月決算', manager: '山田', status: '対応中' },
    { name: '医療法人社団健康会', type: '2月決算', manager: '山田', status: '対応中' },
    { name: '社会福祉法人やすらぎ', type: '2月決算', manager: '鈴木', status: '対応中' },
  ];

  const pendingTaxReturns = [
    { name: '株式会社山本製作所', type: '法人税', deadline: '2024/04/30', remains: 'あと45日' },
    { name: '株式会社山本製作所', type: '消費税', deadline: '2024/04/30', remains: 'あと45日' },
  ];

  const alerts = [
    { name: '合同会社テックラボ', type: '異動届', deadline: '2024/03/15', remains: '期限間近' },
  ];

  const summaries = [
    { manager: '山田太郎', clients: 18, docs: 523 },
    { manager: '佐藤花子', clients: 15, docs: 412 },
    { manager: '鈴木一郎', clients: 15, docs: 312 },
  ];

  return (
    <div className="space-y-6 md:space-y-8 animate-fadeInUp">
      <div>
        <h1 className="text-2xl md:text-3xl font-serif font-bold text-[#0a1628] mb-1 md:mb-2">ダッシュボード</h1>
        <p className="text-sm md:text-base text-gray-500">本日の優先業務と全体サマリーです</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* 今月決算 */}
        <div className="bg-white rounded-[16px] border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-gray-100 flex items-center justify-between">
            <h2 className="font-serif font-bold text-lg flex items-center gap-2 text-[#0a1628]">
              <Calendar size={20} className="text-[#c9a962]" /> 今月決算の顧問先
            </h2>
            <Badge variant="gold">3件</Badge>
          </div>
          <div className="divide-y divide-gray-50">
            {currentMonthClients.map((c, i) => (
              <div key={i} className="p-4 px-6 hover:bg-gray-50 transition-colors flex items-center justify-between group cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="w-2 h-10 bg-[#c9a962]/30 rounded-full" />
                  <div>
                    <p className="font-bold text-[#0a1628]">{c.name}</p>
                    <p className="text-xs text-gray-400">{c.type} | 担当: {c.manager}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="navy">{c.status}</Badge>
                  <ChevronRight size={16} className="text-gray-300 group-hover:text-[#c9a962] transition-colors" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 未完了の申告 */}
        <div className="bg-white rounded-[16px] border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-gray-100 flex items-center justify-between">
            <h2 className="font-serif font-bold text-lg flex items-center gap-2 text-[#0a1628]">
              <Clock size={20} className="text-[#c9a962]" /> 未完了の申告
            </h2>
            <Badge variant="navy">2件</Badge>
          </div>
          <div className="divide-y divide-gray-50">
            {pendingTaxReturns.map((c, i) => (
              <div key={i} className="p-4 px-6 hover:bg-gray-50 transition-colors flex items-center justify-between group cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center text-gray-400 group-hover:bg-[#0a1628] group-hover:text-[#c9a962] transition-all">
                    <TrendingUp size={20} />
                  </div>
                  <div>
                    <p className="font-bold text-[#0a1628]">{c.name}</p>
                    <p className="text-xs text-gray-400">{c.type} | 期限: {c.deadline}</p>
                  </div>
                </div>
                <Badge variant="success">{c.remains}</Badge>
              </div>
            ))}
          </div>
        </div>

        {/* 期限アラート */}
        <div className="bg-white rounded-[16px] border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-red-50/50">
            <h2 className="font-serif font-bold text-lg flex items-center gap-2 text-[#dc2626]">
              <AlertCircle size={20} /> 期限アラート（30日以内）
            </h2>
            <Badge variant="error">1件</Badge>
          </div>
          <div className="divide-y divide-gray-50">
            {alerts.map((c, i) => (
              <div key={i} className="p-4 px-6 hover:bg-red-50/20 transition-colors flex items-center justify-between group cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center text-[#dc2626]">
                    <FileSearch size={20} />
                  </div>
                  <div>
                    <p className="font-bold text-[#0a1628]">{c.name}</p>
                    <p className="text-xs text-gray-400">{c.type} | 期限: {c.deadline}</p>
                  </div>
                </div>
                <span className="text-sm font-black text-[#dc2626] animate-pulse">{c.remains}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 担当者別サマリー */}
        <div className="bg-white rounded-[16px] border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-gray-100 flex items-center justify-between">
            <h2 className="font-serif font-bold text-lg flex items-center gap-2 text-[#0a1628]">
              <UserCheck size={20} className="text-[#c9a962]" /> 担当者別サマリー
            </h2>
          </div>
          <div className="p-6 grid grid-cols-1 gap-4">
            {summaries.map((s, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-[#f8f6f1] rounded-xl border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center font-bold text-[#0a1628]">
                    {s.manager[0]}
                  </div>
                  <p className="font-bold text-[#0a1628]">{s.manager}</p>
                </div>
                <div className="flex gap-6">
                  <div className="text-center">
                    <p className="text-[10px] text-gray-400 uppercase font-black">顧問先</p>
                    <p className="font-serif font-bold text-[#1e3a5f]">{s.clients}社</p>
                  </div>
                  <div className="text-center">
                    <p className="text-[10px] text-gray-400 uppercase font-black">書類</p>
                    <p className="font-serif font-bold text-[#1e3a5f]">{s.docs}件</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
