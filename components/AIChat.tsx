import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { useApp } from '../App';
import { generateGeminiText } from '../services/gemini';

interface ChatMsg {
  role: 'user' | 'ai' | 'system';
  text: string;
}

export const AIChat: React.FC = () => {
  const { user } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMsg[]>([
    { role: 'ai', text: '您好,我是您的 AI 空間顧問。有任何關於家具搭配、收納或保養的問題,都歡迎詢問。' }
  ]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    
    const userMsg = input.trim();
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    setLoading(true);

    const systemPrompt = `你是 MUJI 無印良品的專業空間顧問。
    客戶稱呼:${user.name || '親愛的顧客'}
    回答原則:
    1.強調「Compact Life」與「適才適所」的理念。
    2. 回答繁體中文,保持在80 字以內, 語氣親切專業。`;

    const aiText = await generateGeminiText(userMsg, systemPrompt);
    
    setLoading(false);
    if (aiText) {
      setMessages(prev => [...prev, { role: 'ai', text: aiText }]);
    } else {
      setMessages(prev => [...prev, { role: 'system', text: '連線不穩,請稍後再試。' }]);
    }
  };

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          className="absolute bottom-[100px] right-5 w-[50px] h-[50px] rounded-full bg-text-dark text-white flex items-center justify-center shadow-lg z-40 active:scale-95 transition-transform"
        >
          <MessageCircle size={24} />
        </button>
      )}

      {/* Overlay */}
      {isOpen && (
        <div className="absolute top-0 left-0 w-full h-full bg-black/50 z-[60] flex flex-col justify-end animate-fade-in" onClick={() => setIsOpen(false)}>
          <div className="bg-white rounded-t-2xl h-[70%] flex flex-col p-5 shadow-[0_-5px_30px_rgba(0,0,0,0.2)] animate-slide-up" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4 border-b border-gray-100 pb-2">
              <h3 className="font-bold text-lg text-text-dark">MUJI 空間顧問</h3>
              <X size={24} className="cursor-pointer text-gray-400" onClick={() => setIsOpen(false)} />
            </div>

            <div className="flex-1 overflow-y-auto flex flex-col gap-3 mb-4" ref={scrollRef}>
              {messages.map((msg, i) => (
                <div key={i} className={`max-w-[85%] px-3.5 py-2.5 rounded-xl text-sm leading-relaxed ${
                  msg.role === 'user' 
                    ? 'self-end bg-muji-red text-white rounded-br-sm' 
                    : msg.role === 'ai' 
                      ? 'self-start bg-gray-100 text-text-dark rounded-bl-sm'
                      : 'self-center text-xs text-gray-400 mt-2'
                }`}>
                  {msg.text}
                </div>
              ))}
              {loading && <div className="self-center text-xs text-gray-400 animate-pulse">AI 正在思考...</div>}
            </div>

            <div className="flex gap-2 pt-3 border-t border-gray-100">
              <input 
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSend()}
                placeholder="詢問 AI..."
                className="flex-1 border border-gray-200 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-text-dark"
              />
              <button 
                onClick={handleSend}
                disabled={loading}
                className="w-10 h-10 rounded-full bg-text-dark text-white flex items-center justify-center disabled:opacity-50"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};