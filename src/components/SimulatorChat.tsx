import { useState, useRef, useEffect, useCallback } from 'react';

// Import JSON data
import priceMaster from '../../price_master.json';
import decisionTree from '../../decision_tree.json';
import calculationRules from '../../calculation_rules.json';

// Types
interface Selection {
  key: string;
  min: number;
  std: number;
  max: number;
}

interface EstimateSession {
  system: string | null;
  currentStep: string;
  baseSelection: Selection | null;
  optionSelections: Selection[];
  commonSelections: {
    externalLink: Selection | null;
    dataMigration: Selection | null;
  };
  scaleSelections: {
    users: string | null;
    locations: string | null;
    deadline: string | null;
  };
}

interface ChatMessage {
  id: string;
  type: 'bot' | 'user';
  text: string;
  questionId?: string;
}

interface EstimateResult {
  min: number;
  std: number;
  max: number;
}

// Helper functions
function getScaleType(system: string): string {
  const mapping = (calculationRules as any).system_scale_type_mapping;
  return mapping[system] || 'users_and_locations';
}

function getUserFactor(scaleType: string, users: string | null): number {
  if (!users || scaleType === 'deadline_only') return 1.0;
  const types = (calculationRules as any).scale_factors.users.types;
  return types[scaleType]?.[users] || 1.0;
}

function getLocationFactor(locations: string | null): number {
  if (!locations) return 1.0;
  return (calculationRules as any).scale_factors.locations.values[locations] || 1.0;
}

function getDeadlineFactor(deadline: string | null): number {
  if (!deadline) return 1.0;
  return (calculationRules as any).scale_factors.deadline.values[deadline] || 1.0;
}

function calculateEstimate(session: EstimateSession): EstimateResult {
  const { baseSelection, optionSelections, commonSelections, scaleSelections } = session;

  if (!baseSelection) return { min: 0, std: 0, max: 0 };

  // 1. Feature subtotal
  const optMin = optionSelections.reduce((sum, o) => sum + o.min, 0);
  const optStd = optionSelections.reduce((sum, o) => sum + o.std, 0);
  const optMax = optionSelections.reduce((sum, o) => sum + o.max, 0);

  const subtotal = {
    min: baseSelection.min + optMin,
    std: baseSelection.std + optStd,
    max: baseSelection.max + optMax,
  };

  // 2. Common options
  const withCommon = {
    min: subtotal.min + (commonSelections.externalLink?.min || 0) + (commonSelections.dataMigration?.min || 0),
    std: subtotal.std + (commonSelections.externalLink?.std || 0) + (commonSelections.dataMigration?.std || 0),
    max: subtotal.max + (commonSelections.externalLink?.max || 0) + (commonSelections.dataMigration?.max || 0),
  };

  // 3. Scale factors
  const scaleType = session.system ? getScaleType(session.system) : 'users_and_locations';
  const userFactor = getUserFactor(scaleType, scaleSelections.users);
  const locationFactor = getLocationFactor(scaleSelections.locations);
  const deadlineFactor = getDeadlineFactor(scaleSelections.deadline);

  const totalFactor = userFactor * locationFactor * deadlineFactor;

  return {
    min: Math.ceil(withCommon.min * totalFactor),
    std: Math.ceil(withCommon.std * totalFactor),
    max: Math.ceil(withCommon.max * totalFactor),
  };
}

function getSystemFromQuestionId(questionId: string): string | null {
  const questions = (decisionTree as any).questions;
  if (questions[questionId]?.system) {
    return questions[questionId].system;
  }
  return null;
}

function getPriceForOption(system: string, key: string): Selection | null {
  const systemData = (priceMaster as any).systems[system];
  if (!systemData) return null;

  // Check bases
  const base = systemData.bases?.find((b: any) => b.key === key);
  if (base) return { key: base.key, min: base.min, std: base.std, max: base.max };

  // Check options
  const option = systemData.options?.find((o: any) => o.key === key);
  if (option) return { key: option.key, min: option.min, std: option.std, max: option.max };

  return null;
}

function getCommonOptionPrice(commonKey: string, optionKey: string, system?: string | null): Selection | null {
  // Check system-specific override first
  if (system) {
    const systemData = (priceMaster as any).systems[system];
    if (systemData?.common_overrides?.[commonKey]) {
      const override = systemData.common_overrides[commonKey].find((o: any) => o.key === optionKey);
      if (override) return { key: override.key, min: override.min, std: override.std, max: override.max };
    }
  }
  // Fall back to global common options
  const commonOptions = (priceMaster as any).common_options[commonKey];
  if (!commonOptions) return null;
  const option = commonOptions.options.find((o: any) => o.key === optionKey);
  if (option) return { key: option.key, min: option.min, std: option.std, max: option.max };
  return null;
}

// Client-side keyword fallback for when API is unavailable
const clientCategories = [
  { id: "reservation", name: "予約システム", keywords: ["予約", "受付", "来店", "送迎", "サロン", "飲食店", "施設", "会議室"] },
  { id: "inventory", name: "在庫管理", keywords: ["在庫", "商品管理", "部品", "棚卸"] },
  { id: "warehouse", name: "倉庫・物流", keywords: ["倉庫", "物流", "配送", "出荷", "入荷", "ピッキング"] },
  { id: "crm_sfa", name: "顧客・販売", keywords: ["顧客", "CRM", "営業", "売上", "見積", "受注"] },
  { id: "procurement", name: "購買・調達", keywords: ["購買", "調達", "発注", "仕入"] },
  { id: "bi", name: "BI", keywords: ["BI", "ダッシュボード", "見える化", "分析", "レポート", "経営", "KPI"] },
  { id: "production", name: "生産管理", keywords: ["生産", "製造", "工場", "工程", "品質"] },
  { id: "hr", name: "人事・給与", keywords: ["人事", "給与", "勤怠", "採用", "評価", "社員"] },
  { id: "accounting", name: "原価・会計", keywords: ["原価", "会計", "経理", "財務", "コスト"] },
  { id: "document", name: "文書管理", keywords: ["文書", "書類", "申請", "ワークフロー", "承認", "稟議"] },
  { id: "ec", name: "EC", keywords: ["EC", "通販", "ネットショップ", "オンライン販売", "カート"] },
  { id: "regional_dx", name: "地域DX", keywords: ["地域", "自治体", "MaaS", "観光", "防災"] },
  { id: "homepage", name: "ホームページ", keywords: ["ホームページ", "Webサイト", "コーポレートサイト", "HP"] },
];

function clientKeywordFallback(input: string): { category_id: string; category_name: string; confidence: string } {
  let best = { id: '', name: '', score: 0 };
  for (const cat of clientCategories) {
    let score = 0;
    for (const kw of cat.keywords) {
      if (input.includes(kw)) score++;
    }
    if (score > best.score) best = { id: cat.id, name: cat.name, score };
  }
  if (best.score >= 2) return { category_id: best.id, category_name: best.name, confidence: 'high' };
  if (best.score === 1) return { category_id: best.id, category_name: best.name, confidence: 'medium' };
  return { category_id: '', category_name: '', confidence: 'low' };
}

export default function SimulatorChat() {
  const [session, setSession] = useState<EstimateSession>({
    system: null,
    currentStep: 'start',
    baseSelection: null,
    optionSelections: [],
    commonSelections: { externalLink: null, dataMigration: null },
    scaleSelections: { users: null, locations: null, deadline: null },
  });

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [history, setHistory] = useState<{ step: string; session: EstimateSession }[]>([]);
  const [multiSelected, setMultiSelected] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [freeText, setFreeText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [estimateResult, setEstimateResult] = useState<EstimateResult | null>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  const scrollToBottom = useCallback(() => {
    setTimeout(() => {
      if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
      }
    }, 100);
  }, []);

  // Initialize with the first question
  useEffect(() => {
    if (!isInitialized) {
      const entryPoint = (decisionTree as any).entry_point;
      setMessages([{
        id: 'bot-start',
        type: 'bot',
        text: entryPoint.question,
        questionId: 'start',
      }]);
      setIsInitialized(true);
    }
  }, [isInitialized]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, showResult, scrollToBottom]);

  const getCurrentQuestion = () => {
    if (session.currentStep === 'start') {
      return (decisionTree as any).entry_point;
    }
    return (decisionTree as any).questions[session.currentStep];
  };

  const getOptionsForCurrentQuestion = () => {
    const question = getCurrentQuestion();
    if (!question) return [];

    // For scale questions, get the right options based on scale type
    if (question.selection_type === 'scale' && question.options_by_scale_type) {
      const scaleType = session.system ? getScaleType(session.system) : null;
      if (scaleType && question.options_by_scale_type[scaleType]) {
        return question.options_by_scale_type[scaleType];
      }
      // If deadline_only and the scale_key is 'users', skip this question
      if (scaleType === 'deadline_only' && question.scale_key === 'users') {
        return null; // Signal to skip
      }
      return question.options || [];
    }

    return question.options || [];
  };

  const processConditional = (questionData: any, currentSession: EstimateSession): string => {
    const condition = questionData.condition;
    let result = false;

    if (condition.check === 'base_selection') {
      result = currentSession.baseSelection?.key === condition.equals;
    } else if (condition.check === 'option_selected') {
      result = currentSession.optionSelections.some(o => o.key === condition.option);
    } else if (condition.check === 'scale_type') {
      const scaleType = currentSession.system ? getScaleType(currentSession.system) : null;
      result = scaleType === condition.equals;
    }

    return result ? condition.true_next : condition.false_next;
  };

  const navigateToStep = (stepId: string, currentSession: EstimateSession) => {
    let currentStep = stepId;

    // Process conditional steps automatically
    while (true) {
      if (currentStep === 'result') {
        const result = calculateEstimate(currentSession);
        setEstimateResult(result);
        setShowResult(true);
        setSession(prev => ({ ...prev, currentStep: 'result' }));
        return;
      }

      const questionData = (decisionTree as any).questions[currentStep];
      if (!questionData) break;

      if (questionData.type === 'conditional') {
        currentStep = processConditional(questionData, currentSession);
        continue;
      }

      // Handle scale type skip (users question for deadline_only)
      if (questionData.selection_type === 'scale' && questionData.scale_key === 'users') {
        const scaleType = currentSession.system ? getScaleType(currentSession.system) : null;
        if (scaleType === 'deadline_only') {
          currentStep = questionData.next;
          continue;
        }
      }

      // Set system if this step has one
      const systemFromStep = questionData.system;
      if (systemFromStep && !currentSession.system) {
        currentSession = { ...currentSession, system: systemFromStep };
      }

      break;
    }

    const questionData = (decisionTree as any).questions[currentStep];
    if (questionData && questionData.question) {
      setMessages(prev => [...prev, {
        id: `bot-${currentStep}-${Date.now()}`,
        type: 'bot',
        text: questionData.question,
        questionId: currentStep,
      }]);
    }

    setSession({ ...currentSession, currentStep: currentStep });
    setMultiSelected([]);
  };

  const handleSingleSelect = (option: any) => {
    const question = getCurrentQuestion();
    if (!question) return;

    // Save history for back navigation
    setHistory(prev => [...prev, { step: session.currentStep, session: { ...session } }]);

    // Add user message
    setMessages(prev => [...prev, {
      id: `user-${Date.now()}`,
      type: 'user',
      text: option.label,
    }]);

    let updatedSession = { ...session };

    // Determine the system for this question
    const questionSystem = question.system || session.system;
    if (question.system && !session.system) {
      updatedSession.system = question.system;
    }

    // Handle entry point selection
    if (session.currentStep === 'start') {
      if (option.key === 'other') {
        navigateToStep('ai_analysis', updatedSession);
        return;
      }
      navigateToStep(option.next, updatedSession);
      return;
    }

    // Handle selection types
    if (question.selection_type === 'base') {
      const price = questionSystem ? getPriceForOption(questionSystem, option.key) : null;
      updatedSession.baseSelection = price || { key: option.key, min: 0, std: 0, max: 0 };
    } else if (question.selection_type === 'option') {
      if (option.key !== 'なし') {
        const price = questionSystem ? getPriceForOption(questionSystem, option.key) : null;
        if (price) {
          updatedSession.optionSelections = [...updatedSession.optionSelections, price];
        }
      }
    } else if (question.selection_type === 'common') {
      const commonKey = question.common_key;
      if (option.key !== 'なし') {
        const price = getCommonOptionPrice(commonKey, option.key, updatedSession.system);
        if (commonKey === 'external_link') {
          updatedSession.commonSelections = { ...updatedSession.commonSelections, externalLink: price };
        } else if (commonKey === 'data_migration') {
          updatedSession.commonSelections = { ...updatedSession.commonSelections, dataMigration: price };
        }
      }
    } else if (question.selection_type === 'scale') {
      const scaleKey = question.scale_key;
      if (scaleKey === 'users') {
        updatedSession.scaleSelections = { ...updatedSession.scaleSelections, users: option.key };
      } else if (scaleKey === 'locations') {
        updatedSession.scaleSelections = { ...updatedSession.scaleSelections, locations: option.key };
      } else if (scaleKey === 'deadline') {
        updatedSession.scaleSelections = { ...updatedSession.scaleSelections, deadline: option.key };
      }
    }

    // Handle auto_base
    if (question.auto_base && !updatedSession.baseSelection) {
      const price = questionSystem ? getPriceForOption(questionSystem, question.auto_base) : null;
      if (price) {
        updatedSession.baseSelection = price;
      }
    }

    const nextStep = option.next || question.next;
    if (nextStep) {
      navigateToStep(nextStep, updatedSession);
    }
  };

  const handleMultiToggle = (option: any) => {
    const noneKeys = ['なし', '特になし'];
    if (noneKeys.includes(option.key)) {
      // Clear other selections
      setMultiSelected([option.key]);
    } else {
      // Remove "none" keys and toggle this option
      setMultiSelected(prev => {
        const filtered = prev.filter(k => !noneKeys.includes(k));
        if (filtered.includes(option.key)) {
          return filtered.filter(k => k !== option.key);
        }
        return [...filtered, option.key];
      });
    }
  };

  const handleMultiConfirm = () => {
    const question = getCurrentQuestion();
    if (!question) return;

    // Save history
    setHistory(prev => [...prev, { step: session.currentStep, session: { ...session } }]);

    const selectedLabels = multiSelected.map(key => {
      const opt = (question.options || []).find((o: any) => o.key === key);
      return opt?.label || key;
    });

    setMessages(prev => [...prev, {
      id: `user-${Date.now()}`,
      type: 'user',
      text: selectedLabels.join('、') || '特になし',
    }]);

    let updatedSession = { ...session };
    const questionSystem = question.system || session.system;

    if (question.system && !session.system) {
      updatedSession.system = question.system;
    }

    // Handle auto_base
    if (question.auto_base && !updatedSession.baseSelection) {
      const price = questionSystem ? getPriceForOption(questionSystem, question.auto_base) : null;
      if (price) {
        updatedSession.baseSelection = price;
      }
    }

    // Process multi selections
    const noneKeys = ['なし', '特になし'];
    const validSelections = multiSelected.filter(k => !noneKeys.includes(k));

    if (question.selection_type === 'option') {
      validSelections.forEach(key => {
        const price = questionSystem ? getPriceForOption(questionSystem, key) : null;
        if (price) {
          updatedSession.optionSelections = [...updatedSession.optionSelections, price];
        }
      });
    }

    const nextStep = question.next;
    if (nextStep) {
      navigateToStep(nextStep, updatedSession);
    }
  };

  const handleFreeTextSubmit = async () => {
    if (!freeText.trim()) return;

    setHistory(prev => [...prev, { step: session.currentStep, session: { ...session } }]);

    setMessages(prev => [...prev, {
      id: `user-${Date.now()}`,
      type: 'user',
      text: freeText,
    }]);

    setIsAnalyzing(true);
    const inputText = freeText;
    setFreeText('');

    try {
      const response = await fetch('/api/ai-analysis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userInput: inputText }),
      });

      if (!response.ok) throw new Error('AI analysis failed');

      const result = await response.json();

      if (result.confidence === 'high' || result.confidence === 'medium') {
        const categoryId = result.category_id;
        const categoryName = result.category_name;

        // Find the matching entry point option
        const entryOptions = (decisionTree as any).entry_point.options;
        const matchedOption = entryOptions.find((o: any) => o.key === categoryId);

        if (matchedOption) {
          if (result.confidence === 'high') {
            setMessages(prev => [...prev, {
              id: `bot-ai-${Date.now()}`,
              type: 'bot',
              text: `「${categoryName}」に関するご相談ですね。詳しくお伺いします。`,
            }]);
            setIsAnalyzing(false);
            navigateToStep(matchedOption.next, { ...session });
          } else {
            setMessages(prev => [...prev, {
              id: `bot-ai-${Date.now()}`,
              type: 'bot',
              text: `「${categoryName}」に関するご相談でしょうか？`,
              questionId: 'ai_confirm',
            }]);
            setIsAnalyzing(false);
            // Store the matched option for confirmation
            setSession(prev => ({ ...prev, currentStep: 'ai_confirm' }));
            // We'll handle this via a special confirm flow
            setMultiSelected([matchedOption.next]); // store next step temporarily
          }
        } else {
          // Fallback to start
          setMessages(prev => [...prev, {
            id: `bot-ai-${Date.now()}`,
            type: 'bot',
            text: 'もう少し詳しく教えていただけますか？下記の選択肢から選んでください。',
          }]);
          setIsAnalyzing(false);
          setSession(prev => ({ ...prev, currentStep: 'start' }));
          setMessages(prev => [...prev, {
            id: `bot-restart-${Date.now()}`,
            type: 'bot',
            text: (decisionTree as any).entry_point.question,
            questionId: 'start',
          }]);
        }
      } else {
        setMessages(prev => [...prev, {
          id: `bot-ai-${Date.now()}`,
          type: 'bot',
          text: 'もう少し詳しく教えていただけますか？下記の選択肢から選んでください。',
        }]);
        setIsAnalyzing(false);
        setSession(prev => ({ ...prev, currentStep: 'start' }));
        setMessages(prev => [...prev, {
          id: `bot-restart-${Date.now()}`,
          type: 'bot',
          text: (decisionTree as any).entry_point.question,
          questionId: 'start',
        }]);
      }
    } catch {
      // Use client-side keyword fallback when API is unavailable
      const fallback = clientKeywordFallback(inputText);
      setIsAnalyzing(false);

      if (fallback.confidence === 'high' || fallback.confidence === 'medium') {
        const entryOptions = (decisionTree as any).entry_point.options;
        const matchedOption = entryOptions.find((o: any) => o.key === fallback.category_id);

        if (matchedOption) {
          if (fallback.confidence === 'high') {
            setMessages(prev => [...prev, {
              id: `bot-ai-${Date.now()}`,
              type: 'bot',
              text: `「${fallback.category_name}」に関するご相談ですね。詳しくお伺いします。`,
            }]);
            navigateToStep(matchedOption.next, { ...session });
          } else {
            setMessages(prev => [...prev, {
              id: `bot-ai-${Date.now()}`,
              type: 'bot',
              text: `「${fallback.category_name}」に関するご相談でしょうか？`,
              questionId: 'ai_confirm',
            }]);
            setSession(prev => ({ ...prev, currentStep: 'ai_confirm' }));
            setMultiSelected([matchedOption.next]);
          }
          return;
        }
      }

      setMessages(prev => [...prev, {
        id: `bot-error-${Date.now()}`,
        type: 'bot',
        text: 'もう少し詳しく教えていただけますか？下記の選択肢から選んでください。',
      }]);
      setSession(prev => ({ ...prev, currentStep: 'start' }));
      setMessages(prev => [...prev, {
        id: `bot-restart-${Date.now()}`,
        type: 'bot',
        text: (decisionTree as any).entry_point.question,
        questionId: 'start',
      }]);
    }
  };

  const handleAiConfirm = (confirmed: boolean) => {
    if (confirmed) {
      const nextStep = multiSelected[0]; // stored next step
      setMultiSelected([]);
      navigateToStep(nextStep, { ...session });
    } else {
      setMultiSelected([]);
      setSession(prev => ({ ...prev, currentStep: 'start' }));
      setMessages(prev => [...prev, {
        id: `bot-restart-${Date.now()}`,
        type: 'bot',
        text: (decisionTree as any).entry_point.question,
        questionId: 'start',
      }]);
    }
  };

  const handleBack = () => {
    if (history.length === 0) return;
    const prev = history[history.length - 1];
    setHistory(h => h.slice(0, -1));
    setSession(prev.session);
    setShowResult(false);
    setEstimateResult(null);
    setMultiSelected([]);

    // Remove messages after the previous bot message for this step
    setMessages(msgs => {
      // Find the last bot message for the previous step
      const idx = msgs.findLastIndex(m => m.questionId === prev.step);
      if (idx >= 0) {
        return msgs.slice(0, idx + 1);
      }
      // Fallback: remove last 2 messages (user + bot)
      return msgs.slice(0, -2);
    });
  };

  const handleRestart = () => {
    setSession({
      system: null,
      currentStep: 'start',
      baseSelection: null,
      optionSelections: [],
      commonSelections: { externalLink: null, dataMigration: null },
      scaleSelections: { users: null, locations: null, deadline: null },
    });
    setMessages([{
      id: 'bot-start-restart',
      type: 'bot',
      text: (decisionTree as any).entry_point.question,
      questionId: 'start',
    }]);
    setHistory([]);
    setMultiSelected([]);
    setShowResult(false);
    setEstimateResult(null);
    setFreeText('');
  };

  const renderOptions = () => {
    if (showResult) return null;

    // Handle AI confirmation (before question check since ai_confirm is not in decision tree)
    if (session.currentStep === 'ai_confirm') {
      return (
        <div className="flex gap-3 flex-wrap mt-4">
          <button
            onClick={() => handleAiConfirm(true)}
            className="px-6 py-3 bg-gradient-to-r from-[#1E40AF] to-[#3B82F6] text-white rounded-full text-sm font-semibold hover:shadow-lg transition-all duration-300 cursor-pointer"
          >
            はい、そうです
          </button>
          <button
            onClick={() => handleAiConfirm(false)}
            className="px-6 py-3 bg-white border-2 border-gray-200 text-gray-700 rounded-full text-sm font-semibold hover:border-[#3B82F6] transition-all duration-300 cursor-pointer"
          >
            いいえ、違います
          </button>
        </div>
      );
    }

    const question = getCurrentQuestion();
    if (!question) return null;

    // Free text input
    if (question.type === 'free_text') {
      return (
        <div className="mt-4 space-y-3">
          <textarea
            value={freeText}
            onChange={(e) => setFreeText(e.target.value)}
            placeholder={question.placeholder || '内容を入力してください'}
            className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-[#3B82F6] focus:outline-none text-gray-800 text-sm resize-none"
            rows={3}
            disabled={isAnalyzing}
          />
          <button
            onClick={handleFreeTextSubmit}
            disabled={isAnalyzing || !freeText.trim()}
            className="px-6 py-3 bg-gradient-to-r from-[#1E40AF] to-[#3B82F6] text-white rounded-full text-sm font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {isAnalyzing ? '解析中...' : '送信'}
          </button>
        </div>
      );
    }

    const options = getOptionsForCurrentQuestion();
    if (!options || options.length === 0) return null;

    // Multiple selection
    if (question.type === 'multiple') {
      return (
        <div className="mt-4 space-y-3">
          <div className="flex gap-2 flex-wrap">
            {options.map((opt: any) => (
              <button
                key={opt.key}
                onClick={() => handleMultiToggle(opt)}
                className={`px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer ${
                  multiSelected.includes(opt.key)
                    ? 'bg-gradient-to-r from-[#1E40AF] to-[#3B82F6] text-white shadow-md'
                    : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-[#3B82F6]'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
          <button
            onClick={handleMultiConfirm}
            disabled={multiSelected.length === 0}
            className="px-6 py-3 bg-gradient-to-r from-[#1E40AF] to-[#3B82F6] text-white rounded-full text-sm font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            決定
          </button>
        </div>
      );
    }

    // Single selection (entry point or single type)
    return (
      <div className="flex gap-2 flex-wrap mt-4">
        {options.map((opt: any) => (
          <button
            key={opt.key}
            onClick={() => handleSingleSelect(opt)}
            className="px-4 py-2.5 bg-white border-2 border-gray-200 text-gray-700 rounded-full text-sm font-medium hover:border-[#3B82F6] hover:text-[#3B82F6] transition-all duration-200 cursor-pointer"
          >
            {opt.label}
          </button>
        ))}
      </div>
    );
  };

  const renderResult = () => {
    if (!showResult || !estimateResult) return null;

    // Build summary of selections
    const summaryItems: string[] = [];
    if (session.system) summaryItems.push(`システム: ${session.system}`);
    if (session.baseSelection) summaryItems.push(session.baseSelection.key);
    session.optionSelections.forEach(opt => summaryItems.push(opt.key));
    if (session.commonSelections.externalLink && session.commonSelections.externalLink.key !== 'なし') {
      summaryItems.push(`外部連携: ${session.commonSelections.externalLink.key}`);
    }
    if (session.commonSelections.dataMigration && session.commonSelections.dataMigration.key !== 'なし') {
      summaryItems.push(`データ移行: ${session.commonSelections.dataMigration.key}`);
    }
    if (session.scaleSelections.users) summaryItems.push(`利用者数: ${session.scaleSelections.users}`);
    if (session.scaleSelections.locations) summaryItems.push(`拠点数: ${session.scaleSelections.locations}`);
    if (session.scaleSelections.deadline) summaryItems.push(`納期: ${session.scaleSelections.deadline}`);

    return (
      <div className="mt-6 space-y-6 animate-fadeIn">
        {/* Summary */}
        <div className="bg-gray-50 rounded-2xl p-6">
          <h4 className="text-lg font-bold text-[#0A1628] mb-3 flex items-center gap-2">
            <span className="text-xl">📋</span> ご要望の整理
          </h4>
          <ul className="space-y-1.5">
            {summaryItems.map((item, i) => (
              <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                <span className="text-[#3B82F6] mt-0.5">•</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Estimate */}
        <div className="bg-gradient-to-br from-[#0A1628] to-[#1E40AF] rounded-2xl p-6 text-white">
          <h4 className="text-lg font-bold mb-4 flex items-center gap-2">
            <span className="text-xl">💰</span> 概算見積もり
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/10 backdrop-blur rounded-xl p-4 text-center">
              <div className="text-xs text-white/70 mb-1">最小構成</div>
              <div className="text-2xl font-extrabold">約{estimateResult.min.toLocaleString()}万円〜</div>
              <div className="text-xs text-white/60 mt-1">必要最小限</div>
            </div>
            <div className="bg-white/20 backdrop-blur rounded-xl p-4 text-center ring-2 ring-[#00D9FF] relative">
              <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-[#00D9FF] text-[#0A1628] text-xs font-bold rounded-full">
                おすすめ
              </div>
              <div className="text-xs text-white/70 mb-1">標準構成</div>
              <div className="text-3xl font-extrabold">約{estimateResult.std.toLocaleString()}万円〜</div>
              <div className="text-xs text-white/60 mt-1">バランス型</div>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-xl p-4 text-center">
              <div className="text-xs text-white/70 mb-1">フル構成</div>
              <div className="text-2xl font-extrabold">約{estimateResult.max.toLocaleString()}万円〜</div>
              <div className="text-xs text-white/60 mt-1">高度な機能</div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-3">
          <a
            href="/contact"
            className="px-6 py-3 bg-gradient-to-r from-[#1E40AF] to-[#3B82F6] text-white rounded-full text-sm font-semibold hover:shadow-lg transition-all duration-300"
          >
            詳しく相談する
          </a>
          <button
            onClick={handleRestart}
            className="px-6 py-3 bg-white border-2 border-gray-200 text-gray-700 rounded-full text-sm font-semibold hover:border-[#3B82F6] transition-all duration-300 cursor-pointer"
          >
            条件を変えて再計算
          </button>
        </div>

        {/* Note */}
        <p className="text-xs text-gray-500">
          ※表示される金額は概算です。詳細な見積もりは要件ヒアリング後にご提示いたします。
        </p>
      </div>
    );
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Chat Container */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#0A1628] to-[#1E40AF] px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#00D9FF] rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-[#0A1628]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zm-4 0H9v2h2V9z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <div className="text-white font-bold text-sm">TechTime 見積もりアシスタント</div>
              <div className="text-white/60 text-xs">AI対応</div>
            </div>
          </div>
          {history.length > 0 && !showResult && (
            <button
              onClick={handleBack}
              className="text-white/70 hover:text-white text-xs flex items-center gap-1 transition-colors cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              戻る
            </button>
          )}
        </div>

        {/* Messages */}
        <div ref={chatContainerRef} className="p-6 space-y-4 max-h-[600px] overflow-y-auto">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                  msg.type === 'user'
                    ? 'bg-gradient-to-r from-[#1E40AF] to-[#3B82F6] text-white rounded-br-sm'
                    : 'bg-gray-100 text-gray-800 rounded-bl-sm'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {isAnalyzing && (
            <div className="flex justify-start">
              <div className="bg-gray-100 px-4 py-3 rounded-2xl rounded-bl-sm">
                <div className="flex gap-1.5">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            </div>
          )}

          {/* Options or Result */}
          {!isAnalyzing && renderOptions()}
          {renderResult()}

        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out;
        }
      `}</style>
    </div>
  );
}
