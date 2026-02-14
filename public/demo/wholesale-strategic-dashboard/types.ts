
export enum ViewType {
  SUMMARY = 'SUMMARY',
  HEALTH = 'HEALTH',
  GROWTH = 'GROWTH',
  MATRIX = 'MATRIX'
}

export interface KPIData {
  label: string;
  value: string;
  unit: string;
  vsTarget: number;
  vsLastYear: number;
}

export interface CategoryData {
  name: string;
  sales: number;
  profit: number;
  margin: number;
  vsLastYear: number;
  vsBudget: number;
  share: number;
}

export interface CustomerData {
  id: string;
  name: string;
  healthScore: number;
  sales: number;
  orderFrequency: string;
  paymentStatus: 'normal' | 'delayed';
  yearsActive: number;
  potentialSales: number;
  potentialReason: string;
  margin: number;
  quadrant: 'Star' | 'CashCow' | 'ProblemChild' | 'Dog';
}

export interface MonthlyTrend {
  month: string;
  sales: number;
  profit: number;
  vsLastYear: number;
}
