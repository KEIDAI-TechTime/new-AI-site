
import React from 'react';
// Added OpportunityStage to imports to fix the missing type error
import { Account, Contact, Opportunity, Activity, OpportunityStage, Lead, Task } from './types';
import { Mail, Phone, MapPin, Users } from 'lucide-react';

export const ACCOUNTS: Account[] = [
  { id: 'acc1', name: '株式会社テクノロジー・ジャパン', industry: 'ソフトウェア', phone: '03-1234-5678', owner: '山田 太郎', lastActivity: '2024-05-10', address: '東京都港区', description: '日本最大手のソフトウェア開発会社。' },
  { id: 'acc2', name: '未来エナジー合同会社', industry: 'エネルギー', phone: '06-8765-4321', owner: '佐藤 健一', lastActivity: '2024-05-12', address: '大阪府大阪市', description: '次世代エネルギーの研究開発。' },
  { id: 'acc3', name: 'グローバル・ロジスティクス', industry: '運輸', phone: '052-111-2222', owner: '鈴木 一郎', lastActivity: '2024-05-08', address: '愛知県名古屋市', description: '国際貨物輸送のスペシャリスト。' },
  { id: 'acc4', name: '日本フード・システム', industry: '食品', phone: '011-333-4444', owner: '高橋 花子', lastActivity: '2024-05-01', address: '北海道札幌市', description: '食品流通のDXを推進。' },
  { id: 'acc5', name: 'デジタル・マーケティング東京', industry: '広告', phone: '03-5555-6666', owner: '田中 裕二', lastActivity: '2024-05-14', address: '東京都渋谷区', description: 'SNS特化型の広告代理店。' },
  { id: 'acc6', name: 'ヘルステック・イノベーション', industry: '医療', phone: '092-777-8888', owner: '伊藤 純', lastActivity: '2024-05-15', address: '福岡県福岡市', description: '医療データの解析プラットフォームを提供。' },
  { id: 'acc7', name: 'スマート・マニュファクチャリング', industry: '製造', phone: '048-999-0000', owner: '渡辺 誠', lastActivity: '2024-05-09', address: '埼玉県さいたま市', description: 'スマート工場の実現を支援。' },
  { id: 'acc8', name: '教育フューチャー株式会社', industry: '教育', phone: '022-222-3333', owner: '小林 幸子', lastActivity: '2024-05-11', address: '宮城県仙台市', description: 'オンライン教育コンテンツの制作。' },
  { id: 'acc9', name: 'アーバン・プロパティーズ', industry: '不動産', phone: '045-444-5555', owner: '中村 剛', lastActivity: '2024-05-07', address: '神奈川県横浜市', description: '都心のハイグレードオフィス仲介。' },
  { id: 'acc10', name: 'サステナブル・ファッション', industry: '小売', phone: '075-666-7777', owner: '加藤 あい', lastActivity: '2024-05-13', address: '京都府京都市', description: '環境配慮型素材を用いたアパレル展開。' },
];

export const OPPORTUNITIES: Opportunity[] = [
  { id: 'opp1', name: '次世代ERP導入プロジェクト', accountId: 'acc1', accountName: '株式会社テクノロジー・ジャパン', amount: 15000000, stage: 'Negotiation', probability: 70, closeDate: '2024-06-30', owner: '山田 太郎' },
  { id: 'opp2', name: '基幹システム刷新', accountId: 'acc2', accountName: '未来エナジー合同会社', amount: 35000000, stage: 'Proposal', probability: 40, closeDate: '2024-08-15', owner: '佐藤 健一' },
  { id: 'opp3', name: '物流最適化ソリューション', accountId: 'acc3', accountName: 'グローバル・ロジスティクス', amount: 8000000, stage: 'Contract', probability: 90, closeDate: '2024-05-31', owner: '鈴木 一郎' },
  { id: 'opp4', name: 'AI需要予測ツール', accountId: 'acc4', accountName: '日本フード・システム', amount: 5000000, stage: 'Lead', probability: 10, closeDate: '2024-09-01', owner: '高橋 花子' },
  { id: 'opp5', name: 'マーケティングオートメーション', accountId: 'acc5', accountName: 'デジタル・マーケティング東京', amount: 12000000, stage: 'Closed Won', probability: 100, closeDate: '2024-04-20', owner: '田中 裕二' },
  { id: 'opp6', name: 'クラウドマイグレーション', accountId: 'acc6', accountName: 'ヘルステック・イノベーション', amount: 20000000, stage: 'Proposal', probability: 30, closeDate: '2024-10-10', owner: '伊藤 純' },
  { id: 'opp7', name: 'セキュリティ診断サービス', accountId: 'acc7', accountName: 'スマート・マニュファクチャリング', amount: 3000000, stage: 'Negotiation', probability: 60, closeDate: '2024-07-05', owner: '渡辺 誠' },
  { id: 'opp8', name: 'モバイルアプリ開発', accountId: 'acc8', accountName: '教育フューチャー株式会社', amount: 45000000, stage: 'Lead', probability: 5, closeDate: '2024-12-25', owner: '小林 幸子' },
  { id: 'opp9', name: 'CRMカスタマイズ支援', accountId: 'acc1', accountName: '株式会社テクノロジー・ジャパン', amount: 2500000, stage: 'Closed Won', probability: 100, closeDate: '2024-03-15', owner: '山田 太郎' },
  { id: 'opp10', name: 'オフィス内装工事・ネットワーク構築', accountId: 'acc10', accountName: 'アーバン・プロパティーズ', amount: 18000000, stage: 'Closed Lost', probability: 0, closeDate: '2024-04-30', owner: '中村 剛' },
];

export const LEADS: Lead[] = [
  { id: 'lead1', name: '田中 健二', company: '株式会社サンプル商事', title: 'IT部長', email: 'tanaka@sample.jp', status: 'Working - Contacted', owner: '山田 太郎', source: 'Web' },
  { id: 'lead2', name: '佐藤 真紀', company: 'テック・ソリューション', title: 'CEO', email: 'm.sato@tech-sol.com', status: 'Open - Not Contacted', owner: '佐藤 健一', source: 'イベント' },
  { id: 'lead3', name: '鈴木 浩介', company: '新日本マニュファクチャリング', title: '購買担当', email: 'k.suzuki@snm.co.jp', status: 'Open - Not Contacted', owner: '鈴木 一郎', source: '紹介' },
  { id: 'lead4', name: '伊藤 恵美', company: 'クリエイティブ・エージェンシー', title: 'ディレクター', email: 'emi@creative.jp', status: 'Working - Contacted', owner: '高橋 花子', source: 'Web' },
];

export const TASKS: Task[] = [
  { id: 'task1', subject: 'テクノロジー・ジャパン様へ資料送付', relatedTo: '株式会社テクノロジー・ジャパン', dueDate: '2024-05-20', status: 'Not Started', priority: 'High', owner: '山田 太郎' },
  { id: 'task2', subject: '未来エナジー合同会社様 定例会', relatedTo: '未来エナジー合同会社', dueDate: '2024-05-21', status: 'In Progress', priority: 'Normal', owner: '佐藤 健一' },
  { id: 'task3', subject: '新規見込み客への初回コール', relatedTo: '株式会社サンプル商事', dueDate: '2024-05-19', status: 'Completed', priority: 'Normal', owner: '山田 太郎' },
  { id: 'task4', subject: '四半期報告書の作成', relatedTo: '営業本部', dueDate: '2024-05-25', status: 'Not Started', priority: 'Normal', owner: '山田 太郎' },
];

export const ACTIVITIES: Activity[] = [
  { id: 'act1', type: 'email', subject: '要件定義の確認', date: '2024-05-15 10:00', description: '新機能の追加についての確認メールを送信。', targetId: 'acc1' },
  { id: 'act2', type: 'call', subject: '予算ヒアリング', date: '2024-05-14 14:30', description: '次期予算の確保状況について電話でヒアリング。', targetId: 'opp2' },
  { id: 'act3', type: 'meeting', subject: '初訪打ち合わせ', date: '2024-05-13 11:00', description: '会社概要の説明と課題の棚卸し。', targetId: 'acc4' },
  { id: 'act4', type: 'visit', subject: '現場見学会', date: '2024-05-12 15:00', description: '物流センターの視察。', targetId: 'acc3' },
];

export const STAGES: OpportunityStage[] = ['Lead', 'Proposal', 'Negotiation', 'Contract', 'Closed Won'];

export const TOOLTIPS: Record<string, string> = {
  'opportunity-pipeline': '営業の進捗をステージ別に可視化。ボトルネックを発見できます',
  'kanban-board': 'ドラッグ&ドロップでステージ変更。直感的な案件管理が可能です',
  'probability': '受注の見込み度合い。売上予測の精度向上に活用します',
  'activity-timeline': '顧客とのやり取りを時系列で記録。引き継ぎもスムーズに',
  'forecast-chart': '確度を加味した着地見込み。月末の数字が一目で分かります',
  'customer-segment': '業種・規模別の分析で、注力すべき市場を特定できます',
  'stage-path': '商談の進み具合を一目で把握。次のアクションが明確になります',
  'global-search': '顧客、商談、活動など全データを横断検索できます',
};
