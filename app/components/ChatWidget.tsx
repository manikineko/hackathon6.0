"use client";
import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { sendMessage } from "../api/llmApi";

const initialMessages = [
  { role: "ai", content: "Hi! I'm your travel assistant. How can I help you today?" }
];

type MessageWidgetProps = {
  role: string;
  content: string;
  thinking?: boolean;
};


function MessageWidget({ role, content, thinking }: MessageWidgetProps) {
  // Use emoji as avatars for simplicity
  const isUser = role === "user";
  const avatar = isUser ? "🧑" : "🤖";
  const name = isUser ? "You" : "AI";
  return (
    <div className={`chat-bubble glassy animated-fade-in ${role}`}>
      <span className={`avatar ${role}`}>{avatar}</span>
      <div className="chat-bubble-content">
        <div className="chat-bubble-name">{name}</div>
        <div className="chat-bubble-message">
          {thinking ? (
            <span className="ai-thinking" aria-live="polite" aria-busy="true">Thinking...</span>
          ) : (
            <ReactMarkdown>{content}</ReactMarkdown>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ChatWidget() {
  // Floating container styles for bottom center
  const floatingStyle: React.CSSProperties = {
    position: 'fixed',
    left: '50%',
    bottom: 32,
    transform: 'translateX(-50%)',
    zIndex: 9999,
    width: 'min(420px, 95vw)',
    maxWidth: 480,
    minWidth: 300,
    boxShadow: '0 8px 32px #0004',
    borderRadius: 24,
    background: 'var(--glass-bg, rgba(30,40,60,0.92))',
    border: '1.5px solid var(--accent2, #00ffe0)',
    padding: 0,
    margin: 0,
  };

  const [messages, setMessages] = useState(initialMessages);

  // On mount, load chat logs from localStorage if available (client only)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('chat_logs');
      if (stored) {
        setMessages(JSON.parse(stored));
      }
    }
    // eslint-disable-next-line
  }, []);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('chat_logs', JSON.stringify(messages));
    }
  }, [messages]);

  function handleClear() {
    setMessages(initialMessages);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('chat_logs');
    }
  }

  async function handleSend(e?: React.FormEvent, prompt?: string) {
    if (e) e.preventDefault();
    const text = prompt ?? input;
    if (!text.trim()) return;
    // Handle /clear command
    if (text.trim().toLowerCase() === '/clear') {
      handleClear();
      setInput("");
      return;
    }
    setMessages((msgs: MessageWidgetProps[]) => [
      ...msgs,
      { role: "user", content: text },
      { role: "ai", content: "", thinking: true }
    ]);
    setInput("");
    setLoading(true);
    const response = await sendMessage(text);
    setMessages((msgs: MessageWidgetProps[]) => {
      // Remove last AI loading msg, append real response, filter blank AI replies
      const msgsNoLoading = msgs.filter((m, i) => !(i === msgs.length - 1 && m.role === "ai" && m.content.includes("Thinking")));
      // Filter out blank/whitespace AI replies
      const filtered = response.filter(r => !(r.role === 'ai' && (!r.content || !r.content.trim())));
      return [...msgsNoLoading, ...filtered];
    });
    setLoading(false);
  }

  return (
    <>
    <div className="chat-widget" style={{position:'relative'}}>
      <button
        className="action-btn clear-chat-btn"
        style={{position:'absolute',top:12,right:16,padding:'0.35em 1em',fontSize:'0.92em',zIndex:2,opacity:0.85}}
        onClick={handleClear}
        title="Clear chat"
      >🗑️</button>
      <div className="chat-messages-centerer">
        <div className="chat-messages">
           {messages
             .filter(msg => !(msg.role === 'ai' && (!msg.content || !msg.content.trim())))
             .map((msg: MessageWidgetProps, i: number) => (
               <div key={i} className="chat-bubble-row">
                 <MessageWidget role={msg.role} content={msg.content} />
               </div>
             ))}
             {loading && (
        <div className="chat-bubble-row">
          <div className="chat-bubble glassy animated-fade-in ai">
            <span className="avatar ai">🤖</span>
            <div className="chat-bubble-content">
              <div className="ai-label">AI</div>
              <div className="loading-spinner" aria-live="polite" aria-busy="true">
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
              </div>
            </div>
          </div>
        </div>
      )}
        </div>
      </div>
      
      <div className="chat-widget-footer" style={{padding:'0 16px 16px 16px', background:'transparent', display:'flex', flexDirection:'column', gap:8}}>
        <form
          className="chat-input-form d-flex gap-2"
          onSubmit={handleSend}
          autoComplete="off"
        >
          <div className="travel-buttons" style={{display:'flex',gap:8,justifyContent:'center',marginBottom:8,alignItems:'center',flexWrap:'wrap'}}>
            <input
              className="chat-input flex-grow-1"
              type="text"
              placeholder="Type your message..."
              value={input}
              onChange={e => setInput(e.target.value)}
              disabled={loading}
              style={{minWidth:120,maxWidth:180}}
            />
            <button
              className="send-btn action-btn"
              type="submit"
              disabled={loading || !input.trim()}
              aria-label="Send"
            >
              <i className="bi bi-send"></i>
            </button>
             {/* Weather button */}
             <button className="action-btn" type="button" title="Get Weather" onClick={async () => {
               const city = prompt('Enter city for weather:');
               if (city) await handleSend(undefined, `Weather in ${city}`);
             }}>
               <i className="bi bi-cloud-sun"></i>
             </button>
             {/* Flight suggestion button */}
             <button className="action-btn" type="button" title="Suggest Flights" onClick={() => handleSend(undefined, 'Suggest flights for my next trip')}>
               <i className="bi bi-airplane"></i>
             </button>
             <button className="action-btn" type="button" title="Find Hotel" onClick={() => handleSend(undefined, 'Find Hotel')}>
               <i className="bi bi-building"></i>
             </button>
             <button className="action-btn" type="button" title="Explore Destinations" onClick={() => handleSend(undefined, 'Explore Destinations')}>
               <i className="bi bi-globe"></i>
             </button>
          </div>
        </form>
      </div>
    </div>
    </>
  );
}
