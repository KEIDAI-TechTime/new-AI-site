
import React, { useState, useEffect } from 'react';
import { 
  Home, 
  BarChart3, 
  Users, 
  Briefcase, 
  CheckSquare, 
  FileText, 
  Calendar, 
  Menu, 
  Search, 
  Bell, 
  Settings, 
  ChevronDown, 
  Plus, 
  LayoutGrid,
  Filter,
  MoreVertical,
  Activity as ActivityIcon,
  MapPin,
  Mail,
  Phone,
  UserPlus,
  ClipboardList,
  AlertCircle
} from 'lucide-react';
import { PageType, Account, Opportunity, Lead, Task } from './types';
import { ACCOUNTS, OPPORTUNITIES, ACTIVITIES, LEADS, TASKS } from './constants';
import { InfoIcon } from './components/InfoIcon';
import { ChatBot } from './components/ChatBot';
import { StagePath } from './components/StagePath';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

// --- Page Components ---

const HomePage = ({ navigateTo }: { navigateTo: (p: PageType, id?: string) => void }) => {
  const barData = [
    { name: '山田', value: 1200 },
    { name: '佐藤', value: 900 },
    { name: '鈴木', value: 1500 },
    { name: '高橋', value: 600 },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div className="lg:col-span-2 space-y-4">
        {/* Recent Opps */}
        <div className="sfdc-card">
          <div className="p-3 border-b flex justify-between items-center">
            <h3 className="font-bold text-sm flex items-center gap-2">
              <Briefcase size={16} className="text-blue-500" /> 主要な商談・最近使った商談
            </h3>
            <button onClick={() => navigateTo('opportunities')} className="text-blue-600 text-xs hover:underline">すべて表示</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="p-3">会社名</th>
                  <th className="p-3">商談名</th>
                  <th className="p-3">完了予定</th>
                  <th className="p-3 text-right">金額</th>
                </tr>
              </thead>
              <tbody>
                {OPPORTUNITIES.slice(0, 5).map(opp => (
                  <tr key={opp.id} className="border-b hover:bg-gray-50 cursor-pointer" onClick={() => navigateTo('opportunity_detail', opp.id)}>
                    <td className="p-3 text-blue-600 font-medium">{opp.accountName}</td>
                    <td className="p-3">{opp.name}</td>
                    <td className="p-3">{opp.closeDate}</td>
                    <td className="p-3 text-right">¥{opp.amount.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Tasks Summary */}
        <div className="sfdc-card">
          <div className="p-3 border-b flex justify-between items-center">
            <h3 className="font-bold text-sm flex items-center gap-2">
              <CheckSquare size={16} className="text-blue-500" /> 今日のToDo
            </h3>
            <button onClick={() => navigateTo('tasks')} className="text-blue-600 text-xs hover:underline">すべて表示</button>
          </div>
          <div className="p-0">
            {TASKS.slice(0, 3).map(task => (
              <div key={task.id} className="p-3 border-b flex items-center gap-3 hover:bg-gray-50 transition-colors cursor-pointer" onClick={() => navigateTo('tasks')}>
                 <input type="checkbox" readOnly checked={task.status === 'Completed'} className="rounded" />
                 <div className="flex-1">
                    <div className="text-xs font-bold">{task.subject}</div>
                    <div className="text-[10px] text-gray-500">{task.relatedTo} • {task.dueDate}</div>
                 </div>
                 {task.priority === 'High' && <AlertCircle size={14} className="text-red-500" />}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {/* Chart */}
        <div className="sfdc-card">
          <div className="p-3 border-b">
            <h3 className="font-bold text-sm">担当者別商談 <InfoIcon id="forecast-chart" /></h3>
          </div>
          <div className="h-48 p-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" fontSize={10} />
                <YAxis fontSize={10} />
                <Tooltip />
                <Bar dataKey="value" fill="#0070D2" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Weekly New */}
        <div className="sfdc-card">
          <div className="p-3 border-b flex items-center justify-between">
            <h3 className="font-bold text-sm">今週の新規</h3>
            <span className="bg-gray-100 text-gray-600 text-[10px] px-2 py-0.5 rounded">3件</span>
          </div>
          <div className="p-3 space-y-3">
            {OPPORTUNITIES.filter(o => o.stage === 'Lead').slice(0, 2).map(o => (
              <div key={o.id} className="border p-2 rounded hover:border-blue-300 transition-colors cursor-pointer" onClick={() => navigateTo('opportunity_detail', o.id)}>
                <div className="flex gap-2 items-start">
                  <div className="bg-blue-500 p-1.5 rounded text-white"><Briefcase size={12} /></div>
                  <div>
                    <div className="text-xs font-bold text-blue-600 truncate">{o.name}</div>
                    <div className="text-[10px] text-gray-500">{o.accountName}</div>
                    <div className="text-[10px] text-gray-400 mt-1 flex items-center gap-1"><MapPin size={8} />東京都</div>
                  </div>
                </div>
              </div>
            ))}
            <button className="w-full text-center text-blue-600 text-[10px] hover:underline">最近の活動をすべて表示</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const AccountsPage = ({ navigateTo }: { navigateTo: (p: PageType, id?: string) => void }) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="bg-blue-400 p-2 rounded text-white shadow-sm"><Users size={24} /></div>
          <div>
            <div className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">取引先</div>
            <div className="flex items-center gap-1 font-bold text-lg">
              最近参照したデータ <ChevronDown size={14} className="mt-1" />
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="bg-white border rounded px-4 py-1.5 text-xs font-medium hover:bg-gray-50 transition-colors">新規</button>
          <button className="bg-white border rounded p-1.5 text-gray-500"><Search size={16} /></button>
          <button className="bg-white border rounded p-1.5 text-gray-500"><Filter size={16} /></button>
          <button className="bg-white border rounded p-1.5 text-gray-500"><Settings size={16} /></button>
        </div>
      </div>

      <div className="sfdc-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="p-3 w-8"><input type="checkbox" className="rounded" /></th>
                <th className="p-3">会社名</th>
                <th className="p-3">業種</th>
                <th className="p-3">電話</th>
                <th className="p-3">所有者</th>
                <th className="p-3">最終活動日</th>
                <th className="p-3 w-10"></th>
              </tr>
            </thead>
            <tbody>
              {ACCOUNTS.map(acc => (
                <tr key={acc.id} className="border-b hover:bg-gray-50 group">
                  <td className="p-3"><input type="checkbox" className="rounded" /></td>
                  <td className="p-3 text-blue-600 font-medium hover:underline cursor-pointer" onClick={() => navigateTo('account_detail', acc.id)}>
                    {acc.name}
                  </td>
                  <td className="p-3">{acc.industry}</td>
                  <td className="p-3">{acc.phone}</td>
                  <td className="p-3">{acc.owner}</td>
                  <td className="p-3">{acc.lastActivity}</td>
                  <td className="p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-1 hover:bg-gray-200 rounded"><MoreVertical size={14} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-2 border-t text-right text-[10px] text-gray-500">
          1-10 / 10件
        </div>
      </div>
    </div>
  );
};

const LeadsPage = () => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="bg-[#4BC076] p-2 rounded text-white shadow-sm"><UserPlus size={24} /></div>
          <div>
            <div className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">リード</div>
            <div className="flex items-center gap-1 font-bold text-lg">
              すべてのリード <ChevronDown size={14} className="mt-1" />
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="bg-white border rounded px-4 py-1.5 text-xs font-medium hover:bg-gray-50">新規</button>
          <button className="bg-white border rounded p-1.5 text-gray-500"><Filter size={16} /></button>
        </div>
      </div>

      <div className="sfdc-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="p-3 w-8"><input type="checkbox" className="rounded" /></th>
                <th className="p-3">名前</th>
                <th className="p-3">会社名</th>
                <th className="p-3">役職</th>
                <th className="p-3">メール</th>
                <th className="p-3">状況</th>
                <th className="p-3">所有者</th>
              </tr>
            </thead>
            <tbody>
              {LEADS.map(lead => (
                <tr key={lead.id} className="border-b hover:bg-gray-50">
                  <td className="p-3"><input type="checkbox" className="rounded" /></td>
                  <td className="p-3 text-blue-600 font-medium hover:underline cursor-pointer">{lead.name}</td>
                  <td className="p-3">{lead.company}</td>
                  <td className="p-3">{lead.title}</td>
                  <td className="p-3 text-blue-600">{lead.email}</td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] ${lead.status.includes('Working') ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}>
                      {lead.status}
                    </span>
                  </td>
                  <td className="p-3">{lead.owner}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const TasksPage = () => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="bg-[#46A1FF] p-2 rounded text-white shadow-sm"><ClipboardList size={24} /></div>
          <div>
            <div className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">ToDo</div>
            <div className="flex items-center gap-1 font-bold text-lg">
              最近参照したデータ <ChevronDown size={14} className="mt-1" />
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="bg-white border rounded px-4 py-1.5 text-xs font-medium hover:bg-gray-50">新規ToDo</button>
          <button className="bg-white border rounded px-4 py-1.5 text-xs font-medium hover:bg-gray-50">新規行動</button>
        </div>
      </div>

      <div className="sfdc-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="p-3 w-8"><input type="checkbox" className="rounded" /></th>
                <th className="p-3">件名</th>
                <th className="p-3">関連先</th>
                <th className="p-3">期日</th>
                <th className="p-3">状況</th>
                <th className="p-3">優先度</th>
                <th className="p-3">所有者</th>
              </tr>
            </thead>
            <tbody>
              {TASKS.map(task => (
                <tr key={task.id} className="border-b hover:bg-gray-50">
                  <td className="p-3"><input type="checkbox" checked={task.status === 'Completed'} readOnly className="rounded" /></td>
                  <td className="p-3 text-blue-600 font-medium hover:underline cursor-pointer">{task.subject}</td>
                  <td className="p-3">{task.relatedTo}</td>
                  <td className="p-3">{task.dueDate}</td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] ${task.status === 'Completed' ? 'bg-green-100 text-green-700' : task.status === 'In Progress' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-700'}`}>
                      {task.status}
                    </span>
                  </td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${task.priority === 'High' ? 'text-red-500' : 'text-gray-500'}`}>
                      {task.priority}
                    </span>
                  </td>
                  <td className="p-3">{task.owner}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const OpportunitiesPage = ({ navigateTo }: { navigateTo: (p: PageType, id?: string) => void }) => {
  const [view, setView] = useState<'list' | 'kanban'>('kanban');
  
  const stageColumns = ['Lead', 'Proposal', 'Negotiation', 'Contract', 'Closed Won'];
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="bg-orange-400 p-2 rounded text-white shadow-sm"><Briefcase size={24} /></div>
          <div>
            <div className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">商談</div>
            <div className="flex items-center gap-1 font-bold text-lg">
              すべての商談 <ChevronDown size={14} className="mt-1" />
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <div className="flex border rounded overflow-hidden">
            <button 
              onClick={() => setView('list')}
              className={`px-3 py-1.5 text-xs font-medium ${view === 'list' ? 'bg-gray-100' : 'bg-white'}`}
            >リスト</button>
            <button 
              onClick={() => setView('kanban')}
              className={`px-3 py-1.5 text-xs font-medium ${view === 'kanban' ? 'bg-gray-100' : 'bg-white'}`}
            >Kanban</button>
          </div>
          <button className="bg-white border rounded px-4 py-1.5 text-xs font-medium hover:bg-gray-50 transition-colors">新規</button>
        </div>
      </div>

      {view === 'list' ? (
        <div className="sfdc-card">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="p-3">商談名</th>
                  <th className="p-3">取引先名</th>
                  <th className="p-3">金額</th>
                  <th className="p-3">フェーズ</th>
                  <th className="p-3">完了予定</th>
                  <th className="p-3">所有者</th>
                </tr>
              </thead>
              <tbody>
                {OPPORTUNITIES.map(opp => (
                  <tr key={opp.id} className="border-b hover:bg-gray-50 cursor-pointer" onClick={() => navigateTo('opportunity_detail', opp.id)}>
                    <td className="p-3 text-blue-600 font-medium">{opp.name}</td>
                    <td className="p-3">{opp.accountName}</td>
                    <td className="p-3">¥{opp.amount.toLocaleString()}</td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] ${opp.stage === 'Closed Won' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                        {opp.stage}
                      </span>
                    </td>
                    <td className="p-3">{opp.closeDate}</td>
                    <td className="p-3">{opp.owner}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="flex gap-4 overflow-x-auto pb-4 kanban-scroll" style={{ height: 'calc(100vh - 250px)' }}>
          {stageColumns.map(stage => (
            <div key={stage} className="flex-shrink-0 w-72 flex flex-col gap-2">
              <div className="p-2 bg-gray-100 rounded-t flex justify-between items-center border-b">
                <span className="text-xs font-bold uppercase text-gray-500">{stage}</span>
                <span className="text-[10px] text-gray-400">
                  {OPPORTUNITIES.filter(o => o.stage === stage).length}件
                </span>
              </div>
              <div className="flex-1 overflow-y-auto space-y-2 bg-gray-50 p-2 rounded-b">
                {OPPORTUNITIES.filter(o => o.stage === stage).map(o => (
                  <div 
                    key={o.id} 
                    className="sfdc-card p-3 space-y-2 cursor-pointer hover:shadow-md transition-shadow active:scale-[0.98]"
                    onClick={() => navigateTo('opportunity_detail', o.id)}
                  >
                    <div className="text-xs font-bold text-blue-600 leading-tight">{o.name}</div>
                    <div className="text-[10px] text-gray-500">{o.accountName}</div>
                    <div className="flex justify-between items-end pt-1 border-t">
                      <div className="text-[10px] font-bold">¥{(o.amount / 10000).toLocaleString()}万円</div>
                      <div className="flex items-center gap-1">
                        <span className="text-[8px] text-gray-400">{o.closeDate}</span>
                        <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-[8px] border border-blue-200">
                          {o.owner[0]}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const OpportunityDetailPage = ({ oppId, navigateTo }: { oppId: string; navigateTo: (p: PageType, id?: string) => void }) => {
  const opp = OPPORTUNITIES.find(o => o.id === oppId) || OPPORTUNITIES[0];
  const [activeTab, setActiveTab] = useState<'activity' | 'detail' | 'related'>('detail');

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-white p-4 border rounded sfdc-shadow flex justify-between items-start">
        <div className="flex gap-4">
          <div className="bg-orange-400 p-2 rounded text-white"><Briefcase size={32} /></div>
          <div>
            <div className="text-xs text-gray-500 font-bold uppercase">商談</div>
            <h2 className="text-xl font-bold">{opp.name}</h2>
            <div className="flex gap-4 mt-2">
              <div>
                <div className="text-[10px] text-gray-400 font-bold">取引先名</div>
                <div className="text-xs text-blue-600 cursor-pointer" onClick={() => navigateTo('account_detail', opp.accountId)}>{opp.accountName}</div>
              </div>
              <div>
                <div className="text-[10px] text-gray-400 font-bold">完了予定日</div>
                <div className="text-xs">{opp.closeDate}</div>
              </div>
              <div>
                <div className="text-[10px] text-gray-400 font-bold">金額</div>
                <div className="text-xs font-bold">¥{opp.amount.toLocaleString()}</div>
              </div>
              <div>
                <div className="text-[10px] text-gray-400 font-bold">商談所有者</div>
                <div className="text-xs">{opp.owner}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="bg-white border rounded px-4 py-1.5 text-xs font-medium hover:bg-gray-50">編集</button>
          <button className="bg-sfdc-blue text-white rounded px-4 py-1.5 text-xs font-medium hover:bg-blue-600 shadow-md">ステージを進める</button>
        </div>
      </div>

      <div className="bg-white p-2 border rounded sfdc-shadow">
        <StagePath currentStage={opp.stage} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 space-y-4">
          <div className="sfdc-card bg-white">
            <div className="flex border-b">
              {['activity', 'detail', 'related'].map(tab => (
                <button 
                  key={tab}
                  onClick={() => setActiveTab(tab as any)}
                  className={`px-4 py-2 text-xs font-bold transition-colors ${activeTab === tab ? 'border-b-2 border-sfdc-blue text-sfdc-blue' : 'text-gray-500'}`}
                >
                  {tab === 'activity' ? '活動' : tab === 'detail' ? '詳細' : '関連リスト'}
                </button>
              ))}
            </div>
            <div className="p-4">
              {activeTab === 'detail' && (
                <div className="grid grid-cols-2 gap-y-4 gap-x-8 text-xs">
                  <div className="border-b pb-1">
                    <label className="text-gray-500 block">商談名</label>
                    <span className="font-medium">{opp.name}</span>
                  </div>
                  <div className="border-b pb-1">
                    <label className="text-gray-500 block">取引先名</label>
                    <span className="text-blue-600">{opp.accountName}</span>
                  </div>
                  <div className="border-b pb-1">
                    <label className="text-gray-500 block">フェーズ</label>
                    <span className="font-medium">{opp.stage}</span>
                  </div>
                  <div className="border-b pb-1">
                    <label className="text-gray-500 block">確度 (%) <InfoIcon id="probability" /></label>
                    <span className="font-medium">{opp.probability}%</span>
                  </div>
                  <div className="border-b pb-1">
                    <label className="text-gray-500 block">完了予定日</label>
                    <span className="font-medium">{opp.closeDate}</span>
                  </div>
                  <div className="border-b pb-1">
                    <label className="text-gray-500 block">金額</label>
                    <span className="font-medium">¥{opp.amount.toLocaleString()}</span>
                  </div>
                </div>
              )}
              {activeTab === 'activity' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h4 className="font-bold text-sm">活動タイムライン <InfoIcon id="activity-timeline" /></h4>
                    <button className="text-xs text-blue-600 border px-2 py-1 rounded">活動を記録</button>
                  </div>
                  {ACTIVITIES.map((act, i) => (
                    <div key={act.id} className="relative pl-6 pb-6">
                      {i !== ACTIVITIES.length - 1 && <div className="absolute left-[9px] top-6 bottom-0 w-px bg-gray-200"></div>}
                      <div className="absolute left-0 top-0 w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                        {act.type === 'email' ? <Mail size={12} /> : act.type === 'call' ? <Phone size={12} /> : <Users size={12} />}
                      </div>
                      <div className="bg-gray-50 p-3 rounded border">
                        <div className="flex justify-between items-start">
                          <div className="font-bold text-xs">{act.subject}</div>
                          <div className="text-[10px] text-gray-400">{act.date}</div>
                        </div>
                        <div className="text-[10px] text-gray-500 mt-1">{act.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {activeTab === 'related' && (
                <div className="p-12 text-center text-gray-400 text-xs">関連するファイルやメモはありません</div>
              )}
            </div>
          </div>
        </div>
        <div className="space-y-4">
           <div className="sfdc-card p-4">
             <h4 className="font-bold text-sm border-b pb-2 mb-3">重要な更新</h4>
             <div className="text-xs text-gray-500">
               最近の変更はありません。
             </div>
           </div>
        </div>
      </div>
    </div>
  );
};

const DashboardPage = () => {
  const pieData = [
    { name: 'Lead', value: 400 },
    { name: 'Proposal', value: 300 },
    { name: 'Negotiation', value: 300 },
    { name: 'Contract', value: 200 },
  ];
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const lineData = [
    { name: '1月', value: 4000 },
    { name: '2月', value: 3000 },
    { name: '3月', value: 5000 },
    { name: '4月', value: 2780 },
    { name: '5月', value: 1890 },
  ];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="bg-blue-600 p-2 rounded text-white shadow-sm"><BarChart3 size={24} /></div>
          <div>
            <div className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">ダッシュボード</div>
            <div className="flex items-center gap-1 font-bold text-lg">
              2024年度 売上予測 <ChevronDown size={14} className="mt-1" />
            </div>
          </div>
        </div>
        <div className="flex gap-2">
           <button className="bg-white border rounded px-4 py-1.5 text-xs font-medium hover:bg-gray-50">更新</button>
           <button className="bg-sfdc-blue text-white rounded px-4 py-1.5 text-xs font-medium hover:bg-blue-600 shadow-md">編集</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="sfdc-card p-4 h-64">
          <h4 className="font-bold text-sm mb-4">売上予測（確度加重） <InfoIcon id="forecast-chart" /></h4>
          <ResponsiveContainer width="100%" height="80%">
            <BarChart data={lineData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
              <XAxis type="number" fontSize={10} />
              <YAxis dataKey="name" type="category" fontSize={10} />
              <Tooltip />
              <Bar dataKey="value" fill="#0070D2" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="sfdc-card p-4 h-64">
          <h4 className="font-bold text-sm mb-4">商談ステージ別割合 <InfoIcon id="opportunity-pipeline" /></h4>
          <ResponsiveContainer width="100%" height="80%">
            <PieChart>
              <Pie data={pieData} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                {pieData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="sfdc-card p-4 h-64">
          <h4 className="font-bold text-sm mb-4">月別推移（件数）</h4>
          <ResponsiveContainer width="100%" height="80%">
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" fontSize={10} />
              <YAxis fontSize={10} />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#0070D2" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="sfdc-card p-4 h-64 flex flex-col justify-center items-center">
           <div className="text-3xl font-bold text-sfdc-blue">¥142,500,000</div>
           <div className="text-xs text-gray-500 mt-2 italic">今四半期の総商談金額（確度加重）</div>
        </div>
      </div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [activePage, setActivePage] = useState<PageType>('home');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const navigateTo = (page: PageType, id?: string) => {
    setIsLoading(true);
    setTimeout(() => {
      setActivePage(page);
      if (id) setSelectedId(id);
      setIsLoading(false);
    }, 400);
  };

  const tabs: { label: string; page: PageType; icon?: any }[] = [
    { label: 'ホーム', page: 'home' },
    { label: '商談', page: 'opportunities' },
    { label: 'リード', page: 'leads' },
    { label: 'ToDo', page: 'tasks' },
    { label: '取引先', page: 'accounts' },
    { label: 'レポート', page: 'reports' },
    { label: 'ダッシュボード', page: 'dashboards' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="fixed top-0 w-full z-40 bg-white border-b sfdc-shadow">
        <div className="h-12 px-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button className="p-1.5 hover:bg-gray-100 rounded text-gray-600 transition-colors">
              <LayoutGrid size={20} />
            </button>
            <div className="font-bold text-lg sfdc-blue tracking-tight select-none">セールス</div>
            
            <div className="relative ml-4 hidden md:block">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"><Search size={16} /></div>
              <input
                type="text"
                placeholder="検索"
                className="bg-gray-100 border-none rounded-full px-10 py-1.5 text-sm w-80 focus:ring-1 focus:ring-blue-500 transition-all outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <InfoIcon id="global-search" />
            </div>
          </div>

          <div className="flex items-center gap-4 text-gray-500">
            <button className="p-1.5 hover:bg-gray-100 rounded transition-colors"><Bell size={20} /></button>
            <button className="p-1.5 hover:bg-gray-100 rounded transition-colors"><Settings size={20} /></button>
            <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs cursor-pointer hover:bg-blue-700 transition-colors">
              山
            </div>
          </div>
        </div>

        {/* Nav Tabs */}
        <nav className="h-10 px-4 bg-[#F3F3F3] border-b flex items-center gap-1 overflow-x-auto">
          {tabs.map(tab => (
            <button
              key={tab.page}
              onClick={() => navigateTo(tab.page)}
              className={`px-4 py-2 text-sm font-medium whitespace-nowrap flex items-center gap-1 transition-colors relative
                ${activePage === tab.page ? 'bg-white border-t-2 border-t-sfdc-blue shadow-sm' : 'hover:bg-gray-200'}
              `}
            >
              {tab.label} <ChevronDown size={12} className="opacity-40" />
            </button>
          ))}
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-1 mt-[88px] p-4 md:p-6 pb-20 max-w-7xl mx-auto w-full">
        {isLoading ? (
          <div className="space-y-6 animate-pulse">
            <div className="h-12 bg-gray-200 rounded w-1/3"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="h-64 bg-gray-200 rounded lg:col-span-2"></div>
              <div className="h-64 bg-gray-200 rounded"></div>
            </div>
          </div>
        ) : (
          <>
            {activePage === 'home' && <HomePage navigateTo={navigateTo} />}
            {activePage === 'accounts' && <AccountsPage navigateTo={navigateTo} />}
            {activePage === 'account_detail' && (
              <div className="sfdc-card p-12 text-center text-gray-400">
                <h2 className="text-xl font-bold mb-4">取引先詳細: {ACCOUNTS.find(a => a.id === selectedId)?.name}</h2>
                <button onClick={() => navigateTo('accounts')} className="mt-4 text-blue-600 hover:underline">一覧に戻る</button>
              </div>
            )}
            {activePage === 'opportunities' && <OpportunitiesPage navigateTo={navigateTo} />}
            {activePage === 'opportunity_detail' && <OpportunityDetailPage oppId={selectedId!} navigateTo={navigateTo} />}
            {activePage === 'leads' && <LeadsPage />}
            {activePage === 'tasks' && <TasksPage />}
            {(activePage === 'reports' || activePage === 'dashboards') && <DashboardPage />}
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t py-2 px-4 text-[10px] text-gray-400 flex justify-between fixed bottom-0 w-full z-30">
        <div></div>
        <div className="font-bold">※これはデモ画面です。実際のデータの保存は行われません。</div>
      </footer>

      {/* Assistant */}
      <ChatBot />
    </div>
  );
}
