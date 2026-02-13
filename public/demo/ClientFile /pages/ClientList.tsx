
import React, { useState } from 'react';
import { Search as SearchIcon, Filter, Plus, FileUp, Users } from 'lucide-react';
import { clients } from '../mockData';
import ClientCard from '../components/ClientCard';
import Button from '../components/Button';
import Badge from '../components/Badge';

const ClientList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const stats = [
    { label: '顧問先数', value: 48, icon: <Users size={20} className="text-[#c9a962]" /> },
    { label: '今月決算', value: 3, icon: <div className="w-5 h-5 flex items-center justify-center"><Badge variant="gold">対応中</Badge></div> },
    { label: '登録書類', value: '1,247', icon: <FileUp size={20} className="text-[#c9a962]" /> },
  ];

  const filteredClients = clients.filter(c => 
    c.name.includes(searchTerm) || c.industry.includes(searchTerm)
  );

  return (
    <div className="space-y-8 pb-12">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-serif font-bold text-[#0a1628] mb-2">顧問先一覧</h1>
          <p className="text-gray-500">事務所のすべての顧問先情報を管理しています</p>
        </div>
        <div className="flex gap-3">
          <Button variant="secondary" icon={<FileUp size={18} />}>書類一括登録</Button>
          <Button icon={<Plus size={18} />}>顧問先を追加</Button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-[12px] shadow-sm border border-gray-100 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400 font-medium mb-1">{stat.label}</p>
              <p className="text-3xl font-serif font-bold text-[#0a1628]">{stat.value}</p>
            </div>
            <div className="bg-[#f8f6f1] p-4 rounded-xl">
              {stat.icon}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white p-4 rounded-[12px] shadow-sm border border-gray-100 flex gap-4 items-center">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="会社名、業種、担当者で検索..."
            className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c9a962]/50 focus:bg-white transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-4">
          <select className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c9a962]/50">
            <option>決算月（すべて）</option>
            {[1,2,3,4,5,6,7,8,9,10,11,12].map(m => <option key={m}>{m}月決算</option>)}
          </select>
          <select className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c9a962]/50">
            <option>担当者（すべて）</option>
            <option>山田</option>
            <option>佐藤</option>
            <option>鈴木</option>
          </select>
          <Button variant="secondary" icon={<Filter size={18} />}>詳細フィルタ</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClients.map((client, index) => (
          <ClientCard key={client.id} client={client} index={index} />
        ))}
      </div>
    </div>
  );
};

export default ClientList;
