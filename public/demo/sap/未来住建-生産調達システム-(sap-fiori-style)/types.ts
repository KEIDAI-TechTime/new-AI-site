
export enum ModuleType {
  MASTER = 'MASTER',
  SD = 'SD',
  PP = 'PP',
  MM = 'MM',
  FICO = 'FICO',
  HOME = 'HOME'
}

export type ScreenID = 
  | 'HOME'
  | 'MM01' | 'MM02' | 'MM03' | 'XD01' | 'XK01'
  | 'VA01' | 'VA02' | 'VA03' | 'VA05'
  | 'CO01' | 'CO03' | 'COOIS'
  | 'ME21N' | 'ME23N' | 'MIGO' | 'ME2M'
  | 'FB03' | 'CJI3';

export interface Material {
  code: string;
  name: string;
  category: string;
  unit: string;
  price: number;
}

export interface Project {
  id: string;
  name: string;
  customer: string;
  status: '見積中' | '契約済' | '施工中' | '完工' | '引渡済';
  contractAmount: number;
  startDate: string;
  endDate: string;
}

export interface SalesOrder {
  orderNo: string;
  projectId: string;
  customerName: string;
  orderDate: string;
  amount: number;
  status: string;
}

export interface PurchaseOrder {
  poNo: string;
  vendorName: string;
  materialCode: string;
  quantity: number;
  amount: number;
  status: '未入庫' | '入庫済' | '請求済';
}

export interface Message {
  type: 'S' | 'I' | 'W' | 'E';
  text: string;
}
