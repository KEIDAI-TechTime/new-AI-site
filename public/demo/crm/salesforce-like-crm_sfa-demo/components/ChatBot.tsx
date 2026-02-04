
import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Minimize2, Send, X } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

interface Message {
  role: 'bot' | 'user';
  text: string;
}

const INITIAL_MESSAGES: Message[] = [
  { role: 'bot', text: 'こんにちは！CRMアシスタントです。システムの使い方についてご質問があればお気軽にどうぞ。' }
];

const QUICK_REPLIES = [
  "商談の登録方法",
  "レポートの見方",
  "顧客情報の検索",
  "活動の記録方法"
];

const FIXED_ANSWERS: Record<string, string> = {
  "商談の登録方法": "商談タブから『新規』ボタンをクリックし、取引先・金額・ステージを入力して保存します。",
  "レポートの見方": "レポートタブで売上予測や担当者別実績を確認できます。期間やフィルターで絞り込みも可能です。",
  "顧客情報の検索": "画面上部の検索バーに会社名や担当者名を入力すると、該当するレコードが表示されます。",
  "活動の記録方法": "顧客詳細画面の活動タイムラインから『活動を記録』をクリックし、種別と内容を入力します。"
};

export const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [inputValue, setInputValue] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const handleSend = async (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = { role: 'user', text };
    setMessages(prev => [...prev, userMsg]);
    setInputValue("");

    // Simple delay for bot response
    setTimeout(async () => {
      let botResponse = "";
      if (FIXED_ANSWERS[text]) {
        botResponse = FIXED_ANSWERS[text];
      } else {
        // Fallback to Gemini if possible, or use fixed fallback
        try {
          // Fix: Initializing GoogleGenAI with process.env.API_KEY directly as per instructions
          const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
          const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: `You are a CRM system assistant for Salesforce-like software. The user asked: "${text}". If it's about the system, guide them. If unrelated, politely say you only handle CRM questions. Keep it in Japanese and concise (max 2 sentences).`,
          });
          botResponse = response.text || "申し訳ありません。その質問には対応していません。選択肢からお選びいただくか、管理者にお問い合わせください。";
        } catch (e) {
          botResponse = "申し訳ありません。その質問には対応していません。選択肢からお選びいただくか、管理者にお問い合わせください。";
        }
      }
      setMessages(prev => [...prev, { role: 'bot', text: botResponse }]);
    }, 600);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {isOpen && (
        <div className="w-80 h-96 bg-white sfdc-shadow border border-gray-300 rounded-lg flex flex-col mb-4 overflow-hidden transition-all transform scale-100 origin-bottom-right">
          <div className="bg-sfdc-blue text-white p-3 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <MessageCircle size={20} />
              <span className="font-bold text-sm">アシスタント</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-blue-600 p-1 rounded transition-colors">
              <Minimize2 size={16} />
            </button>
          </div>
          
          <div ref={scrollRef} className="flex-1 p-3 overflow-y-auto bg-gray-50 flex flex-col gap-3">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-2 rounded-lg text-sm ${msg.role === 'user' ? 'bg-sfdc-blue text-white rounded-br-none' : 'bg-white border border-gray-200 text-gray-800 rounded-bl-none shadow-sm'}`}>
                  {msg.text}
                </div>
              </div>
            ))}
            
            {messages.length === 1 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {QUICK_REPLIES.map(q => (
                  <button
                    key={q}
                    onClick={() => handleSend(q)}
                    className="text-[10px] bg-white border border-blue-500 text-blue-500 hover:bg-blue-50 px-2 py-1 rounded-full transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}
          </div>

          <form onSubmit={(e) => { e.preventDefault(); handleSend(inputValue); }} className="p-3 border-t flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="メッセージを入力..."
              className="flex-1 border rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <button type="submit" className="bg-sfdc-blue text-white p-1 rounded hover:bg-blue-600 transition-colors">
              <Send size={16} />
            </button>
          </form>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-sfdc-blue text-white rounded-full flex items-center justify-center sfdc-shadow hover:bg-blue-600 transition-transform active:scale-90"
      >
        {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
      </button>
    </div>
  );
};
