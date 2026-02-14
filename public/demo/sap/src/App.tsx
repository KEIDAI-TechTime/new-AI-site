
import React, { useState, useMemo, useEffect } from 'react';
import { 
  ModuleType, ScreenID, Material, Project, SalesOrder, PurchaseOrder, Message 
} from './types';
import { 
  INITIAL_MATERIALS, INITIAL_PROJECTS, INITIAL_ORDERS, INITIAL_PURCHASES, AI_PREDICTIONS, Icons, COLORS 
} from './constants';

// --- Sub-Components for AI Widget ---

const AnimatedNumber: React.FC<{ value: number }> = ({ value }) => {
  const [displayValue, setDisplayValue] = useState(0);
  useEffect(() => {
    let start = 0;
    const end = value;
    const duration = 800;
    const startTime = performance.now();
    const update = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 4);
      setDisplayValue(Math.floor(start + (end - start) * easeOut));
      if (progress < 1) requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
  }, [value]);
  return <span>{displayValue.toLocaleString()}</span>;
};

const AISimulatorWidget: React.FC<{ setScreen: (id: ScreenID) => void }> = ({ setScreen }) => {
  const [selectedId, setSelectedId] = useState("PRJ-2026-001");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const data = AI_PREDICTIONS[selectedId];

  const handleProjectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = e.target.value;
    setSelectedId(id);
    setIsAnalyzing(true);
    setTimeout(() => setIsAnalyzing(false), 1200);
  };

  const getRiskColor = (score: number) => {
    if (score >= 80) return "bg-red-500";
    if (score >= 50) return "bg-amber-500";
    return "bg-emerald-500";
  };

  const getRiskLabel = (score: number) => {
    if (score >= 80) return "高リスク";
    if (score >= 50) return "中リスク";
    return "低リスク";
  };

  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden mb-8 transition-all hover:shadow-xl">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-3 sm:px-6 py-3 flex items-center justify-between text-white">
        <div className="flex items-center gap-2">
          <Icons.AI />
          <h3 className="font-bold tracking-tight text-sm sm:text-base">AI原価シミュレーター</h3>
        </div>
        <div className="text-[10px] font-bold tracking-widest opacity-80 uppercase hidden sm:block">Powered by TechTime AI</div>
      </div>

      <div className="p-3 sm:p-6">
        {/* Selection Row */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3 md:gap-4 mb-6 md:mb-8 bg-gray-50 p-3 sm:p-4 rounded-lg border border-gray-100">
          <div className="flex-1 w-full">
            <label className="text-[10px] font-bold text-gray-400 uppercase mb-1 block">物件選択</label>
            <select 
              value={selectedId} 
              onChange={handleProjectChange}
              className="w-full border-none bg-transparent font-bold text-gray-800 focus:ring-0 cursor-pointer"
            >
              {INITIAL_PROJECTS.map(p => (
                <option key={p.id} value={p.id}>{p.id} {p.name}</option>
              ))}
            </select>
          </div>
          <button 
            onClick={() => { setIsAnalyzing(true); setTimeout(() => setIsAnalyzing(false), 1500); }}
            className="px-6 py-2 bg-indigo-600 text-white rounded text-sm font-bold shadow-md hover:bg-indigo-700 transition-colors shrink-0 w-full md:w-auto text-center"
          >
            {isAnalyzing ? "AI分析中..." : "予測を再実行"}
          </button>
        </div>

        {isAnalyzing && (
          <div className="mb-8">
            <div className="flex justify-between text-xs text-indigo-600 font-bold mb-1">
              <span>Deep Learning Analysis...</span>
              <span>Processing Market Trends</span>
            </div>
            <div className="h-1 w-full bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-indigo-600 animate-[loading_1.5s_ease-in-out]"></div>
            </div>
          </div>
        )}

        <div className={isAnalyzing ? "opacity-30 pointer-events-none grayscale transition-all" : "transition-all duration-500"}>
          {/* Metrics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6 md:mb-8">
            <div className="p-3 md:p-4 border border-gray-100 rounded-lg text-center">
              <div className="text-[10px] font-bold text-gray-400 uppercase mb-1">契約金額</div>
              <div className="text-base md:text-xl font-bold text-gray-800">{data.contractAmount.toLocaleString()}円</div>
            </div>
            <div className="p-3 md:p-4 border border-gray-100 rounded-lg text-center">
              <div className="text-[10px] font-bold text-gray-400 uppercase mb-1">現在原価</div>
              <div className="text-base md:text-xl font-bold text-gray-800">{data.currentCost.toLocaleString()}円</div>
              <div className="text-[10px] text-gray-400">({Math.round((data.currentCost/data.contractAmount)*100)}% 消化)</div>
            </div>
            <div className="p-3 md:p-4 bg-indigo-50 border border-indigo-100 rounded-lg text-center relative overflow-hidden">
              <div className="text-[10px] font-bold text-indigo-400 uppercase mb-1">AI予測原価</div>
              <div className="text-lg md:text-2xl font-black text-indigo-700">
                <AnimatedNumber value={data.predictedCost} />円
              </div>
              <div className="text-[10px] text-indigo-400">±{data.variance.toLocaleString()}円</div>
            </div>
            <div className="p-3 md:p-4 border border-gray-100 rounded-lg text-center">
              <div className="text-[10px] font-bold text-gray-400 uppercase mb-1">リスク指標</div>
              <div className="flex items-center justify-center gap-2 mt-1">
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden max-w-[100px]">
                  <div className={`h-full ${getRiskColor(data.riskScore)} transition-all duration-1000`} style={{ width: `${data.riskScore}%` }}></div>
                </div>
                <span className="text-sm font-bold text-gray-700">{data.riskScore}%</span>
              </div>
              <div className="text-[10px] font-bold text-gray-500 uppercase">{getRiskLabel(data.riskScore)}</div>
            </div>
          </div>

          {/* Detailed Breakdown */}
          <div className="mb-6 md:mb-8">
            <h4 className="text-sm font-bold text-gray-700 mb-3 md:mb-4 flex items-center gap-2">
              <Icons.Info /> 原価予測内訳
            </h4>
            <div className="bg-gray-50 p-3 sm:p-6 rounded-lg border border-gray-100 space-y-3 md:space-y-4">
              {data.breakdown.map((item: any, idx: number) => (
                <div key={idx} className="flex flex-col md:flex-row md:items-center gap-1.5 md:gap-4">
                  <div className="w-24 text-xs font-bold text-gray-600 shrink-0">{item.category}</div>
                  <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${item.status === 'rising' ? 'bg-orange-500' : 'bg-gray-500'} transition-all duration-1000 ease-out`} 
                      style={{ width: `${(item.amount / 12000000) * 100}%` }}
                    ></div>
                  </div>
                  <div className="w-40 flex items-center justify-between gap-4 shrink-0">
                    <span className="text-xs font-bold text-gray-700">{item.amount.toLocaleString()}円</span>
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${item.status === 'rising' ? 'bg-orange-100 text-orange-600' : 'bg-gray-200 text-gray-600'}`}>
                      {item.trend}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI Insights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
            {data.insights.map((insight: any, idx: number) => (
              <div 
                key={idx}
                onClick={() => insight.link && setScreen(insight.link)}
                className={`p-3 rounded border flex gap-3 transition-all ${insight.link ? 'cursor-pointer hover:scale-[1.02] shadow-sm' : ''} ${
                  insight.type === 'warning' ? 'bg-orange-50 border-orange-200 text-orange-800' : 
                  insight.type === 'success' ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 
                  'bg-blue-50 border-blue-200 text-blue-800'
                }`}
              >
                <div className="mt-0.5 shrink-0">
                  {insight.type === 'warning' ? <Icons.Exclamation /> : insight.type === 'success' ? <Icons.Check /> : <Icons.Info />}
                </div>
                <div>
                  <div className="text-xs leading-relaxed">{insight.text}</div>
                  {insight.link && <div className="text-[9px] font-bold mt-1 underline uppercase">Related: {insight.link}</div>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-gray-50 border-t border-gray-100 px-3 sm:px-6 py-2 flex items-center justify-between text-[10px] text-gray-400">
        <div className="flex items-center gap-2 italic truncate">
          <span className="hidden sm:inline">💡 このAI予測機能はTechTimeの独自技術です。導入のご相談はこちら →</span>
          <span className="sm:hidden">💡 TechTime AI</span>
          <span className="text-indigo-500 font-bold cursor-pointer hover:underline">techtime-ai.co.jp</span>
        </div>
        <div className="shrink-0 ml-2">Last Updated: Just Now</div>
      </div>

      <style>{`
        @keyframes loading {
          0% { width: 0%; }
          100% { width: 100%; }
        }
      `}</style>
    </div>
  );
};

// --- Shared Components ---

const MessageBar: React.FC<{ message: Message | null; onClose: () => void }> = ({ message, onClose }) => {
  if (!message) return null;
  const config = {
    S: { bg: 'bg-[#EBF5EE]', border: 'border-[#107E3E]', text: 'text-[#107E3E]', icon: <Icons.Check /> },
    I: { bg: 'bg-[#E8F1FA]', border: 'border-[#0A6ED1]', text: 'text-[#0A6ED1]', icon: <Icons.Info /> },
    W: { bg: 'bg-[#FEF5ED]', border: 'border-[#E9730C]', text: 'text-[#E9730C]', icon: <Icons.Exclamation /> },
    E: { bg: 'bg-[#FBEBEB]', border: 'border-[#BB0000]', text: 'text-[#BB0000]', icon: <Icons.Close /> },
  }[message.type];

  return (
    <div className={`fixed bottom-8 left-0 right-0 z-50 px-3 sm:px-4 py-2 border-t border-b ${config.bg} ${config.border} ${config.text} flex items-center justify-between shadow-lg transition-all duration-300`}>
      <div className="flex items-center gap-2 sm:gap-3 font-medium min-w-0">
        <span className="shrink-0">{config.icon}</span>
        <span className="truncate text-sm">{message.text}</span>
      </div>
      <button onClick={onClose} className="p-1 hover:bg-black/5 rounded">
        <Icons.Close />
      </button>
    </div>
  );
};

const ALVGrid: React.FC<{
  headers: { key: string; label: string; align?: 'left' | 'right' }[];
  data: any[];
  onRowClick?: (row: any) => void;
}> = ({ headers, data, onRowClick }) => {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const sortedData = useMemo(() => {
    if (!sortKey) return data;
    return [...data].sort((a, b) => {
      if (a[sortKey] < b[sortKey]) return sortOrder === 'asc' ? -1 : 1;
      if (a[sortKey] > b[sortKey]) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
  }, [data, sortKey, sortOrder]);

  const toggleSort = (key: string) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-sm overflow-hidden flex flex-col h-full shadow-sm">
      <div className="overflow-auto flex-1">
        <table className="w-full text-sm alv-grid">
          <thead className="sticky top-0 z-10">
            <tr>
              {headers.map((h) => (
                <th
                  key={h.key}
                  className={`px-2 sm:px-4 py-2 sm:py-3 cursor-pointer select-none whitespace-nowrap border-b border-gray-300 text-xs sm:text-sm ${h.align === 'right' ? 'text-right' : 'text-left'}`}
                  onClick={() => toggleSort(h.key)}
                >
                  <div className={`flex items-center gap-1 ${h.align === 'right' ? 'justify-end' : 'justify-start'}`}>
                    {h.label}
                    {sortKey === h.key && (
                      <span className="text-xs">{sortOrder === 'asc' ? '▲' : '▼'}</span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedData.map((row, idx) => (
              <tr 
                key={idx} 
                className="border-b border-gray-100 last:border-0"
                onClick={() => onRowClick?.(row)}
              >
                {headers.map((h) => (
                  <td key={h.key} className={`px-2 sm:px-4 py-2 sm:py-3 whitespace-nowrap text-xs sm:text-sm ${h.align === 'right' ? 'text-right' : 'text-left'}`}>
                    {h.key.toLowerCase().includes('amount') || h.key.toLowerCase().includes('price') 
                      ? `${Number(row[h.key]).toLocaleString()} 円`
                      : row[h.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="px-2 sm:px-4 py-2 border-t border-gray-200 bg-gray-50 text-xs text-gray-500 flex justify-between">
        <span>計 {data.length} 件</span>
        <div className="flex gap-2 sm:gap-4">
          <button className="flex items-center gap-1 hover:text-blue-600"><Icons.Download /> <span className="hidden sm:inline">CSV出力</span></button>
          <button className="flex items-center gap-1 hover:text-blue-600"><Icons.Filter /> <span className="hidden sm:inline">詳細フィルタ</span></button>
        </div>
      </div>
    </div>
  );
};

const FormSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="mb-6 md:mb-8">
    <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3 md:mb-4 border-b border-gray-100 pb-1">{title}</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 md:gap-x-8 gap-y-3 md:gap-y-4">
      {children}
    </div>
  </div>
);

const FormField: React.FC<{ label: string; required?: boolean; children: React.ReactNode }> = ({ label, required, children }) => (
  <div className="flex flex-col gap-1">
    <label className="text-xs font-semibold text-gray-600">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    {children}
  </div>
);

// --- Screen Components ---

const HomeScreen: React.FC<{ setScreen: (id: ScreenID) => void }> = ({ setScreen }) => {
  const modules = [
    { id: 'MASTER', name: 'マスタ管理', icon: <Icons.Settings />, screens: [{ id: 'MM01', name: '品目登録' }, { id: 'MM03', name: '品目照会' }, { id: 'XD01', name: '得意先登録' }, { id: 'XK01', name: '仕入先登録' }] },
    { id: 'SD', name: '受注・物流 (SD)', icon: <Icons.SD />, screens: [{ id: 'VA01', name: '受注伝票登録' }, { id: 'VA05', name: '受注一覧' }] },
    { id: 'PP', name: '生産管理 (PP)', icon: <Icons.PP />, screens: [{ id: 'CO01', name: '製造指図登録' }, { id: 'COOIS', name: '製造指図一覧' }] },
    { id: 'MM', name: '購買・在庫 (MM)', icon: <Icons.MM />, screens: [{ id: 'ME21N', name: '購買発注登録' }, { id: 'ME2M', name: '発注一覧' }, { id: 'MIGO', name: '入庫処理' }] },
    { id: 'FICO', name: '会計・原価 (FI/CO)', icon: <Icons.FICO />, screens: [{ id: 'FB03', name: '会計伝票照会' }, { id: 'CJI3', name: '物件別原価照会' }] },
  ];

  return (
    <div className="p-3 sm:p-6">
      {/* AI Widget Integrated at the top */}
      <AISimulatorWidget setScreen={setScreen} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
        {modules.map((m) => (
          <div key={m.id} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-4 border-b border-gray-100 pb-2">
              <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">{m.icon}</div>
              <h3 className="font-bold text-gray-800">{m.name}</h3>
            </div>
            <div className="flex flex-col gap-2">
              {m.screens.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setScreen(s.id as ScreenID)}
                  className="text-left text-sm py-2 px-3 rounded hover:bg-gray-50 flex items-center justify-between group"
                >
                  <span className="text-gray-600 group-hover:text-blue-600">{s.id}: {s.name}</span>
                  <Icons.ArrowRight />
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Main Application ---

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<ScreenID>('HOME');
  const [materials] = useState<Material[]>(INITIAL_MATERIALS);
  const [projects] = useState<Project[]>(INITIAL_PROJECTS);
  const [orders] = useState<SalesOrder[]>(INITIAL_ORDERS);
  const [purchases] = useState<PurchaseOrder[]>(INITIAL_PURCHASES);
  const [message, setMessage] = useState<Message | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 768);

  // Selection States
  const [selectedRecord, setSelectedRecord] = useState<any>(null);

  // Close sidebar on mobile when window resizes to small
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) setSidebarOpen(false);
      else setSidebarOpen(true);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const screenInfo = useMemo(() => {
    const infos: Record<ScreenID, { title: string; module: ModuleType }> = {
      HOME: { title: '未来住建 ホーム', module: ModuleType.HOME },
      MM01: { title: '品目マスタ登録', module: ModuleType.MASTER },
      MM02: { title: '品目マスタ変更', module: ModuleType.MASTER },
      MM03: { title: '品目マスタ照会', module: ModuleType.MASTER },
      XD01: { title: '得意先マスタ登録', module: ModuleType.MASTER },
      XK01: { title: '仕入先マスタ登録', module: ModuleType.MASTER },
      VA01: { title: '受注伝票登録', module: ModuleType.SD },
      VA02: { title: '受注伝票変更', module: ModuleType.SD },
      VA03: { title: '受注伝票照会', module: ModuleType.SD },
      VA05: { title: '受注一覧', module: ModuleType.SD },
      CO01: { title: '製造指図登録', module: ModuleType.PP },
      CO03: { title: '製造指図照会', module: ModuleType.PP },
      COOIS: { title: '製造指図一覧', module: ModuleType.PP },
      ME21N: { title: '購買発注登録', module: ModuleType.MM },
      ME23N: { title: '購買発注照会', module: ModuleType.MM },
      MIGO: { title: '入庫処理 (MIGO)', module: ModuleType.MM },
      ME2M: { title: '発注一覧', module: ModuleType.MM },
      FB03: { title: '会計伝票照会', module: ModuleType.FICO },
      CJI3: { title: '物件別原価照会', module: ModuleType.FICO },
    };
    return infos[currentScreen];
  }, [currentScreen]);

  const setScreenWithMsg = (id: ScreenID, rec: any = null) => {
    setCurrentScreen(id);
    setSelectedRecord(rec);
    setMessage(null);
  };

  const handleAction = (text: string, nextScreen: ScreenID) => {
    setMessage({ type: 'S', text: `○ ${text} が完了しました` });
    setTimeout(() => setScreenWithMsg(nextScreen), 1000);
  };

  const renderContent = () => {
    const inputClass = "w-full border border-gray-300 p-2 rounded text-sm fiori-input";
    const displayClass = "w-full bg-gray-50 border border-gray-200 p-2 rounded text-sm text-gray-700 font-medium";

    switch (currentScreen) {
      case 'HOME': return <HomeScreen setScreen={setScreenWithMsg} />;
      
      // --- List Screens ---
      case 'VA05': return <ALVGrid headers={[{ key: 'orderNo', label: '受注伝票' }, { key: 'projectId', label: '物件番号' }, { key: 'customerName', label: '施主名' }, { key: 'orderDate', label: '受注日' }, { key: 'amount', label: '受注金額', align: 'right' }, { key: 'status', label: 'ステータス' }]} data={orders} onRowClick={(r) => setScreenWithMsg('VA03', r)} />;
      case 'MM03': return <ALVGrid headers={[{ key: 'code', label: '品目コード' }, { key: 'name', label: '品目名称' }, { key: 'category', label: 'カテゴリ' }, { key: 'unit', label: '単位' }, { key: 'price', label: '標準単価', align: 'right' }]} data={materials} onRowClick={(r) => setScreenWithMsg('MM03', r)} />;
      case 'COOIS': return <ALVGrid headers={[{ key: 'id', label: '製造指図' }, { key: 'name', label: '指図名称' }, { key: 'customer', label: '施主' }, { key: 'status', label: '工程ステータス' }, { key: 'startDate', label: '開始予定' }, { key: 'endDate', label: '完了予定' }]} data={projects} onRowClick={(r) => setScreenWithMsg('CO03', r)} />;
      case 'ME2M': return <ALVGrid headers={[{ key: 'poNo', label: '購買発注' }, { key: 'vendorName', label: '仕入先' }, { key: 'materialCode', label: '品目' }, { key: 'quantity', label: '数量', align: 'right' }, { key: 'amount', label: '金額', align: 'right' }, { key: 'status', label: '納入状態' }]} data={purchases} onRowClick={(r) => setScreenWithMsg('ME23N', r)} />;
      case 'CJI3': 
        const costData = projects.map(p => ({ id: p.id, name: p.name, budget: p.contractAmount * 0.7, actual: p.contractAmount * (p.status === '施工中' ? 0.45 : p.status === '完工' ? 0.72 : 0), variance: (p.contractAmount * 0.7) - (p.contractAmount * (p.status === '施工中' ? 0.45 : p.status === '完工' ? 0.72 : 0)) }));
        return <ALVGrid headers={[{ key: 'id', label: '物件番号' }, { key: 'name', label: '物件名' }, { key: 'budget', label: '予算原価', align: 'right' }, { key: 'actual', label: '実績原価', align: 'right' }, { key: 'variance', label: '差異', align: 'right' }]} data={costData} />;

      // --- Registration Screens ---
      case 'MM01':
        return (
          <div className="bg-white p-4 sm:p-8 rounded shadow-sm border border-gray-200 max-w-5xl mx-auto">
            <FormSection title="基本データ">
              <FormField label="品目コード" required><input className={inputClass} placeholder="自動採番" disabled /></FormField>
              <FormField label="品目テキスト" required><input className={inputClass} placeholder="品目の名称を入力" /></FormField>
              <FormField label="基本数量単位" required>
                <select className={inputClass}><option>本</option><option>枚</option><option>式</option><option>㎡</option></select>
              </FormField>
              <FormField label="品目グループ"><input className={inputClass} placeholder="構造材、設備など" /></FormField>
            </FormSection>
            <FormSection title="価格データ">
              <FormField label="標準価格"><input type="number" className={inputClass} placeholder="0" /></FormField>
              <FormField label="通貨"><input className={inputClass} value="JPY" disabled /></FormField>
            </FormSection>
            <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
              <button onClick={() => setScreenWithMsg('HOME')} className="px-6 py-2 border border-gray-300 rounded text-sm hover:bg-gray-50">キャンセル</button>
              <button onClick={() => handleAction('品目マスタ', 'MM03')} className="px-6 py-2 sap-blue text-white rounded text-sm shadow-sm">保存</button>
            </div>
          </div>
        );

      case 'VA01':
        return (
          <div className="bg-white p-4 sm:p-8 rounded shadow-sm border border-gray-200 max-w-5xl mx-auto">
            <FormSection title="受注ヘッダ情報">
              <FormField label="物件名称" required><input className={inputClass} placeholder="例: 佐藤邸新築工事" /></FormField>
              <FormField label="得意先" required>
                <div className="relative"><input className={inputClass} placeholder="施主コードまたは氏名" /><div className="absolute right-2 top-2 text-gray-400"><Icons.Search /></div></div>
              </FormField>
              <FormField label="受注日付"><input type="date" className={inputClass} defaultValue={new Date().toISOString().split('T')[0]} /></FormField>
            </FormSection>
            <FormSection title="契約条件">
              <FormField label="契約金額" required><input type="number" className={inputClass} placeholder="30,000,000" /></FormField>
              <FormField label="支払条件"><select className={inputClass}><option>分割払 (標準)</option><option>一括払</option></select></FormField>
              <FormField label="引渡予定日"><input type="date" className={inputClass} /></FormField>
            </FormSection>
            <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
              <button onClick={() => setScreenWithMsg('HOME')} className="px-6 py-2 border border-gray-300 rounded text-sm hover:bg-gray-50">キャンセル</button>
              <button onClick={() => handleAction('受注伝票 1000003', 'VA05')} className="px-6 py-2 sap-blue text-white rounded text-sm shadow-sm">伝票保存</button>
            </div>
          </div>
        );

      case 'XD01':
        return (
          <div className="bg-white p-4 sm:p-8 rounded shadow-sm border border-gray-200 max-w-5xl mx-auto">
            <FormSection title="住所データ">
              <FormField label="氏名/名称" required><input className={inputClass} /></FormField>
              <FormField label="郵便番号"><input className={inputClass} placeholder="000-0000" /></FormField>
              <FormField label="住所"><input className={inputClass} placeholder="都道府県 市区町村 番地" /></FormField>
            </FormSection>
            <FormSection title="管理データ">
              <FormField label="電話番号"><input className={inputClass} /></FormField>
              <FormField label="メールアドレス"><input className={inputClass} /></FormField>
              <FormField label="得意先グループ"><select className={inputClass}><option>個人顧客</option><option>法人顧客</option></select></FormField>
            </FormSection>
            <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
              <button onClick={() => setScreenWithMsg('HOME')} className="px-6 py-2 border border-gray-300 rounded text-sm hover:bg-gray-50">キャンセル</button>
              <button onClick={() => handleAction('得意先マスタ', 'HOME')} className="px-6 py-2 sap-blue text-white rounded text-sm shadow-sm">保存</button>
            </div>
          </div>
        );

      case 'XK01':
        return (
          <div className="bg-white p-4 sm:p-8 rounded shadow-sm border border-gray-200 max-w-5xl mx-auto">
            <FormSection title="仕入先基本情報">
              <FormField label="仕入先名称" required><input className={inputClass} placeholder="例: 未来建材商事株式会社" /></FormField>
              <FormField label="検索語句"><input className={inputClass} placeholder="MIRAI-KENZAI" /></FormField>
              <FormField label="業種"><select className={inputClass}><option>建材卸</option><option>住宅設備機器</option><option>工事請負</option><option>その他</option></select></FormField>
            </FormSection>
            <FormSection title="支払・銀行データ">
              <FormField label="支払条件"><select className={inputClass}><option>翌月末現金</option><option>翌々月末現金</option><option>即時支払</option></select></FormField>
              <FormField label="銀行コード"><input className={inputClass} /></FormField>
              <FormField label="口座番号"><input className={inputClass} /></FormField>
            </FormSection>
            <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
              <button onClick={() => setScreenWithMsg('HOME')} className="px-6 py-2 border border-gray-300 rounded text-sm hover:bg-gray-50">キャンセル</button>
              <button onClick={() => handleAction('仕入先マスタ V001004', 'HOME')} className="px-6 py-2 sap-blue text-white rounded text-sm shadow-sm">保存</button>
            </div>
          </div>
        );

      case 'CO01':
        return (
          <div className="bg-white p-4 sm:p-8 rounded shadow-sm border border-gray-200 max-w-5xl mx-auto">
            <FormSection title="製造指図ヘッダ">
              <FormField label="物件(参照)" required>
                <div className="relative"><input className={inputClass} placeholder="PRJ-..." /><div className="absolute right-2 top-2 text-gray-400"><Icons.Search /></div></div>
              </FormField>
              <FormField label="指図タイプ"><select className={inputClass}><option>標準製造指図</option><option>追加工事指図</option></select></FormField>
              <FormField label="優先度"><select className={inputClass}><option>中 (標準)</option><option>高 (至急)</option><option>低</option></select></FormField>
            </FormSection>
            <FormSection title="スケジュール設定">
              <FormField label="開始予定日" required><input type="date" className={inputClass} /></FormField>
              <FormField label="完了予定日" required><input type="date" className={inputClass} /></FormField>
              <FormField label="プラント"><input className={inputClass} value="1000 (本社プラント)" disabled /></FormField>
            </FormSection>
            <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
              <button onClick={() => setScreenWithMsg('HOME')} className="px-6 py-2 border border-gray-300 rounded text-sm hover:bg-gray-50">キャンセル</button>
              <button onClick={() => handleAction('製造指図 70000001', 'COOIS')} className="px-6 py-2 sap-blue text-white rounded text-sm shadow-sm">指図保存・リリース</button>
            </div>
          </div>
        );

      case 'ME21N':
        return (
          <div className="bg-white p-4 sm:p-8 rounded shadow-sm border border-gray-200 max-w-5xl mx-auto">
            <FormSection title="購買ヘッダ">
              <FormField label="仕入先" required><div className="relative"><input className={inputClass} placeholder="仕入先コード" /><div className="absolute right-2 top-2 text-gray-400"><Icons.Search /></div></div></FormField>
              <FormField label="購買組織"><input className={inputClass} value="1000" disabled /></FormField>
              <FormField label="購買グループ"><input className={inputClass} value="001" disabled /></FormField>
            </FormSection>
            <FormSection title="明細入力">
              <FormField label="品目コード" required><div className="relative"><input className={inputClass} placeholder="MAT-..." /><div className="absolute right-2 top-2 text-gray-400"><Icons.Search /></div></div></FormField>
              <FormField label="数量" required><input type="number" className={inputClass} placeholder="0" /></FormField>
              <FormField label="納入日" required><input type="date" className={inputClass} /></FormField>
            </FormSection>
            <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
              <button onClick={() => setScreenWithMsg('HOME')} className="px-6 py-2 border border-gray-300 rounded text-sm hover:bg-gray-50">キャンセル</button>
              <button onClick={() => handleAction('購買発注 450000003', 'ME2M')} className="px-6 py-2 sap-blue text-white rounded text-sm shadow-sm">発注確定</button>
            </div>
          </div>
        );

      case 'MIGO':
        return (
          <div className="bg-white p-4 sm:p-8 rounded shadow-sm border border-gray-200 max-w-5xl mx-auto">
            <div className="mb-4 sm:mb-6 flex flex-wrap items-center gap-2 sm:gap-4 bg-gray-50 p-3 sm:p-4 rounded border border-gray-200">
              <span className="font-bold text-gray-700 text-sm">トランザクション:</span>
              <select className="border border-gray-300 p-1 rounded text-sm"><option>入庫</option><option>出庫</option></select>
              <span className="font-bold text-gray-700 text-sm sm:ml-4">参照伝票:</span>
              <select className="border border-gray-300 p-1 rounded text-sm"><option>購買発注</option><option>製造指図</option></select>
              <input className="border border-gray-300 p-1 rounded text-sm w-full sm:w-32" placeholder="伝票番号入力" />
              <button className="sap-blue text-white text-xs px-3 py-1.5 rounded w-full sm:w-auto">データ読込</button>
            </div>
            <ALVGrid 
              headers={[{ key: 'poNo', label: '購買発注' }, { key: 'materialCode', label: '品目' }, { key: 'quantity', label: '数量' }, { key: 'unit', label: '単位' }]} 
              data={[{ poNo: '450000001', materialCode: 'MAT-001', quantity: 100, unit: '本' }]} 
            />
            <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-100">
              <button onClick={() => setScreenWithMsg('HOME')} className="px-6 py-2 border border-gray-300 rounded text-sm hover:bg-gray-50">取消</button>
              <button onClick={() => handleAction('入庫伝票 50000001', 'HOME')} className="px-6 py-2 sap-blue text-white rounded text-sm shadow-sm">転記</button>
            </div>
          </div>
        );

      // --- Display Screens ---
      case 'VA03':
      case 'CO03':
      case 'ME23N':
      case 'FB03':
        const rec = selectedRecord || { orderNo: '1000001', customerName: '田中太郎', amount: 35000000, orderDate: '2025/09/15', status: '確定' };
        return (
          <div className="bg-white p-4 sm:p-8 rounded shadow-sm border border-gray-200 max-w-5xl mx-auto">
            <div className="flex flex-col sm:flex-row justify-between items-start mb-4 sm:mb-6 border-b pb-3 sm:pb-4 gap-2 sm:gap-4">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-800">{rec.orderNo || rec.id || rec.poNo || '10000214'}</h3>
                <p className="text-sm text-gray-400">ステータス: <span className="text-green-600 font-bold">{rec.status || '有効'}</span></p>
              </div>
              <div className="flex gap-2 shrink-0">
                <button className="px-2 sm:px-3 py-1.5 border border-gray-300 rounded text-xs font-medium hover:bg-gray-50">変更モード切替</button>
                <button className="px-2 sm:px-3 py-1.5 border border-gray-300 rounded text-xs font-medium hover:bg-gray-50">印刷プレビュー</button>
              </div>
            </div>
            <FormSection title="一般情報">
              <FormField label="名称/コード"><div className={displayClass}>{rec.customerName || rec.vendorName || rec.name || '住宅工事'}</div></FormField>
              <FormField label="日付"><div className={displayClass}>{rec.orderDate || rec.startDate || '2025/12/01'}</div></FormField>
              <FormField label="合計金額/予算"><div className={displayClass}>{Number(rec.amount || rec.contractAmount || 0).toLocaleString()} 円</div></FormField>
            </FormSection>
            <FormSection title="システム情報">
              <FormField label="登録者"><div className={displayClass}>S_YAMADA</div></FormField>
              <FormField label="登録日時"><div className={displayClass}>2025/11/24 10:24:12</div></FormField>
              <FormField label="最終変更者"><div className={displayClass}>SYSTEM</div></FormField>
            </FormSection>
            <div className="mt-4">
              <h4 className="text-sm font-bold text-gray-500 mb-2">明細一覧</h4>
              <ALVGrid 
                headers={[{ key: 'pos', label: '明細' }, { key: 'item', label: '品目/テキスト' }, { key: 'qty', label: '数量' }, { key: 'val', label: '金額', align: 'right' }]} 
                data={[{ pos: '00010', item: '本体工事一式', qty: '1', val: rec.amount || rec.contractAmount || 0 }]} 
              />
            </div>
          </div>
        );

      default:
        return (
          <div className="flex flex-col items-center justify-center h-64 text-gray-400 bg-white border border-dashed border-gray-300 rounded m-6">
            <Icons.Exclamation />
            <p className="mt-2">この画面 ({currentScreen}) はデモ用テンプレートです。</p>
            <button onClick={() => setScreenWithMsg('HOME')} className="mt-4 sap-text-blue font-medium underline">ホームへ戻る</button>
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#F7F7F7] select-none">
      <header className="h-12 sap-blue flex items-center justify-between px-2 sm:px-4 text-white shrink-0 z-50 shadow-md">
        <div className="flex items-center gap-2 sm:gap-4 min-w-0">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-1 hover:bg-white/10 rounded shrink-0"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg></button>
          <div className="flex items-center gap-2 cursor-pointer min-w-0" onClick={() => setScreenWithMsg('HOME')}>
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center font-bold text-xs shrink-0">MJ</div>
            <span className="font-bold text-sm sm:text-lg hidden sm:inline truncate">未来住建 生産調達システム</span>
          </div>
        </div>
        <div className="flex items-center gap-2 sm:gap-5 shrink-0">
          <div className="relative hidden lg:block"><input type="text" placeholder="トランザクションまたは品目を検索..." className="bg-white/10 border-none rounded-sm px-4 py-1 text-sm w-80 fiori-input focus:bg-white focus:text-gray-800 transition-all" /><div className="absolute right-3 top-1.5"><Icons.Search /></div></div>
          <button className="p-1 hover:bg-white/10 rounded"><Icons.Bell /></button>
          <button className="flex items-center gap-2 pl-2 border-l border-white/20"><span className="text-sm hidden sm:inline">山田 太郎</span><div className="w-8 h-8 rounded-full overflow-hidden bg-gray-300 border border-white/30"><Icons.User /></div></button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden relative">
        {/* Mobile overlay backdrop */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/30 z-30 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <nav className={`${sidebarOpen ? 'w-64 translate-x-0' : 'w-0 -translate-x-full md:translate-x-0'} fixed md:relative top-12 md:top-0 bottom-8 md:bottom-0 left-0 z-40 md:z-auto transition-all duration-300 bg-white border-r border-gray-200 overflow-hidden flex flex-col shrink-0`}>
          <div className="p-4 border-b border-gray-100 flex items-center gap-2 font-bold text-gray-700"><Icons.Home /> メニュー</div>
          <div className="flex-1 overflow-y-auto py-2">
            {[
              { id: 'HOME', name: 'ホーム', icon: <Icons.Home /> },
              { id: 'AI_PRED', name: 'AI原価予測', icon: <Icons.AI /> },
              { id: 'VA01', name: '受注伝票登録', icon: <Icons.SD /> },
              { id: 'VA05', name: '受注一覧', icon: <Icons.SD /> },
              { id: 'COOIS', name: '製造指図一覧', icon: <Icons.PP /> },
              { id: 'CO01', name: '製造指図登録', icon: <Icons.PP /> },
              { id: 'ME2M', name: '発注一覧', icon: <Icons.MM /> },
              { id: 'MM03', name: '品目照会', icon: <Icons.Settings /> },
              { id: 'CJI3', name: '物件別原価', icon: <Icons.FICO /> },
              { id: 'MIGO', name: '入庫処理', icon: <Icons.MM /> },
            ].map(item => (
              <button
                key={item.id}
                onClick={() => {
                  if (item.id === 'AI_PRED') setScreenWithMsg('HOME');
                  else setScreenWithMsg(item.id as ScreenID);
                  if (window.innerWidth < 768) setSidebarOpen(false);
                }}
                className={`w-full text-left px-4 py-3 flex items-center gap-3 text-sm transition-colors ${currentScreen === item.id || (item.id === 'AI_PRED' && currentScreen === 'HOME') ? 'bg-blue-50 text-[#0A6ED1] border-r-4 border-[#0A6ED1] font-semibold' : 'text-gray-600 hover:bg-gray-50'}`}
              >
                {item.icon}
                {item.name}
              </button>
            ))}
          </div>
          <div className="p-4 text-[10px] text-gray-400 border-t border-gray-100">v1.1.0-DEMO | 2026/01/24</div>
        </nav>

        <main className="flex-1 flex flex-col min-w-0">
          <div className="bg-white border-b border-gray-200 px-3 sm:px-6 py-2 sm:py-4 flex items-center justify-between shrink-0 gap-2">
            <div className="flex items-center gap-2 sm:gap-4 min-w-0">
              {currentScreen !== 'HOME' && <button onClick={() => setScreenWithMsg('HOME')} className="p-1 hover:bg-gray-100 rounded text-gray-500 shrink-0"><Icons.Back /></button>}
              <div className="min-w-0"><h2 className="text-base sm:text-xl font-bold text-gray-800 truncate">{screenInfo.title}</h2><p className="text-[10px] sm:text-xs text-gray-400 mt-0.5">{currentScreen} - {screenInfo.module}</p></div>
            </div>
            <div className="flex gap-1 sm:gap-2 shrink-0">
              <button className="px-2 sm:px-4 py-1.5 border border-gray-300 rounded text-xs sm:text-sm hover:bg-gray-50 text-gray-700 flex items-center gap-1 sm:gap-2"><Icons.Filter /> <span className="hidden sm:inline">フィルタ</span></button>
              <button onClick={() => setMessage({ type: 'I', text: 'ℹ データを最新に更新しました' })} className="px-2 sm:px-4 py-1.5 sap-blue text-white rounded text-xs sm:text-sm hover:opacity-90 shadow-sm whitespace-nowrap">実行 / 更新</button>
            </div>
          </div>

          <div className="px-3 sm:px-6 py-1.5 sm:py-2 bg-gray-50 border-b border-gray-200 flex items-center gap-2 sm:gap-4 text-xs font-medium overflow-x-auto">
            <span className="text-gray-400 uppercase tracking-widest text-[10px] shrink-0">Session:</span>
            <span className="flex items-center gap-1 text-blue-700 shrink-0"><div className="w-1.5 h-1.5 rounded-full bg-blue-700"></div> 標準レイアウト</span>
            <span className="text-gray-300 hidden sm:inline">|</span>
            <span className="text-gray-600 hidden sm:inline">全物件表示</span>
            {currentScreen === 'HOME' && <span className="ml-auto text-indigo-600 font-bold bg-indigo-50 px-2 py-0.5 rounded shrink-0 text-[10px] sm:text-xs">AI Prediction Active</span>}
          </div>

          <div className="flex-1 overflow-auto">{renderContent()}</div>
        </main>
      </div>

      <MessageBar message={message} onClose={() => setMessage(null)} />

      <footer className="h-8 bg-white border-t border-gray-200 px-2 sm:px-4 flex items-center justify-between text-[10px] sm:text-[11px] text-gray-500 shrink-0 z-50 shadow-[0_-2px_4px_rgba(0,0,0,0.05)]">
        <div className="flex items-center gap-2 sm:gap-4">
          <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-green-500"></div> <span className="hidden sm:inline">システム</span>稼働中</span>
          <span className="hidden md:inline">サーバー: S4H-PRD-AP01</span>
          <span className="hidden lg:inline">プロジェクト: 住宅生産2026</span>
        </div>
        <div className="flex gap-2 sm:gap-4 font-medium italic">
          <span className="hidden sm:inline">SAP Fiori Elements Experience</span>
          <span className="text-[#0A6ED1] not-italic font-bold">MIRAI JUKEN</span>
        </div>
      </footer>
    </div>
  );
};

export default App;
