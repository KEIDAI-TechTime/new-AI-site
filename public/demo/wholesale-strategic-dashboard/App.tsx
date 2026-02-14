
import React, { useState, useMemo } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, 
  LineChart, Line, ScatterChart, Scatter, ZAxis, Cell, ComposedChart
} from 'recharts';
import { 
  TrendingUp, AlertTriangle, Target, Grid, ArrowUpRight, ArrowDownRight, 
  Clock, Activity, Search, RefreshCw, ChevronRight, Zap
} from 'lucide-react';
import { ViewType, KPIData } from './types';
import { MONTHLY_TRENDS, CATEGORY_STATS, CUSTOMER_DATA } from './constants';

// UI Helper Components
// Fix: Added children as optional to resolve missing children property errors in JSX
const Card = ({ children, title, className = "" }: { children?: React.ReactNode, title?: string, className?: string }) => (
  <div className={`bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden ${className}`}>
    {title && (
      <div className="px-5 py-4 border-b border-slate-100 flex justify-between items-center">
        <h3 className="font-semibold text-slate-800 tracking-tight">{title}</h3>
      </div>
    )}
    <div className="p-5">{children}</div>
  </div>
);

// Fix: Added optional key to props type to allow usage within map functions
const KPICard = ({ data }: { data: KPIData, key?: React.Key }) => (
  <Card className="hover:border-blue-200 transition-colors">
    <div className="flex justify-between items-start mb-2">
      <span className="text-sm font-medium text-slate-500">{data.label}</span>
      {data.vsLastYear >= 100 ? 
        <ArrowUpRight className="w-4 h-4 text-emerald-500" /> : 
        <ArrowDownRight className="w-4 h-4 text-rose-500" />
      }
    </div>
    <div className="flex items-baseline gap-1">
      <span className="text-2xl font-bold text-slate-900">{data.value}</span>
      <span className="text-xs text-slate-500 font-medium">{data.unit}</span>
    </div>
    <div className="mt-3 flex items-center gap-3 text-xs">
      <div className="flex items-center gap-1">
        <span className="text-slate-400">予算比</span>
        <span className={data.vsTarget >= 100 ? "text-emerald-600 font-bold" : "text-rose-600 font-bold"}>
          {data.vsTarget >= 100 ? "+" : ""}{(data.vsTarget - 100).toFixed(1)}%
        </span>
      </div>
      <div className="flex items-center gap-1">
        <span className="text-slate-400">前年比</span>
        <span className={data.vsLastYear >= 100 ? "text-emerald-600 font-bold" : "text-rose-600 font-bold"}>
          {data.vsLastYear >= 100 ? "+" : ""}{(data.vsLastYear - 100).toFixed(1)}%
        </span>
      </div>
    </div>
  </Card>
);

const InsightBar = ({ message }: { message: string }) => (
  <div className="mb-6 bg-blue-50 border border-blue-100 rounded-lg p-4 flex items-center gap-3">
    <div className="bg-blue-600 p-2 rounded-full shadow-sm">
      <Zap className="w-4 h-4 text-white" />
    </div>
    <p className="text-blue-800 text-sm font-medium leading-relaxed">
      <span className="font-bold mr-2 text-blue-900 underline decoration-blue-300">AI分析サマリー:</span> 
      {message}
    </p>
  </div>
);

export default function App() {
  const [activeTab, setActiveTab] = useState<ViewType>(ViewType.SUMMARY);

  const kpis: KPIData[] = [
    { label: '売上高 (累計)', value: '38,900', unit: '百万円', vsTarget: 99.8, vsLastYear: 104.2 },
    { label: '粗利益', value: '6,145', unit: '百万円', vsTarget: 102.5, vsLastYear: 108.7 },
    { label: '粗利率', value: '15.8', unit: '%', vsTarget: 101.2, vsLastYear: 102.1 },
    { label: '営業利益', value: '1,420', unit: '百万円', vsTarget: 105.4, vsLastYear: 110.5 },
  ];

  return (
    <div className="min-h-screen pb-20">
      {/* Sidebar-style Top Navigation */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
              <TrendingUp className="text-white w-5 h-5" />
            </div>
            <h1 className="text-lg font-bold tracking-tight text-slate-800">TechTime Strategic Dashboard</h1>
            <span className="ml-4 px-2 py-0.5 bg-slate-100 text-slate-500 text-[10px] font-bold rounded uppercase tracking-wider">Internal Use Only</span>
          </div>
          <div className="flex items-center gap-4 text-sm text-slate-500">
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              <span>更新: 2024/03/20 10:00</span>
            </div>
            <button className="p-2 hover:bg-slate-50 rounded-full transition-colors">
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6">
          <nav className="flex gap-8">
            <TabButton 
              active={activeTab === ViewType.SUMMARY} 
              onClick={() => setActiveTab(ViewType.SUMMARY)}
              icon={<TrendingUp className="w-4 h-4" />}
              label="経営サマリー"
            />
            <TabButton 
              active={activeTab === ViewType.HEALTH} 
              onClick={() => setActiveTab(ViewType.HEALTH)}
              icon={<Activity className="w-4 h-4" />}
              label="取引先「健康診断」"
            />
            <TabButton 
              active={activeTab === ViewType.GROWTH} 
              onClick={() => setActiveTab(ViewType.GROWTH)}
              icon={<Target className="w-4 h-4" />}
              label="「伸びしろ」分析"
            />
            <TabButton 
              active={activeTab === ViewType.MATRIX} 
              onClick={() => setActiveTab(ViewType.MATRIX)}
              icon={<Grid className="w-4 h-4" />}
              label="利益貢献マトリクス"
            />
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 pt-8">
        {activeTab === ViewType.SUMMARY && <SummaryView kpis={kpis} />}
        {activeTab === ViewType.HEALTH && <HealthCheckView />}
        {activeTab === ViewType.GROWTH && <GrowthPotentialView />}
        {activeTab === ViewType.MATRIX && <ProfitMatrixView />}
      </main>
    </div>
  );
}

function TabButton({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) {
  return (
    <button 
      onClick={onClick}
      className={`flex items-center gap-2 py-4 px-1 border-b-2 transition-all font-medium text-sm ${
        active 
          ? "border-blue-600 text-blue-600" 
          : "border-transparent text-slate-400 hover:text-slate-600"
      }`}
    >
      {icon}
      {label}
    </button>
  );
}

// --- View: Management Summary ---
function SummaryView({ kpis }: { kpis: KPIData[] }) {
  return (
    <div className="space-y-6">
      <InsightBar message="累計売上は予算比▲0.2%とほぼ計画通り。高利益率の化粧品カテゴリが前年比115%と極めて好調。一方、医薬品は供給網の影響で▲7.9%と課題が残る。" />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, idx) => <KPICard key={idx} data={kpi} />)}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card title="月次業績推移" className="lg:col-span-2">
          <div className="h-[350px] w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={MONTHLY_TRENDS}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} unit="M" />
                <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{fill: '#0ea5e9', fontSize: 12}} unit="%" />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  cursor={{ fill: '#f8fafc' }}
                />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
                <Bar yAxisId="left" dataKey="sales" name="売上高" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={32} />
                <Bar yAxisId="left" dataKey="profit" name="粗利益" fill="#94a3b8" radius={[4, 4, 0, 0]} barSize={32} />
                <Line yAxisId="right" type="monotone" dataKey="vsLastYear" name="前年比" stroke="#0ea5e9" strokeWidth={3} dot={{ r: 4, fill: '#fff', strokeWidth: 2 }} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title="カテゴリ別シェア">
          <div className="h-[350px] w-full flex flex-col justify-center">
            {CATEGORY_STATS.map((cat, i) => (
              <div key={i} className="mb-4 last:mb-0">
                <div className="flex justify-between items-end mb-1">
                  <span className="text-sm font-semibold text-slate-700">{cat.name}</span>
                  <span className="text-xs text-slate-500">{cat.share}%</span>
                </div>
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                  <div 
                    className="bg-blue-600 h-full rounded-full transition-all" 
                    style={{ width: `${cat.share}%`, opacity: 1 - (i * 0.15) }} 
                  />
                </div>
              </div>
            ))}
            <div className="mt-8 pt-6 border-t border-slate-100">
              <div className="flex items-center gap-4">
                <div className="text-center flex-1">
                  <div className="text-xs text-slate-400 mb-1">最高粗利率</div>
                  <div className="text-lg font-bold text-blue-600">化粧品 (25%)</div>
                </div>
                <div className="w-px h-10 bg-slate-100" />
                <div className="text-center flex-1">
                  <div className="text-xs text-slate-400 mb-1">成長率1位</div>
                  <div className="text-lg font-bold text-emerald-600">化粧品 (+15%)</div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <Card title="カテゴリ実績詳細">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-wider border-y border-slate-100">
                <th className="px-4 py-3">カテゴリ</th>
                <th className="px-4 py-3 text-right">売上高 (M)</th>
                <th className="px-4 py-3 text-right">粗利益 (M)</th>
                <th className="px-4 py-3 text-right">粗利率 (%)</th>
                <th className="px-4 py-3 text-right">前年比 (%)</th>
                <th className="px-4 py-3 text-right">構成比 (%)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {CATEGORY_STATS.map((cat, i) => (
                <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-4 py-3 text-sm font-semibold text-slate-700">{cat.name}</td>
                  <td className="px-4 py-3 text-sm text-right font-mono">{cat.sales.toLocaleString()}</td>
                  <td className="px-4 py-3 text-sm text-right font-mono">{cat.profit.toLocaleString()}</td>
                  <td className="px-4 py-3 text-sm text-right font-mono">{cat.margin.toFixed(1)}%</td>
                  <td className={`px-4 py-3 text-sm text-right font-bold ${cat.vsLastYear >= 100 ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {cat.vsLastYear >= 100 ? '↑' : '↓'} {cat.vsLastYear.toFixed(1)}%
                  </td>
                  <td className="px-4 py-3 text-sm text-right font-mono text-slate-500">{cat.share}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

// --- View: Customer Health Check ---
function HealthCheckView() {
  const summary = { healthy: 7, attention: 1, danger: 2 };

  return (
    <div className="space-y-6">
      <InsightBar message="ドラッグチェーンBの健康スコアが35点まで急低下。発注頻度が『不定期』となり、支払い遅延が14日発生しています。地域密着型スーパーAも資金繰り悪化の兆候あり、早急な債権確認を推奨します。" />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <HealthMetric label="健全" count={summary.healthy} color="bg-emerald-500" icon={<Activity className="text-white w-4 h-4" />} />
        <HealthMetric label="要注意" count={summary.attention} color="bg-amber-500" icon={<AlertTriangle className="text-white w-4 h-4" />} />
        <HealthMetric label="危険" count={summary.danger} color="bg-rose-500" icon={<AlertTriangle className="text-white w-4 h-4" />} />
      </div>

      <Card title="取引先健康診断リスト">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-wider border-y border-slate-100">
                <th className="px-4 py-3">取引先名</th>
                <th className="px-4 py-3 text-center">健康スコア</th>
                <th className="px-4 py-3 text-right">売上高 (億円)</th>
                <th className="px-4 py-3">発注頻度</th>
                <th className="px-4 py-3">支払状況</th>
                <th className="px-4 py-3">取引年数</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {CUSTOMER_DATA.sort((a,b) => a.healthScore - b.healthScore).map((cust) => (
                <tr key={cust.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3 text-sm font-semibold text-slate-700 flex items-center gap-2">
                    {cust.healthScore < 50 && <AlertTriangle className="w-4 h-4 text-rose-500" />}
                    {cust.name}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="flex-1 bg-slate-100 h-2 rounded-full max-w-[100px]">
                        <div 
                          className={`h-full rounded-full ${cust.healthScore > 80 ? 'bg-emerald-500' : cust.healthScore > 50 ? 'bg-amber-500' : 'bg-rose-500'}`} 
                          style={{ width: `${cust.healthScore}%` }} 
                        />
                      </div>
                      <span className="text-xs font-bold font-mono w-6">{cust.healthScore}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-right font-mono">{cust.sales.toFixed(1)}</td>
                  <td className="px-4 py-3 text-sm text-slate-600">{cust.orderFrequency}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${cust.paymentStatus === 'normal' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                      {cust.paymentStatus === 'normal' ? '正常' : '遅延'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-600">{cust.yearsActive}年</td>
                  <td className="px-4 py-3 text-right">
                    <button className="p-1 hover:bg-slate-100 rounded text-slate-400">
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

function HealthMetric({ label, count, color, icon }: { label: string, count: number, color: string, icon: React.ReactNode }) {
  return (
    <Card className="flex items-center gap-4">
      <div className={`${color} p-3 rounded-lg shadow-sm`}>{icon}</div>
      <div>
        <div className="text-xs text-slate-500 font-medium mb-1">{label}取引先</div>
        <div className="text-2xl font-bold text-slate-900">{count} <span className="text-sm font-normal text-slate-400">社</span></div>
      </div>
    </Card>
  );
}

// --- View: Growth Potential Ranking ---
function GrowthPotentialView() {
  const topGrowth = useMemo(() => {
    return CUSTOMER_DATA
      .map(c => ({ ...c, gap: c.potentialSales - c.sales }))
      .sort((a, b) => b.gap - a.gap)
      .slice(0, 5);
  }, []);

  return (
    <div className="space-y-6">
      <InsightBar message="上位5社で累計46億円の獲得余地。特にマツキヨココカラは化粧品カテゴリの競合スイッチを促すことで+22.6億円の増収が見込めます。未開拓カテゴリの提案を強化してください。" />
      
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3 space-y-6">
          <Card title="伸びしろランキング TOP 5">
            <div className="space-y-8 py-4">
              {topGrowth.map((cust, i) => (
                <div key={cust.id} className="relative">
                  <div className="flex justify-between items-end mb-2">
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 bg-slate-800 text-white rounded-full flex items-center justify-center text-xs font-bold">{i + 1}</span>
                      <h4 className="text-sm font-bold text-slate-800">{cust.name}</h4>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-slate-400">伸びしろ</div>
                      <div className="text-sm font-bold text-blue-600">+{cust.gap.toFixed(1)} 億円</div>
                    </div>
                  </div>
                  <div className="w-full h-8 bg-slate-100 rounded-lg overflow-hidden flex">
                    <div className="bg-blue-600 h-full flex items-center justify-end px-3 transition-all" style={{ width: `${(cust.sales / cust.potentialSales) * 100}%` }}>
                      <span className="text-[10px] text-white font-bold whitespace-nowrap overflow-hidden">現在: {cust.sales.toFixed(1)} 億</span>
                    </div>
                    <div className="bg-blue-200 h-full opacity-60 flex items-center justify-start px-3" style={{ width: `${(cust.gap / cust.potentialSales) * 100}%` }}>
                      <span className="text-[10px] text-blue-800 font-bold whitespace-nowrap overflow-hidden">潜在: {cust.potentialSales.toFixed(1)} 億</span>
                    </div>
                  </div>
                  <p className="mt-2 text-xs text-slate-500 leading-relaxed bg-slate-50 p-2 rounded border border-slate-100 italic">
                    <Zap className="w-3 h-3 inline mr-1 text-blue-500" />
                    {cust.potentialReason}
                  </p>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <Card title="獲得余地カテゴリ分析">
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={CATEGORY_STATS} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f1f5f9" />
                  <XAxis type="number" hide />
                  <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#475569'}} width={80} />
                  <Tooltip cursor={{fill: '#f8fafc'}} />
                  <Bar dataKey="sales" name="現在の売上" fill="#3b82f6" radius={[0, 4, 4, 0]} barSize={20} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 p-4 bg-emerald-50 border border-emerald-100 rounded-lg">
              <h5 className="text-emerald-800 text-xs font-bold mb-2 flex items-center gap-1">
                <ArrowUpRight className="w-3 h-3" />
                推奨アクション
              </h5>
              <ul className="text-xs text-emerald-700 space-y-2 list-disc list-inside">
                <li>化粧品シェア上位3社への重点プロモーション</li>
                <li>医薬品欠品率の改善による機会損失回避</li>
                <li>食品プライベートブランドの開発提案</li>
              </ul>
            </div>
          </Card>
          
          <Card title="伸びしろの源泉">
            <div className="space-y-4">
              <SourceItem label="競合他社からのスイッチ" value="45%" color="bg-blue-500" />
              <SourceItem label="新規カテゴリ導入" value="30%" color="bg-indigo-500" />
              <SourceItem label="店舗数拡大に伴う増床" value="15%" color="bg-violet-500" />
              <SourceItem label="休眠店舗の活性化" value="10%" color="bg-purple-500" />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

function SourceItem({ label, value, color }: { label: string, value: string, color: string }) {
  return (
    <div>
      <div className="flex justify-between text-[11px] mb-1">
        <span className="text-slate-600">{label}</span>
        <span className="font-bold text-slate-800">{value}</span>
      </div>
      <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
        <div className={`${color} h-full rounded-full`} style={{ width: value }} />
      </div>
    </div>
  );
}

// --- View: Profit Contribution Matrix ---
function ProfitMatrixView() {
  const [selectedQuadrant, setSelectedQuadrant] = useState<string | null>(null);

  const filteredData = useMemo(() => {
    return selectedQuadrant 
      ? CUSTOMER_DATA.filter(c => c.quadrant === selectedQuadrant)
      : CUSTOMER_DATA;
  }, [selectedQuadrant]);

  const quadrantCounts = useMemo(() => {
    return CUSTOMER_DATA.reduce((acc: any, curr) => {
      acc[curr.quadrant] = (acc[curr.quadrant] || 0) + 1;
      return acc;
    }, {});
  }, []);

  return (
    <div className="space-y-6">
      <InsightBar message="イオン株式会社を12.5%から15%へ粗利改善できれば+1.3億円の利益増。また、問題児に位置するコストコへの拡販成功で+3.4億円の粗利インパクトが期待できます。" />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="売上 × 粗利率 ポートフォリオ">
          <div className="h-[400px] w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis type="number" dataKey="sales" name="売上高" unit="億円" label={{ value: '売上高 (億円)', position: 'bottom', offset: -5, fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis type="number" dataKey="margin" name="粗利率" unit="%" label={{ value: '粗利率 (%)', angle: -90, position: 'left', fontSize: 10 }} axisLine={false} tickLine={false} />
                <ZAxis type="number" range={[100, 1000]} />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} content={<CustomScatterTooltip />} />
                <Scatter name="取引先" data={CUSTOMER_DATA}>
                  {CUSTOMER_DATA.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={
                        entry.quadrant === 'Star' ? '#3b82f6' : 
                        entry.quadrant === 'CashCow' ? '#10b981' : 
                        entry.quadrant === 'ProblemChild' ? '#f59e0b' : '#ef4444'
                      } 
                    />
                  ))}
                </Scatter>
              </ScatterChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-slate-100">
             <LegendItem label="★ スター" color="bg-blue-500" description="維持・強化" count={quadrantCounts.Star} active={selectedQuadrant === 'Star'} onClick={() => setSelectedQuadrant('Star')} />
             <LegendItem label="💰 金のなる木" color="bg-emerald-500" description="効率化・価格交渉" count={quadrantCounts.CashCow} active={selectedQuadrant === 'CashCow'} onClick={() => setSelectedQuadrant('CashCow')} />
             <LegendItem label="❓ 問題児" color="bg-amber-500" description="拡販・育成" count={quadrantCounts.ProblemChild} active={selectedQuadrant === 'ProblemChild'} onClick={() => setSelectedQuadrant('ProblemChild')} />
             <LegendItem label="📉 負け犬" color="bg-rose-500" description="撤退・縮小検討" count={quadrantCounts.Dog} active={selectedQuadrant === 'Dog'} onClick={() => setSelectedQuadrant('Dog')} />
          </div>
          <div className="mt-4 text-center">
            {selectedQuadrant && (
              <button 
                onClick={() => setSelectedQuadrant(null)}
                className="text-xs text-blue-600 font-bold hover:underline"
              >
                フィルターをクリア
              </button>
            )}
          </div>
        </Card>

        <Card title={selectedQuadrant ? `${selectedQuadrant} 該当企業` : "全取引先一覧"}>
          <div className="overflow-y-auto max-h-[480px]">
            <table className="w-full text-left">
              <thead className="sticky top-0 bg-white shadow-sm">
                <tr className="text-[10px] text-slate-400 font-bold uppercase tracking-wider border-b border-slate-100">
                  <th className="px-3 py-2">取引先</th>
                  <th className="px-3 py-2 text-right">売上</th>
                  <th className="px-3 py-2 text-right">粗利</th>
                  <th className="px-3 py-2">区分</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredData.map(cust => (
                  <tr key={cust.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-3 py-3 text-xs font-semibold text-slate-700">{cust.name}</td>
                    <td className="px-3 py-3 text-xs text-right font-mono">{cust.sales.toFixed(1)}億</td>
                    <td className="px-3 py-3 text-xs text-right font-mono">{cust.margin.toFixed(1)}%</td>
                    <td className="px-3 py-3">
                      <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                        cust.quadrant === 'Star' ? 'bg-blue-100 text-blue-700' : 
                        cust.quadrant === 'CashCow' ? 'bg-emerald-100 text-emerald-700' : 
                        cust.quadrant === 'ProblemChild' ? 'bg-amber-100 text-amber-700' : 'bg-rose-100 text-rose-700'
                      }`}>
                        {cust.quadrant}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}

const CustomScatterTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white p-3 border border-slate-200 rounded-lg shadow-xl text-xs">
        <div className="font-bold text-slate-800 mb-1">{data.name}</div>
        <div className="flex justify-between gap-4 mb-0.5">
          <span className="text-slate-500">売上高:</span>
          <span className="font-mono font-bold">{data.sales} 億円</span>
        </div>
        <div className="flex justify-between gap-4">
          <span className="text-slate-500">粗利率:</span>
          <span className="font-mono font-bold text-blue-600">{data.margin}%</span>
        </div>
      </div>
    );
  }
  return null;
};

function LegendItem({ label, color, description, count, active, onClick }: { label: string, color: string, description: string, count: number, active: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`flex items-start gap-3 p-2 rounded-lg transition-all border text-left ${active ? 'bg-slate-50 border-slate-300 ring-1 ring-slate-300' : 'border-transparent hover:bg-slate-50'}`}
    >
      <div className={`${color} w-3 h-3 rounded-full mt-1 flex-shrink-0`} />
      <div className="flex-1">
        <div className="flex justify-between items-center mb-0.5">
          <span className="text-xs font-bold text-slate-800">{label}</span>
          <span className="text-[10px] bg-slate-100 px-1 rounded font-bold text-slate-500">{count}社</span>
        </div>
        <div className="text-[10px] text-slate-400">{description}</div>
      </div>
    </button>
  );
}
