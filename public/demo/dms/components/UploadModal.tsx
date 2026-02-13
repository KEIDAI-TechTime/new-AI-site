
import React, { useState, useEffect } from 'react';
import { X, Upload, Check, Loader2, Sparkles, AlertCircle, FileText } from 'lucide-react';
import Button from './Button';
import Badge from './Badge';

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  clientName: string;
}

const UploadModal: React.FC<UploadModalProps> = ({ isOpen, onClose, onSuccess, clientName }) => {
  const [step, setStep] = useState<1 | 2>(1);
  const [isUploading, setIsUploading] = useState(false);
  const [fileName, setFileName] = useState('');

  if (!isOpen) return null;

  const handleFileSelect = () => {
    setIsUploading(true);
    setFileName('法人税申告書_R5.pdf');
    setTimeout(() => {
      setIsUploading(false);
      setStep(2);
    }, 1500);
  };

  const handleRegister = () => {
    onSuccess();
    setStep(1);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[#0a1628]/60 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative bg-[#f8f6f1] w-full max-w-[560px] rounded-[16px] shadow-2xl overflow-hidden animate-fadeInUp">
        <div className="bg-[#0a1628] text-white p-4 px-6 flex justify-between items-center">
          <h2 className="text-lg font-serif font-bold">書類アップロード</h2>
          <button onClick={onClose} className="p-1 hover:bg-white/10 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="p-8">
          {step === 1 ? (
            <div className="space-y-6">
              <div 
                className={`border-2 border-dashed rounded-xl p-12 flex flex-col items-center justify-center gap-4 transition-all cursor-pointer ${
                  isUploading ? 'border-[#c9a962] bg-[#c9a962]/5' : 'border-gray-300 bg-white hover:border-[#c9a962] hover:bg-gray-50'
                }`}
                onClick={handleFileSelect}
              >
                {isUploading ? (
                  <Loader2 size={48} className="text-[#c9a962] animate-spin" />
                ) : (
                  <Upload size={48} className="text-gray-300" />
                )}
                <div className="text-center">
                  <p className="text-lg font-bold text-[#0a1628]">ファイルをドロップ、またはクリックして選択</p>
                  <p className="text-sm text-gray-500 mt-1">対応形式: PDF, JPG, PNG (最大 50MB)</p>
                </div>
              </div>
              {isUploading && (
                <div className="text-center animate-pulse">
                  <p className="text-sm font-bold text-[#c9a962]">AIが書類を解析しています...</p>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex items-start gap-4 p-4 bg-white rounded-lg border border-gray-200">
                <div className="w-16 h-20 bg-gray-100 rounded border border-gray-200 flex items-center justify-center">
                  {/* Fixed: Added missing FileText import */}
                  <FileText className="text-gray-400" size={32} />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-[#0a1628] truncate">{fileName}</p>
                  <div className="mt-2 flex items-center gap-2">
                    <Sparkles size={16} className="text-[#c9a962]" />
                    <div className="bg-[#d4b978]/20 p-2 rounded-r-lg rounded-bl-lg relative">
                      <p className="text-xs font-bold text-[#7a622c]">
                        この書類は <span className="underline decoration-2">法人税申告書（R5年度）</span> ですね？
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">顧問先</label>
                  <input 
                    type="text" 
                    value={clientName} 
                    disabled 
                    className="w-full px-4 py-2.5 bg-gray-100 border border-gray-200 rounded-lg text-gray-600 font-medium" 
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">年度</label>
                    <select className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#c9a962]/50">
                      <option>R5 (2023)</option>
                      <option>R6 (2024)</option>
                      <option>R4 (2022)</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">書類種別</label>
                    <select className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#c9a962]/50">
                      <option>申告書</option>
                      <option>決算書類</option>
                      <option>届出書</option>
                      <option>預かり書類</option>
                    </select>
                  </div>
                </div>
                <div className="flex items-center gap-3 mt-2">
                  <input type="checkbox" id="original" className="w-5 h-5 rounded border-gray-300 text-[#0a1628] focus:ring-[#c9a962]" />
                  <label htmlFor="original" className="text-sm font-medium text-[#0a1628]">原本をお預かりする</label>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                <Button variant="secondary" onClick={() => setStep(1)}>戻る</Button>
                <Button onClick={handleRegister}>登録する</Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadModal;
