
import { CustomerData, MonthlyTrend, CategoryData } from './types';

export const MONTHLY_TRENDS: MonthlyTrend[] = [
  { month: '4月', sales: 2800, profit: 420, vsLastYear: 102 },
  { month: '5月', sales: 3100, profit: 460, vsLastYear: 105 },
  { month: '6月', sales: 2950, profit: 440, vsLastYear: 98 },
  { month: '7月', sales: 3300, profit: 495, vsLastYear: 101 },
  { month: '8月', sales: 3450, profit: 510, vsLastYear: 104 },
  { month: '9月', sales: 3200, profit: 480, vsLastYear: 99 },
  { month: '10月', sales: 3100, profit: 465, vsLastYear: 97 },
  { month: '11月', sales: 3600, profit: 540, vsLastYear: 108 },
  { month: '12月', sales: 4200, profit: 630, vsLastYear: 112 },
  { month: '1月', sales: 3000, profit: 450, vsLastYear: 95 },
  { month: '2月', sales: 2900, profit: 435, vsLastYear: 101 },
  { month: '3月', sales: 3400, profit: 510, vsLastYear: 103 },
];

export const CATEGORY_STATS: CategoryData[] = [
  { name: '食品・飲料', sales: 12500, profit: 1250, margin: 10.0, vsLastYear: 102.5, vsBudget: 100.2, share: 32 },
  { name: '日用品', sales: 9800, profit: 1470, margin: 15.0, vsLastYear: 98.4, vsBudget: 97.5, share: 25 },
  { name: '化粧品', sales: 7200, profit: 1800, margin: 25.0, vsLastYear: 115.2, vsBudget: 112.0, share: 19 },
  { name: '医薬品', sales: 6500, profit: 1170, margin: 18.0, vsLastYear: 92.1, vsBudget: 91.5, share: 17 },
  { name: 'その他', sales: 3000, profit: 450, margin: 15.0, vsLastYear: 101.0, vsBudget: 100.0, share: 7 },
];

export const CUSTOMER_DATA: CustomerData[] = [
  { id: '1', name: 'イオン株式会社', healthScore: 95, sales: 42.5, orderFrequency: '毎日', paymentStatus: 'normal', yearsActive: 15, potentialSales: 55.0, potentialReason: '新規出店に伴う納入拡大', margin: 12.5, quadrant: 'CashCow' },
  { id: '2', name: '株式会社セブン＆アイ', healthScore: 92, sales: 38.2, orderFrequency: '毎日', paymentStatus: 'normal', yearsActive: 20, potentialSales: 45.0, potentialReason: 'プライベートブランド受託余地', margin: 11.8, quadrant: 'CashCow' },
  { id: '3', name: '株式会社マツキヨココカラ', healthScore: 88, sales: 25.4, orderFrequency: '週3回', paymentStatus: 'normal', yearsActive: 12, potentialSales: 48.0, potentialReason: '化粧品カテゴリのシェア奪取', margin: 22.4, quadrant: 'Star' },
  { id: '4', name: 'ウエルシア薬局株式会社', healthScore: 90, sales: 22.1, orderFrequency: '週3回', paymentStatus: 'normal', yearsActive: 8, potentialSales: 35.0, potentialReason: '調剤併設店への医薬品供給', margin: 19.5, quadrant: 'Star' },
  { id: '5', name: '株式会社ローソン', healthScore: 85, sales: 18.5, orderFrequency: '毎日', paymentStatus: 'normal', yearsActive: 18, potentialSales: 22.0, potentialReason: '中食・デリカ向け原材料拡大', margin: 13.2, quadrant: 'CashCow' },
  { id: '6', name: 'コストコホールセール', healthScore: 82, sales: 15.2, orderFrequency: '週1回', paymentStatus: 'normal', yearsActive: 5, potentialSales: 30.0, potentialReason: '輸入食品の独占供給交渉', margin: 24.5, quadrant: 'ProblemChild' },
  { id: '7', name: '株式会社ライフコーポレーション', healthScore: 78, sales: 12.8, orderFrequency: '週5回', paymentStatus: 'normal', yearsActive: 10, potentialSales: 15.0, potentialReason: '首都圏ドミナント化への追随', margin: 14.5, quadrant: 'CashCow' },
  { id: '8', name: '地域密着型スーパーA', healthScore: 42, sales: 5.2, orderFrequency: '月2回', paymentStatus: 'delayed', yearsActive: 25, potentialSales: 5.5, potentialReason: '経営再建中のため拡大余地低', margin: 8.2, quadrant: 'Dog' },
  { id: '9', name: 'ドラッグチェーンB', healthScore: 35, sales: 4.8, orderFrequency: '不定期', paymentStatus: 'delayed', yearsActive: 3, potentialSales: 12.0, potentialReason: '他社への流出が激しい。休眠化リスク', margin: 18.5, quadrant: 'ProblemChild' },
  { id: '10', name: '株式会社三越伊勢丹', healthScore: 80, sales: 3.5, orderFrequency: '不定期', paymentStatus: 'normal', yearsActive: 30, potentialSales: 10.0, potentialReason: 'ギフト需要の掘り起こし', margin: 28.5, quadrant: 'ProblemChild' },
];
