
import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, X, Send, Search, Loader2, FileText, ArrowRight } from 'lucide-react';
import { ChatMessage, Document } from '../types';
import Badge from './Badge';
// Added Gemini API and mock data context imports
import { GoogleGenAI, Type } from "@google/genai";
import { clients, getDocuments } from '../mockData';

interface AISearchPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const AISearchPanel: React.FC<AISearchPanelProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: '1', role: 'ai', content: 'こんにちは！顧問先の書類についてお聞きください。', timestamp: new Date() }
  ]);
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [thinkingState, setThinkingState] = useState('');
  const [scanCount, setScanCount] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isThinking]);

  // Use Gemini API to handle message sending and search
  const handleSend = async (text: string) => {
    if (!text.trim()) return;

    const userMsg: ChatMessage = { id: Date.now().toString(), role: 'user', content: text, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsThinking(true);
    setThinkingState('書類をスキャン中...');
    setScanCount(0);

    // Simulated scan counter for visual feedback while API is processing
    const scanInterval = setInterval(() => {
      setScanCount(c => Math.min(c + 5, 156));
    }, 40);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      // Build context from mock data for the model
      const contextData = clients.map(c => ({
        id: c.id,
        name: c.name,
        industry: c.industry,
        manager: c.manager,
        documents: getDocuments(c.id).map(d => ({
          id: d.id,
          name: d.name,
          type: d.type,
          year: d.year,
          status: d.status,
          updatedAt: d.updatedAt
        }))
      }));

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: text,
        config: {
          systemInstruction: `あなたは税理士事務所のAI書類検索アシスタントです。
提供された顧問先データの中から、ユーザーの質問に最適な回答と、関連する書類があればそれを特定してリストアップしてください。
データ: ${JSON.stringify(contextData)}

回答は親切でプロフェッショナルな日本語で行ってください。
必ず以下のJSON形式で回答を返してください。
スキーマ: { "answer": string, "results": Array<{ id: string, name: string, type: string, year: string, status: string, updatedAt: string }> }`,
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              answer: { 
                type: Type.STRING,
                description: "ユーザーに提示する回答テキスト"
              },
              results: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    id: { type: Type.STRING },
                    name: { type: Type.STRING },
                    type: { type: Type.STRING },
                    year: { type: Type.STRING },
                    status: { type: Type.STRING },
                    updatedAt: { type: Type.STRING },
                  },
                  required: ["id", "name", "type", "year", "status", "updatedAt"]
                }
              }
            },
            required: ["answer", "results"]
          }
        },
      });

      const result = JSON.parse(response.text || '{}');
      
      const aiResponse: ChatMessage = {
        id: Date.now().toString(),
        role: 'ai',
        content: result.answer || '申し訳ありません、お探しの情報は見つかりませんでした。',
        timestamp: new Date(),
        results: result.results && result.results.length > 0 ? result.results : undefined
      };
      setMessages(prev => [...prev, aiResponse]);
    } catch (error) {
      console.error('Gemini API Error:', error);
      const errorMsg: ChatMessage = {
        id: Date.now().toString(),
        role: 'ai',
        content: 'エラーが発生しました。接続状況を確認してもう一度お試しください。',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      clearInterval(scanInterval);
      setIsThinking(false);
    }
  };

  const suggestions = [
    '「山本製作所の届出書を全部見せて」',
    '「預かり中の原本を一覧表示」',
    '「来月期限の届出書はある？」'
  ];

  return (
    <>
      <div 
        className={`fixed inset-0 z-[150] bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />
      
      <div 
        className={`fixed top-0 right-0 h-full w-full max-w-[520px] bg-[#f8f6f1] shadow-2xl z-[160] transition-transform duration-500 ease-out transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="h-[72px] bg-[#0a1628] text-white px-6 flex items-center justify-between border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#c9a962]/20 rounded-xl flex items-center justify-center text-[#c9a962]">
              <Sparkles size={24} />
            </div>
            <div>
              <h2 className="font-serif font-bold text-lg">AI書類検索</h2>
              <p className="text-xs text-[#c9a962] font-medium uppercase tracking-widest">Powered by Gemini</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Conversation Area */}
        <div 
          ref={scrollRef}
          className="h-[calc(100%-160px)] overflow-y-auto p-6 space-y-6 scroll-smooth"
        >
          {messages.map(msg => (
            <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] space-y-2 ${msg.role === 'user' ? 'flex flex-col items-end' : 'flex gap-3'}`}>
                {msg.role === 'ai' && (
                  <div className="w-8 h-8 rounded-lg bg-[#0a1628] flex items-center justify-center text-[#c9a962] shrink-0">
                    <Sparkles size={16} />
                  </div>
                )}
                <div className={`p-4 rounded-[16px] text-sm leading-relaxed shadow-sm ${
                  msg.role === 'user' 
                    ? 'bg-[#0a1628] text-white rounded-tr-none' 
                    : 'bg-white text-[#0a1628] rounded-tl-none border border-gray-100'
                }`}>
                  {msg.content}
                  
                  {msg.results && msg.results.length > 0 && (
                    <div className="mt-4 space-y-2">
                      {msg.results.map((res: any) => (
                        <div key={res.id} className="bg-[#f8f6f1] p-3 rounded-lg border border-gray-200 flex items-center justify-between group cursor-pointer hover:border-[#c9a962]">
                          <div className="flex items-center gap-3">
                            <FileText size={16} className="text-gray-400 group-hover:text-[#c9a962]" />
                            <div>
                              <p className="font-bold text-xs">{res.name}</p>
                              <p className="text-[10px] text-gray-500">{res.year}年度 | {res.type}</p>
                            </div>
                          </div>
                          <ArrowRight size={14} className="text-gray-300 group-hover:text-[#c9a962]" />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}

          {isThinking && (
            <div className="flex justify-start items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#0a1628] flex items-center justify-center text-[#c9a962]">
                <Sparkles size={16} className="animate-pulse" />
              </div>
              <div className="bg-white p-4 rounded-[16px] rounded-tl-none border border-gray-100 shadow-sm flex items-center gap-3">
                <div className="flex gap-1">
                  <div className="w-1.5 h-1.5 bg-[#c9a962] rounded-full animate-bounce [animation-delay:-0.3s]" />
                  <div className="w-1.5 h-1.5 bg-[#c9a962] rounded-full animate-bounce [animation-delay:-0.15s]" />
                  <div className="w-1.5 h-1.5 bg-[#c9a962] rounded-full animate-bounce" />
                </div>
                <span className="text-xs font-bold text-gray-400">{thinkingState} {scanCount > 0 && `(${scanCount})`}</span>
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-white border-t border-gray-100">
          {messages.length < 3 && !isThinking && (
            <div className="mb-4 flex flex-wrap gap-2">
              {suggestions.map((s, i) => (
                <button 
                  key={i} 
                  onClick={() => setInput(s.replace(/「|」/g, ''))}
                  className="text-[10px] font-bold text-[#c9a962] bg-[#c9a962]/5 border border-[#c9a962]/20 px-3 py-1.5 rounded-full hover:bg-[#c9a962] hover:text-white transition-all"
                >
                  {s}
                </button>
              ))}
            </div>
          )}
          <div className="relative">
            <input
              type="text"
              placeholder="質問を入力してください..."
              className="w-full pl-5 pr-14 py-4 bg-[#f8f6f1] border border-gray-200 rounded-[12px] focus:outline-none focus:ring-2 focus:ring-[#c9a962]/50 focus:bg-white transition-all text-sm font-medium"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend(input)}
            />
            <button 
              onClick={() => handleSend(input)}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-[#c9a962] text-white rounded-lg flex items-center justify-center hover:bg-[#d4b978] transition-colors shadow-md disabled:opacity-50"
              disabled={!input.trim() || isThinking}
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AISearchPanel;
