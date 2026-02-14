
import React from 'react';
import { Material, Project, SalesOrder, PurchaseOrder } from './types';

export const INITIAL_MATERIALS: Material[] = [
  { code: 'MAT-001', name: '集成材柱 105×105', category: '構造材', unit: '本', price: 12000 },
  { code: 'MAT-002', name: '断熱材 ネオマフォーム', category: '断熱材', unit: '枚', price: 3500 },
  { code: 'MAT-003', name: 'システムキッチン タイプA', category: '設備機器', unit: '式', price: 850000 },
  { code: 'MAT-004', name: '外壁サイディング 16mm', category: '外装材', unit: '㎡', price: 4200 },
  { code: 'MAT-005', name: 'フローリング オーク', category: '内装材', unit: '㎡', price: 8500 },
];

export const INITIAL_PROJECTS: Project[] = [
  { id: 'PRJ-2026-001', name: '田中邸新築工事', customer: '田中太郎', status: '施工中', contractAmount: 35000000, startDate: '2025/10/01', endDate: '2026/03/31' },
  { id: 'PRJ-2026-002', name: '鈴木邸新築工事', customer: '鈴木花子', status: '契約済', contractAmount: 42000000, startDate: '2025/11/15', endDate: '2026/05/20' },
  { id: 'PRJ-2026-003', name: '佐藤邸新築工事', customer: '佐藤一郎', status: '見積中', contractAmount: 38000000, startDate: '2026/01/10', endDate: '2026/07/15' },
];

export const INITIAL_ORDERS: SalesOrder[] = [
  { orderNo: '1000001', projectId: 'PRJ-2026-001', customerName: '田中太郎', orderDate: '2025/09/15', amount: 35000000, status: '確定' },
  { orderNo: '1000002', projectId: 'PRJ-2026-002', customerName: '鈴木花子', orderDate: '2025/11/01', amount: 42000000, status: '確定' },
];

export const INITIAL_PURCHASES: PurchaseOrder[] = [
  { poNo: '450000001', vendorName: '未来建材商事', materialCode: 'MAT-001', quantity: 100, amount: 1200000, status: '未入庫' },
  { poNo: '450000002', vendorName: 'エコ断熱工業', materialCode: 'MAT-002', quantity: 50, amount: 175000, status: '入庫済' },
];

export const AI_PREDICTIONS: any = {
  "PRJ-2026-001": {
    contractAmount: 35000000,
    currentCost: 18500000,
    predictedCost: 32800000,
    variance: 2100000,
    riskScore: 78,
    breakdown: [
      { category: "構造材", amount: 8200000, trend: "+5.2%", status: "rising" },
      { category: "外装材", amount: 6100000, trend: "0%", status: "stable" },
      { category: "内装材", amount: 5800000, trend: "0%", status: "stable" },
      { category: "設備機器", amount: 9500000, trend: "+8.1%", status: "rising" },
      { category: "外構材", amount: 3200000, trend: "0%", status: "stable" }
    ],
    insights: [
      { type: "warning", text: "設備機器の納期遅延リスク: 半導体不足により2週間遅延の可能性", link: "ME2M" },
      { type: "warning", text: "構造材の価格変動: 木材市況上昇トレンド、早期発注を推奨", link: "ME21N" },
      { type: "info", text: "全体収益予測: 粗利 2,200,000円（利益率 6.3%）", link: "CJI3" }
    ]
  },
  "PRJ-2026-002": {
    contractAmount: 42000000,
    currentCost: 5200000,
    predictedCost: 38500000,
    variance: 1800000,
    riskScore: 45,
    breakdown: [
      { category: "構造材", amount: 9800000, trend: "+3.1%", status: "rising" },
      { category: "外装材", amount: 7200000, trend: "0%", status: "stable" },
      { category: "内装材", amount: 6900000, trend: "-1.2%", status: "falling" },
      { category: "設備機器", amount: 11200000, trend: "+2.5%", status: "rising" },
      { category: "外構材", amount: 3400000, trend: "0%", status: "stable" }
    ],
    insights: [
      { type: "success", text: "内装材: 仕入先キャンペーンにより5%コスト削減可能", link: "XK01" },
      { type: "info", text: "全体収益予測: 粗利 3,500,000円（利益率 8.3%）", link: "CJI3" }
    ]
  },
  "PRJ-2026-003": {
    contractAmount: 38000000,
    currentCost: 0,
    predictedCost: 35200000,
    variance: 2500000,
    riskScore: 62,
    breakdown: [
      { category: "構造材", amount: 8900000, trend: "+4.8%", status: "rising" },
      { category: "外装材", amount: 6500000, trend: "+1.5%", status: "rising" },
      { category: "内装材", amount: 6200000, trend: "0%", status: "stable" },
      { category: "設備機器", amount: 10100000, trend: "+6.2%", status: "rising" },
      { category: "外構材", amount: 3500000, trend: "0%", status: "stable" }
    ],
    insights: [
      { type: "warning", text: "外装材の価格上昇: 塗料原材料高騰の影響、代替品検討を推奨", link: "MM03" },
      { type: "info", text: "見積段階のため予測精度 ±7%", link: null }
    ]
  }
};

export const COLORS = {
  primary: '#0A6ED1',
  success: '#107E3E',
  warning: '#E9730C',
  error: '#BB0000',
  background: '#F7F7F7',
  white: '#FFFFFF',
  gray: '#F2F2F2'
};

export const Icons = {
  Search: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>,
  Home: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>,
  Settings: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>,
  SD: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>,
  PP: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>,
  MM: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path></svg>,
  FICO: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>,
  Bell: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>,
  User: () => <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path></svg>,
  Back: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>,
  ArrowRight: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>,
  Download: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>,
  Filter: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path></svg>,
  Check: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>,
  Info: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>,
  Exclamation: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>,
  Close: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>,
  AI: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>,
};
