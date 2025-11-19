import React, { useState, useRef, useEffect } from 'react';
import { Send, Terminal, Cpu } from 'lucide-react';
import { Message, MessageRole, ChatStatus } from '../types';
import { sendMessageToGemini } from '../services/geminiService';

const CyberChat: React.FC = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'init',
      role: MessageRole.MODEL,
      text: 'Inicializando sistema... Bem-vindo ao Neon Lounge. Eu sou Axel. Que som ou papo você procura hoje?',
      timestamp: new Date()
    }
  ]);
  const [status, setStatus] = useState<ChatStatus>(ChatStatus.IDLE);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || status === ChatStatus.THINKING) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: MessageRole.USER,
      text: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setStatus(ChatStatus.THINKING);

    const responseText = await sendMessageToGemini(userMsg.text);

    const modelMsg: Message = {
      id: (Date.now() + 1).toString(),
      role: MessageRole.MODEL,
      text: responseText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, modelMsg]);
    setStatus(ChatStatus.IDLE);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <div className="w-full max-w-md h-[500px] flex flex-col bg-black border-2 border-green-500 rounded-lg shadow-[0_0_15px_rgba(0,255,0,0.3)] font-mono relative overflow-hidden">
       {/* CRT Screen Overlay Effect */}
       <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-20 bg-[length:100%_2px,3px_100%]"></div>

       {/* Header */}
       <div className="bg-green-900/20 p-2 border-b border-green-500 flex items-center justify-between">
         <div className="flex items-center gap-2 text-green-400">
           <Terminal size={18} />
           <span className="font-bold tracking-wider text-sm">AXEL_TERMINAL_V2.0</span>
         </div>
         <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${status === ChatStatus.THINKING ? 'bg-yellow-400 animate-ping' : 'bg-green-500'}`}></div>
            <span className="text-xs text-green-600">{status === ChatStatus.THINKING ? 'PROCESSANDO' : 'ONLINE'}</span>
         </div>
       </div>

       {/* Messages Area */}
       <div className="flex-1 overflow-y-auto p-4 space-y-4 z-10 scrollbar-thin scrollbar-thumb-green-700 scrollbar-track-black">
         {messages.map((msg) => (
           <div 
            key={msg.id} 
            className={`flex flex-col ${msg.role === MessageRole.USER ? 'items-end' : 'items-start'}`}
           >
             <div className={`max-w-[85%] p-3 rounded-sm border ${
               msg.role === MessageRole.USER 
                 ? 'bg-green-900/30 border-green-600 text-green-100' 
                 : 'bg-purple-900/30 border-purple-500 text-pink-100'
             }`}>
                <div className="flex items-center gap-2 mb-1 opacity-50 text-[10px] uppercase">
                  {msg.role === MessageRole.MODEL && <Cpu size={10} />}
                  <span>{msg.role === MessageRole.USER ? 'VOCÊ' : 'AXEL'}</span>
                  <span>{msg.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                </div>
                <p className="whitespace-pre-wrap text-sm leading-relaxed">{msg.text}</p>
             </div>
           </div>
         ))}
         <div ref={messagesEndRef} />
       </div>

       {/* Input Area */}
       <div className="p-3 bg-black border-t border-green-500 z-10 flex gap-2 items-center">
         <span className="text-green-500 text-lg animate-pulse">{'>'}</span>
         <input
           type="text"
           value={input}
           onChange={(e) => setInput(e.target.value)}
           onKeyDown={handleKeyDown}
           placeholder="Digite para falar com o DJ..."
           className="flex-1 bg-transparent border-none outline-none text-green-400 placeholder-green-800 font-mono"
           autoComplete="off"
         />
         <button 
          onClick={handleSend}
          disabled={status === ChatStatus.THINKING}
          className="text-green-500 hover:text-green-300 transition-colors disabled:opacity-50"
         >
           <Send size={20} />
         </button>
       </div>
    </div>
  );
};

export default CyberChat;