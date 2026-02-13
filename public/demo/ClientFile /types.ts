
export type Industry = '製造業' | '小売業' | '医療' | 'IT通信' | '建設業' | '福祉';

export interface Client {
  id: string;
  name: string;
  industry: Industry;
  closingMonth: number;
  manager: string;
  yearsEnrolled: number;
  documentCount: number;
  pendingDocuments: number;
  contractStartDate: string;
  lastUpdated: string;
}

export interface Document {
  id: string;
  name: string;
  type: '決算書類' | '申告書' | '届出書' | '預かり書類';
  year: string;
  status: '登録済' | '預かり中' | '未登録' | '返却済';
  updatedAt: string;
}

export interface Memo {
  id: string;
  date: string;
  manager: string;
  content: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'ai';
  content: string;
  timestamp: Date;
  results?: Document[];
}
